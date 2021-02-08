import React from 'react';
import { Bar } from 'react-chartjs-2';

const UviForecast = ({ dailyTemp }) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let labels = []
  let uvidata = []
  let data;
  if (dailyTemp) {
    dailyTemp.forEach((day, i) => {
      labels.push(days[new Date(dailyTemp[i].dt * 1000).getDay()])
      uvidata.push(day.uvi)
    })
    data = {
      labels: labels,
      datasets: [
        {
          label: "UVI",
          data: uvidata,
          backgroundColor: "#5891D9"
        }
      ]
    }
  }
  return (
    <div>
      {dailyTemp && <Bar data={data}
        width={500}
        height={250}
        options={{ maintainAspectRatio: false }} />}
    </div>
  )
}

export default UviForecast;