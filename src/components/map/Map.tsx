import * as React from 'react'
import '../../styles/map/Maps.css'
import { Button, Fab } from '@material-ui/core'
import GoogleMapView from '../../sComponents/gMap/GoogleMapView'

interface ISettingsProps {
}

class Map extends React.Component<ISettingsProps, any> {
  constructor(props: ISettingsProps) {
    super(props)

    this.state = {
      openPopup: false,
      center: { lat: 32.793587, lng: 35.052716 },
      activeCenter: { type: '', index: 0 },
      indications: [
        { color: 'yellow', value: 3, id: 1 },
        { color: 'orange', value: 1, id: 2 },
        { color: 'red', value: 2, id: 3 }],
      indicationsData: [
        { lat: 32.79586030509149, lng: 35.05520652773009, type: 'green', id: 9 },
        { lat: 32.79456159975777, lng: 35.05681585313903, type: 'yellow', time: '11:30', mess: 'yellow error', open: false, id: 1 },
        { lat: 32.798024771830185, lng: 35.0554425621234, type: 'yellow', time: '11:20', mess: 'yellow error', open: false, id: 2 },
        { lat: 32.793966353474204, lng: 35.061150302907095, type: 'red', time: '13:30', mess: 'red error', open: false, id: 3 },
        { lat: 32.79890858059838, lng: 35.05906890871154, type: 'red', time: '11:00', mess: 'red error', open: false, id: 4 },
        { lat: 32.79892661742052, lng: 35.054391136189565, type: 'orange', time: '14:30', mess: 'orange error', open: false, id: 5 },
        { lat: 32.796670561366994, lng: 35.051813672834896, type: 'yellow', time: '11:30', mess: 'yellow error', open: false, id: 6 },
        { lat: 32.79154782686155, lng: 35.0557404268327, type: 'green', id: 7 }
      ]
    }
  }

  public render() {
    const { indications, openPopup } = this.state

    return (
      <div className="map-container">
        <div className="map">
          <div className="map-header">
            {indications.map((el: any, index: number) => {
              return <Fab className={`map-header-item ${el.color}`} key={index} onClick={() => this.setCenter(el.color)}>
                {el.value}
              </Fab>
            })}
          </div>
          <div className="map-content">
            <GoogleMapView
              containerElement={<div style={{
                height: '500px',
                width: '860px'
              }} />}
              mapElement={<div style={{ height: `100%` }} />}
              position={this.state.center}
              isOpen={openPopup}
              onOpen={(val: boolean) => this.setState({ openPopup: val })}
              indicationsData={this.state.indicationsData}
              showDetails={(id: string, value: boolean) => this.showDetails(id, value)}
              setHideCenter={this.setHideCenter}
            />
          </div>
          <div className="map-share">
            <Button variant="contained" >
              Share map
          </Button>
          </div>
        </div>
      </div>
    )
  }

  private showDetails = (id: string, value: boolean) => {
    const indicationsData = this.state.indicationsData.map((el: any) => {
      if (el.id === id) {
        el.open = value
      }
      return el
    })
    this.setState({ indicationsData })
  }

  private setHideCenter = (value:any) => {
    this.setState({ center: value })

  }

  private setCenter = (type: string) => {
    const { activeCenter, indicationsData } = this.state
    const count = activeCenter.index === indicationsData.lenght ? 0 : activeCenter.index
    let saveData: any = {}
    let trig = false

    if (activeCenter.type === type) {
      indicationsData.forEach((el: any, index: number) => {
        if (index > count && el.type === type && !trig) {
          trig = true
          saveData.center = { lat: el.lat, lng: el.lng }
          saveData.activeCenter = { type, index }
        }
      })
    } else {
      indicationsData.forEach((el: any, index: number) => {
        if (el.type === type && !trig) {
          trig = true
          saveData.center = { lat: el.lat, lng: el.lng }
          saveData.activeCenter = { type, index }
        }
      })
    }

    if (!!!Object.keys(saveData).length) {
      indicationsData.filter((el: any, index: number) => {
        if (el.type === type && !trig) {
          trig = true
          saveData.center = { lat: el.lat, lng: el.lng }
          saveData.activeCenter = { type, index }
        }
      })
    }
    this.setState({ center: saveData.center, activeCenter: saveData.activeCenter })

  }

}
export default Map
