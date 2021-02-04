import React from 'react'
import axios from 'axios'
import { Header, Button, Grid } from 'semantic-ui-react'

import Showcaser from './components/Showcaser'

class App extends React.Component {
  state = {
    weatherInfo: {}
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(async pos => {
      // this.setState({ location: response.coords })
      let { latitude, longitude } = pos.coords
      const locationResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json?key=752ad146959d4bc2a0b83bc4aab0ec9a&q=${latitude}+${longitude}`)
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=5091ea391e19fef677e0e8307edbf904&units=metric`)

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
    const { weatherInfo } = this.state;

    return (
      <div className="main-container" data-cy="weather-display">
        <Header size="huge" textAlign="center">Your Location</Header>
        <Showcaser weatherInfo={weatherInfo} />
        
        <Grid>
          <Grid.Row textAlign="center" centered>
            <Button className="sun" color="yellow" onClick={() => this.clickHandlerImg()}>
              Don't like what you see?
              </Button>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;