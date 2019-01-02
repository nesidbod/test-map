// import { Button, Fab } from '@material-ui/core'
import * as React from 'react'
import '../../styles/graph/Graph.css'
import { Bar } from 'react-chartjs-2';
import { Checkbox } from '@material-ui/core';
import * as Moment from 'moment'
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

import * as data from '../../idata.json'

interface ISettingsProps {
  history: any
}

class Graph extends React.Component<ISettingsProps, any> {
  constructor(props: ISettingsProps) {
    super(props)
    this.state = {
      dateRange: [
        '1D',
        '5D',
        '1W',
        '2W',
        '1M',
        '2M'
      ],
      activeDateRange: '1W',
      locations: [
        "Select All",
        "Gadiv",
        "Gadot",
        "Fences",
        "Caol"
      ],
      "Select All": true,
      Gadiv: false,
      startDate: '',
      endDate: '',
      Gadot: false,
      Fences: false,
      Caol: false,
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      options: {
        scales: {
          xAxes: [{
            ticks: {
              autoSkip: false
            }
          }],
          yAxes: [{
            // stacked: true
          }]
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem: any, dat: any) {
              // var label = data.datasets[tooltipItem.datasetIndex].label || '';
              // if (label) {
              //     label += ': ';
              // }
              // label += Math.round(tooltipItem.yLabel * 100) / 100;
              return tooltipItem.yLabel;
            }
          }
        }
      },
      graph: {
        datasets: [
          {
            label: 'Errors',
            backgroundColor: '#2B1AA6',
            borderColor: '#6550FF',
            borderWidth: 1,
            hoverBackgroundColor: '#6550FF',
            hoverBorderColor: '#6550FF',
            bounds: 'data',
            data: [
              {
                x: '2018-12-14',
                y: 1,
                t: 'test'
              },
              {
                x: '2018-12-14',
                y: 2
              },
              {
                x: moment().subtract(3, 'days'),
                y: 10
              },
              ,
              {
                x: moment().subtract(4, 'days'),
                y: 18
              },
              {
                x: moment(),
                y: 18
              }],

          }
        ]
      }
    }
  }

  public componentWillMount() {
    this.createLabel()
    // this.createData()
    // console.log('sdsdsdsd')
  }

  public render() {

    return (
      <div className="graph-container">
        <div className="graph">
          <Bar data={{ labels: this.state.labels, datasets: this.state.graph.datasets }} options={this.state.options} />
        </div>
        <div className="graph-buttons">
          {this.state.dateRange.map((el: any, index: number) => {
            return <div className={`graph-button ${this.state.activeDateRange === el? 'active': ''}`}
             key={index}
              onClick={() => el !== '1D' && (this.createLabel(el),this.setState({activeDateRange: el}))}>{el}</div>
          })}
        </div>

        <div className="graph-locations">
          <div className="graph-locations-label"> Select location:</div>
          <div className="graph-locations-container">
            {this.state.locations.map((el: any, index: number) => {
              return <div className="graph-location" key={index}>
                <Checkbox classes={{ checked: "check", root: "checkbox" }}
                  value={el}
                  checked={this.state[el]}
                  onChange={this.handleChange(el)}
                />
                <div className="graph-location-value" onClick={() => this.handleChange(el)({ target: { checked: !this.state[el] || true } })}>
                  {el}
                </div>
              </div>
            })}
          </div>
        </div>
      </div>
    )
  }

  private handleChange = (name: any) => (event: any) => {
    this.setState({ [name]: event.target.checked })
  }

  private refreshData = (startDate: any, endDate: any) => {
    this.createData(startDate, endDate)
  }

  private createLabel = (date?: string) => {

    let startDate = ''
    const endDate = moment().format("YYYY-MM-DD")

    switch (date) {
      // case '1D':
      //   console.log('1D')
      //   startDate = moment().format("YYYY-MM-DD")
      //   this.setState({ startDate, endDate })
      //   break
      case '5D':
        startDate = moment().subtract(5, 'days').format("YYYY-MM-DD")
        // console.log('ddddddddddddddddddddddddddddddddddddddddd')
        // console.log(startDate, endDate)
        this.setState({ startDate, endDate })
        break
      case '1W':
        startDate = moment().subtract(1, 'weeks').format("YYYY-MM-DD")
        this.setState({ startDate, endDate })
        break
      case '2W':
        startDate = moment().subtract(2, 'weeks').format("YYYY-MM-DD")
        this.setState({ startDate, endDate })
        break
      case '1M':
        startDate = moment().subtract(1, 'months').format("YYYY-MM-DD")
        this.setState({ startDate, endDate })
        break
      case '2M':
        startDate = moment().subtract(2, 'months').format("YYYY-MM-DD")
        this.setState({ startDate, endDate })
        break
      default:
        startDate = moment().subtract(1, 'weeks').format("YYYY-MM-DD")
        this.setState({ startDate, endDate })
        break
    }
    // console.log('dfdfdfdfdfdf', startDate, endDate)
    this.refreshData(startDate, endDate)
  }

  private createData = (startDate?: any, endDate?: any) => {

    const { graph } = this.state
    const range = moment().range(startDate || this.state.startDate, endDate || this.state.endDate)
    const labels: any = []
    const dataGraphs: any = []
    const curentData = data.testData.filter((el: any) => {
      if (range.contains(moment(el.date))) {
        return el
      }
    })

    curentData.forEach((elem: any) => {
      // console.log('elem', elem)
      let errors = 0
      // "status": "green"
      for (const el in elem) {
        if (el !== 'date') {
          // const test = elem[el]
          // labels.push(test[test.length-1].time)
          // console.log(elem[el])
          elem[el].forEach((sensor: any) => {
            // console.log(sensor.time)
            if (sensor.status !== 'green') {
              errors++
            }
            // labels.push(sensor.time)
          })
        } else {
          labels.push(elem[el])
        }
      }
      dataGraphs.push(errors)
    })
    graph.datasets[0].data = dataGraphs
    this.setState({ labels, graph })
  }

}
export default Graph
