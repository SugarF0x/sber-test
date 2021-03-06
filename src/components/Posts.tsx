import React from 'react';

import { Button, CircularProgress } from '@material-ui/core';

import { connect } from 'react-redux';
import PostCon from './Post';
import SearchBarCon from './SearchBar';

import { getDummyPosts } from '../store/actions';

import { IPost, IRootState, IRootPosts } from '../store/types';

interface IWrapProps {
  posts: IRootPosts;
  getDummyPosts: Function;
}

interface IWrapState {

}

export class Wrapper extends React.Component<IWrapProps, IWrapState> {
  pickPosts = () => {
    /**
     * Yet again, suppressing for ts reasons
     */
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { posts, getDummyPosts } = this.props;

    if (posts.display === 'default') {
      return (
        <div>
          <h3>There are currently no posts here</h3>
          <Button
            style={{ margin: '1rem' }}
            variant="contained"
            color="primary"
            onClick={() => {
              /**
               * these functions can't be fixed as typsecript considers them unasignable
               * this will not be an issue with regular js
               */
              getDummyPosts();
            }}
          >
            Get dummy data
          </Button>
        </div>
      );
    }
    switch (posts.status) {
      case 'success':
        return posts[posts.display].map((entry: IPost) => (
          <PostCon
            key={entry.id}
            post={entry}
            favorite={posts.favs.filter((e: IPost) => entry.id === e.id).length > 0}
          />
        ));
      case 'fetching':
        return (
          <div>
            <h3>Fetching data...</h3>
            <CircularProgress />
          </div>
        );
      case 'not_found':
        return (
          <h3>No search results found for this query</h3>
        );
      default:
        return (
          <h3>Oops!.. Something went wrong!</h3>
        );
    }
  };

  render() {
    return (
      <div>
        <h1>Posts from GitHub</h1>
        <SearchBarCon />
        { this.pickPosts() }
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  posts: state.posts,
});
const mapDispatchToProps = {
  getDummyPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
