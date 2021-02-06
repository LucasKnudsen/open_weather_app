import React from 'react'
import { Grid, Icon, Header } from 'semantic-ui-react'
import './DailyForecast.css'

const DailyForecast = ({ dailyTemp }) => {

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
  

  const forecastList = []
  for (let i = 0; i < dailyTemp.length - 3; i++) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let weather = dailyTemp[i].weather[0].main
    let dailyWeather = findWeather(weather)
    forecastList.push(
      <Grid.Column key={i} textAlign="center">
        <Icon size="large" name={dailyWeather}/>
        <Header.Content className="days">{days[new Date(dailyTemp[i].dt * 1000).getDay()]}</Header.Content>
        <Header.Content>{dailyTemp[i].weather[0].main}</Header.Content>
        <Header.Content>{dailyTemp[i].temp.day}℃</Header.Content>
      </Grid.Column>
    )
  }



  return (
    <Grid columns={5} divided>
      <Grid.Row >
        {forecastList}
      </Grid.Row>
    </Grid>
  )
}

export default DailyForecast
