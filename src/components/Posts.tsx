import React from 'react'

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core'

interface IPost {
  id: string,
  type: string,
  url: string,
  created_at: string, // can be turned to date
  company: string,
  company_url: string,
  location: string,
  title: string,
  description: string, // can be used as elements
  how_to_apply: string, // can be used as elements
  company_logo: any
}
interface IProps {

}
interface IState {
  posts: IPost[]
}

export default class Wrapper extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      posts: []
    } as IState;
  }

  componentDidMount() {
    fetch('https://cors-anywhere.herokuapp.com/jobs.github.com/positions.json', {headers: {origin: 'http://localhost:3000'}})
      .then(res => res.json())
      .then(res => {
        this.setState({
          posts: res
        })
      })
  }

  render() {
    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>type</TableCell>
              <TableCell>url</TableCell>
              <TableCell>buttons</TableCell>
              <TableCell>status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              this.state.posts.map((entry: IPost) => (
              // <UserTableRow user={entry} key={entry.id}/>
              <div key={entry.id}>{entry.title}</div>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}

class Post extends React.Component {
  constructor(props: any) {
    super(props);
  }
}
