import React, { Component } from 'react';
import SearchResults from '../components/SearchResults';

class SearchResultsPage extends Component {
  render() {
    return (
      <div>
        <h1>Search Results</h1>
        <SearchResults />
      </div>
    );
  }
}

export default SearchResultsPage;
