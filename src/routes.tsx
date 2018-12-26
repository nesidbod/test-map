import * as React from 'react'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import MapContainer from './components/map/MapContainer'

const routes = [
  {
    component: MapContainer,
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
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} history={history} />
          ))}
      </div>
    </ConnectedRouter>
  )
}
