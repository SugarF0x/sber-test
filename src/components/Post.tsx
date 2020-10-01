import FavoriteIcon from "@material-ui/icons/Favorite";
import React        from "react";

import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
} from "@material-ui/core";

import { IPost } from "../store/types";

interface IPostProps {
  post: IPost,
  favorite: boolean
}
interface IPostState {
  fav: boolean
}

export default class Post extends React.Component<IPostProps, IPostState> {
  constructor(props: IPostProps) {
    super(props);
    this.state          = {
      fav: props.favorite,
    };
    this.favoriteAction = this.favoriteAction.bind(this);
  };

  card     = {
    margin: '1rem',
  };
  favorite = {
    display:        'flex',
    justifyContent: 'flex-end',
  };

  // util functions

  trimContent(str: string): string {
    let start = str.indexOf('<p>');
    let end   = str.indexOf('</p>');
    if (str.slice(start + 3, end).indexOf('<') !== -1) {
      return this.trimContent(str.slice(end + 3));
    } else return str.slice(start + 3, end);
  }

  removeIndex(arr: string[], i: number) {
    delete arr[i];
    arr = arr.filter((element: string | undefined) => {
      return element !== undefined;
    });
    return arr;
  }

  // bound functions

  favoriteAction() {
    let favs    = [];
    let storage = localStorage.getItem('favs');
    if (storage) favs = JSON.parse(storage);

    if (!this.state.fav) { // add to favs
      favs.push(this.props.post.id);
    } else { // remove from favs
      favs = this.removeIndex(favs, favs.indexOf(this.props.post.id));
    }

    if (favs[0])
      localStorage.setItem('favs', JSON.stringify(favs));
    else
      localStorage.removeItem('favs');

    this.setState({
      fav: !this.state.fav,
    });
  }

  render() {
    return (
      <Card style={ this.card } variant="outlined">
        <CardHeader title={ this.props.post.title }/>
        <CardContent>
          { this.trimContent(this.props.post.description) }
        </CardContent>
        <CardActions style={ this.favorite }>
          <IconButton aria-label="add to favorites" onClick={ this.favoriteAction }>
            <FavoriteIcon color={ this.state.fav
                                  ? 'secondary'
                                  : 'action' }/>
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}
