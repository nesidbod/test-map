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
      testData: [
        { id: 1, type: 'Benzene', location: 'G5', voc: 'benzene, hight concetration', Area: 'near oil tanks', detected: '', responder: 'Moshe', direction: 'nw', speed: '10km/hr' },
        // { id: 2,type: 'Gaz', location: 'G1', voc: 'gaz, hight concetration', Area: 'near gaz tanks', detected: '', responder: 'Moshe', direction: 'nw', speed: '13km/hr' },

      ]
    }
  }

  public render() {

    return (
      <div className="local-map-container">

        <div className="local-map">
          <img src={local_back} />
          {this.createGrid().map((el: any) => el)}
        </div>

        <div className="operator-container-button icon"><img src={senser} /><span>Measure</span></div>
        <div className="local-map-report-container">
          <div className="local-map-report">
            <textarea />
          </div>
          <div className="operator-container-button white">Send Report</div>

        
        </div> 

      </div>
    )
  }

  private createGrid = () => {
    const grid = []
    const gridData = []

    for (let i = 0; i < 3; i++) {
      for (let x = 0; x < 4; x++) {
        gridData.push({ y: i, x })
        grid.push(<div className={`local-map-grid`} key={i + ' ' + x} />)
      }
    }

    return grid
  }
}
export default LocalMap
