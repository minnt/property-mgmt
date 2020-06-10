import React, {useContext} from 'react'
import {Line} from 'react-chartjs-2'

import {Context} from '../Context'

function LineChart() {

  let {isDarkMode} = useContext(Context)
  
  var chartRef = React.createRef()

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Earnings',
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(75, 192, 192 ,0.4)', // Area under the line
        borderColor: 'rgba(75, 192, 192, 1)',  // Line color
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75, 192, 192, 1)',  // Points
        pointBackgroundColor: '#fff', // Inner part of the point
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',  // Inner point on hover
        pointHoverBorderColor: 'rgba(220, 220, 220, 1)',  // Outer point on hover
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  }

  const chartOptions = {
    legend: {
      labels: {
        // fontColor: 'rgba(128, 128, 128, 0.7)',
        // fontFamily: 'Roboto',
        fontColor: (isDarkMode ? 'white' : 'black'),
        fontSize: 12
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: (isDarkMode ? 'white' : 'black'),
          fontSize: 12,
          // stepSize: 1,
          // beginAtZero: true
        }
      }],
      xAxes: [{
        ticks: {
          fontColor: (isDarkMode ? 'white' : 'black'),
          fontSize: 12,
          // stepSize: 1,
          // beginAtZero: true
        }
      }]
    }
  }

  return (
    <>
      <Line data={data} options={chartOptions} height={100} ref={chartRef}/>
    </>
  )
}

export default LineChart