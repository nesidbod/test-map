import { connect } from 'react-redux'
import IRootState from '../../models/rootState'
import {login} from '../../redux/actions/authActions'
import Login from './Login'

const mapStateToProps = (state: IRootState) => ({

})

const mapDispatchToProps = {
    login
}

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default LoginContainer
