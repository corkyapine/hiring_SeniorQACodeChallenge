describe('Check external currency conversion API', () => {
    it('Successfully returns currency conversion information', () => {
        cy.intercept('https://cdn.jsdelivr.net/gh/prebid/currency-file*/**')
            .as('currencyList')
        cy.visit('/')

        // As homepage loads, we should get a list of currency conversions from an external API
        cy.wait('@currencyList').then(({ request, response }) => {
            expect(response.body.conversions).to.not.be.empty
            expect(response.body.conversions).to.haveOwnProperty('USD')
            expect(response.body.conversions).to.haveOwnProperty('GBP')
            expect(response.body.dataAsOf).to.not.be.empty
            expect(response.body.generatedAt).to.not.be.empty
        })
    })
})