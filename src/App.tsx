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
          <Route path="/searchPage" Component={asyncSearchPage} />
          <Route path="/searchResults" Component={asyncSearchResults} />
          <Route path="/recipe/details" Component={asyncRecipeDetails} />
          <Route path="*" element={<Navigate to="/searchPage" replace />} />
        </Routes>
      </Layout>
    );
  }
}

export default App;
