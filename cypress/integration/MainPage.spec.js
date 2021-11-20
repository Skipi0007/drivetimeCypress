/// <reference types="cypress" />
import {data} from '../test-data/selectorsData'
var addContext = require('mochawesome/addContext');

beforeEach(function() {
  cy.visitMainPage()
})

describe('Main page', function() {

  it('Main page transitions check', function() {
    cy.getScreenshot()
    cy.clickNavCategory(data.mainPageSelectors.dealership)
    cy.checkUrlEq(data.urls.findDealership)
    cy.clickMainLogo()
    cy.checkUrlEq(data.urls.mainPage)
    cy.clickBtn('Get Approved')
    cy.checkUrlEq(data.urls.getApproved)
    cy.clickMainLogo()
    cy.checkUrlEq(data.urls.mainPage)
    cy.clickNavCategory(data.mainPageSelectors.searchCars)
    cy.checkUrlEq(data.urls.searchCars)
    cy.clickMainLogo()
    cy.checkUrlEq(data.urls.mainPage)
  })
    
})

