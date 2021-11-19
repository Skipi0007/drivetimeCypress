/// <reference types="cypress" />
import {data} from '../test-data/selectorsData'
// const { expect } = require('chai');
const addContext = require('mochawesome/addContext');

beforeEach(() => {
  cy.visitMainPage()
})

after(function () {
  const title = 'Main page -- Main page transitions check.';
  const value = '../screenshots/MainPage.spec.js/Main page -- Main page transitions check.png';
  addContext(this, {
    title,
    value,
  })
})

describe('Main page', () => {

  // it('Main page elements check', () => {
  //   cy.checkVisibility(data.mainPageSelectors.header)
  //   cy.checkVisibility(data.mainPageSelectors.mainSection)
  //   cy.checkVisibility(data.mainPageSelectors.footer)   
  // })

  it('Main page transitions check', () => {
    cy.intercept('POST', '**/track').as('POSTtreck')

    cy.getScreenshot()
    cy.clickNavCategory(data.mainPageSelectors.dealership)
    cy.checkUrlEq(data.urls.findDealership)
    cy.clickMainLogo()
    cy.checkUrlEq(data.urls.mainPage)
    cy.clickBtn('Get Approved')
    // cy.wait('@POSTtreck').then(xhr => {
    //   expect(xhr.response.statusCode).to.eq(200)
    // })
    cy.checkUrlEq(data.urls.getApproved)
    cy.clickMainLogo()
    cy.checkUrlEq(data.urls.mainPage)
    cy.clickNavCategory(data.mainPageSelectors.searchCars)
    cy.checkUrlEq(data.urls.searchCars)
    cy.clickMainLogo()
    cy.checkUrlEq(data.urls.mainPage)
  })
    
})

