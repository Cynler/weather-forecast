# flask_app/app.py
from flask import Flask
from app_functions import get_weather_data

app = Flask(__name__)

@app.route('/weather/<city>')
def weather(city):
    # Use the get_weather_data function from api_functions.py to get weather data
    weather_data = get_weather_data(city)
    return weather_data
