describe('New customer API tests', () => {
    // The API requires a new email address for all new customers created
    // Using current timestamp to ensure uniqueness
    const uniqueString = Date.now().toString()
    // Ideally this should be stored somewhere secure and retrieved
    // on run to populate, but for this exercise it is in plain text
    const password = 'Password1'

    it('Can create a new customer', () => {
        // Use the user.json for the request body to create a new user
        // But inject in the email and password
        cy.fixture('user').then((user) => {
            user.customer.email = `${uniqueString}@example.com`
            user.password = `${password}`
            cy.request({
                'method': 'POST',
                'url': '/rest/default/V1/customers',
                'body': user,
                'headers': {
                    'Content-Type': 'application/json',
                }
            }).as('response')

            cy.get('@response').should((response) => {
                expect(response.isOkStatusCode).to.be.true
                expect(response.body).to.have.property('email', `${uniqueString}@example.com`)
            })
        })
    })
    it('Can retrieve customer details', () => {
        // Create new token for authorisation as per the API docs
        cy.request({
            'method': 'POST',
            'url': '/rest/default/V1/integration/customer/token/',
            'body': {
                'username': `${uniqueString}@example.com`,
                'password': `${password}`
            },
            'headers': {
                'Content-Type': 'application/json'
            }
        }).its('body').then((body) => {
            // Use token in request to ask for customer information
            cy.request({
                'url': '/rest/default/V1/customers/me',
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${body}`
                }
            }).as('response')

            cy.get('@response').should((response) => {
                expect(response.isOkStatusCode).to.be.true
                expect(response.body).to.have.property('email', `${uniqueString}@example.com`)
            })
        })
    })
})