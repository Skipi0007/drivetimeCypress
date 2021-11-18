/// <reference types="cypress" />
import {data} from '../../test-data/selectorsData'

beforeEach(() => {
  cy.visitFindDealership()
})

describe('Find dealership page', () => {

    it('Dealership searching check', () => {
        cy.fillSearchInput(data.dealerships.state)
        cy.checkSearchDealerResults(data.dealershipSelectors.state, 'CA')

        cy.fillSearchInput(data.dealerships.city)
        cy.checkSearchDealerResults(data.dealershipSelectors.city, data.dealerships.city)

        cy.fillSearchInput(data.dealerships.zipCode)
        cy.checkSearchDealerResults(data.dealershipSelectors.zipCode, data.dealerships.zipCode)
    })

})