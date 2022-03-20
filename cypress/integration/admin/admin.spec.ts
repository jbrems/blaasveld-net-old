
describe('Admin page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/admin');
  });

  it('should render the admin page', () => {
    cy.get('p[data-e2e="content"]').should('have.text', 'admin works!');
  });
});
