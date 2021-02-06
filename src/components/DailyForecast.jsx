import React from 'react'
import { Grid, Icon, Header } from 'semantic-ui-react'
import './DailyForecast.css'

const DailyForecast = ({ dailyTemp }) => {


  const forecastList = []
    for (let i = 0; i < dailyTemp.length - 3; i++) {
      const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
      forecastList.push(
        <Grid.Column textAlign="center">
          <Icon size="large" name="snowflake" />
          <Header.Content className="days">{days[new Date(dailyTemp[i].dt * 1000).getDay()]}</Header.Content>
          <Header.Content>{dailyTemp[i].weather[0].main}</Header.Content>
          <Header.Content>{dailyTemp[i].temp.day}</Header.Content>
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
