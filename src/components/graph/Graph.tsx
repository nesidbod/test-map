// import { Button, Fab } from '@material-ui/core'
import * as React from 'react'
import '../../styles/graph/Graph.css'
import { Bar } from 'react-chartjs-2';
const initialState = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: '#2B1AA6',
      borderColor: '#6550FF',
      borderWidth: 1,
      hoverBackgroundColor: '#6550FF',
      hoverBorderColor: '#6550FF',
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

interface ISettingsProps {
  history: any
}

class Graph extends React.Component<ISettingsProps, any> {
  constructor(props: ISettingsProps) {
    super(props)
    this.state = {
    }
  }

  public render() {

    return (
      <div className="graph-container">
        <div className="graph">
          <Bar data={initialState} />
        </div>
      </div>
    )
  }

}
export default Graph
