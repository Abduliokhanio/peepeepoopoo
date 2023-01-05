Cypress.Commands.add('login', (USER) => {
  cy.task('getCurrentSession', {
    email: Cypress.env(`${USER}_email`),
    password: Cypress.env(`${USER}_password`),
    supabaseApiKey: Cypress.env('supabase_api_key'),
    supabaseURL: Cypress.env('supabase_url'),
  })
    .then((currentSession) => {
      localStorage.setItem('supabase.auth.token', JSON.stringify({
        currentSession,
        expiresAt: currentSession.expires_at,
      }));
    });

  cy.fetchProfile(USER);
});

Cypress.Commands.add('fetchProfile', (USER) => {
  cy.task('fetchProfile', {
    email: Cypress.env(`${USER}_email`),
  })
    .then((profile) => {
      localStorage.setItem('profile', JSON.stringify(profile));
    });
});