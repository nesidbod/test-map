import * as React from 'react'
import { Route } from 'react-router'
import { ConnectedRouter,routerActions } from 'react-router-redux'
import MapContainer from './components/map/MapContainer'
import GraphContainer from './components/graph/GraphContainer'
import OperatorContainer from './components/operator/OperatorContainer'
import MenuContainer from './components/menu/MenuContainer'
import LoginContainer from './components/login/LoginContainer'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import IRootState from './models/rootState'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'

const locationHelper = locationHelperBuilder({})

const userIsAuthenticated = connectedRouterRedirect({
  authenticatedSelector: (state: IRootState) => state.auth.isAuthenticated,
  redirectAction: routerActions.replace,
  redirectPath: `/login`,
  wrapperDisplayName: 'UserIsAuthenticated'
}) as any

const userIsNotAuthenticated = connectedRouterRedirect({
  allowRedirectBack: false,
  authenticatedSelector: (state: IRootState) => !state.auth.isAuthenticated,
  redirectAction: routerActions.replace,
  redirectPath: (state: IRootState, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) ||`/`,
  wrapperDisplayName: 'UserIsAuthenticated'
}) as any

const routes = [
  {
    component: userIsAuthenticated(MapContainer),
    path: '/map',
    exact: true
  },
  {
    component: userIsAuthenticated(GraphContainer),
    path: '/graph',
    exact: true
  },
  {
    component: userIsNotAuthenticated(LoginContainer),
    path: '/login',
    exact: true
  },
  {
    component: userIsAuthenticated(OperatorContainer),
    path: '/',
    exact: true
  }
]

const renderSubRoutes = (route: any) => (props: any) => (
  <route.component {...props} routes={route.routes} />
)

export const RouteWithSubRoutes = (route: any) => (
  <Route
    path={route.path}
    exact={route.exact}
    render={renderSubRoutes(route)}
  />
)

interface IRoutesProps {
  history: any
}

export const Routes: React.SFC<IRoutesProps> = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
      <div className={`main-page-container`}>
      <MenuContainer history={history}/>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} history={history} />
          ))}
      </div>
    </ConnectedRouter>
  )
}
