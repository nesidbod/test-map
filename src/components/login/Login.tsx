// import { Button, Fab } from '@material-ui/core'
import { Avatar, List, ListItem, ListItemText } from '@material-ui/core'
import ImageIcon from '@material-ui/icons/Image';
import * as React from 'react'
import IAction from 'src/models/IAction';
import '../../styles/login/Login.css'

interface ISettingsProps {
  history: any
  login(email: string, name: string): IAction
}

class Login extends React.Component<ISettingsProps, any> {
  constructor(props: ISettingsProps) {
    super(props)
    this.state = {
      open: '',
      accept: false,
      users: [
        {
          name: 'Igal Verbel', email: 'igalverbel@cleanrefinery.com'
        }
      ]
    }
  }

  public render() {

    return (
      <div className="login-container">
        <div className="login-select"> Select user:</div>
        <List className={"login-list"}>
          {this.state.users.map((el: any, index: number) => {
            return <ListItem key={index}
              button={true}
              selected={this.state.selectedIndex === 0}
              onClick={() => this.selectUser(0, el.email, el.name)}
            >
              <Avatar>
                <ImageIcon />
              </Avatar>
              <ListItemText primary={el.name} secondary={el.email} />
            </ListItem>
          })}
        </List>
      </div>
    )
  }

  private selectUser = (index: number, email: string, name: string) => {
    this.props.login(email, name)
    this.setState({ selectedIndex: index })
  }


}
export default Login
