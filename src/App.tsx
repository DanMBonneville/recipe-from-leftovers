import { Component } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './hoc/Layout';
import asyncComponent from './hoc/asyncComponent';
import './scss/index.scss';

const asyncSearchPage = asyncComponent(() => {
  return import('./containers/SearchPage');
});

const asyncSearchResults = asyncComponent(() => {
  return import('./containers/SearchResultsPage');
});

const asyncRecipeDetails = asyncComponent(() => {
  return import('./containers/RecipeDetailsPage');
});

class App extends Component {
  render() {
    return (
      <Layout>
        <Routes>
          <Route path="/search-for-recipes" Component={asyncSearchPage} />
          <Route path="/recipe-preview-list" Component={asyncSearchResults} />
          <Route path="/recipe/details" Component={asyncRecipeDetails} />
          <Route
            path="*"
            element={<Navigate to="/search-for-recipes" replace />}
          />
        </Routes>
      </Layout>
    );
  }
}

export default App;
