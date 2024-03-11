import { Component } from 'react';
import MultiSelectBar from '../components/MultiSelectBar';
import RecipeSearchButton from '../components/RecipeSearchButton';

class SearchPage extends Component {
  render() {
    return (
      <div className="search-page">
        <div className="search-page-inner">
          <h1>Select Leftover Ingredients</h1>
          <div className="select-submit-wrapper">
            <MultiSelectBar />
            <RecipeSearchButton />
          </div>
        </div>
      </div>
    );
  }
}

export default SearchPage;
