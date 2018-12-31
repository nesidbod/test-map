import { Button, Fab } from '@material-ui/core'
import * as React from 'react'
import GoogleMapView from '../../sComponents/gMap/GoogleMapView'
import '../../styles/map/Maps.css'
// import map from '../../styles/img/map.jpg'
interface ISettingsProps {
  history: any
}

class Map extends React.Component<ISettingsProps, any> {
  constructor(props: ISettingsProps) {
    super(props)
    this.state = {
      openPopup: false,
      center: { lat: 32.79572308736829, lng: 35.05576364815124 },
      sizeMap: 100,
      lastX: 0,
      newX: 0,
      lastY: 0,
      newY: 0,
      mouseDown: false,
      activeCenter: { type: '', index: 0 },
      indications: [
        { color: 'yellow', value: 0, id: 1 },
        { color: 'orange', value: 4, id: 2 },
        { color: 'red', value: 1, id: 3 }],

      indicationsData: [
        { lat: 32.78800244000398, lng:  35.05891807758121, type: 'green', id: 0 },
        { lat:32.79929643743554, lng: 35.0545709406465, type: 'orange', time: '14:30', mess: 'orange error', open: false, id: 1 },
        { lat: 32.79817207921318, lng: 35.06037943093315, type: 'orange', time: '11:30', mess: 'orange error', open: false, id: 2 },
        { lat: 32.7934131259387, lng: 35.069190619830124, type: 'red', time: '13:30', mess: 'red error', open: false, id: 3 },
        { lat:32.79537630438263, lng: 35.05928508965508, type: 'green', id: 4 },
        { lat: 32.789838607019284, lng:35.05716078011528, type: 'orange', time: '12:30', mess: 'orange error', open: false, id: 5 },
        { lat: 32.797216114483895, lng: 35.06151668755547, type: 'orange', time: '10:30', mess: 'orange error', open: false, id: 6 },
        { lat: 32.79483455650888, lng: 35.056410117685346, type: 'green', id: 7 },
        { lat: 32.79586030509149, lng: 35.063855573816454, type: 'green', id: 8 },
        { lat:  32.79402347855168, lng: 35.06241790978447, type: 'green', id: 9 },
        { lat: 32.79446675401682, lng: 35.06022037517823, type: 'green', id: 10 },
        { lat:32.79230936413287, lng: 35.05961828488694, type: 'green', id: 11 }, 
        { lat: 32.791065227696734, lng: 35.05902759758965, type: 'green', id: 12 },
        { lat: 32.798330086211436, lng: 35.05561264298581, type: 'green', id: 13 },
        { lat: 32.79355449412625, lng: 35.05218260018364, type: 'green', id: 14 },
        { lat: 32.79806385730691, lng: 35.05265466897026, type: 'green', id: 15 },
        { lat: 32.795863316643505, lng:35.05519740311638, type: 'green', id: 16 }, 
        { lat: 32.796855322000425, lng: 35.054023872278776, type: 'green', id: 17 },
        { lat: 32.7973063002748, lng: 35.05695693223015, type: 'green', id: 18 },
        { lat: 32.79628719551429, lng: 35.058072731180346, type: 'green', id: 19 },
      ],
      testData: [
        {
          data: '14/12/2018', indications: [
            { type: 'green', id: 0 },
            {  type: 'green', id: 1 },
            {  type: 'green', id: 2 },
            {  type: 'green', id: 3 },
            {  type: 'green', id: 4 },
            { type: 'green', id: 5 },
            {  type: 'green', id: 6 },
            {  type: 'green', id: 7 },
            { type: 'green', id: 8 },
            {  type: 'green', id: 9 },
            {  type: 'green', id: 10 },
            {  type: 'green', id: 11 },
            {  type: 'green', id: 12 },
            {  type: 'green', id: 13 },
            {  type: 'green', id: 14 },
            {  type: 'green', id: 15 },
            {  type: 'green', id: 16 },
            {  type: 'green', id: 17 },
            {  type: 'green', id: 18 },
            {  type: 'green', id: 19 },
          ]
        },
        {
          data: '15/12/2018', indications: [
            {  type: 'green', id: 0 },
            {  type: 'orange', id: 1 },
            {  type: 'green', id: 2 },
            {  type: 'green', id: 3 },
            {  type: 'green', id: 4 },
            {  type: 'yellow', id: 5 },
            {  type: 'green', id: 6 },
            {  type: 'green', id: 7 },
            {  type: 'green', id: 8 },
            {  type: 'green', id: 9 },
            {  type: 'green', id: 10 },
            {  type: 'green', id: 11 },
            {  type: 'green', id: 12 },
            {  type: 'green', id: 13 },
            {  type: 'green', id: 14 },
            {  type: 'green', id: 15 },
            {  type: 'green', id: 16 },
            {  type: 'yellow', id: 17 },
            {  type: 'green', id: 18 },
            {  type: 'green', id: 19 },
          ]
        },
        {
          data: '16/12/2018', indications: [
            {  type: 'green', id: 0 },
            {  type: 'green', id: 1 },
            {  type: 'green', id: 2 },
            {  type: 'green', id: 3 },
            {  type: 'yellow', id: 4 },
            {  type: 'green', id: 5 },
            {  type: 'green', id: 6 },
            {  type: 'green', id: 7 },
            {  type: 'green', id: 8 },
            {  type: 'yellow', id: 9 },
            {  type: 'green', id: 10 },
            {  type: 'green', id: 11 },
            {  type: 'green', id: 12 },
            {  type: 'green', id: 13 },
            {  type: 'green', id: 14 },
            {  type: 'yellow', id: 15 },
            {  type: 'green', id: 16 },
            {  type: 'green', id: 17 },
            {  type: 'yellow', id: 18 },
            {  type: 'green', id: 19 },
          ]
        },
        {
          data: '18/12/2018', indications: [
            {  type: 'orange', id: 0 },
            {  type: 'green', id: 1 },
            {  type: 'green', id: 2 },
            {  type: 'green', id: 3 },
            {  type: 'green', id: 4 },
            {  type: 'green', id: 5 },
            {  type: 'orange', id: 6 },
            {  type: 'green', id: 7 },
            {  type: 'green', id: 8 },
            {  type: 'green', id: 9 },
            {  type: 'orange', id: 10 },
            {  type: 'orange', id: 11 },
            {  type: 'green', id: 12 },
            {  type: 'green', id: 13 },
            {  type: 'green', id: 14 },
            {  type: 'orange', id: 15 },
            {  type: 'green', id: 16 },
            {  type: 'green', id: 17 },
            {  type: 'yellow', id: 18 },
            {  type: 'green', id: 19 },
          ]
        },
        {
          data: '19/12/2018', indications: [
            {  type: 'green', id: 0 },
            {  type: 'yellow', id: 1 },
            {  type: 'green', id: 2 },
            {  type: 'green', id: 3 },
            {  type: 'yellow', id: 4 },
            {  type: 'green', id: 5 },
            {  type: 'yellow', id: 6 },
            {  type: 'green', id: 7 },
            {  type: 'green', id: 8 },
            {  type: 'red', id: 9 },
            {  type: 'green', id: 10 },
            {  type: 'green', id: 11 },
            {  type: 'red', id: 12 },
            {  type: 'green', id: 13 },
            {  type: 'green', id: 14 },
            {  type: 'yellow', id: 15 },
            {  type: 'green', id: 16 },
            {  type: 'green', id: 17 },
            {  type: 'yellow', id: 18 },
            {  type: 'green', id: 19 },
          ]
        },
        {
          data: '20/12/2018', indications: [
            {  type: 'green', id: 0 },
            {  type: 'green', id: 1 },
            {  type: 'green', id: 2 },
            {  type: 'green', id: 3 },
            {  type: 'red', id: 4 },
            {  type: 'green', id: 5 },
            {  type: 'green', id: 6 },
            {  type: 'green', id: 7 },
            {  type: 'green', id: 8 },
            {  type: 'green', id: 9 },
            {  type: 'green', id: 10 },
            {  type: 'green', id: 11 },
            {  type: 'green', id: 12 },
            {  type: 'green', id: 13 },
            {  type: 'green', id: 14 },
            {  type: 'red', id: 15 },
            {  type: 'green', id: 16 },
            {  type: 'green', id: 17 },
            {  type: 'green', id: 18 },
            {  type: 'green', id: 19 },
          ]
        },
        {
          data: '21/12/2018', indications: [
            {  type: 'red', id: 0 },
            {  type: 'green', id: 1 },
            {  type: 'green', id: 2 },
            {  type: 'green', id: 3 },
            {  type: 'green', id: 4 },
            {  type: 'green', id: 5 },
            {  type: 'green', id: 6 },
            {  type: 'green', id: 7 },
            {  type: 'green', id: 8 },
            {  type: 'green', id: 9 },
            {  type: 'green', id: 10 },
            {  type: 'green', id: 11 },
            {  type: 'green', id: 12 },
            {  type: 'green', id: 13 },
            {  type: 'green', id: 14 },
            {  type: 'green', id: 15 },
            {  type: 'green', id: 16 },
            {  type: 'green', id: 17 },
            {  type: 'yellow', id: 18 },
            {  type: 'green', id: 19 },
          ]
        },

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
              return <Fab className={`map-header-item ${el.color}`} key={index} 
              onClick={() => this.setCenter(el.color)}>
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
    const saveData: any = {center: this.state.center, activeCenter: {index: 0}}
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
