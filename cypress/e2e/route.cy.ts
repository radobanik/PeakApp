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
    cy.loginAdmin('create unassignd activity')
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

  it('create session', () => {
    cy.loginAdmin('create session')
    cy.visit('/diary')

    cy.get('[test-id="diary-sessions"]').click()
    cy.get('[test-id="add-session"]').click()

    cy.intercept('GET', '**/activity/unassigned', (req) => {
      req.headers['if-none-match'] = '*'
      req.headers['cache-control'] = 'no-cache'
    }).as('getUnassignedActivities')

    cy.wait('@getUnassignedActivities').then((interception) => {
      expect(interception!.response!.statusCode).to.eq(200)

      const activities = interception.response!.body.items
      expect(activities).to.be.an('array')
      expect(activities).to.have.length.of.at.least(1)

      cy.get(`[test-id="session-activity-table-entry-${activities[0].id}"]`).click()
    })

    cy.get('[test-id="session-create-continue"]').click()

    cy.get('[test-id="session-create-name"]').type('Test Session')
    cy.get('[test-id="session-create-note"]').type('This is a test session note.')

    cy.intercept('GET', '**/session/**', (req) => {
      req.headers['if-none-match'] = '*'
      req.headers['cache-control'] = 'no-cache'
    }).as('sessionDetail')

    cy.get('[test-id="session-create-submit"]').click()
    cy.contains('Session created successfully').should('be.visible')

    cy.get('[test-id="session-name"]').should('have.value', 'Test Session')
    cy.get('[test-id="session-note"]').should('have.value', 'This is a test session note.')

    cy.wait('@sessionDetail').then((interception) => {
      expect(interception!.response!.statusCode).to.eq(200)

      const activities = interception.response!.body.assignedActivities
      expect(activities).to.be.an('array')
      expect(activities.length).eq(1)
    })
  })
})
