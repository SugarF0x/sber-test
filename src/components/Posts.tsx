import React      from 'react';

import { Button } from "@material-ui/core";

import Post      from './Post';
import SearchBar from './SearchBar';

import { connect }       from "react-redux";
import { getDummyPosts } from "../store/actions";

import { IPost, IRootState, TStatus } from '../store/types';

interface IWrapProps {
  posts: IPost[];
  status: TStatus;
  getDummyPosts: Function;
}

interface IWrapState {
  posts: IPost[];
  favorites: string[];
}

class Wrapper extends React.Component<IWrapProps, IWrapState> {
  // constructor(props: IWrapProps) {
  //   super(props);
  //   this.state = {
  //     posts: useSelector((state: IRootState) => state.posts),
  //     /**
  //      * this ignore is here since inline condition already checks for null
  //      */
  //     // @ts-ignore
  //     favorites: localStorage.getItem('favs') ? JSON.parse(localStorage.getItem('favs')) : []
  //   };
  // }

  componentDidMount() {
    // fetch('https://cors-anywhere.herokuapp.com/jobs.github.com/positions.json', {headers: {origin: 'http://localhost:3000'}})
    //   .then(res => res.json())
    //   .then(res => {
    //     this.setState({
    //       posts: res
    //     })
    //   })
  }

  render() {
    return (
      <div>
        <h1>Posts from GitHub</h1>
        <SearchBar/>
        { this.props.status === 'success'
          ? this.props.posts.length === 0
            ? <div>
              <h3>There are currently no posts here</h3>
              <Button style={ { margin: '1rem' } }
                      variant="contained"
                      color="primary"
                      onClick={ () => {
                        this.props.getDummyPosts();
                      } }
              >
                Get dummy data
              </Button>
            </div>
            : this.props.posts.map((entry: IPost) => (
              <Post key={ entry.id } post={ entry } favorite={ false }/>
            ))
          : this.props.status === 'fetching'
            ? <h3>Fetching data...</h3>
            : this.props.status === 'not_found'
              ? <h3>No search results found for this query</h3>
              : <h3>Oops!.. Something went wrong!</h3>
        }
      </div>
    );
  }
}

const mapStateToProps    = (state: IRootState) => ({
  posts:  state.posts.array as IPost[],
  status: state.posts.status as TStatus,
});
const mapDispatchToProps = {
  getDummyPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
