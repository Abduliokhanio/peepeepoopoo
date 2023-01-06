describe('verify', () => {
  it('should successfully verify account', () => {
    cy.visit('/nu-wood-fire-grill');
    cy.visit('/auth/signup');
    cy.get('[data-test="verify-number"]').type('8329643224');
    cy.get('[data-test="verify-submit"]').click();
    cy.wait(3000);
    cy.request({
      method: 'GET',
      url: `https://api.twilio.com/2010-04-01/Accounts/${Cypress.env('twillio_account_sid')}/Messages.json?To=8329643224&__referrer=runtime&Format=json&PageSize=50&Page=0`,
      auth: {
        username: Cypress.env('twillio_account_sid'),
        password: Cypress.env('twillio_auth_token')
      }
    }).its('body').then((response) => {
      cy.wait(3000);
      cy.log(response.messages[0]);
      const otpcode = response.messages[0].body.split('is ')[1];
      cy.log(otpcode);
      cy.get('[data-test="verify-input"]').type(otpcode);
      cy.wait(3000);
      cy.contains('Nu\'s Wood Fire Grill');
    });
  });
});