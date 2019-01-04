// import { Button, Fab } from '@material-ui/core'
import * as React from 'react'
import '../../styles/operator/Operator.css'
import errorIcon from '../../styles/img/error.png'
import mapIcon from '../../styles/img/map.png'
import { Icon } from '@material-ui/core';
import LocalMap from '../../sComponents/localMap/LocalMap'

interface ISettingsProps {
  history: any
}

class Operator extends React.Component<ISettingsProps, any> {
  constructor(props: ISettingsProps) {
    super(props)
    this.state = {
      open: '',
      accept: false,
      testData: [
        { id: 1, type: 'Benzene', location: 'G5', voc: 'benzene, hight concetration', Area: 'near oil tanks', detected: '11:00', responder: 'Moshe', direction: 'nw', speed: '10km/hr' },
        // { id: 2,type: 'Gaz', location: 'G1', voc: 'gaz, hight concetration', Area: 'near gaz tanks', detected: '', responder: 'Moshe', direction: 'nw', speed: '13km/hr' },

      ]
    }
  }

  public render() {

    return (
      <div className="operator-container">
        {this.state.testData.map((el: any, index: number) => {
          return <div className="operator-container-item" key={index} >
            <div className="operator-container-item-header">
              <div className="operator-container-item-header-label">
                <img src={errorIcon} /> <span>{el.type}</span>
              </div>
              <div className="operator-container-item-header-location">
                <img src={mapIcon} />
                <span onClick={() => this.setState({ accept: true, open: false })}>{el.location}</span>
              </div>
            </div>
            <div className="operator-container-item-details-buttom"
             onClick={() => this.openDetails(el.id)}> Details <Icon>expand_more</Icon> </div>

            {this.state.open === el.id ?
              <div className="operator-container-item-details">
                <div className="operator-container-item-details-item">
                  <div className="operator-container-item-details-item-label">VOC:</div>
                  <div className="operator-container-item-details-item-value">{el.voc}</div>
                </div>
                <div className="operator-container-item-details-item">
                  <div className="operator-container-item-details-item-label">Location:</div>
                  <div className="operator-container-item-details-item-value" ><span className="map" 
                  onClick={() => this.setState({ accept: true, open: false })}>{el.location}</span></div>
                </div>
                <div className="operator-container-item-details-item">
                  <div className="operator-container-item-details-item-label">Area:</div>
                  <div className="operator-container-item-details-item-value">{el.Area}</div>
                </div>
                <div className="operator-container-item-details-item">
                  <div className="operator-container-item-details-item-label">Time detected:</div>
                  <div className="operator-container-item-details-item-value">{el.detected}</div>
                </div>
                <div className="operator-container-item-details-item">
                  <div className="operator-container-item-details-item-label">First responder:</div>
                  <div className="operator-container-item-details-item-value">{el.responder}</div>
                </div>
                <div className="operator-container-item-details-item">
                  <div className="operator-container-item-details-item-label">Wind direction:</div>
                  <div className="operator-container-item-details-item-value">{el.direction}</div>
                </div>
                <div className="operator-container-item-details-item">
                  <div className="operator-container-item-details-item-label">Speed:</div>
                  <div className="operator-container-item-details-item-value">{el.speed}</div>
                </div>
              </div>
              :
              ''
            }

          </div>
        })}

        {this.state.accept ? <LocalMap /> : ''}
        {!this.state.accept ? <div className="operator-container-button" onClick={() =>this.setState({ accept: true, open: false })}>Accept</div> : ''}
      </div>
    )
  }

  private openDetails = (id: string) => {
    const { open } = this.state

    this.setState({ open: open === id ? '' : id })
  }
}
export default Operator
