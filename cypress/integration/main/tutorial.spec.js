import {ko, es} from '../../../source/tutorial-scripts/language_tutorial.js';

// array of HTML id's of each slide title
const headerIDs = ['#tutorial-what-is', '#tutorial-how-to', '#tutorial-efficient', '#tutorial-break', '#tutorial-settings', 
'#personalization-header','#accessibility-header','#tutorial-stats']

// array key values for imported arrays of translations of slide titles 
const slideHeaders = ['tutorialWhatIs','tutorialHowTo', 'tutorialEfficient', 'tutorialBreak' , 'tutorialSettings', 
'tutorialPersonalization','tutorialAccessibility', 'tutorialStats']

// HTML id's of box buttons at bottom of pane to change to any slide 
const boxElems = ['#pageZero', '#pageOne', '#pageTwo', '#pageThree', '#pageFour', '#pageFive', '#pageSix', '#pageSeven']

const numSlides = 8

describe('Tutorial User Tests', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/');
  });

  it('Looping through twice using right arrow, leaving and repeat', () => {
    cy.get('#info-open-button').click()
    // wrapping around twice going forward
    for (let i = 0; i < 2*numSlides; i++) {
      cy.document().then((doc) => {
        const index = i % numSlides
        expect(doc.querySelectorAll('.item')[index].classList.contains('active')).to.equal(true)
        
      })
      cy.get('#arrow-right').click()
    }

    //stepping out of tutorial and coming back in 
    cy.get('#go-back-button').click()
    cy.get('#info-open-button').click()
    
    //repeating after coming back in
    for (let i = 0; i < 2*numSlides; i++) {
      cy.document().then((doc) => {
        const index = i % numSlides
        expect(doc.querySelectorAll('.item')[index].classList.contains('active')).to.equal(true)
        
      })
      cy.get('#arrow-right').click()
    }
  });
  
    it('Looping through twice using left arrow, leaving and repeat', () => {  
      cy.get('#info-open-button').click()    
      // wrapping around twice going forward
      for (let i = 2*numSlides; i >= 0; i--) {
        const index = i % numSlides
        cy.document().then((doc) => {
          expect(doc.querySelectorAll('.item')[index].classList.contains('active')).to.equal(true)
          
        })
        cy.get('#arrow-left').click()
      }
    //stepping out of tutorial and coming back in 
    cy.get('#go-back-button').click()
    cy.get('#info-open-button').click()
    
    //repeating after coming back in
    for (let i = 0; i < 2*numSlides; i++) {
      cy.document().then((doc) => {
        const index = i % numSlides
        expect(doc.querySelectorAll('.item')[index].classList.contains('active')).to.equal(true)
        
      })
      cy.get('#arrow-right').click()
    }
    });

    it('Randomly jumping to different slides with box buttons', () => {  
      cy.get('#info-open-button').click()    
      //jumping randomly 30 times 
      for (let i = 0; i < 30; i++) {
        let index = Math.floor(Math.random() * numSlides);
        cy.get(boxElems[index]).click()
        cy.document().then((doc) => {
          expect(doc.querySelectorAll('.item')[index].classList.contains('active')).to.equal(true) 
        })
      }
    });

    it('Testing Spanish Tutorial for all slides', () => { 
      //opening setting pane to change language 
      cy.get("#settings-open-button").click();
      cy.get('select').eq(1).select('es');
      cy.get("#settings-close-button").click();

      cy.get('#info-open-button').click()

      for (let i = 0; i < numSlides; i++) {
          const expectedTitle = es[slideHeaders[i]]
          cy.get(headerIDs[i]).then(($el) => {
            const slideHeader = $el.text(); 
        
            expect(slideHeader).to.eq(expectedTitle);
          });
          
        cy.get('#arrow-right').click()
      }
    });

    it('Testing Korean Tutorial for all slides', () => { 
      //opening setting pane to change language 
      cy.get("#settings-open-button").click();
      cy.get('select').eq(1).select('ko');
      cy.get("#settings-close-button").click();

      cy.get('#info-open-button').click()

      for (let i = 0; i < numSlides; i++) {
          const expectedTitle = ko[slideHeaders[i]]
          cy.get(headerIDs[i]).then(($el) => {
            const slideHeader = $el.text(); 
        
            expect(slideHeader).to.eq(expectedTitle);
          });
          
        cy.get('#arrow-right').click()
      }
    });
});
