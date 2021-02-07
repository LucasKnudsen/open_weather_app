import React from 'react';
import { Bar } from 'react-chartjs-2';

const UviForecast = ({ dailyTemp }) => {
  let labels = []
  let uvidata = []
  let data;
  if (dailyTemp) {
    dailyTemp.forEach(day => {
      labels.push(new Date(day.dt * 1000).toLocaleDateString("sv"))
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

    </div>
  )
}

export default UviForecast;