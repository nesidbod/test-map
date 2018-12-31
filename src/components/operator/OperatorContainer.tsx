import { connect } from 'react-redux'
import IRootState from '../../models/rootState'
import Operator from './Operator'

const mapStateToProps = (state: IRootState) => ({

})

const mapDispatchToProps = {

}

const OperatorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Operator)

export default OperatorContainer
