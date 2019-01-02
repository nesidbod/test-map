import CssBaseline from '@material-ui/core/CssBaseline'
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { create } from 'jss'
import * as React from 'react'
import { CookiesProvider } from 'react-cookie'
import JssProvider from 'react-jss/lib/JssProvider'
import { Provider } from 'react-redux'
import { Routes } from './routes'
import { createMuiTheme } from '@material-ui/core/styles'
import {white} from '@material-ui/core/colors'
const generateClassName = createGenerateClassName()
const jss = create(jssPreset())

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    secondary: white,
  },
})
// We define a custom insertion point that JSS will look for injecting the styles in the DOM.
jss.options.insertionPoint = document.getElementById('jss-insertion-point')

class App extends React.Component {
  render() {
    return (
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <React.Fragment>
          <CssBaseline />
          <MuiThemeProvider theme={theme}> 
            <Provider store={this.props.store}>
              <CookiesProvider>
                  <Routes history={this.props.history} />
              </CookiesProvider>
            </Provider>
          </MuiThemeProvider>
        </React.Fragment>
      </JssProvider>
    )
  }
}

export default App
