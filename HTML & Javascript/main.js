d3.csv("credit-card-fraud-data.csv").then(function(data) {
    var svg = d3.select("#chart1").append("svg")
        .attr("width", 600)  // Increase the width to make room for the legend
        .attr("height", 500);

    var width = +svg.attr("width") - 100;  // Reduce the chart width to make room for the legend
    var height = +svg.attr("height");

    // Count the frequency of each category
    var counts = {};
    data.forEach(function(d) {
        var category = d["Fraud and Cybercrime Thematic Categories"];
        if (counts[category]) {
            counts[category]++;
        } else {
            counts[category] = 1;
        }
    });

    // Convert the counts to an array of objects
    var dataArray = Object.keys(counts).map(function(key) {
        return {
            category: key,
            count: counts[key]
        };
    });

    // Sort the data array by count in descending order
    dataArray.sort(function(a, b) { return b.count - a.count; });

    // Create the scales
    var xScale = d3.scaleBand().domain(dataArray.map(function(d) { return d.category; })).range([0, width]).padding(0.1);
    var yScale = d3.scaleLinear().domain([0, d3.max(dataArray, function(d) { return d.count; })]).range([height, 0]);

    // Create a color scale
    var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // Create the bars
    var bars = svg.selectAll("rect")
        .data(dataArray)
        .enter().append("rect")
        .attr("x", function(d) { return xScale(d.category); })
        .attr("y", function(d) { return yScale(d.count); })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) { return height - yScale(d.count); })
        .attr("fill", function(d, i) { return colorScale(i); })  // Use the color scale here
        .on("mouseover", function() {
            d3.select(this).attr("opacity", 0.7); // Reduce opacity on mouseover
        })
        .on("mouseout", function() {
            d3.select(this).attr("opacity", 1); // Restore opacity on mouseout
        });

    // Add labels
    svg.selectAll("text")
        .data(dataArray)
        .enter()
        .append("text")
        .text(function(d) { return d.count; })
        .attr("x", function(d) { return xScale(d.category) + xScale.bandwidth() / 2; })
        .attr("y", function(d) { return yScale(d.count) - 10; })
        .attr("text-anchor", "middle");

    // Create the legend
    var legend = svg.append("g")
        .attr("transform", "translate(" + (width + 20) + ",0)");  // Position the legend

    var legendItems = legend.selectAll("g")
        .data(dataArray)
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + (i * 20) + ")"; });  // Position each legend item

    // Add the color squares to the legend
    legendItems.append("rect")
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", function(d, i) { return colorScale(i); });

    // Add the labels to the legend
    legendItems.append("text")
        .attr("x", 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .text(function(d) { return d.category; });

    // Add the title at the middle top
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 30) // Adjust this value as needed
        .attr("text-anchor", "middle")
        .attr("font-size", "15px") // Reduce the font size by 25%
        .attr("font-weight", "bold") // Make it bold
        .text("Fraud and Cybercrime Thematic Categories");
});




d3.csv("credit-card-fraud-data.csv").then(function(data) {
    var svg = d3.select("#chart2").append("svg")
        .attr("width", 800)
        .attr("height", 500);

    var width = +svg.attr("width");
    var height = +svg.attr("height");

    // Count the frequency of each solicitation method
    var counts = {};
    data.forEach(function(d) {
        var method = d["Solicitation Method"];
        if (counts[method]) {
            counts[method]++;
        } else {
            counts[method] = 1;
        }
    });

    // Convert the counts to an array of objects
    var dataArray = Object.keys(counts).map(function(key) {
        return {
            method: key,
            count: counts[key]
        };
    });

    // Sort the data array by count in descending order
    dataArray.sort(function(a, b) { return b.count - a.count; });

    // Create a pie generator
    var pie = d3.pie().value(function(d) { return d.count; });

    // Create an arc generator
    var arc = d3.arc().innerRadius(0).outerRadius(Math.min(width, height) / 2);

    // Create a group element and translate it to the center
    var g = svg.append("g")
        .attr("transform", "translate(" + width / 3 + "," + height / 2 + ")");

    // Create the pie chart
    var path = g.selectAll("path")
        .data(pie(dataArray))
        .enter().append("path")
        .attr("d", arc)
        .attr("fill", function(d, i) { return d3.schemeCategory10[i % 10]; })
        .on("mouseover", function(d) {
            var percentage = (d.data.count / d3.sum(dataArray, function(d) { return d.count; }) * 100).toFixed(2);
            tooltip.html(percentage + "%");
            tooltip.style("visibility", "visible");
        })
        .on("mousemove", function() {
            tooltip.style("top", (d3.event.pageY - 10) + "px")
                .style("left", (d3.event.pageX + 10) + "px");
        })
        .on("mouseout", function() {
            tooltip.style("visibility", "hidden");
        });

    // Add interactivity
    path.on("mouseover", function(d) {
            d3.select(this)
                .attr("stroke", "white")
                .transition()
                .duration(200)
                .attr("d", d3.arc().innerRadius(0).outerRadius(Math.min(width, height) / 2 + 10));
        })
        .on("mouseout", function(d) {
            d3.select(this)
                .attr("stroke", "none")
                .transition()
                .duration(200)
                .attr("d", arc);
        });

    // Add a legend
    var legend = svg.selectAll(".legend")
        .data(pie(dataArray))
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(" + (2 * width / 3 + 10) + "," + (i * 20 + 20) + ")"; });

    legend.append("rect")
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function(d, i) { return d3.schemeCategory10[i % 10]; });

    legend.append("text")
        .attr("x", 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .text(function(d) { return d.data.method; });

    // Add title
    svg.append("text")
        .attr("x", width - 200) // Positioning from right edge with slight adjustment
        .attr("y", height - 10) // Positioning from bottom edge
        .attr("text-anchor", "end") // Align to the end (right)
        .style("font-size", "18px") // Set font size to 18px
        .style("font-weight", "bold") // Making the font bold
        .text("Solicitation Method");

    // Add tooltip
    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("background-color", "rgba(0, 0, 0, 0.7)")
        .style("color", "white")
        .style("padding", "5px")
        .style("border-radius", "5px");
});





function createHistogram(data) {
    const categories = [
        { range: [0, 100], label: "0 - 100" },
        { range: [101, 500], label: "101 - 500" },
        { range: [501, 1000], label: "501 - 1000" },
        { range: [1001, 5000], label: "1001 - 5000" },
        { range: [5001, 10000], label: "5001 - 10000" },
        { range: [10001, 50000], label: "10001 - 50000" },
        { range: [50001, 100000], label: "50001 - 100000" },
        { range: [100001, Infinity], label: "100001 +" }
    ];

    let counts = new Array(categories.length).fill(0);

    data.forEach(d => {
        const value = parseFloat(d["Dollar Loss"]);
        for (let i = 0; i < categories.length; i++) {
            const { range } = categories[i];
            if (value >= range[0] && value <= range[1]) {
                counts[i]++;
                break;
            }
        }
    });

    const sortedIndices = counts.map((_, i) => i).sort((a, b) => counts[b] - counts[a]);
    categories.sort((a, b) => sortedIndices.indexOf(categories.indexOf(a)) - sortedIndices.indexOf(categories.indexOf(b)));
    counts.sort((a, b) => b - a);

    const colorScale = d3.scaleOrdinal()
        .domain(sortedIndices)
        .range(d3.schemeCategory10);

    const margin = { top: 20, right: 20, bottom: 50, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    const legendWidth = 100;
    const legendHeight = 20;

    const svg = d3.select("#chart3")
        .append("svg")
        .attr("width", width + margin.left + margin.right + legendWidth)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
        .domain(categories.map((_, index) => index))
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(counts)])
        .nice()
        .range([height, 0]);

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(() => ""));

    svg.append("g")
        .call(d3.axisLeft(y));

    const bars = svg.selectAll("rect")
        .data(categories)
        .enter()
        .append("rect")
        .attr("x", (_, i) => x(i))
        .attr("y", d => y(counts[categories.indexOf(d)]))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(counts[categories.indexOf(d)]))
        .attr("fill", (_, i) => colorScale(i))
        .on("mouseover", function(_, i) {
            const tooltip = d3.select("#tooltip");
            tooltip.style("opacity", 1).html(`Category: ${categories[i].label}<br>Count: ${counts[i]}`);
        })
        .on("mouseout", function() {
            const tooltip = d3.select("#tooltip");
            tooltip.style("opacity", 0);
        });

    svg.selectAll("text.label")
        .data(categories)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", (_, i) => x(i) + x.bandwidth() / 2)
        .attr("y", d => y(counts[categories.indexOf(d)]) - 5)
        .attr("text-anchor", "middle")
        .text(d => counts[categories.indexOf(d)]);

    svg.append("text")
        .attr("transform", `translate(${width / 2},${height + margin.top + 20})`)
        .style("text-anchor", "middle")
        .text("Dollar Loss (Canadian Dollars)");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Frequency");

    const legend = svg.append("g")
        .attr("transform", `translate(${width + 20}, 0)`);

    legend.selectAll("rect")
        .data(categories)
        .enter()
        .append("rect")
        .attr("x", 0)
        .attr("y", (_, i) => i * (legendHeight + 5))
        .attr("width", legendHeight)
        .attr("height", legendHeight)
        .attr("fill", (_, i) => colorScale(i));

    legend.selectAll("text")
        .data(categories)
        .enter()
        .append("text")
        .attr("x", legendHeight + 5)
        .attr("y", (_, i) => i * (legendHeight + 5) + legendHeight / 2)
        .attr("dy", "0.35em")
        .text(d => d.label);
}

d3.csv("credit-card-fraud-data.csv").then(function(data) {
    createHistogram(data);
}).catch(function(error) {
    console.error("Error loading the data: ", error);
});





function createStackedBarChart() {
    // Define the dimensions and margins for the chart
    var margin = { top: 20, right: 100, bottom: 30, left: 40 },
        width = 600 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // Append the SVG object to the body of the page
    var svg = d3.select("#chart4")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Load the data from the CSV file
    d3.csv("credit-card-fraud-data.csv").then(function (data) {
        // Group the data by gender and victim age range
        var groupedData = d3.nest()
            .key(function (d) { return d.Gender; })
            .key(function (d) { return d["Victim Age Range"]; })
            .rollup(function (leaves) { return leaves.length; })
            .entries(data);

        // Extract unique age ranges
        var ageRanges = [...new Set(data.map(function (d) { return d["Victim Age Range"]; }))];

        // Create color scale for different age ranges
        var color = d3.scaleOrdinal()
            .domain(ageRanges)
            .range(d3.schemeCategory10);

        // Stack the data
        var stackedData = d3.stack()
            .keys(ageRanges)
            .value(function (d, key) {
                return d.values.find(function (v) { return v.key === key; })?.value || 0;
            })(groupedData);

        // X scale
        var x = d3.scaleBand()
            .domain(groupedData.map(function (d) { return d.key; }))
            .range([0, width])
            .padding(0.1);

        // Y scale
        var y = d3.scaleLinear()
            .domain([0, d3.max(stackedData, function (d) { return d3.max(d, function (d) { return d[1]; }); })])
            .range([height, 0]);

        // Draw bars with tooltips
        svg.selectAll("g")
            .data(stackedData)
            .enter().append("g")
            .attr("fill", function (d) { return color(d.key); })
            .selectAll("rect")
            .data(function (d) { return d; })
            .enter().append("rect")
            .attr("x", function (d) { return x(d.data.key); })
            .attr("y", function (d) { return y(d[1]); })
            .attr("height", function (d) { return y(d[0]) - y(d[1]); })
            .attr("width", x.bandwidth())
            .on("mouseover", function (d) {
                var total = d3.sum(d.data.values, function (d) { return d.value; });
                var percent = Math.round((d[1] - d[0]) / total * 100);
                var tooltipText = d.data.key + "<br>" + "Percentage: " + percent + "%";
                tooltip.html(tooltipText)
                    .style("visibility", "visible");
            })
            .on("mousemove", function () {
                tooltip.style("top", (d3.event.pageY - 10) + "px")
                    .style("left", (d3.event.pageX + 10) + "px");
            })
            .on("mouseout", function () {
                tooltip.style("visibility", "hidden");
            });

        // X axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Y axis
        svg.append("g")
            .call(d3.axisLeft(y));

        // Add legend title
        svg.append("text")
            .attr("x", width + 10)
            .attr("y", -10)
            .attr("dy", "0.35em")
            .style("text-anchor", "start")
            .text("Victim Age Range");

        // Add legend
        var legend = svg.selectAll(".legend")
            .data(ageRanges)
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
            .attr("x", width + 10)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", color);

        legend.append("text")
            .attr("x", width + 35)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "start")
            .text(function (d) { return d; });

        // Tooltip
        var tooltip = d3.select("#chart4")
            .append("div")
            .style("position", "absolute")
            .style("visibility", "hidden")
            .style("background-color", "white")
            .style("padding", "5px")
            .style("border", "1px solid #ddd")
            .style("border-radius", "3px")
            .text("");
    });
}

// Call the function to create the stacked bar chart
createStackedBarChart();





d3.csv("credit-card-fraud-data.csv").then(function(data) {
    var svg = d3.select("#chart5").append("svg")
        .attr("width", 500)
        .attr("height", 500);

    var width = +svg.attr("width");
    var height = +svg.attr("height");

    // Count the frequency of each province/state
    var counts = {};
    data.forEach(function(d) {
        var province = d["Province/State"];
        if (counts[province]) {
            counts[province]++;
        } else {
            counts[province] = 1;
        }
    });

    // Load GeoJSON data
    d3.json("canada-outline-with-provinces_.geojson").then(function(canada) {
        // Create a geoPath generator and set its projection
        var path = d3.geoPath().projection(d3.geoMercator().fitSize([width, height], canada));

        // Create a color scale
        var color = d3.scaleSequential(d3.interpolateReds).domain([0, d3.max(Object.values(counts))]);

        // Draw the map
        svg.selectAll("path")
            .data(canada.features)
            .enter().append("path")
            .attr("fill", function(d) {
                var provinceName = d.properties.name;
                if (counts[provinceName]) {
                    return color(counts[provinceName]);
                } else {
                    return "lightgray"; // Set color to light gray for provinces with no data
                }
            })
            .attr("d", path)
            .on("mouseover", function(d) {
                // Display tooltip on mouseover
                var provinceName = d.properties.name;
                tooltip.text(provinceName)
                    .style("visibility", "visible");
            })
            .on("mousemove", function() {
                // Position tooltip relative to mouse pointer
                tooltip.style("top", (d3.event.pageY - 10) + "px")
                    .style("left", (d3.event.pageX + 10) + "px");
            })
            .on("mouseout", function() {
                // Hide tooltip on mouseout
                tooltip.style("visibility", "hidden");
            });

        // Create tooltip element
        var tooltip = d3.select("#chart5")
            .append("div")
            .style("position", "absolute")
            .style("visibility", "hidden")
            .style("background-color", "white")
            .style("padding", "5px")
            .style("border", "1px solid #ccc")
            .style("border-radius", "3px");
    });
});