/// <reference types="cypress" />
import {data} from '../../test-data/selectorsData'

beforeEach(() => {
    Cypress.Cookies.debug(true)
    cy.visitSearchCars()
    cy.getCookies()
    
  })
  
  describe('Search cars page', () => {
  
      it('Cars searching by State check', () => {
        cy.fillSearchInput(data.dealerships.state)
        cy.clickDealershipInSearchRes()
        cy.checkSearchResultsOnDealerPage(data.dealershipSelectors.state, data.dealerships.expectedState)
        // cy.get('[itemprop="addressRegion"]').should('have.text', 'CA')
      })

      it('Cars searching by City check', () => {
        cy.fillSearchInput(data.dealerships.city)
        cy.clickDealershipInSearchRes()
        cy.checkSearchResultsOnDealerPage(data.dealershipSelectors.city, data.dealerships.city)
        // cy.get('[itemprop="addressLocality"]').should('have.text', data.dealerships.city)
      })

      it('Cars searching by Zip code check', () => {
        cy.fillSearchInput(data.dealershipSelectors.zipCode)
        cy.clickDealershipInSearchRes()
        cy.checkSearchResultsOnDealerPage(data.dealershipSelectors.zipCode, data.dealerships.zipCode)
        // cy.get('[itemprop="postalCode"]').should('have.text', '93726')
      })

      it.only('Search by two any params', () => {
        cy.fillSearchInput(data.dealerships.city)
        cy.addSearchCriterialAndSave('Make & Model', 'Buick')
        cy.waitForSearchResults()
        // cy.get('[dtmintersectionobserverlist]').eq(0).within(()=>{
        //     cy.get('.content-clickable').each(() => {
        //         cy.get('[itemprop="manufacturer"]').should('contain', 'Buick')
        //     })
        // })
        cy.contains('.value-container', 'DriveTime Plus').click()
        cy.contains('.option', 'Price (High to Low)').click()
        cy.get('[dtmintersectionobserverlist]').eq(0).within(()=>{
            let prevValue = null
            cy.get('.content-clickable').each(() => {
                cy.get('.gt-price').then(value => {
                    if (prevValue !== null) {
                        let currentValue = parseInt(value.text().split('$').slice(1).split(',').slice(1), 10)
                        console.log(currentValue)
                        expect(currentValue).above(prevValue)
                        prevValue=currentValue
                    }
                })
            })

        })
        cy.contains('.value-container', 'DriveTime Plus').click()
        cy.contains('.option', 'Miles (Low to High)').click()
        cy.get('[dtmintersectionobserverlist]').eq(0).within(()=>{
            let prevValue = null
            cy.get('.content-clickable').each(() => {
                cy.get('.odometer-reading').then(value => {
                    if (prevValue !== null) {
                        let currentValue = parseInt(value.text(), 10)
                        expect(currentValue).above(prevValue)
                        prevValue=currentValue
                    }
                })
            })
        })
      })

      it('Cars searching by City check', () => {
        cy.intercept('POST', '**/search').as('POSTsearch')
        cy.fillSearchInput(data.dealerships.city)
        cy.waitForSearchResults()
        cy.chooseMakerAndModel('Audi', 'A3')

        cy.waitForSearchResults()
        cy.contains('.filter-outer', 'Year').click()
        cy.get('.year-filter-container').within(()=> {
            cy.get('.noUi-handle')
            .eq(0)
            .click()
            .type('{rightarrow}'.repeat(12))
            .click()
            .parents('.content-container').within(()=>{
                cy.clickBtn('Save')
            })
        })
        cy.waitForSearchResults()
        cy.get('[dtmintersectionobserverlist]').eq(0).within(()=>{
            cy.get('.content-clickable').each(() => {
                cy.get('[itemprop="manufacturer"]').should('contain', 'Audi')
                cy.get('[itemprop="model"]').should('contain', 'A3')
                cy.get('[itemprop="releaseDate"]').then(value =>{
                    const year = parseInt(value.text(), 10)
                    expect(year).above(2017)
                })
            })

        })
      })
  
  })

  