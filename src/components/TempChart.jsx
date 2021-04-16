// import { Line } from 'react-chartjs-2'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

import React from 'react'

const TempChart = ({ dailyTemp }) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let labels = []
  let dataItems = []
  let dataItems2 = []
  let data
  if (dailyTemp) {
    dailyTemp.forEach((day, i) => {
      labels.push(days[new Date(dailyTemp[i].dt * 1000).getDay()])
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
      {/* {dailyTemp && <Line
        data={data}
        width={500}
        height={250}
        options={{ maintainAspectRatio: false }}
      />} */}
      <LineChart width={730} height={250} data={dailyTemp}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis label='Days' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="temp.day" stroke="#8884d8" />
        <Line type="monotone" dataKey="feels_like.day" stroke="#82ca9d" />
      </LineChart>
    </div>
  )
}

export default TempChart
