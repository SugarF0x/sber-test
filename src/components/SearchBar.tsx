import React from 'react';

import { connect }         from "react-redux";
import { getPostsByQuery } from "../store/actions";

import { Input, Button } from '@material-ui/core';

interface ISearchProps {
  getPostsByQuery: Function
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

  searchHandler() {
    this.props.getPostsByQuery('fetching');

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

  enterHandler(e: any) {
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
                  this.searchHandler();
                } }
                disabled={ !(this.state.location || this.state.description) }
        >
          Get data
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = {
  getPostsByQuery,
};

export default connect(null, mapDispatchToProps)(SearchBar);
