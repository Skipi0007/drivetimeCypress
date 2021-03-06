/// <reference types="cypress" />
import {data} from '../test-data/selectorsData'

beforeEach(() => {
  cy.visitFindDealership()
})

describe('Find dealership page', () => {

    it('Dealership searching check', () => {
        cy.fillSearchInput(data.dealershipsData.state)
        cy.waitForOneSearchResponse()
        cy.getScreenshot()
        cy.checkSearchDealerResults(data.dealershipSelectors.state, data.dealershipsData.expectedState)

        cy.fillSearchInput(data.dealershipsData.city)
        cy.waitForOneSearchResponse()
        cy.getScreenshot()
        cy.checkSearchDealerResults(data.dealershipSelectors.city, data.dealershipsData.city)

        cy.fillSearchInput(data.dealershipsData.zipCode)
        cy.waitForOneSearchResponse()
        cy.getScreenshot()
        cy.checkSearchDealerResults(data.dealershipSelectors.zipCode, data.dealershipsData.zipCode)
    })

})