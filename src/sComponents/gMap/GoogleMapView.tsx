import * as React from 'react'
import { GoogleMap, OverlayView, Polyline, withGoogleMap } from "react-google-maps"
import green from '../../styles/img/green white.png'
import orange from '../../styles/img/orange.png'
import red from '../../styles/img/red white.png'

const strictBounds = new google.maps.LatLngBounds(

  new google.maps.LatLng(32.782746714452266, 35.049999581842826),
  new google.maps.LatLng(32.80092927862214, 35.071972238092826),
);

const grid = [
  { coord: [{ lat: 32.797123796856795, lng: 35.050316608854246 }, { lat: 32.786435630590866, lng: 35.063192603828156 }] },
  { coord: [{ lat: 32.798956684094144, lng: 35.05046598641411 }, { lat: 32.787339054114504, lng: 35.06451701522633 }] },
  { coord: [{ lat: 32.79972324539429, lng: 35.051624700708544 }, { lat: 32.788233151454484, lng: 35.0657009336187 }] },
  { coord: [{ lat: 32.80038158100007, lng: 35.052375719232714 }, { lat: 32.788846474978605, lng: 35.06638757912651 }] },
  { coord: [{ lat: 32.80102921090588, lng: 35.05335772307751 }, { lat: 32.78952105826433, lng: 35.067049688775114 }] },
  { coord: [{ lat: 32.80156555468347, lng: 35.05430073745083 }, { lat: 32.79031701833976, lng: 35.067771010020124 }] },

  { coord: [{ lat: 32.80159903811219, lng: 35.05842678277031 }, { lat: 32.79469087520042, lng: 35.050101205988085 }] },
  { coord: [{ lat: 32.79332284136129, lng: 35.05086379264594 }, { lat: 32.800663986841236, lng: 35.059511234509955 }] },
  { coord: [{ lat: 32.7923062486163, lng: 35.0518568683608 }, { lat: 32.79950318451458, lng: 35.06061159858541 }] },
  { coord: [{ lat: 32.79124561166362, lng: 35.05322329728142 }, { lat: 32.79858080645209, lng: 35.06195105400468 }] },
  { coord: [{ lat: 32.790199379562885, lng: 35.05445711342827 }, { lat: 32.79782488378683, lng: 35.063094620115294 }] },
  { coord: [{ lat: 32.78783629280292, lng: 35.05672089783684 }, { lat: 32.796049186403984, lng: 35.06635737918407 }] },
  { coord: [{ lat: 32.789459794273476, lng: 35.05495063988701 }, { lat: 32.79728826312394, lng: 35.064134523554 }] },
  { coord: [{ lat: 32.796364756581234, lng: 35.04928366896047 }, { lat: 32.80272323509375, lng: 35.05670328887891 }] },

]

let mapSet: any = {}
interface IMapProps {
  position: any
  isOpen: boolean
  indicationsData: any[]
  onOpen(value: boolean): any
  setHideCenter(value: any): any
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

    onClick={(el) => console.log(el.latLng.lat(), el.latLng.lng())}
    onDrag={() => {
      if (!strictBounds.contains(mapSet.getCenter())) {
        mapSet.panToBounds(strictBounds, 20)
      }
    }}
    ref={map => {
      if (map) {
        mapSet = map;
      }
    }}
    mapTypeId={'satellite'}
    defaultCenter={props.position}
    center={props.position}
  >
    {grid.map((el: any, index: number) => {
      return <Polyline key={index}
        options={{
          path: el.coord,
          strokeColor: '#0da20d',
          strokeOpacity: 1,
          strokeWeight: 2,
          icons: [{
            offset: '0',
            repeat: '10px'
          }],
        }}
      />
    })}

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
          {el.time ? <div className={`map-dot-time`} style={{ color: '#d81717' }}>{el.time}</div> : ''}
          {el.mess ? el.open && <div className="map-dot-mess">
            <span className="map-dot-mess-close"
              onClick={(event: any) => (event.stopPropagation(), props.showDetails(el.id, false))}> x</span>
            {el.mess}
          </div> : ''}
        </div>
      </OverlayView>
    })}
  </GoogleMap>
)


export default GoogleMapView