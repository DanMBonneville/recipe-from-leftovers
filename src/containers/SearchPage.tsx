import { Component } from 'react';
import MultiSelectBar from '../components/MultiSelectBar';

class SearchPage extends Component {
  render() {
    return (
      <div className="search-page">
        <div className="ingredient-select-wrapper">
          <h1>Select Leftover Ingredients</h1>
          <MultiSelectBar />
        </div>
      </div>
    );
  }
}

export default SearchPage;
