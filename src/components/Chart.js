import React, {useState} from 'react'
import {Doughnut} from 'react-chartjs-2'

function Chart() {

  var chartRef = React.createRef();

  const chartData = useState({
    datasets: [{
      data: [10, 20, 30],
      backgroundColor: [
        '#106BA3',
        '#0D8050',
        '#C23030'
      ]
    }],
    labels: [
        'Rent',
        'Luxuries',
        'Gas'
    ]
  })

  const chartOptions = useState({
    legend: {
      labels: {
        fontColor: 'white',
        fontFamily: 'Roboto',
        fontSize: 12
      }
    }
  })

  // function pushData() {
  //   chartData.datasets[0].data.push(5)
  //   console.log(chartRef)
  //   chartRef.update()
  // }

  return (
    <div className="container-chart">
      <Doughnut data={chartData} options={chartOptions} height={100} ref={chartRef}/>
    </div>
  )
}

export default Chart