/// <reference types="cypress" />
import {data} from '../test-data/selectorsData'
// var data = require('../reports/mocha/assets/MainPage.spec.js/screensCounter.json')

beforeEach(function() {
  cy.visitMainPage()
})

describe('Main page', function() {

  it('Main page transitions check', function() {


        
    cy.getScreenshot()
    cy.clickNavCategory(data.mainPageSelectors.dealership)
    cy.checkUrlEq(data.urls.findDealership)
    cy.getScreenshot()
    cy.clickMainLogo()
    cy.checkUrlEq(data.urls.mainPage)
    cy.getScreenshot()
    cy.clickBtn('Get Approved')
    cy.checkUrlEq(data.urls.getApproved)
    cy.getScreenshot()
    cy.clickMainLogo()
    cy.checkUrlEq(data.urls.mainPage)
    cy.getScreenshot()
    cy.clickNavCategory(data.mainPageSelectors.searchCars)
    cy.checkUrlEq(data.urls.searchCars)
    cy.getScreenshot()
    cy.clickMainLogo()
    cy.checkUrlEq(data.urls.mainPage)
    cy.getScreenshot()

  })
    
})

