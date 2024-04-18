import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './hoc/Layout';
import asyncComponent from './hoc/asyncComponent';
import './scss/index.scss';
import { AppState } from './store';

const asyncLoginPage = asyncComponent(() => {
  return import('./containers/authContainers/LoginPage');
});
const asyncSignUpPage = asyncComponent(() => {
  return import('./containers/authContainers/SignUpPage');
});
const asyncSearchPage = asyncComponent(() => {
  return import('./containers/SearchPage');
});
const asyncSearchResults = asyncComponent(() => {
  return import('./containers/SearchResultsPage');
});
const asyncRecipeDetails = asyncComponent(() => {
  return import('./containers/RecipeDetailsPage');
});

const App = () => {
  const isLoggedIn = useSelector((state: AppState) => state.user.isLoggedIn);

  return (
    <Layout>
      {isLoggedIn ? (
        <Routes>
          <Route path="/search-for-recipes" Component={asyncSearchPage} />
          <Route path="/recipe-preview-list" Component={asyncSearchResults} />
          <Route path="/recipe/details" Component={asyncRecipeDetails} />
          <Route
            path="*"
            element={<Navigate to="/search-for-recipes" replace />}
          />
        </Routes>
      ) : (
        <Routes>
          <Route path="/login" Component={asyncLoginPage} />
          <Route path="/sign-up" Component={asyncSignUpPage} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </Layout>
  );
};

export default App;
