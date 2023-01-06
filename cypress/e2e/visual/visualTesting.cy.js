describe('Integration test with visual testing',
  {
    env: {
      REACT_APP_SUPABASE_URL: Cypress.env('REACT_APP_SUPABASE_URL'),
      REACT_APP_SUPABASE_ANON_KEY: Cypress.env('REACT_APP_SUPABASE_ANON_KEY')
    },
  }, () => {
    it('Loads categories', () => {
      cy.visit('/nu-wood-fire-grill');
      cy.contains('Appetizers').then(() => {
        cy.percySnapshot('categories test', {
          widths: [375]
        });
      });
    });
    it('Loads products', () => {
      cy.visit('/products');
      cy.contains('Appetizers').then(() => {
        cy.percySnapshot('products test', {
          widths: [375]
        });
      });
    });
  });

