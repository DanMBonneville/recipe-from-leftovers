import { Component } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import asyncComponent from './hoc/asyncComponent';
import './scss/index.scss';

const asyncSearchPage = asyncComponent(() => {
  return import('./containers/SearchPage');
});

const asyncSearchResults = asyncComponent(() => {
  return import('./containers/SearchResultsPage');
});

class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/searchPage" Component={asyncSearchPage} />
        <Route path="/searchResults" Component={asyncSearchResults} />
        <Route path="*" element={<Navigate to="/searchPage" replace />} />
      </Routes>
    );
  }
}

export default App;
