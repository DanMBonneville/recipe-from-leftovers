import { Component } from 'react';
import { connect } from 'react-redux';
import MultiSelectBar from '../components/MultiSelectBar';

class SearchPage extends Component {
  state = {
    ingredients: [],
  };

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

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
