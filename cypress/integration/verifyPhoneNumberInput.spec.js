const user = {
  phoneNumber: '8329643224'
};

describe('Add phone number for verification', () => {
  it('should successfully add customer phone number for verification', () => {
    cy.visit('/nu-wood-fire-grill');
    cy.visit('/user/account-details');
    cy.get('[data-test="verify-number"]').type(user.phoneNumber);
    cy.get('[data-test="verify-submit"]').click();

    cy.location('pathname').should('contain', '/auth/verify');
    cy.contains('Verifying ' + '+1' + user.phoneNumber);
  });
});