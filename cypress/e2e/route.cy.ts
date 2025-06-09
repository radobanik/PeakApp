describe('Routes with sessions', () => {
  it('find route and review', () => {
    cy.loginAdmin('review-route')
    cy.visit('/')
    cy.get('[test-id="homepage"]').should('be.visible')
    cy.get('[test-id="map-search-bar"]').click().type('Cloud Walker')
    cy.get('[test-id="Cloud Walker"]').click({ force: true })

    cy.url().should('include', '/route/e59f9c13-4f7b-4c82-8c3e-7a44efc40a9d')

    cy.get('[aria-label="Rate 3"]').click({ force: true })

    cy.get('[test-id="review-text-input"]').type('not great not terrible')

    cy.get('[test-id="review-submit-button"]').click()

    cy.contains('not great not terrible').should('be.visible')
  })

  it('should allow a user to log in successfully with valid credentials', () => {
    cy.loginAdmin('create session')
    cy.visit('/route/e59f9c13-4f7b-4c82-8c3e-7a44efc40a9d')

    cy.get('[test-id="add-to-diary"]').click()

    cy.get('[test-id="activity-topped"]').click()
    cy.get('[test-id="activity-attempts"]').type('3')
    cy.get('[test-id="activity-notes-input"]').type('This is a test note for the activity.')
    cy.get('[test-id="difficulty-select"]').click()
    cy.contains('[role="option"]', 'Hard').click()
    cy.get('[test-id="activity-submit-button"]').click()

    cy.contains('Activity created successfully').should('be.visible')

    cy.get('[test-id="activity-attempts"]').should('have.value', '3')
    cy.get('[test-id="activity-notes-input"]').should(
      'have.value',
      'This is a test note for the activity.'
    )
    cy.get('[test-id="difficulty-select"]').should('contain.text', 'Hard')
  })
})
