/* eslint-disable react/destructuring-assignment */

import FavoriteIcon from '@material-ui/icons/Favorite';
import React from 'react';

import { connect } from 'react-redux';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
} from '@material-ui/core';
import { setFavorite } from '../store/actions';

import { IPost } from '../store/types';

interface IPostProps {
  post: IPost;
  favorite: boolean;
  setFavorite: Function;
}

interface IPostState {
  fav: boolean;
}

export class Post extends React.Component<IPostProps, IPostState> {
  card = {
    margin: '1rem',
  };

  favoriteButton = {
    display: 'flex',
    justifyContent: 'space-between',
  };

  // util functions

  trimContent = (str: string): string => {
    const start = str.indexOf('<p>');
    const end = str.indexOf('</p>');
    if (str.slice(start + 3, end).indexOf('<') !== -1) {
      return this.trimContent(str.slice(end + 3));
    }
    return str.slice(start + 3, end);
  };

  favoriteAction = () => {
    this.props.setFavorite(this.props.post);
  };

  formatDate = (str: string): string => {
    const date = new Date(str);

    const day = date.getDate().toString().length === 1 ? `0${date.getDate()}` : date.getDate();
    const month = date.getMonth().toString().length === 1 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours().toString().length === 1 ? `0${date.getHours()}` : date.getHours();
    const mins = date.getMinutes().toString().length === 1 ? `0${date.getMinutes()}` : date.getMinutes();

    return `${day}.${month}.${year} at ${hour}:${mins}`;
  };

  render() {
    return (
      <Card style={this.card} variant="outlined">
        <CardHeader title={this.props.post.title} />
        <CardContent>
          { this.trimContent(this.props.post.description) }
        </CardContent>
        <CardActions style={this.favoriteButton}>
          <span>{ this.formatDate(this.props.post.created_at) }</span>
          <IconButton aria-label="add to favorites" onClick={this.favoriteAction}>
            <FavoriteIcon color={this.props.favorite ? 'secondary' : 'action'} />
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
