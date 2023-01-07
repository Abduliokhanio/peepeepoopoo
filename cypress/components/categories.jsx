import React from 'react'
import CategoriesPage from '../../src/pages/1-Categories'

describe('<CategoriesPage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CategoriesPage />)
  })
})