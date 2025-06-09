describe('Login Form', () => {
  it('should allow a user to log in successfully with valid credentials', () => {
    cy.visit('http://localhost:5173/')
    cy.get('[test-id="email"]').type('emily.johnson@password123.com')
    cy.get('[test-id="password"]').type('password123')
    cy.get('[test-id="login"]').click()

    cy.get('[test-id="homepage"]').should('be.visible')
  })

  it('should show an error toast message with invalid credentials', () => {
    cy.visit('http://localhost:5173/')
    cy.get('[test-id="email"]').type('wrong@wrong.com')
    cy.get('[test-id="password"]').type('wrong')
    cy.get('[test-id="login"]').click()

    cy.contains('Invalid email or password').should('be.visible')
    cy.url().should('not.include', '/dashboard')
  })
})
