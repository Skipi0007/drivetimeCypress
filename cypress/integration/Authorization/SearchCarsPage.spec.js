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
        cy.checkSearchResOnDealerPage(data.dealershipSelectors.state, data.dealerships.expectedState)
      })

      it('Cars searching by City check', () => {
        cy.fillSearchInput(data.dealerships.city)
        cy.clickDealershipInSearchRes()
        cy.checkSearchResOnDealerPage(data.dealershipSelectors.city, data.dealerships.city)
      })

      it('Cars searching by Zip code check', () => {
        cy.fillSearchInput(data.dealerships.zipCode2)
        cy.clickDealershipInSearchRes()
        cy.checkSearchResOnDealerPage(data.dealershipSelectors.zipCode, data.dealerships.zipCode2)
      })

      it('Sorting search results', () => {
        const sortField = 'DriveTime Plus'
        const sortPriceHtL = 'Price (High to Low)'
        const sortMilesLtH = 'Miles (Low to High)'
        const buic = 'Buick'

        cy.fillSearchInput(data.dealerships.city)
        cy.addSearchCriterialAndSave('Make & Model', buic)
        cy.waitForSearchResults()

        cy.selectNewSearchFilter(sortField, sortPriceHtL)
        // contains('.value-container', sortField).click()
        // cy.contains('.option', sortPriceHtL).click()
        cy.waitForSearchResults()
        cy.get('[dtmintersectionobserverlist]').eq(0).within(()=>{
            let prevValue = null
            cy.get('.gt-price').each((value) => {
                let currentValue
                    if (prevValue !== null) {
                        currentValue =(value.text().split('$')[1].split(','))
                        currentValue = parseInt(currentValue[0]+currentValue[1], 10)
                        console.log(currentValue, prevValue)
                        expect(currentValue<prevValue || currentValue===prevValue).to.be.true
                        prevValue=currentValue
                    } else{
                        currentValue =(value.text().split('$')[1].split(','))
                        currentValue = parseInt(currentValue[0]+currentValue[1], 10)
                        console.log(currentValue, prevValue)
                        prevValue=currentValue
                    }
            })

        })
        cy.selectNewSearchFilter(sortPriceHtL, sortMilesLtH)
        // cy.contains('.value-container', sortPriceHtL).click({force: true})
        // cy.contains('.option', sortMilesLtH).click()
        cy.waitForSearchResults()
        cy.get('[dtmintersectionobserverlist]').eq(0).within(()=>{
            let prevValue = null
            cy.get('.odometer-reading').each((value) => {
                console.log(value)
                        let currentValue
                        if (prevValue !== null) {
                            currentValue =(value.text().split(','))
                            currentValue = parseInt(currentValue[0]+currentValue[1], 10)   
                            expect(currentValue>prevValue || currentValue===prevValue).to.be.true
                            console.log(currentValue, prevValue)   
                            prevValue=currentValue
                        }else{
                            currentValue =(value.text().split(','))
                            currentValue = parseInt(currentValue[0]+currentValue[1], 10)
                            console.log(currentValue, prevValue)
                            prevValue=currentValue
                        }
            })
        })
      })

      it('Cars searching by any two params', () => {
          const maker = 'Audi'
          const model = 'A3'
        cy.fillSearchInput(data.dealerships.city)
        cy.waitForSearchResults()
        cy.chooseMakerAndModel(maker, model)

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
                cy.get('[itemprop="manufacturer"]').should('contain', maker)
                cy.get('[itemprop="model"]').should('contain', model)
                cy.get('[itemprop="releaseDate"]').then(value =>{
                    const year = parseInt(value.text(), 10)
                    expect(year).above(2017)
                })
            })

        })
      })
  
  })

  