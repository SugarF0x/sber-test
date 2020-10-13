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

  joinFilter = (): string => {
    const { description, location } = this.state;
    return `${description}-${location}`;
  };

  searchHandler = () => {
    /**
     * yup
     */
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { toggleDisplay, fetchPosts, posts } = this.props;
    const { description, location } = this.state;

    if (this.joinFilter() === posts.filter) {
      toggleDisplay();
    } else {
      fetchPosts(description, location);
    }
  };

  displayFavorites = () => {
    /**
     * just the way we like it
     */
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { toggleDisplay } = this.props;
    toggleDisplay();
  };

  enterHandler = (e: any) => {
    const { location, description } = this.state;
    if (e.key === 'Enter' && (location || description)) {
      this.searchHandler();
    }
  };

  render() {
    const { location, description } = this.state;
    const { posts } = this.props;
    return (
      <div>
        <div style={this.style.wrap}>
          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => {
              this.setState({ description: e.target.value });
            }}
            onKeyDown={(e) => this.enterHandler(e)}
          />
          <Input
            placeholder="Location"
            value={location}
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
          disabled={!(location || description)
                           || posts.status === 'fetching'
                           || ((this.joinFilter() === posts.filter)
                                && (posts.display !== 'favs'))}
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
          disabled={posts.favs.length === 0
                           || posts.display === 'favs'
                           || posts.status === 'fetching'}
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
