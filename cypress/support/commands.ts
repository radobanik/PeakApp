/// <reference types="cypress" />

const login = (email: string, password: string) => {
  cy.visit('/')
  cy.intercept('POST', '**/auth/login', { statusCode: 200 }).as('loginUser')
  cy.get('[test-id="email"]').type(email)
  cy.get('[test-id="password"]').type(password)
  cy.get('[test-id="login"]').click()
  cy.wait('@loginUser')
}

const loginAdmin = () => {
  login('emily.johnson@password123.com', 'password123')
}

declare global {
  namespace Cypress {
    interface Chainable {
      login: typeof login
      loginAdmin: typeof loginAdmin
    }
  }
}

Cypress.Commands.add('login', login)
Cypress.Commands.add('loginAdmin', loginAdmin)

export {}
