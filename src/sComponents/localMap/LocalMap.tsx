import { Icon } from '@material-ui/core';
import axios from 'axios';
import * as React from 'react'
import local_back from '../../styles/img/LocalMap.png'
import senser from '../../styles/img/nano_logo.png'
import '../../styles/localMap/LocalMap.css'
interface ISettingsProps {
  // history: any
  onClose(): any
}

class LocalMap extends React.Component<ISettingsProps, any> {
  constructor(props: ISettingsProps) {
    super(props)
    this.state = {
      open: '',
      search: false,
      gridData: [],
    }
  }

  public componentWillMount() {
    const gridData = []

    for (let i = 0; i < 3; i++) {
      for (let x = 0; x < 4; x++) {
        gridData.push({
          y: i, x, active: false,
          color: i === 1 && x === 2 ? 'orange' : i === 1 && x === 2 ? 'red' : (x > 0 && (i === 0 || i === 2)) ? 'orange' : 'yellow'
        })
      }
    }
    this.setState({ gridData })
  }

  public render() {

    return (
      <div className="local-map-container">

        <div className="local-map">
          <img src={local_back} />
          {this.createGrid().map((el: any) => el)}
        </div>

        <div className={`operator-container-button icon ${this.state.search ? 'active' : ''}`}
          onClick={(event) => !this.state.search && this.searchError()}><img src={senser} /><span>Measure</span></div>
        <div className="local-map-report-container">
          <div className="local-map-report">
            <textarea placeholder={"Report here ..."}/>
            <div className="local-map-report-icons">
              <div>
                <Icon className="local-map-report-icon">mic</Icon>
                <Icon className="local-map-report-icon">photo_camera</Icon>
              </div>
            </div>
          </div>
        </div>
        <div className="operator-container-button white" onClick={() => this.props.onClose()}>Send Report</div>
      </div>
    )
  }

  private searchError = () => {
    this.setState({ search: true })
    axios.get(`http://192.168.5.1:8080/v1/do_measurement?app=dogs&name=operator1`)
      .then(res => {
        console.log('res', res)
      })
      .catch((error) => {
        console.log(error)
      });
    this.setNextGrid()
    setTimeout(() => this.setState({ search: false }), 13000)
  }

  private createGrid = () => {
    const grid = []
    const { gridData } = this.state

    for (let i = 0; i < 3; i++) {
      for (let x = 0; x < 4; x++) {
        grid.push(<div className={`local-map-grid ${i === 1 && (x === 1 || x === 3) ?
          'orange' : i === 1 && x === 2 ? 'red' : (x > 0 && (i === 0 || i === 2)) ? 'orange' : 'yellow'}
         ${gridData.some((el: any) => el.x === x && el.y === i && el.active) ? 'active' : ''}`}
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
