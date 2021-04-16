import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Header, Tab } from 'semantic-ui-react'

import Showcaser from './components/Showcaser'
import DailyForecast from './components/DailyForecast'
import TempChart from './components/TempChart'
import UviForecast from './components/UviForecast'
import { motion } from 'framer-motion'

const App = () => {
  const [weatherInfo, setWeatherInfo] = useState({})
  const [dailyTemp, setDailyTemp] = useState()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async pos => {
      let { latitude, longitude } = pos.coords
      const locationResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json?key=752ad146959d4bc2a0b83bc4aab0ec9a&q=${latitude}+${longitude}`)
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=5091ea391e19fef677e0e8307edbf904&units=metric`)

      setDailyTemp(weatherResponse.data.daily)
      const resWeatherInfo = {
        location: locationResponse.data.results[0].components.city ? locationResponse.data.results[0].components.city : locationResponse.data.results[0].components.postal_city,
        temperature: weatherResponse.data.current.temp,
        weather: weatherResponse.data.current.weather,
        uvi: weatherResponse.data.current.uvi
      }
      setWeatherInfo(resWeatherInfo)
    })
  }, [])

  const panes = [
    {
      menuItem: 'Daily Temp',
      render: () => <Tab.Pane attached={false}>
        <TempChart dailyTemp={dailyTemp} />
      </Tab.Pane>,
    },
    {
      menuItem: '5-Day Forecast',
      render: () => <Tab.Pane attached={false}>
        <DailyForecast dailyTemp={dailyTemp} />
      </Tab.Pane>,
    },
    {
      menuItem: 'UVI 8-day Forecast',
      render: () => <Tab.Pane attached={false}>
        <UviForecast dailyTemp={dailyTemp} />
      </Tab.Pane>,
    },
  ]

  return (
    <div className="main-container" data-cy="weather-display">
      <Header color="yellow" size="huge" textAlign="center" as={motion.div}
        variants={headerVariants}
        animate="animate"
        initial="initial"

      >
        Your Weather Forecast</Header>
      <Showcaser weatherInfo={weatherInfo}>
        <Tab textAlign="center" menu={{ pointing: true }} panes={panes} />
      </Showcaser>

    </div >
  )
}

export default App

const headerVariants = {
  initial: {
    x: '-100vw',
    scale: 0,
    rotation: 360
  },
  animate: {
    x: 0,
    scale: 1,
    rotate: 0,
    transition: {
      delay: 0.5,
      type: 'spring',
      ease: 'easeInOut',
      stiffness: 120
    }
  }
}

// class App extends React.Component {
//   state = {
//     weatherInfo: {}
//   }

//   componentDidMount() {
//     navigator.geolocation.getCurrentPosition(async pos => {
//       // this.setState({ location: response.coords })
//       let { latitude, longitude } = pos.coords
//       const locationResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json?key=752ad146959d4bc2a0b83bc4aab0ec9a&q=${latitude}+${longitude}`)
//       const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=5091ea391e19fef677e0e8307edbf904&units=metric`)

//       this.setState({ dailyTemp: weatherResponse.data.daily })
//       const weatherInfo = {
//         location: locationResponse.data.results[0].components.city ? locationResponse.data.results[0].components.city : locationResponse.data.results[0].components.postal_city,
//         temperature: weatherResponse.data.current.temp,
//         weather: weatherResponse.data.current.weather,
//         uvi: weatherResponse.data.current.uvi
//       }
//       this.setState({ weatherInfo: weatherInfo })
//     })
//   }
// clickHandlerImg() {
//   document.getElementById('root').style.backgroundImage = 'url("https://images.unsplash.com/reserve/Af0sF2OS5S5gatqrKzVP_Silhoutte.jpg?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80")'
//   document.getElementsByClassName('sun')[0].innerHTML = "That's better!"
// }

// render() {
//   const { weatherInfo, dailyTemp } = this.state;

//   const panes = [
//     {
//       menuItem: 'Daily Temp',
//       render: () => <Tab.Pane attached={false}>
//         <TempChart dailyTemp={dailyTemp} />
//       </Tab.Pane>,
//     },
//     {
//       menuItem: '5-Day Forecast',
//       render: () => <Tab.Pane attached={false}>
//         <DailyForecast dailyTemp={dailyTemp} />
//       </Tab.Pane>,
//     },
//     {
//       menuItem: 'UVI 8-day Forecast',
//       render: () => <Tab.Pane attached={false}>
//         <UviForecast dailyTemp={dailyTemp} />
//       </Tab.Pane>,
//     },
//   ]

//   return (
//     <div className="main-container" data-cy="weather-display">
//       <Header color="yellow" size="huge" textAlign="center">Your Weather Forecast</Header>
//       <Showcaser weatherInfo={weatherInfo}>
//         <Tab textAlign="center" menu={{ pointing: true }} panes={panes} />
//       </Showcaser>

//     </div >
//   );
// }
// }

// export default App;