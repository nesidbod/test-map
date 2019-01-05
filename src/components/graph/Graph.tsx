import * as React from 'react'
import '../../styles/graph/Graph.css'
import { Bar } from 'react-chartjs-2';
import { Checkbox } from '@material-ui/core';
import * as Moment from 'moment'
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

import * as data from '../../gdata/test_data.json'

interface ISettingsProps {
  history: any
}

class Graph extends React.Component<ISettingsProps, any> {
  constructor(props: ISettingsProps) {
    super(props)
    this.state = {
      dateRange: [
        '5D',
        '1W',
        '2W',
        '1M',
        '2M'
      ],
      activeDateRange: '1W',
      locations: [{ name: "Select All", check: true },
      { name: "Gadiv", check: true },
      { name: "Gadot", check: true },
      { name: "Fences", check: true },
      { name: "Caol", check: true }
      ],
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      options: {
        scales: {
          xAxes: [{
            stacked: true,
            ticks: {
              autoSkip: false
            }
          }],
          yAxes: [{
            stacked: true,
            ticks: {
              stepSize: 2
            }
          }]
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem: any, dat: any) => {
              return `${dat.datasets[tooltipItem.datasetIndex].label} ${tooltipItem.yLabel}`;
            }
          }
        }
      },
      graph: {
        datasets: [
          {
            label: 'Major',
            backgroundColor: '#d81717',
            borderColor: '#d81717',
            borderWidth: 1,
            hoverBackgroundColor: '#d81717',
            hoverBorderColor: '#d81717',
            bounds: 'data',
            data: []
          },
          {
            label: 'Serious',
            backgroundColor: 'orange',
            borderColor: 'orange',
            borderWidth: 1,
            hoverBackgroundColor: 'orange',
            hoverBorderColor: 'orange',
            bounds: 'data',
            data: []
          },
          {
            label: 'Incident',
            backgroundColor: '#e6e621',
            borderColor: '#e6e621',
            borderWidth: 1,
            hoverBackgroundColor: '#e6e621',
            hoverBorderColor: '#e6e621',
            bounds: 'data',
            data: []
          }
        ]
      }
    }
  }

  public componentWillMount() {
    this.createLabel()
  }

  public render() {

    return (
      <div className="graph-container">
        <div className="graph">
          <Bar data={{ labels: this.state.labels, datasets: this.state.graph.datasets }} options={this.state.options} />
        </div>
        <div className="graph-buttons">
          {this.state.dateRange.map((el: any, index: number) => {
            return <div className={`graph-button ${this.state.activeDateRange === el ? 'active' : ''}`}
              key={index}
              onClick={() => (this.createLabel(el), this.setState({ activeDateRange: el }))}>{el}</div>
          })}
        </div>

        <div className="graph-locations">
          <div className="graph-locations-label"> Select location:</div>
          <div className="graph-locations-container">
            {this.state.locations.map((el: any, index: number) => {
              return <div className="graph-location" key={index}>
                <Checkbox classes={{ checked: "check", root: "checkbox" }}
                  value={el.name}
                  checked={el.check}
                  onChange={this.handleChange(el.name)}
                />
                <div className="graph-location-value" onClick={() => this.handleChange(el)({ target: { checked: !this.state[el] || true } })}>
                  {el.name}
                </div>
              </div>
            })}
          </div>
        </div>

        <div className="operator-container-button">
          Share report
        </div>
      </div>
    )
  }

  private handleChange = (name: any) => (event: any) => {
    const { locations } = this.state
    let data: any = []

    if (name === 'Select All') {
      data = locations.map((el: any) => {
        el.check = event.target.checked
        return el
      })
    } else {
      data = locations.map((el: any) => {
        if (el.name === 'Select All') {
          el.check = false
        }
        if (el.name === name) {
          el.check = event.target.checked
        }
        return el
      })
    }

    this.setState({
      locations: data
    })
  }

  private refreshData = (startDate: any, endDate: any) => {
    this.createData(startDate, endDate)
  }

  private createLabel = (date?: string) => {

    let startDate = ''
    const endDate = moment().format("YYYY-MM-DD")

    switch (date) {
      case '5D':
        startDate = moment().subtract(5, 'days').format("YYYY-MM-DD")
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
    this.refreshData(startDate, endDate)
  }

  private createData = (startDate?: any, endDate?: any) => {

    const { graph } = this.state
    const range = moment().range(startDate || this.state.startDate, endDate || this.state.endDate)
    const labels: any = []
    const orange: any = []
    const red: any = []
    const yellow: any = []

    data.testData.forEach((el: any) => {
      if (range.contains(moment(el.date))) {
        orange.push(el.orange_events)
        red.push(el.red_events)
        yellow.push(el.yellow_events)
        labels.push(el.date)
        return el
      }
    })
    graph.datasets[1].data = orange
    graph.datasets[0].data = red
    graph.datasets[2].data = yellow
    this.setState({ labels, graph })
  }

}
export default Graph
