import selectors from '../support/selectors';

describe('Add new item to cart', () => {
  it('is successful', () => {
    cy.visit('/')

    cy.get(selectors.navBarWomen).trigger('mouseover')
    cy.get(selectors.navBarWomenTops).click()

    cy.get(selectors.searchSidebar).should('be.visible')
    cy.get(selectors.productList).should('be.visible')

    cy.get(selectors.productItemName).first().click()

    cy.get(selectors.productInfo).should('be.visible')

    cy.get(selectors.productSizeOptions).first().click()
    cy.get(selectors.productColorOptions).first().click()

    // Watch for the API request to add the item to cart
    cy.intercept('POST', '/checkout/cart/add/**').as('checkout')

    cy.get(selectors.addToCartButton).click()

    // API request should be successful.
    cy.wait('@checkout').its('response.statusCode').should('eq', 200)

    // UI should display success message to inform the user.
    cy.get(selectors.successMessage).invoke('text')
        .should('match', /You added .* to your shopping cart\./)
  })
})