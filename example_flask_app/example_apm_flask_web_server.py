from ddtrace import patch_all, tracer
patch_all()

from flask import Flask
import requests

tracer.set_tags({ 'team': 'cake' })

app = Flask(__name__)

@app.route('/')
def index():
    return 'Index Page'

@app.route('/hello')
def hello():
    return 'Hello, World'

@app.route('/api')
def api():
	response = requests.get('https://api.github.com')

	current_span = tracer.current_span()

  	if current_span:
		current_span.set_tag('important_response_value', len(response.text))

	text_length = len(response.text)
	return "This is the API Response of length: {}".format(text_length)
