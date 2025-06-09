/// <reference types="cypress" />

const login = (session: string, email: string, password: string) => {
  cy.session(session, () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8080/api/v1/auth/login',
      body: { email, password },
    }).then(({ body }) => {
      window.localStorage.setItem('token', body.token)
    })
  })
}

const loginAdmin = (session: string) => {
  login(session, 'emily.johnson@password123.com', 'password123')
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
