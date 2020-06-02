import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { Provider } from "react-redux";
import { store } from "./store";
import AdventureList from './AdventureList';

test('renders App and NavBar', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>);
    const navbar = getByText("Register");
    expect (navbar).toBeInTheDocument();
});