import React from 'react'
import {
  Card, CardActions, CardContent, CardHeader, IconButton
} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite';

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
interface IWrapProps {

}
interface IWrapState {
  posts: IPost[],
  favorites: string[]
}
interface IPostProps {
  post: IPost,
  favorite: boolean
}
interface IPostState {
  fav: boolean
}

export default class Wrapper extends React.Component<IWrapProps, IWrapState> {
  constructor(props: IWrapProps) {
    super(props);
    this.state = {
      posts: [],
      /**
       * this ignore is here since inline condition already checks for null
       */
      // @ts-ignore
      favorites: localStorage.getItem('favs') ? JSON.parse(localStorage.getItem('favs')) : []
    };
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
      <div>
        <h1>Posts from GitHub</h1>
        {this.state.posts.map((entry: IPost) => (
          <Post key={entry.id} post={entry} favorite={this.state.favorites.indexOf(entry.id) !== -1}/>
        ))}
      </div>
    )
  }
}

class Post extends React.Component<IPostProps, IPostState> {
  constructor(props: IPostProps) {
    super(props);
    this.state = {
      fav: props.favorite
    };
    this.favoriteAction = this.favoriteAction.bind(this);
  };

  card = {
    margin: '1rem',
  }
  favorite = {
    display: 'flex',
    justifyContent: 'flex-end'
  }

  // util functions

  trimContent(str: string): string {
    let start = str.indexOf('<p>');
    let end = str.indexOf('</p>');
    if (str.slice(start+3,end).indexOf('<')!==-1) {
      return this.trimContent(str.slice(end+3))
    } else return str.slice(start+3,end)
  }

  removeIndex(arr: string[], i: number) {
    delete arr[i];
    arr = arr.filter((element: string | undefined) => {
      return element !== undefined
    });
    return arr;
  }

  // bound functions

  favoriteAction() {
    let favs = [];
    let storage = localStorage.getItem('favs');
    if (storage) favs = JSON.parse(storage);

    if (!this.state.fav) { // add to favs
      favs.push(this.props.post.id);
    } else { // remove from favs
      favs = this.removeIndex(favs, favs.indexOf(this.props.post.id))
    }

    if (favs[0])
      localStorage.setItem('favs',JSON.stringify(favs));
    else
      localStorage.removeItem('favs');

    this.setState({
      fav: !this.state.fav
    })
  }

  render() {
    return (
      <Card style={this.card} variant="outlined">
        <CardHeader title={this.props.post.title}/>
        <CardContent>
          {this.trimContent(this.props.post.description)}
        </CardContent>
        <CardActions style={this.favorite}>
          <IconButton aria-label="add to favorites" onClick={this.favoriteAction}>
            <FavoriteIcon color={this.state.fav ? 'secondary' : 'action'}/>
          </IconButton>
        </CardActions>
      </Card>
    )
  }
}
