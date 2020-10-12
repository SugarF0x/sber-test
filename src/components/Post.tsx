import FavoriteIcon from "@material-ui/icons/Favorite";
import React        from "react";

import { connect }     from "react-redux";
import { setFavorite } from "../store/actions";

import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
} from "@material-ui/core";

import { IPost } from "../store/types";

interface IPostProps {
  post: IPost;
  favorite: boolean;
  setFavorite: Function;
}

interface IPostState {
  fav: boolean;
}

export class Post extends React.Component<IPostProps, IPostState> {
  card           = {
    margin: '1rem',
  };
  favoriteButton = {
    display:        'flex',
    justifyContent: 'space-between',
  };

  // util functions

  trimContent = (str: string): string => {
    let start = str.indexOf('<p>');
    let end   = str.indexOf('</p>');
    if (str.slice(start + 3, end).indexOf('<') !== -1) {
      return this.trimContent(str.slice(end + 3));
    } else {
      return str.slice(start + 3, end);
    }
  }

  formatDate(str: string): string {
    let date = new Date(str);

    let day   = date.getDate().toString().length === 1 ? `0${ date.getDate() }` : date.getDate();
    let month = date.getMonth().toString().length === 1 ? `0${ date.getMonth()+1 }` : date.getMonth()+1;
    let year  = date.getFullYear();
    let hour  = date.getHours().toString().length === 1 ? `0${ date.getHours() }` : date.getHours();
    let mins  = date.getMinutes().toString().length === 1 ? `0${ date.getMinutes() }` : date.getMinutes();

    return `${ day }.${ month }.${ year } at ${ hour }:${ mins }`
  }

  favoriteAction = () => {
    this.props.setFavorite(this.props.post)
  }

  render() {
    return (
      <Card style={ this.card } variant="outlined">
        <CardHeader title={ this.props.post.title }/>
        <CardContent>
          { this.trimContent(this.props.post.description) }
        </CardContent>
        <CardActions style={ this.favoriteButton }>
          <span>{ this.formatDate(this.props.post.created_at) }</span>
          <IconButton aria-label="add to favorites" onClick={ this.favoriteAction }>
            <FavoriteIcon color={ this.props.favorite ? 'secondary' : 'action' }/>
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

const mapDispatchToProps = {
  setFavorite,
};

export default connect(null, mapDispatchToProps)(Post);
