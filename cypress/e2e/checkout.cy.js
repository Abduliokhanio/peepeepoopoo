describe('checkout', () => {
  it('should select a category', () => {
    cy.visit('/nu-wood-fire-grill');
    cy.get('[data-test="0"]').click();
  });

  it('should select a product', () => {
    cy.url().should('include', '/products');
    cy.get('[data-test="0"]').click();
    cy.contains('Add To Order');
  });

  it('should add product to order', () => {
    cy.url().should('include', '/modifiers');
    cy.get('[data-test="add-to-order-button"]').click();
  });

  it('should select tip', () => {
    cy.url().should('include', '/tip');
    cy.get('[data-test="no-tip-button"]').click();
  });

  it('should show cart items', () => {
    cy.url().should('include', '/cart');
    cy.get('[data-test="cart-button"]').click();
  });

  it('should choose card payment method', () => {
    cy.get('[data-test="card-pay"]').click();
    cy.get('[data-test="card-pay-button"]').contains('Pay');
  });

  it('should make a payment with saved card', () => {
    cy.intercept('POST', 'https://vfqmjynzckzhqbkzxrbz.functions.supabase.co/make-payment', (req) => {
      req.on('before:response', (res) => {
        console.log('About to get a response.');
      });
      console.log('req', req);
    });
    cy.get('[data-test="card-pay-button"]').click();
  });

  it('should send order to kitchen', () => {

  });

  it('should record reciept', () => {

  });

  it('should display confirmation page', () => {
    cy.url().should('include', '/confirmation');
  });

});