/// <reference types="cypress" />
import {data} from '../test-data/selectorsData'

beforeEach(() => {
  cy.visitGetApproved()
})

describe('Get approved page', () => {

    it('Check approved form', () => {
        cy.fillInputField(data.getApprovedSelectors.firstName, data.getApprovedData.firstName)
        cy.fillInputField(data.getApprovedSelectors.lastName, data.getApprovedData.lastName)
        cy.fillInputField(data.getApprovedSelectors.zipCode, data.getApprovedData.zipCode)
        cy.fillInputField(data.getApprovedSelectors.phoneNumber, data.getApprovedData.phoneNumber)
    
        cy.checkInputField(data.getApprovedSelectors.firstName, data.getApprovedData.firstName)
        cy.checkInputField(data.getApprovedSelectors.lastName, data.getApprovedData.lastName)
        cy.checkInputField(data.getApprovedSelectors.zipCode, data.getApprovedData.zipCode)
        cy.checkInputField(data.getApprovedSelectors.phoneNumber, data.getApprovedData.phoneNumber) 
    })

})