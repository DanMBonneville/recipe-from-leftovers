import { Component } from 'react';
import MultiSelectBar from '../components/MultiSelectBar';

class SearchPage extends Component {
  render() {
    return (
      <div>
        <h1>Select Leftover Ingredients</h1>
        <MultiSelectBar />
      </div>
    );
  }
}

export default SearchPage;
