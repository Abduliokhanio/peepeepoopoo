describe('Integration test with visual testing', function () {
  it('Loads digital menu categories', function () {
    cy.visit('/nu-wood-fire-grill');
    cy.contains('Appetizers').then(() => {
      cy.percySnapshot('Digital menu test', {
        widths: [320, 375, 414]
      });
    });
  });
});