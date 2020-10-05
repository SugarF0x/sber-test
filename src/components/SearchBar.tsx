import React from 'react';

import { connect }         from "react-redux";
import { getPostsByQuery, toggleDisplay } from "../store/actions";

import { Input, Button }          from '@material-ui/core';
import { IRootPosts, IRootState } from "../store/types";

interface ISearchProps {
  posts: IRootPosts;
  getPostsByQuery: Function;
  toggleDisplay: Function;
}

interface ISearchState {
  description: string,
  location: string,
}

class SearchBar extends React.Component<ISearchProps, ISearchState> {
  constructor(props: ISearchProps) {
    super(props);
    this.state = {
      description: '',
      location:    '',
    };
  }

  style = {
    wrap: {
      display:  'flex',
      flexFlow: 'column',
    },
  };

  joinFilter = (): string => {
    return `${this.state.description}-${this.state.location}`
  }

  searchHandler = () => {
    if (this.joinFilter() === this.props.posts.filter) {
      this.props.toggleDisplay();
    } else {
      this.props.getPostsByQuery('fetching', this.joinFilter());

      fetch(`https://cors-anywhere.herokuapp.com/jobs.github.com/positions.json?description=${ this.state.description }&location=${ this.state.location }`,
        { headers: { origin: 'http://localhost:3000' } })
        .then(res => res.json())
        .then(res => {
          if (res.length > 0)
            this.props.getPostsByQuery('success', res);
          else
            this.props.getPostsByQuery('not_found');
        })
        .catch(() => {
          this.props.getPostsByQuery('error');
        });
    }
  }

  displayFavorites = () => {
    this.props.toggleDisplay();
  }

  enterHandler = (e: any) => {
    if (e.key === 'Enter' && (this.state.location || this.state.description))
      this.searchHandler();
  }

  render() {
    return (
      <div>
        <div style={ this.style.wrap }>
          <Input placeholder="Description"
                 value={ this.state.description }
                 onChange={ (e) => {
                   this.setState({ description: e.target.value });
                 } }
                 onKeyDown={ e => this.enterHandler(e) }
          />
          <Input placeholder="Location"
                 value={ this.state.location }
                 onChange={ (e) => {
                   this.setState({ location: e.target.value });
                 } }
                 onKeyDown={ e => this.enterHandler(e) }
          />
        </div>
        <Button style={ { margin: '1rem' } }
                variant="contained"
                color="primary"
                onClick={ () => {
                  /**
                   * these functions can't be fixed as typsecript considers them unasignable
                   * this will not be an issue with regular js
                   */
                  this.searchHandler();
                } }
                disabled={ !(this.state.location || this.state.description)
                           || ((this.joinFilter() === this.props.posts.filter)
                                && (this.props.posts.display !== 'favs')) }
        >
          Get data
        </Button>
        <Button style={ { margin: '1rem' } }
                variant="contained"
                color="primary"
                onClick={ () => {
                  /**
                   * these functions can't be fixed as typsecript considers them unasignable
                   * this will not be an issue with regular js
                   */
                  this.displayFavorites();
                } }
                disabled={ this.props.posts.favs.length === 0 || this.props.posts.display === 'favs' }
        >
          Get favorites
        </Button>
      </div>
    );
  }
}

const mapStateToProps    = (state: IRootState) => ({
  posts: state.posts
});
const mapDispatchToProps = {
  getPostsByQuery,
  toggleDisplay
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
