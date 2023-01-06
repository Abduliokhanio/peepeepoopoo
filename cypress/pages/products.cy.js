import React from 'react';
import ProductsPage from '../../src/pages/2-Products';

describe('Product Page', () => {
  it('renders', () => {
    cy.login('test_customer_1');
    cy.mount(<ProductsPage />);
  });
});