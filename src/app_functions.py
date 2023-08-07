import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np

API_KEY = 'MY_API_KEY'
CITY_NAME = 'MY_CITY_NAME'

def fetch_weather_data(api_key, city_name):
    base_url = f'http://api.openweathermap.org/data/2.5/weather'
    params = {'q': city_name, 'appid': api_key, 'units': 'metric'}

    try:
        response = requests.get(base_url, params=params)
        response.raise_for_status()
        weather_data = response.json()
        temperature = weather_data['main']['temp']
        humidity = weather_data['main']['humidity']
        pressure = weather_data['main']['pressure']
        return [temperature, humidity, pressure]
    except requests.exceptions.RequestException as e:
        print(f"Error fetching weather data: {e}")
        return None

weather_data = fetch_weather_data(API_KEY, CITY_NAME)

if weather_data:
    print(f"Weather Data for {CITY_NAME}:")
    print(f"Temperature: {weather_data[0]} °C")
    print(f"Humidity: {weather_data[1]} %")
    print(f"Pressure: {weather_data[2]} hPa")

    inputs = torch.tensor(weather_data[:-1], dtype=torch.float32).unsqueeze(0)
    target = torch.tensor([weather_data[-1]], dtype=torch.float32).unsqueeze(0)

class WeatherPredictionModel(nn.Module):
    def __init__(self):
        super(WeatherPredictionModel, self).__init__()
        self.fc1 = nn.Linear(3, 10)
        self.fc2 = nn.Linear(10, 1)

    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = self.fc2(x)
        return x

model = WeatherPredictionModel()

criterion = nn.MSELoss()
optimizer = optim.SGD(model.parameters(), lr=0.01)

num_epochs = 1000
for epoch in range(num_epochs):
    outputs = model(inputs)
    loss = criterion(outputs, targets)
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

    if (epoch + 1) % 100 == 0:
        print(f'Epoch [{epoch+1}/{num_epochs}], Loss: {loss.item():.4f}')

new_inputs = torch.tensor([[28.0, 62.0, 1005.0]], dtype=torch.float32)
predicted_temperature = model(new_inputs).item()
print(f'Predicted temperature: {predicted_temperature:.2f}')
