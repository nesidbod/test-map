import * as React from 'react'
import { GoogleMap, withGoogleMap, OverlayView } from "react-google-maps"

interface IMapProps {
  position: any
  isOpen: boolean
  onOpen(value: boolean): any
  indicationsData: any[]
  showDetails(id: string,value :boolean): any
}

const GoogleMapView = withGoogleMap((props: IMapProps) =>
  <GoogleMap
    defaultZoom={16}
    defaultOptions={{
      streetViewControl: false,
      scaleControl: false,
      mapTypeControl: false,
      panControl: false,
      zoomControl: true,
      rotateControl: false,
      fullscreenControl: false
    }}
    onClick={(event: any) => console.log(props.indicationsData)}
    defaultCenter={props.position}
    center={props.position}
  >


    {props.indicationsData.map((el: any, index: number) => {
      return <OverlayView
        position={{ lat: el.lat, lng: el.lng }}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        key={index}
      >
        <div className={`map-dot ${el.type}`} onClick={() => props.showDetails(el.id,true)}>
          <div className={`map-dot-time`} style={{ color: '#d81717' }}>{el.time && el.time}</div>
          {el.mess ? el.open && <div className="map-dot-mess">
          <span className="map-dot-mess-close" onClick={(event:any) => (event.stopPropagation(), props.showDetails(el.id,false))}> x</span>
           {el.mess} 
           </div> : ''}
        </div>
      </OverlayView>
    })}
  </GoogleMap>
)

export default GoogleMapView