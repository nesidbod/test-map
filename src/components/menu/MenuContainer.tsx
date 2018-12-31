import { connect } from 'react-redux'
import IRootState from '../../models/rootState'
import Menu from './Menu'

const mapStateToProps = (state: IRootState) => ({

})

const mapDispatchToProps = {

}

const MenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)

export default MenuContainer
