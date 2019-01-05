import { connect } from 'react-redux'
import IRootState from '../../models/rootState'
import Map from './Map'

const mapStateToProps = (state: IRootState) => ({
})

const mapDispatchToProps = {

}

const MapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)

export default MapContainer
