import { connect } from 'react-redux'
import IRootState from '../../models/rootState'
import Graph from './Graph'

const mapStateToProps = (state: IRootState) => ({

})

const mapDispatchToProps = {

}

const GraphContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Graph)

export default GraphContainer
