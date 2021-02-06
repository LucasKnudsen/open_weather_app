import React from 'react'
import axios from 'axios'
import { Header, Button, Grid, Tab } from 'semantic-ui-react'
import { Line } from 'react-chartjs-2'
import Showcaser from './components/Showcaser'
import DailyForecast from './components/DailyForecast'

class App extends React.Component {
  state = {
    weatherInfo: {}
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(async pos => {
      // this.setState({ location: response.coords })
      let { latitude, longitude } = pos.coords
      const locationResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json?key=752ad146959d4bc2a0b83bc4aab0ec9a&q=${latitude}+${longitude}`)
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=5091ea391e19fef677e0e8307edbf904&units=metric`)

      this.setState({ dailyTemp: weatherResponse.data.daily })
      const weatherInfo = {
        location: locationResponse.data.results[0].components.city ? locationResponse.data.results[0].components.city : locationResponse.data.results[0].components.postal_city,
        temperature: weatherResponse.data.current.temp,
        weather: weatherResponse.data.current.weather
      }
      this.setState({ weatherInfo: weatherInfo })

    })
  }
  clickHandlerImg() {
    document.getElementById('root').style.backgroundImage = 'url("https://images.unsplash.com/reserve/Af0sF2OS5S5gatqrKzVP_Silhoutte.jpg?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80")'
    document.getElementsByClassName('sun')[0].innerHTML = "That's better!"
  }

  render() {
    const { weatherInfo, dailyTemp } = this.state;

    const panes = [
      {
        menuItem: 'Daily Temp',
        render: () => <Tab.Pane attached={false}>
          {dailyTemp && <Line
            data={data}
            width={500}
            height={250}
            options={{ maintainAspectRatio: false }}
          />}
        </Tab.Pane>,
      },
      {
        menuItem: '5-Day Forecast',
        render: () => <Tab.Pane attached={false}>
          <DailyForecast dailyTemp={dailyTemp} />
        </Tab.Pane>,
      },
    ]

    let labels = []
    let dataItems = []
    let dataItems2 = []
    let data
    if (dailyTemp) {
      dailyTemp.forEach(day => {
        labels.push(new Date(day.dt * 1000).toLocaleDateString('sv'))
        dataItems.push(day.temp.day)
        dataItems2.push(day.feels_like.day)
      })
      data = {
        labels: labels,
        datasets: [
          {
            label: 'Daily Temperature',
            data: dataItems,
            borderColor: '#B55DFF',
            backgroundColor: '#32C5CE',
          },
          {
            label: 'Daily Feels Like',
            data: dataItems2,
            borderColor: '#B55DFF',
            backgroundColor: '#5883AB',
          }
        ]
      }
    }
    // new Date(dailyTemp[0].dt * 1000).toLocaleDateString('sv')

    return (
      <div className="main-container" data-cy="weather-display">
        <Header color="yellow" size="huge" textAlign="center">Your Weather Forecast</Header>

        <Showcaser weatherInfo={weatherInfo}>
          <Tab menu={{ pointing: true }} panes={panes} />

        </Showcaser>

        <Grid>
          <Grid.Row textAlign="center" centered>
            {/* <Button className="sun" color="yellow" onClick={() => this.clickHandlerImg()}>
              Don't like what you see?
            </Button> */}

          </Grid.Row>

        </Grid>
      </div>
    );
  }
}

export default App;