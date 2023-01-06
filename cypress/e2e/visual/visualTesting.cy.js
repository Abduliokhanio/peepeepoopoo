describe('Integration test with visual testing', function () {
  it('Loads categories', function () {
    cy.visit('/nu-wood-fire-grill');
    cy.contains('Appetizers').then(() => {
      cy.percySnapshot('categories test', {
        widths: [375]
      });
    });
  });
  it('Loads products', function () {
    cy.visit('/products');
    cy.contains('Appetizers').then(() => {
      cy.percySnapshot('products test', {
        widths: [375]
      });
    });
  });
});

