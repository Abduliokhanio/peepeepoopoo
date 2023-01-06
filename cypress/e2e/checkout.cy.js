describe('checkout', () => {
  it('should add items to cart', () => {
    cy.visit('http://localhost:3000/nu-wood-fire-grill');
    cy.get('[data-test="add-to-cart"]').click();
    cy.get('[data-test="cart"]').click();
    cy.contains('Nu\'s Wood Fire Grill');
  });

  it('should choose payment', () => {

  });

  it('should make payment', () => {

  });

  it('should send order to kitchen', () => {

  });

  it('should record reciept', () => {

  });
});