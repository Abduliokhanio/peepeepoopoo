describe('Integration test with visual testing', function () {
  it('Loads digital menu categories', function () {
    cy.visit('http://localhost:3000/nu-wood-fire-grill');
    cy.contains('Appetizers').then(() => {
      cy.percySnapshot('Digital menu test', {
        widths: [375]
      });
    });
  });
});