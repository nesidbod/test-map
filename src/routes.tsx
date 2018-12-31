import * as React from 'react'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import MapContainer from './components/map/MapContainer'
import GraphContainer from './components/graph/GraphContainer'
import OperatorContainer from './components/operator/OperatorContainer'
import MenuContainer from './components/menu/MenuContainer'

const routes = [
  {
    component: MapContainer,
    path: '/map',
    exact: true
  },
  {
    component: GraphContainer,
    path: '/graph',
    exact: true
  },
  {
    component: OperatorContainer,
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
