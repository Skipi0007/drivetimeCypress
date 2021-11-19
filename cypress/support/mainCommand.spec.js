/// <reference types="cypress" />

// import cypress = require("cypress");

//actions
const scteenShotStatus = Cypress.config().screenShots
// Cypress.config.env('screenShots');
const intercepter = () => {
  return cy.intercept('POST', '**/track').as('POSTtrack'),
         cy.intercept('POST', '**/search').as('POSTsearch'),
         cy.intercept('GET', '*batch=homepage').as('GEThomepage')
}

Cypress.Commands.add('visitMainPage', () => {
  intercepter()
    cy.visit("/")
    cy.wait('@GEThomepage').then(xhr => {
        expect(xhr.response.statusCode).to.eq(200)
      })
  });

  Cypress.Commands.add('visitSearchCars', () => {
    intercepter()
    cy.visit("/used-cars")
    cy.wait('@POSTsearch').then(xhr => {
        expect(xhr.response.statusCode).to.eq(200)
      })
  });

  Cypress.Commands.add('visitGetApproved', () => {
    intercepter()
    cy.visit("/auto-financing")
    cy.wait('@POSTtrack').then(xhr => {
        expect(xhr.response.statusCode).to.eq(200)
      })
  });

  Cypress.Commands.add('visitFindDealership', () => {
    intercepter()
    cy.visit("/used-car-dealers")
    cy.wait('@POSTsearch').then(xhr => {
        expect(xhr.response.statusCode).to.eq(200)
      })
  });

  Cypress.Commands.add('clickNavCategory', (textInCategoryName) => {
    intercepter()
    cy.contains('.primary-item', textInCategoryName)
        .click()
    cy.wait("@POSTtrack").then(xhr => {
      expect(xhr.response.statusCode).to.eq(200)
    })    
  });

  Cypress.Commands.add('clickMainLogo', () => {
    intercepter()
    cy.get('.main-header').within(()=>{
      cy.get('[alt="DriveTime Logo"]').click()
      cy.wait('@POSTtrack', {timeout: 10000}).then(xhr => {
        expect(xhr.response.statusCode).to.eq(200)
      })
    })   
  });

  Cypress.Commands.add('fillInputField', (fieldName, value) => {
    cy.get(`input[data-analytics-label="${fieldName}"]`)
        .type(value)
  });

  Cypress.Commands.add('clickSaveBtn', () => {
    cy.get('.buttons-container').within(()=>{
      cy.contains('.text-before', 'Save').click({force:true})
    })
  });

  Cypress.Commands.add('clickBtn', (btnName) => {
    cy.contains('.text-before', btnName).click({force:true})
  });

  Cypress.Commands.add('fillSearchInput', (value) => {
    intercepter()
    cy.get('#typeahead-input')
      .clear({force: true})
      .type(value, {force: true} )
      .type('{enter}',{force: true})
  });
  
  Cypress.Commands.add('clickDealershipInSearchRes', () => {
    cy.get('.vscr-container').eq(0).within(()=>{
      cy.get('.dealership-name').click()
  })
  });

  Cypress.Commands.add('addSearchCriterialAndSave', (criterial, feature) => {
    cy.contains('.filter-outer', criterial).click()
    cy.contains('.checkbox-container', feature).within(() => {
      cy.get('.checkbox-checkmark')
        .click()
        .parents('.content-container').within(()=>{
          cy.clickBtn('Save')
        })
      })
  })

  Cypress.Commands.add('chooseMakerAndModel', (maker, model) => {
    cy.contains('.filter-outer', 'Make & Model').click()
    cy.contains('.checkbox-container', maker).within(() => {
      cy.get('.checkbox-checkmark')
        .click()
      })
    cy.contains('.tab-title', 'Select Models').click()
    cy.contains('.checkbox-container', model).within(() => {
      cy.get('.checkbox-checkmark')
        .click()
      })
      cy.contains('.tab-title', 'Select Makes')
      .parents('.content-container').within(()=>{
        cy.clickBtn('Save')
      })
  })

  Cypress.Commands.add('waitForSearchResults', () => {
    intercepter()
    cy.wait('@POSTsearch').then(xhr => {
      expect(xhr.response.statusCode).to.eq(200)
    })
    cy.wait('@POSTsearch').then(xhr => {
      expect(xhr.response.statusCode).to.eq(200)
    })
    cy.wait(1500)
  })
  Cypress.Commands.add('selectNewSearchFilter', (oldFilter, newFilter) => {
    cy.contains('.value-container', oldFilter).click()
    cy.contains('.option', newFilter).click()
    cy.get('.text-overflow-ellipsis').should('contain', newFilter)
  })

  Cypress.Commands.add('getScreenshot', () => {
    // const addContext = require('mochawesome/addContext');
    if (scteenShotStatus === true){
      cy.screenshot().then(value => {
        // console.log(value)
        // addContext(this, value);
      })
      
    } else{}
  })
  
  
  //checks

  Cypress.Commands.add('waitForOneSearchResponse', () => {
    intercepter()
    cy.wait('@POSTsearch').then(xhr => {
      expect(xhr.response.statusCode).to.eq(200)
    })
    cy.wait(1000)
  });

  Cypress.Commands.add('checkVisibility', (selector) => {
    cy.get(selector)
    .should('be.visible')
    .should('exist')
  });

  Cypress.Commands.add('checkInputField', (fieldName, text) => {
    cy.get(`input[data-analytics-label="${fieldName}"]`)
    .should('be.visible')
    .should('have.value', text)
  });

  Cypress.Commands.add('checkUrlEq', (url) => {
    cy.url().should('eq', url)
  })

  Cypress.Commands.add('checkSearchDealerResults', (field, expValue) => {
    cy.get('.details-container').eq(0).within(()=>{
      cy.get(`[itemprop="${field}"]`).should('have.text', expValue)
    })
  })

  Cypress.Commands.add('checkSearchResOnDealerPage', (field, expValue) => {
    cy.get(`[itemprop="${field}"]`).should('have.text', expValue)
})