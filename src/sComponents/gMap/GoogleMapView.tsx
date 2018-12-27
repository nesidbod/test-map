import * as React from 'react'
import { GoogleMap, withGoogleMap, OverlayView } from "react-google-maps"
import green from '../../styles/img/green white.png'
import orange from '../../styles/img/orange.png'
import red from '../../styles/img/red white.png'


// var strictBounds = new google.maps.LatLngBounds(
//   new google.maps.LatLng(32.79681422306506, 35.045930479711615),
//   new google.maps.LatLng(32.79248517796432, 35.07519874448212)
// );

interface IMapProps {
  position: any
  isOpen: boolean
  onOpen(value: boolean): any
  setHideCenter(value: any): any
  indicationsData: any[]
  showDetails(id: string, value: boolean): any
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
      fullscreenControl: false,
    }}
    onClick={(event) => {
      console.log(event.latLng.lat(), event.latLng.lng())
    }}
    // ref={map => { 
    //   if (map) {
    //   if (strictBounds.contains(map.getCenter())) return;

    //   // We're out of bounds - Move the map back within the bounds
    
    //   var c = map.getCenter(),
    //       x = c.lng(),
    //       y = c.lat(),
    //       maxX = strictBounds.getNorthEast().lng(),
    //       maxY = strictBounds.getNorthEast().lat(),
    //       minX = strictBounds.getSouthWest().lng(),
    //       minY = strictBounds.getSouthWest().lat();
    
    //   if (x < minX) x = minX;
    //   if (x > maxX) x = maxX;
    //   if (y < minY) y = minY;
    //   if (y > maxY) y = maxY;
    
    //   props.setHideCenter(new google.maps.LatLng(y, x));
    //   }
    // }}
    mapTypeId={'satellite'}
    defaultCenter={props.position}
    center={props.position}
  >

    {props.indicationsData.map((el: any, index: number) => {
      return <OverlayView
        position={{ lat: el.lat, lng: el.lng }}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        key={index}
      >
        <div className={`map-dot ${el.type}`} onClick={() => props.showDetails(el.id, true)}>
          <img src={el.type === 'green' ? green :
            el.type === 'orange' ? orange :
              el.type === 'red' ? red : ''
          } />
          <div className={`map-dot-time`} style={{ color: '#d81717' }}>{el.time && el.time}</div>
          {el.mess ? el.open && <div className="map-dot-mess">
            <span className="map-dot-mess-close" onClick={(event: any) => (event.stopPropagation(), props.showDetails(el.id, false))}> x</span>
            {el.mess}
          </div> : ''}
        </div>
      </OverlayView>
    })}
  </GoogleMap>
)


export default GoogleMapView