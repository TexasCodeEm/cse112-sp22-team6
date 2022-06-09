describe('Changing Language Tests', () => {
    beforeEach(() => {
      cy.visit('http://127.0.0.1:5500/');
      cy.get('#settings-open-button').click();
    });

  it('Clicking first language', () => {
    cy.get('select').eq(1).select('enUS');

    cy.get('#pomobear-header').should('have.text', 'Pomobear');
    cy.get('#settings-header').should('have.text', 'Settings');
    cy.get('#stats-header').should('have.text', 'User Statistics');
  });

  it('Clicking second language', () => {
    cy.get('select').eq(1).select('ko');
    
    cy.get('#pomobear-header').should('have.text', '뽀모곰');
    cy.get('#settings-header').should('have.text', '설정');
    cy.get('#stats-header').should('have.text', '사용자 통계');
  });

  it('Clicking third language', () => {
    cy.get('select').eq(1).select('es');

    cy.get('#pomobear-header').should('have.text', 'Oso pomodoro');
    cy.get('#settings-header').should('have.text', 'Configuración');
    cy.get('#stats-header').should('have.text', 'Estadísticas de usuario');
  });

  it('Changing language multiple times and repeat', () => {

    cy.get('select').eq(1).select('es');

    cy.get('#pomobear-header').should('have.text', 'Oso pomodoro');
    cy.get('#settings-header').should('have.text', 'Configuración');
    cy.get('#stats-header').should('have.text', 'Estadísticas de usuario');

    cy.get('select').eq(1).select('enUS');

    cy.get('#pomobear-header').should('have.text', 'Pomobear');
    cy.get('#settings-header').should('have.text', 'Settings');
    cy.get('#stats-header').should('have.text', 'User Statistics');

    cy.get('select').eq(1).select('ko');

    cy.get('#pomobear-header').should('have.text', '뽀모곰');
    cy.get('#settings-header').should('have.text', '설정');
    cy.get('#stats-header').should('have.text', '사용자 통계');

    cy.get('select').eq(1).select('ko');

    cy.get('#pomobear-header').should('have.text', '뽀모곰');
    cy.get('#settings-header').should('have.text', '설정');
    cy.get('#stats-header').should('have.text', '사용자 통계');

    cy.get('select').eq(1).select('ko');

    cy.get('#pomobear-header').should('have.text', '뽀모곰');
    cy.get('#settings-header').should('have.text', '설정');
    cy.get('#stats-header').should('have.text', '사용자 통계');
  });
  });