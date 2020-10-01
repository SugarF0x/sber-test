import React from 'react';

import Post from './Post';

import { connect }       from "react-redux";
import { getDummyPosts } from "../store/actions";

import { IPost, IRootState } from '../store/types';

interface IWrapProps {
  posts: IPost[],
  getDummyPosts: Function
}

interface IWrapState {
  posts: IPost[],
  favorites: string[]
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
        { this.props.posts.length === 0
          ? <div>
            <h3>There are currently no posts here</h3>
            <button onClick={ () => {
              this.props.getDummyPosts();
            } }>Get dummy data
            </button>
          </div>
          : this.props.posts.map((entry: IPost) => (
            <Post key={ entry.id } post={ entry } favorite={ false }/>
          )) }
      </div>
    );
  }
}

const mapStateToProps    = (state: IRootState) => ({
  posts: state.posts as IPost[],
});
const mapDispatchToProps = {
  getDummyPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
