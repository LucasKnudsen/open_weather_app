import React from 'react'
import {
  Divider,
  Grid,
  Header,
  Icon,
  Segment,
} from 'semantic-ui-react'

const Showcaser = ({ weatherInfo, children }) => {
  return (
    <Segment className="main-segment" placeholder>
      <Grid columns={2} stackable textAlign="center">
        <Divider vertical></Divider>

        <Grid.Row>
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
              <Icon name="snowflake" />
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
