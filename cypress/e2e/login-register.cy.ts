describe('Login Form', () => {
  it('should allow a user to log in successfully with valid credentials', () => {
    cy.visit('/')
    cy.intercept('POST', '**/auth/login', { statusCode: 200 }).as('loginUser')
    cy.get('[test-id="email"]').type('emily.johnson@password123.com')
    cy.get('[test-id="password"]').type('password123')
    cy.get('[test-id="login"]').click()

    cy.wait('@loginUser')
    cy.get('[test-id="homepage"]').should('be.visible')
  })

  it('should show an error toast message with invalid credentials', () => {
    cy.visit('')
    cy.intercept('POST', '**/auth/login', { statusCode: 401 }).as('loginUser')
    cy.get('[test-id="email"]').type('wrong@wrong.com')
    cy.get('[test-id="password"]').type('wrong')
    cy.get('[test-id="login"]').click()

    cy.wait('@loginUser')
    cy.contains('Invalid email or password').should('be.visible')
  })
})

describe('Register', () => {
  it('should allow a new user to register successfully by completing all steps', () => {
    cy.intercept('POST', '**/auth/register', { statusCode: 201 }).as('registerUser')
    const randomNumber = Math.floor(Math.random() * 10000)
    cy.visit('/')
    cy.get('[test-id="sign-up"]').click()

    cy.get('[test-id="email-register"]').type(`new.user${randomNumber}@example.com`)
    cy.get('#password').type('StrongPassword123')
    cy.get('#confirmPassword').type('StrongPassword123')
    cy.contains('button', 'Next').click()

    cy.get('#userName').type(`new_user_${randomNumber}`)
    cy.get('#firstName').type('John')
    cy.get('#lastName').type('Doe')
    cy.contains('button', 'Next').click()

    cy.get('#weight').type('75')

    cy.get('[test-id=countries]').click().get('[data-value=Slovakia]').click()

    cy.get('[test-id=cities]').click().get('[data-value=Bratislava]').click()
    cy.get('[test-id="sign-up"]').click()

    cy.wait('@registerUser')
    cy.get('[test-id="homepage"]').should('be.visible')
  })
})
