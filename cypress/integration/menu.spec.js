const categories = [
  'Appetizers',
  'Sandwhiches',
  'Beef Noodle Soup',
  'Vermicelli Bowl',
  'Special Dishes',
  'Rice Plates',
  'Vegetarian',
  'Kids Menu'
];

describe('Menu Items', () => {
  beforeEach(() => {
    cy.visit('/nu-wood-fire-grill');
  });

  it('should exist have the title on the page', () => {
    cy.get('[data-test="nav-heading"]').should('contain', 'Nu\'s Wood Fire Grill');
  });

});