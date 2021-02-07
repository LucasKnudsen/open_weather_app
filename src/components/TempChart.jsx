import { Line } from 'react-chartjs-2'

import React from 'react'

const TempChart = ({dailyTemp}) => {
  
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
    <div>
      {dailyTemp && <Line
      data={data}
      width={500}
      height={250}
      options={{ maintainAspectRatio: false }}
    />}
    </div>
  )
}

export default TempChart
