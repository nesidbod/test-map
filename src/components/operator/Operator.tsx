// import { Button, Fab } from '@material-ui/core'
import { Icon } from '@material-ui/core';
import { IconButton, Snackbar, SnackbarContent, } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import * as React from 'react'
import LocalMap from '../../sComponents/localMap/LocalMap'
import errorIcon from '../../styles/img/error.png'
import mapIcon from '../../styles/img/map.png'
import '../../styles/operator/Operator.css'

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
        { id: 1, type: 'Benzene', 
        location: 'G5', voc: 'benzene, hight concetration', 
        Area: 'near oil tanks', detected: '11:00',
         responder: 'Moshe', 
         direction: 'nw', speed: '10km/hr' },
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

        {this.state.accept ? <LocalMap onClose={() => this.setState({ accept: false,showSnack: true })} /> : ''}
        {!this.state.accept ? <div className="operator-container-button" onClick={() => this.setState({ accept: true, open: false })}>Accept</div> : ''}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          open={this.state.showSnack}
          autoHideDuration={3000}
          onClick={() => this.setState({ showSnack: false })}
          onClose={() => this.setState({ showSnack: false })}
          aria-describedby="client-snackbar"
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
        >
          <SnackbarContent
            className={'snackbar'}
            aria-describedby="client-snackbar"
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={''}
                onClick={() => this.setState({ showSnack: false })}
              >
                <CloseIcon />
              </IconButton>,
            ]}
            message={<div id="message-id">
              <CheckCircleIcon /> <span>Report filed</span></div>} />
        </Snackbar>
      </div>
    )
  }

  private openDetails = (id: string) => {
    const { open } = this.state

    this.setState({ open: open === id ? '' : id })
  }
}
export default Operator
