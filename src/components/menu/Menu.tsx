import {
  AppBar,
  Avatar,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
} from '@material-ui/core'
import { withStyles, WithStyles } from '@material-ui/core/styles'
// import AccountCircle from '@material-ui/icons/AccountCircle'
import * as React from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import '../../styles/menu/Menu.css'

const decorate = withStyles(({ transitions, zIndex }) => ({
  root: {},
  appBar: {
    transition: transitions.create(['width', 'margin'], {
      duration: transitions.duration.leavingScreen,
      easing: transitions.easing.sharp
    }),
    zIndex: zIndex.drawer + 1
  },
  hide: {
    display: 'none'
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  profile: {
    marginRight: 12
  },
  title: {
    flex: 1,
    cursor: 'pointer'
  }
}))

interface IMainAppBarProps {
  history: any
  user: any
}

export default decorate(
  class MainAppBar extends React.Component<
    IMainAppBarProps &
    WithStyles<
    'root' | 'appBar' | 'hide' | 'menuButton' | 'profile' | 'title'
    >
    > {
    public state = {
      anchorEl: undefined,
      anchorEl2: undefined,
      showBar: this.getShowingValue(this.props.history.location.pathname),
      activePage: this.props.history.location.pathname.split('/').slice(1)[0]
    }

    public componentDidUpdate() {
      this.isShowingBar()
    }

    public handleMenu = (event: any) => {
      this.setState({ anchorEl: event.currentTarget })
    }
    public handleMenu2 = (event: any) => {
      this.setState({ anchorEl2: event.currentTarget })
    }

    public handleClose = () => {
      this.setState({ anchorEl: undefined })
    }

    public handleClose2 = () => {
      this.setState({ anchorEl2: undefined })
    }

    public handleLogout = () => {
    }

    public render() {
      // const { classes} = this.props
      const { anchorEl2, activePage } = this.state
      // const open = Boolean(anchorEl)

      // const profilePic = (
      //   <div className={`${classes.profile} top-appBar-account`}>
      //     <IconButton
      //       aria-owns={open ? 'menu-appbar' : undefined}
      //       aria-haspopup="true"
      //       onClick={this.handleMenu}
      //       color="inherit"
      //     >
      //           <AccountCircle />
      //     </IconButton>
      //     <Menu
      //       id="menu-appbar"
      //       anchorEl={anchorEl}
      //       anchorOrigin={{
      //         horizontal: 'right',
      //         vertical: 'top'
      //       }}
      //       transformOrigin={{
      //         horizontal: 'right',
      //         vertical: 'top'
      //       }}
      //       open={open}
      //       onClose={this.handleClose}
      //     >
      //       <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
      //     </Menu>
      //   </div>
      // )

      return (
          <AppBar
            position="static"
            className={`top-appBar ${activePage === 'invite' ? '' : 'main'}`}
          >
            <Toolbar variant="dense">
              <IconButton color="inherit" aria-label="Menu" onClick={this.handleMenu2}
              >
                <MenuIcon/>
              </IconButton>
              <Menu
                id="burger-menu"
                anchorEl={anchorEl2}
                open={Boolean(anchorEl2)}
                onClose={this.handleClose2}
                disableAutoFocusItem={true}
                classes={{ paper: 'burger-menu-paper' }}
              >

                <div className="burger-menu-user">
                   <Avatar
                    alt="user profile"
                    src={''}
                    className={'user-profile-img'}
                    
                  /> 
                  <ListItemText
                    className="playlist-content-title"
                    primary={this.props.user.name || "test"}
                    secondary={this.props.user.email || "test@test.com"}
                  />
                </div>
                <MenuItem onClick={() => {
                  this.props.history.push('map')
                  this.setState({ anchorEl2: undefined })
                }} className={`burger-menu-item ${activePage === 'map' ? 'active' : ''}`}> <span>VOC Watch Map</span></MenuItem>
                <MenuItem onClick={() => {
                  this.props.history.push('graph')
                  this.setState({ anchorEl2: undefined })
                }} className={`burger-menu-item ${activePage === 'graph' ? 'active' : ''}`}><span>VOC Watch Statistics</span></MenuItem>
                <MenuItem onClick={() => {
                  this.props.history.push('/')
                  this.setState({ anchorEl2: undefined })
                }} className={`burger-menu-item ${activePage === '' ? 'active' : ''}`}><span> Leak Detect</span></MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
      )
    }

    private isShowingBar() {
      const { history } = this.props

      history.listen((data: any) => {
        const { pathname = '' } = data
        this.setState({ showBar: this.getShowingValue(pathname) })
        this.setState({ activePage: pathname.split('/').slice(1)[0] })

      })
    }

    private getShowingValue(pathName: string) {
      const pathLevels = pathName.split('/').slice(1)
      switch (true) {
        case pathLevels[0] === 'graph': {
          return false
        }
        case pathLevels[0] === 'login': {
          return false
        }
        case pathLevels[0] === 'login-invite': {
          return false
        }
        case pathLevels[0] === 'signup': {
          return false
        }
        case !!(pathLevels[0] === 'events' && pathLevels[1]): {
          return false
        }
        default:
          return true
      }
    }
  }
)
