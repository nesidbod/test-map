// import { Button, Fab } from '@material-ui/core'
import * as React from 'react'
import '../../styles/localMap/LocalMap.css'
// import errorIcon from '../../styles/img/error.png'
import local_back from '../../styles/img/LocalMap.png'
import senser from '../../styles/img/nano_logo.png'

interface ISettingsProps {
  // history: any
}

class LocalMap extends React.Component<ISettingsProps, any> {
  constructor(props: ISettingsProps) {
    super(props)
    this.state = {
      open: '',
      search: false,
      gridData: [],
      testData: [
        { id: 1, type: 'Benzene', location: 'G5', voc: 'benzene, hight concetration', Area: 'near oil tanks', detected: '', responder: 'Moshe', direction: 'nw', speed: '10km/hr' },
        // { id: 2,type: 'Gaz', location: 'G1', voc: 'gaz, hight concetration', Area: 'near gaz tanks', detected: '', responder: 'Moshe', direction: 'nw', speed: '13km/hr' },

      ]
    }
  }

  public componentWillMount () {
    const gridData = []

    for (let i = 0; i < 3; i++) {
      for (let x = 0; x < 4; x++) {
        gridData.push({ y: i, x, active: false })
      }
    }
    this.setState({gridData})
  }

  public render() {

    return (
      <div className="local-map-container">

        <div className="local-map">
          <img src={local_back} />
          {this.createGrid().map((el: any) => el)}
        </div>

        <div className={`operator-container-button icon ${this.state.search ? 'active' : ''}`}
          onClick={this.searchError}><img src={senser} /><span>Measure</span></div>
        <div className="local-map-report-container">
          <div className="local-map-report">
            <textarea />
          </div>
          <div className="operator-container-button white">Send Report</div>


        </div>

      </div>
    )
  }

  private searchError = () => {
    this.setState({ search: true })
    this.setNextGrid()
    setTimeout(() => this.setState({ search: false }), 10000)
  }

  private createGrid = () => {
    const grid = []
    const {gridData} = this.state

    for (let i = 0; i < 3; i++) {
      for (let x = 0; x < 4; x++) {
        grid.push(<div className={`local-map-grid
         ${gridData.some((el:any) => el.x === x && el.y === i && el.active) ? 'active' : ''}`}
          onClick={() => this.setActiveGrid(x, i)}
          key={i + ' ' + x} />)
      }
    }

    return grid
  }

  private setActiveGrid = (x: number, y: number) => {
    const data = this.state.gridData.map((el: any) => {
      if (el.x === x && el.y === y) {
        el.active = true
      }
      return el
    })
    this.setState({ gridData: data })
  }

  private setNextGrid = () => {
    let trigger = true
    const data = this.state.gridData.map((el: any) => {
      if (!el.active && trigger) {
        el.active = true
        trigger = false
      }
      return el
    })
    this.setState({ gridData: data })
  }


}
export default LocalMap
