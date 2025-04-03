import selectors from '../support/selectors';

describe('Search functionality', () => {
    it('is successful', () => {
        cy.visit('/')

        cy.get(selectors.searchBar).click()
        cy.get(selectors.searchBar).type('pants{enter}')

        cy.url().should('include', '/catalogsearch/result/?q=pants')
        cy.get(selectors.productList).should('be.visible')
    })
})