/// <reference types="cypress" />
import {data} from '../../test-data/selectorsData'

beforeEach(() => {
  cy.visitGetApproved()
})

describe('Get approved page', () => {

    it('Check approved form', () => {
        cy.fillInputField(data.inputSelectors.firstName, data.getApproved.firstName)
        cy.fillInputField(data.inputSelectors.lastName, data.getApproved.lastName)
        cy.fillInputField(data.inputSelectors.zipCode, data.getApproved.zipCode)
        cy.fillInputField(data.inputSelectors.phoneNumber, data.getApproved.phoneNumber)
    
        cy.checkInputField(data.inputSelectors.firstName, data.getApproved.firstName)
        cy.checkInputField(data.inputSelectors.lastName, data.getApproved.lastName)
        cy.checkInputField(data.inputSelectors.zipCode, data.getApproved.zipCode)
        cy.checkInputField(data.inputSelectors.phoneNumber, '(888) 888-8888') 
    })

})