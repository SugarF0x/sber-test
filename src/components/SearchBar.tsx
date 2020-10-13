/* eslint-disable react/destructuring-assignment */

import React from 'react';

import { connect } from 'react-redux';
import { Input, Button } from '@material-ui/core';
import { toggleDisplay, fetchPosts } from '../store/actions';

import { IRootPosts, IRootState } from '../store/types';

interface ISearchProps {
  posts: IRootPosts;
  toggleDisplay: Function;
  fetchPosts: Function;
}

interface ISearchState {
  description: string,
  location: string,
}

export class SearchBar extends React.Component<ISearchProps, ISearchState> {
  style = {
    wrap: {
      display: 'flex',
      flexFlow: 'column',
    },
  };

  constructor(props: ISearchProps) {
    super(props);
    this.state = {
      description: '',
      location: '',
    };
  }

  joinFilter = (): string => `${this.state.description}-${this.state.location}`;

  searchHandler = () => {
    if (this.joinFilter() === this.props.posts.filter) {
      this.props.toggleDisplay();
    } else {
      this.props.fetchPosts(this.state.description, this.state.location);
    }
  };

  displayFavorites = () => {
    this.props.toggleDisplay();
  };

  enterHandler = (e: any) => {
    if (e.key === 'Enter' && (this.state.location || this.state.description)) {
      this.searchHandler();
    }
  };

  render() {
    return (
      <div>
        <div style={this.style.wrap}>
          <Input
            placeholder="Description"
            value={this.state.description}
            onChange={(e) => {
              this.setState({ description: e.target.value });
            }}
            onKeyDown={(e) => this.enterHandler(e)}
          />
          <Input
            placeholder="Location"
            value={this.state.location}
            onChange={(e) => {
              this.setState({ location: e.target.value });
            }}
            onKeyDown={(e) => this.enterHandler(e)}
          />
        </div>
        <Button
          style={{ margin: '1rem' }}
          variant="contained"
          color="primary"
          onClick={() => {
            /**
             * these functions can't be fixed as typsecript considers them unasignable
             * this will not be an issue with regular js
             */
            this.searchHandler();
          }}
          disabled={!(this.state.location || this.state.description)
                           || this.props.posts.status === 'fetching'
                           || ((this.joinFilter() === this.props.posts.filter)
                                && (this.props.posts.display !== 'favs'))}
        >
          Get data
        </Button>
        <Button
          style={{ margin: '1rem' }}
          variant="contained"
          color="primary"
          onClick={() => {
            /**
             * these functions can't be fixed as typsecript considers them unasignable
             * this will not be an issue with regular js
             */
            this.displayFavorites();
          }}
          disabled={this.props.posts.favs.length === 0
                           || this.props.posts.display === 'favs'
                           || this.props.posts.status === 'fetching'}
        >
          Get favorites
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  posts: state.posts,
});
const mapDispatchToProps = (dispatch: Function) => ({
  toggleDisplay: () => dispatch(toggleDisplay()),
  fetchPosts: (desc: string, loc: string) => dispatch(fetchPosts(desc, loc)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
