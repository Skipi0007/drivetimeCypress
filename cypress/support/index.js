// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import addContext from "mochawesome/addContext";
// import fs from "fs-extra"

const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/

Cypress.on('uncaught:exception', (err) => {
    /* returning false here prevents Cypress from failing the test */
    if (resizeObserverLoopErrRe.test(err.message)) {
        return false
    }
})

// const fs = require('fs');
//         const dir = `assets/${Cypress.spec.name}/`;
//         let filesCount
//         fs.readdir(dir, function(err, files) {
//         console.log(files.length);
        
        // let i = 0
        // while (i<files.length){
        //     if (i===0) {
        //         let screenshot =`assets/${Cypress.spec.name}/${runnable.parent.title} -- ${test.title}.png`;
        //         // addContext({ test }, screenshot);
        //     } else {
        //         let screenshot1 =`assets/${Cypress.spec.name}/${runnable.parent.title} -- ${test.title} (${i}).png`;
        //         // addContext({ test }, screenshot1);
        //     }
        //     ++i
//         }
//         return (filesCount = files.length)
//         });
var screenShotCount = 1
let valuesetter = function(val){
    if (`${Cypress.spec.name}` === 'MainPage.spec.js'){
        return (val = 7)
    } else if (`${Cypress.spec.name}` === 'SearchCarsPage.spec.js'){
        return (val = 13)
    } else if (`${Cypress.spec.name}` === 'FindDealershipPage.spec.js'){
        return (val = 3)
    } else {
        return (val = 1)
    }
}
valuesetter(screenShotCount) 



Cypress.on("test:after:run", function(test, runnable) {  
    if (test.state === "failed") {    
      const screenshot       =`assets/${Cypress.spec.name}/${runnable.parent.title} -- ${test.title} (failed).png`;   
      console.log(screenshot) 
      addContext({ test }, screenshot);  
    }
  });

  Cypress.on("test:after:run", function(test, runnable) { 
    
    if (test.state === "passed") {
        // cy.exec('cd ~/ && cd Documents/Repos/DriverTime/cypress/reports/mocha/assets/${Cypress.spec.name}/ && rm * && y')
        if (`${Cypress.spec.name}` === 'MainPage.spec.js'){
                let i = 0
            while (i < 7){
                if (i===0) {
                    let screenshot =`assets/${Cypress.spec.name}/${runnable.parent.title} -- ${test.title}.png`;
                    addContext({ test }, screenshot);
                } else {
                    let screenshot1 =`assets/${Cypress.spec.name}/${runnable.parent.title} -- ${test.title} (${i}).png`;
                    addContext({ test }, screenshot1);
                }
                ++i
            }
        } else if (`${Cypress.spec.name}` === 'SearchCarsPage.spec.js'){
                let i = 0
            while (i < 13){
                if (i===0) {
                    let screenshot =`assets/${Cypress.spec.name}/${runnable.parent.title} -- ${test.title}.png`;
                    addContext({ test }, screenshot);
                } else {
                    let screenshot1 =`assets/${Cypress.spec.name}/${runnable.parent.title} -- ${test.title} (${i}).png`;
                    addContext({ test }, screenshot1);
                }
                ++i
            }
        } else if (`${Cypress.spec.name}` === 'FindDealershipPage.spec.js'){
                let i = 0
            while (i < 3){
                if (i===0) {
                    let screenshot =`assets/${Cypress.spec.name}/${runnable.parent.title} -- ${test.title}.png`;
                    addContext({ test }, screenshot);
                } else {
                    let screenshot1 =`assets/${Cypress.spec.name}/${runnable.parent.title} -- ${test.title} (${i}).png`;
                    addContext({ test }, screenshot1);
                }
                ++i
            }
        } else {
                let i = 0
            while (i < 1){
                if (i===0) {
                    let screenshot =`assets/${Cypress.spec.name}/${runnable.parent.title} -- ${test.title}.png`;
                    addContext({ test }, screenshot);
                } else {
                    let screenshot1 =`assets/${Cypress.spec.name}/${runnable.parent.title} -- ${test.title} (${i}).png`;
                    addContext({ test }, screenshot1);
                }
                ++i
            }
        }

 
    }
  });

// import '@cypress/code-coverage/support'
// import '@shelex/cypress-allure-plugin';
// import 'cypress-plugin-snapshots/commands';

import './commands'
import './mainCommand.spec'
import 'cypress-react-selector';

// Alternatively you can use CommonJS syntax:
// require('./commands')
