/// <reference types="cypress" />
import {data} from '../test-data/selectorsData'
// const { expect } = require('chai');
var addContext = require('mochawesome/addContext');

beforeEach(function() {
  cy.visitMainPage()
})

after(function () {


  const title = 'Main page -- Main page transitions check.';
  const value = '../screenshots/MainPage.spec.js/Main page -- Main page transitions check.png';
  addContext('Image','123');
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
    addContext('Image','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRubndoATUmobCHLp0B1u7Wg_e0i9NYxGUoEg&usqp=CAU');
  })
    
})

