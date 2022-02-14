describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('Amount')
    cy.contains('From')
  })

  it('Check if currencies displaied in From list', () => {
    cy.visit('/')
    cy.get('#from-selector').should('have.value', 'EUR')
  })

  it('Check if currencies displaied in To list', () => {
    cy.visit('/')
    cy.get('#to-selector').should('have.value', 'USD')
  })

  it('Check if answer div not displayed when input amount is null', () => {
    cy.visit('/')
    cy.get('#amount').clear();
    cy.get('#answer-block').should('not.exist')

  })

  it('Check if message input field has invalid class when input invalid', () => {
    cy.visit('/')
    cy.get('#amount').type('123a').should('have.class','is-invalid')
  })

  it('Check if answer div is displayed when amount input field has correct input', () => {
    cy.visit('/')
    cy.get('#amount').type('4534');
    cy.get('#answer-block').should('exist')
  })

  it('Check if swap button changes currencies', () => {
    cy.visit('/')
    cy.get('#from-selector').select('HUF')
    cy.get('#to-selector').select('EUR')
    cy.get('#swap-button').click();
    cy.get('#from-selector').should('have.value', 'EUR')
    cy.get('#from-selector').find(':selected').contains('EUR')
    cy.get('#to-selector').find(':selected').contains('HUF')
  })

  it('Check if new API key configuration button disabled if input is empty', () => {
    cy.visit('/')
    cy.get('#api-key').clear();
    cy.get('#configure-button').should('be.disabled')
  })

  it('Check if get request for rates returns status 200 ', () => {
    cy.request('GET', 'https://free.currconv.com/api/v7/convert?q=USD_EUR,EUR_USD&compact=ultra&apiKey=6d3ef3b536a69a0d409d').then((res) => {
    expect(res.status).equal(200)
  })
  })

  it('Check if correct rates are returned ', () => {
    cy.request('GET', 'https://free.currconv.com/api/v7/convert?q=USD_EUR,EUR_USD&compact=ultra&apiKey=6d3ef3b536a69a0d409d').then((res) => {
    expect(res.body).has.property('USD_EUR')
    expect(res.body).has.property('EUR_USD')
  })
  })

})
