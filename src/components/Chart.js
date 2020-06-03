import React from 'react'
import {Doughnut} from 'react-chartjs-2'

function Chart() {

  var chartRef = React.createRef();

  const data = {
    datasets: [{
      data: [6, 94],
      backgroundColor: [
        '#C23030',
        '#0D8050'
      ]
    }],
    labels: [
        'Vacant',
        'Occupied',
    ]
  }

  const options = {
    legend: {
      labels: {
        fontColor: 'gray',
        // fontFamily: 'Roboto',
        fontSize: 12
      }
    }
  }

  // function pushData() {
  //   chartData.datasets[0].data.push(5)
  //   console.log(chartRef)
  //   chartRef.update()
  // }

  return (
    <>
      <Doughnut data={data} options={options} height={100} ref={chartRef}/>
    </>
  )
}

export default Chart