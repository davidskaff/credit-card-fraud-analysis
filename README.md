# Credit Card Fraudulent Transactions Analysis

By: Jasleen Brar, Sneha Kumari, Jasleen Jasleen and David Skaff.

## Project Overview

This project focuses on the analysis of credit card fraudulent transactions. The main goal is to answer the following questions:

1. How does the frequency of fraud and cybercrime categories vary?
2. What are the most common solicitation methods in fraud cases?
3. What is the distribution of dollar loss due to fraud?
4. How does the frequency of fraud transactions vary in different provinces/states?

## Dataset

The dataset used in this project is sourced from [Open Canada](https://open.canada.ca/data/en/dataset/6a09c998-cddb-4a22-beff-4dca67ab892f/resource/43c67af5-e598-4a9b-a484-fe1cb5d775b5/view/34ecea5c-4912-49d6-bea3-7b9aead8f4bc). The data was cleaned to show the Province/State, Fraud and Cybercrime Thematic Categories, Solicitation Method, Gender, Victim Age Range, and Dollar Loss in terms of fraudulent transactions.

## Data Storage

The cleaned dataset is stored in an SQL database for easy access and manipulation.

## Data Analysis

Further analysis was performed using Python to calculate percentages and correlations. This helped to gain deeper insights into the data and answer our main questions.

## Visualization

An HTML file connected to a Javascript file was created to display five graphs:

1. A bar chart that visualizes the frequency of different categories of fraud and cybercrime.
2. A pie chart that represents the frequency of different solicitation methods.
3. A histogram that represents the frequency of different ranges of dollar loss.
4. A Stacked Bar Chart that represents the frequency of different age ranges of victims for each gender.
5. A choropleth map that represents the frequency of incidents in different provinces/states with the help of the [geojson file](https://cartographyvectors.com/map/116-canada-outline-with-provinces).

## Web Application

A Flask application (`app.py`) was created to connect and host the database. This allows the visualizations to be displayed on a web page, making the analysis results more accessible and understandable.

## Instructions

To interact with this project, you will need to:

1. Clone the repository to your local machine.
2. Make sure all the necessary Python libraries are installed.
3. Run the Flask application (app.py) to start the server.
4. Open the provided URL in your web browser to view the visualizations.

## Presentation

All the findings and visualizations were compiled into a PowerPoint presentation to effectively communicate the results of the analysis.

## Ethical Considerations

In conducting this analysis, we have taken several steps to ensure ethical considerations. We have used anonymized data to protect the privacy of individuals. Furthermore, we have focused our analysis on patterns and trends, rather than individual cases, to avoid any potential harm or misuse of information.

We hope this project provides valuable insights into credit card fraudulent transactions and helps in the development of effective strategies to combat fraud.
