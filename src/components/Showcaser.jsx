import React from 'react'
import {
  Divider,
  Grid,
  Header,
  Icon,
  Segment,
} from 'semantic-ui-react'

const Showcaser = ({ weatherInfo, children }) => {
  
  const findWeather = (weather) => {
    if (weather === 'Snow') {
      return "snowflake"
    } else if (weather === 'Clouds') {
      return "cloud"
    } else if (weather === "Clear") {
      return "skyatlas"
    } else if (weather === "Sun") {
      return "sun"
    } else if (weather === "Rainy") {
      return "tint"
    } else {
      return 'question'
    }
  }
  let weather = weatherInfo.weather && weatherInfo.weather[0].main
  let dailyWeather = findWeather(weather)
  return (
    <Segment className="main-segment" placeholder>
      <Grid columns={2} stackable textAlign="center">
        

        <Grid.Row>
        <Divider vertical></Divider>
          <Grid.Column>
            <Header data-cy="data" icon>
              <Icon name="world" />
                  Your location: {weatherInfo.location}
              <br></br>
                  The temperature: {weatherInfo.temperature}℃
                </Header>
          </Grid.Column>

          <Grid.Column>
            <Header data-cy="weather" icon>
              <Icon name={dailyWeather} />
                  Weather:
                  <p>{weatherInfo.weather && (weatherInfo.weather[0].main)}</p>
            </Header>

          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          {children}
        </Grid.Row>
      </Grid>
    </Segment>
  )
}

export default Showcaser
