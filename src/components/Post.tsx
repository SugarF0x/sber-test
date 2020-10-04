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

class Post extends React.Component<IPostProps, IPostState> {
  card     = {
    margin: '1rem',
  };
  favoriteButton = {
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

  // bound functions

  favoriteAction = () => {
    this.props.setFavorite(this.props.post.id)
  }

  render() {
    return (
      <Card style={ this.card } variant="outlined">
        <CardHeader title={ this.props.post.title }/>
        <CardContent>
          { this.trimContent(this.props.post.description) }
        </CardContent>
        <CardActions style={ this.favoriteButton }>
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
