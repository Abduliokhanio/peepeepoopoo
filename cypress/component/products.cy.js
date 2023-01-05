import React from 'react';
import ProductsPage from '../../src/pages/2-Products';

describe('<ProductsPage />', () => {
  it('renders', () => {
    cy.mount(<ProductsPage />);
  });
});