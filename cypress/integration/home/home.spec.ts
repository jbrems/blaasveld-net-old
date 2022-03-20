
describe('Home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  it('should render the admin page', () => {
    cy.get('p[data-e2e="content"]').should('have.text', 'home works!');
  });
});
