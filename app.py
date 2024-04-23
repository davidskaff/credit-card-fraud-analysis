from flask import Flask, render_template, send_from_directory
import os

# Define the base directory for your project
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Define the directories for your static and template files
static_dir = os.path.join(BASE_DIR, 'docs')
template_dir = os.path.join(BASE_DIR, 'docs')

app = Flask(__name__, static_url_path='', static_folder=static_dir, template_folder=template_dir)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/<path:path>')
def send_js(path):
    return send_from_directory(static_dir, path)

if __name__ == "__main__":
    app.run(debug=True)