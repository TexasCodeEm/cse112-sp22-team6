const background_1_path = 'url("http://127.0.0.1:5500/images/background.svg")';
const background_2_path = 'url("http://127.0.0.1:5500/images/background2.svg")';
const background_3_path = 'url("http://127.0.0.1:5500/images/background3.svg")';


describe('Combinations of background and colorblind', () => {
    beforeEach(() => {
      cy.visit('http://127.0.0.1:5500/');
    });
  it('Changing to second background then adding colorblind', () => {
    cy.get('#settings-open-button').click();

    cy.get('select').eq(0).select('desert');
    expect(
      cy.get('html').should('have.css', 'background-image', background_2_path)
    );
    expect(
        cy.get("html").should('have.css', 'font-weight', '400'),
        cy.get("html").should('have.css', 'font-size', '16px')
      );

    cy.get('#colors-switch').check({force: true}); 
    expect(
        cy.get("html").should('have.css', 'font-weight', '700'), 
        cy.get("html").should('have.css', 'font-size', '17.6px')
      );
    
  });

  it('Changing to third background then adding colorblind', () => {
    cy.get('#settings-open-button').click();

    cy.get('select').eq(0).select('lake');
    expect(
      cy.get('html').should('have.css', 'background-image', background_3_path)
    );
    expect(
        cy.get("html").should('have.css', 'font-weight', '400'),
        cy.get("html").should('have.css', 'font-size', '16px')
      );

    cy.get('#colors-switch').check({force: true}); 
    expect(
        cy.get("html").should('have.css', 'font-weight', '700'), 
        cy.get("html").should('have.css', 'font-size', '17.6px')
      );
    
  });

  it('Changing background multiple times then colorblind ', () => {
    cy.get('#settings-open-button').click();

    cy.get('select').eq(0).select('lake');
    expect(
      cy.get('html').should('have.css', 'background-image', background_3_path)
    );
    cy.get('select').eq(0).select('original');
    expect(
      cy.get('html').should('have.css', 'background-image', background_1_path)
    );
    cy.get('select').eq(0).select('desert');
    expect(
      cy.get('html').should('have.css', 'background-image', background_2_path)
    );
    expect(
        cy.get("html").should('have.css', 'font-weight', '400'),
        cy.get("html").should('have.css', 'font-size', '16px')
      );

    cy.get('#colors-switch').check({force: true}); 
    expect(
        cy.get("html").should('have.css', 'font-weight', '700'), 
        cy.get("html").should('have.css', 'font-size', '17.6px')
      );
    
  });

  it('repeatedly toggling accessibility and background ', () => {
    cy.get('#settings-open-button').click();
    expect(
        cy.get("html").should('have.css', 'font-weight', '400'),
        cy.get("html").should('have.css', 'font-size', '16px')
      );

    cy.get('#colors-switch').check({force: true}); 
    expect(
        cy.get("html").should('have.css', 'font-weight', '700'), 
        cy.get("html").should('have.css', 'font-size', '17.6px')
      );
    cy.get('#colors-switch').uncheck({force: true}); 
    expect(
        cy.get("html").should('have.css', 'font-weight', '400'),
        cy.get("html").should('have.css', 'font-size', '16px')
      );

    cy.get('#colors-switch').check({force: true}); 
    expect(
        cy.get("html").should('have.css', 'font-weight', '700'), 
        cy.get("html").should('have.css', 'font-size', '17.6px')
      );

    cy.get('select').eq(0).select('lake');
    expect(
      cy.get('html').should('have.css', 'background-image', background_3_path)
    );
    expect(
        cy.get("html").should('have.css', 'font-weight', '700'),
        cy.get("html").should('have.css', 'font-size', '17.6px')
      );
      cy.get('select').eq(0).select('desert');
      expect(
        cy.get('html').should('have.css', 'background-image', background_2_path)
      );
      expect(
          cy.get("html").should('have.css', 'font-weight', '700'),
          cy.get("html").should('have.css', 'font-size', '17.6px')
        );

    cy.get('#colors-switch').uncheck({force: true}); 
    expect(
        cy.get("html").should('have.css', 'font-weight', '400'), 
        cy.get("html").should('have.css', 'font-size', '16px')
      );
    
  });
});

  describe('Combinations of background and language', () => {
    beforeEach(() => {
      cy.visit('http://127.0.0.1:5500/');
    });

  it('Changing to second background then changing to all languages', () => {
    cy.get('#settings-open-button').click();

    cy.get('select').eq(0).select('desert');
    expect(
      cy.get('html').should('have.css', 'background-image', background_2_path)
    );

    cy.get('select').eq(1).select('ko');
    
    cy.get("#pomobear-header").should('have.text', '뽀모곰');
    cy.get("#settings-header").should('have.text', '설정');
    cy.get("#stats-header").should('have.text', '사용자 통계');

    cy.get('select').eq(1).select('es');

    cy.get("#pomobear-header").should('have.text', 'Oso pomodoro');
    cy.get("#settings-header").should('have.text', 'Configuración');
    cy.get("#stats-header").should('have.text', 'Estadísticas de usuario');

    cy.get('select').eq(1).select('enUS');

    cy.get("#pomobear-header").should('have.text', 'Pomobear');
    cy.get("#settings-header").should('have.text', 'Settings');
    cy.get("#stats-header").should('have.text', 'User Statistics');
    
  });

  it('Changing to third background then changing all languages', () => {
    cy.get('#settings-open-button').click();

    cy.get('select').eq(0).select('lake');
    expect(
      cy.get('html').should('have.css', 'background-image', background_3_path)
    );

    cy.get('select').eq(1).select('ko');
    
    cy.get("#pomobear-header").should('have.text', '뽀모곰');
    cy.get("#settings-header").should('have.text', '설정');
    cy.get("#stats-header").should('have.text', '사용자 통계');

    cy.get('select').eq(1).select('es');

    cy.get("#pomobear-header").should('have.text', 'Oso pomodoro');
    cy.get("#settings-header").should('have.text', 'Configuración');
    cy.get("#stats-header").should('have.text', 'Estadísticas de usuario');

    cy.get('select').eq(1).select('enUS');

    cy.get("#pomobear-header").should('have.text', 'Pomobear');
    cy.get("#settings-header").should('have.text', 'Settings');
    cy.get("#stats-header").should('have.text', 'User Statistics');
    
  });

  it('Changing backgrounds interwined with changing languages', () => {
    cy.get('#settings-open-button').click();

    cy.get('select').eq(0).select('lake');
    expect(
      cy.get('html').should('have.css', 'background-image', background_3_path)
    );

    cy.get('select').eq(1).select('ko');
    
    cy.get("#pomobear-header").should('have.text', '뽀모곰');
    cy.get("#settings-header").should('have.text', '설정');
    cy.get("#stats-header").should('have.text', '사용자 통계');

    cy.get('select').eq(0).select('original');
    expect(
      cy.get('html').should('have.css', 'background-image', background_1_path)
    );

    cy.get('select').eq(1).select('es');

    cy.get("#pomobear-header").should('have.text', 'Oso pomodoro');
    cy.get("#settings-header").should('have.text', 'Configuración');
    cy.get("#stats-header").should('have.text', 'Estadísticas de usuario');

    cy.get('select').eq(0).select('desert');
    expect(
      cy.get('html').should('have.css', 'background-image', background_2_path)
    );

    cy.get('select').eq(1).select('enUS');

    cy.get("#pomobear-header").should('have.text', 'Pomobear');
    cy.get("#settings-header").should('have.text', 'Settings');
    cy.get("#stats-header").should('have.text', 'User Statistics');
    
  });
    
});

  describe('Combinations of languages and colorblind', () => {
    beforeEach(() => {
      cy.visit('http://127.0.0.1:5500/');
    });

  it('Changing languages when in colorblind mode', () => {
    cy.get('#settings-open-button').click();
    expect(
        cy.get("html").should('have.css', 'font-weight', '400'),
        cy.get("html").should('have.css', 'font-size', '16px')
      );

    cy.get('#colors-switch').check({force: true}); 
    expect(
        cy.get("html").should('have.css', 'font-weight', '700'), 
        cy.get("html").should('have.css', 'font-size', '17.6px')
      );

      cy.get('select').eq(1).select('ko');
      
      cy.get("#pomobear-header").should('have.text', '뽀모곰');
      cy.get("#settings-header").should('have.text', '설정');
      cy.get("#stats-header").should('have.text', '사용자 통계');
  
      cy.get('select').eq(1).select('es');
  
      cy.get("#pomobear-header").should('have.text', 'Oso pomodoro');
      cy.get("#settings-header").should('have.text', 'Configuración');
      cy.get("#stats-header").should('have.text', 'Estadísticas de usuario');
  
      cy.get('select').eq(1).select('enUS');
  
      cy.get("#pomobear-header").should('have.text', 'Pomobear');
      cy.get("#settings-header").should('have.text', 'Settings');
      cy.get("#stats-header").should('have.text', 'User Statistics');

  });

  it('Changing languages when in colorblind mode', () => {
    cy.get('#settings-open-button').click();
    expect(
        cy.get("html").should('have.css', 'font-weight', '400'),
        cy.get("html").should('have.css', 'font-size', '16px')
      );

    cy.get('#colors-switch').check({force: true}); 
    expect(
        cy.get("html").should('have.css', 'font-weight', '700'), 
        cy.get("html").should('have.css', 'font-size', '17.6px')
      );

      cy.get('select').eq(1).select('ko');
      
      cy.get("#pomobear-header").should('have.text', '뽀모곰');
      cy.get("#settings-header").should('have.text', '설정');
      cy.get("#stats-header").should('have.text', '사용자 통계');
  
      cy.get('select').eq(1).select('es');
  
      cy.get("#pomobear-header").should('have.text', 'Oso pomodoro');
      cy.get("#settings-header").should('have.text', 'Configuración');
      cy.get("#stats-header").should('have.text', 'Estadísticas de usuario');
  
      cy.get('select').eq(1).select('enUS');
  
      cy.get("#pomobear-header").should('have.text', 'Pomobear');
      cy.get("#settings-header").should('have.text', 'Settings');
      cy.get("#stats-header").should('have.text', 'User Statistics');

  });


  it('Changing languages are repeatedly toggling colorblind ', () => {
    cy.get('#settings-open-button').click();
    expect(
        cy.get("html").should('have.css', 'font-weight', '400'),
        cy.get("html").should('have.css', 'font-size', '16px')
      );

    cy.get('#colors-switch').check({force: true}); 
    expect(
        cy.get("html").should('have.css', 'font-weight', '700'), 
        cy.get("html").should('have.css', 'font-size', '17.6px')
      );
    cy.get('#colors-switch').uncheck({force: true}); 
    expect(
        cy.get("html").should('have.css', 'font-weight', '400'),
        cy.get("html").should('have.css', 'font-size', '16px')
      );

    cy.get('#colors-switch').check({force: true}); 
    expect(
        cy.get("html").should('have.css', 'font-weight', '700'), 
        cy.get("html").should('have.css', 'font-size', '17.6px')
      );
      cy.get('select').eq(1).select('ko');
      
      cy.get("#pomobear-header").should('have.text', '뽀모곰');
      cy.get("#settings-header").should('have.text', '설정');
      cy.get("#stats-header").should('have.text', '사용자 통계');
  
      cy.get('select').eq(1).select('es');
  
      cy.get("#pomobear-header").should('have.text', 'Oso pomodoro');
      cy.get("#settings-header").should('have.text', 'Configuración');
      cy.get("#stats-header").should('have.text', 'Estadísticas de usuario');
  
      cy.get('select').eq(1).select('enUS');
  
      cy.get("#pomobear-header").should('have.text', 'Pomobear');
      cy.get("#settings-header").should('have.text', 'Settings');
      cy.get("#stats-header").should('have.text', 'User Statistics');
    
    cy.get('#colors-switch').uncheck({force: true}); 
    expect(
        cy.get("html").should('have.css', 'font-weight', '400'), 
        cy.get("html").should('have.css', 'font-size', '16px')
      );
  });

  it('Intertwine changing languages and toggling colorblind ', () => {
    cy.get('#settings-open-button').click();
    expect(
        cy.get("html").should('have.css', 'font-weight', '400'),
        cy.get("html").should('have.css', 'font-size', '16px')
      );

    cy.get('#colors-switch').check({force: true}); 
    expect(
        cy.get("html").should('have.css', 'font-weight', '700'), 
        cy.get("html").should('have.css', 'font-size', '17.6px')
      );

      cy.get('select').eq(1).select('es');
  
      cy.get("#pomobear-header").should('have.text', 'Oso pomodoro');
      cy.get("#settings-header").should('have.text', 'Configuración');
      cy.get("#stats-header").should('have.text', 'Estadísticas de usuario');

    cy.get('#colors-switch').uncheck({force: true}); 
    expect(
        cy.get("html").should('have.css', 'font-weight', '400'),
        cy.get("html").should('have.css', 'font-size', '16px')
      );

      cy.get('select').eq(1).select('ko');
      
      cy.get("#pomobear-header").should('have.text', '뽀모곰');
      cy.get("#settings-header").should('have.text', '설정');
      cy.get("#stats-header").should('have.text', '사용자 통계');

    cy.get('#colors-switch').check({force: true}); 
    expect(
        cy.get("html").should('have.css', 'font-weight', '700'), 
        cy.get("html").should('have.css', 'font-size', '17.6px')
      );
      cy.get('select').eq(1).select('ko');
      
      cy.get("#pomobear-header").should('have.text', '뽀모곰');
      cy.get("#settings-header").should('have.text', '설정');
      cy.get("#stats-header").should('have.text', '사용자 통계');
  
      cy.get('select').eq(1).select('enUS');
  
      cy.get("#pomobear-header").should('have.text', 'Pomobear');
      cy.get("#settings-header").should('have.text', 'Settings');
      cy.get("#stats-header").should('have.text', 'User Statistics');
    
    cy.get('#colors-switch').uncheck({force: true}); 
    expect(
        cy.get("html").should('have.css', 'font-weight', '400'), 
        cy.get("html").should('have.css', 'font-size', '16px')
      );

      cy.get('select').eq(1).select('es');
  
      cy.get("#pomobear-header").should('have.text', 'Oso pomodoro');
      cy.get("#settings-header").should('have.text', 'Configuración');
      cy.get("#stats-header").should('have.text', 'Estadísticas de usuario');
  });
});

describe('Combinations of languages, colorblind, and backgrounds', () => {
    beforeEach(() => {
      cy.visit('http://127.0.0.1:5500/');
    });

  it('Change one of each', () => {
    cy.get('#settings-open-button').click();
    expect(
        cy.get("html").should('have.css', 'font-weight', '400'),
        cy.get("html").should('have.css', 'font-size', '16px')
      );

    cy.get('#colors-switch').check({force: true}); 
    expect(
        cy.get("html").should('have.css', 'font-weight', '700'), 
        cy.get("html").should('have.css', 'font-size', '17.6px')
      );
  
      cy.get('select').eq(1).select('es');
  
      cy.get("#pomobear-header").should('have.text', 'Oso pomodoro');
      cy.get("#settings-header").should('have.text', 'Configuración');
      cy.get("#stats-header").should('have.text', 'Estadísticas de usuario')

      cy.get('select').eq(0).select('lake');
      expect(
        cy.get('html').should('have.css', 'background-image', background_3_path)
      );

  });

  it('Change multiple of each seperately', () => {
    cy.get('#settings-open-button').click();
    expect(
        cy.get("html").should('have.css', 'font-weight', '400'),
        cy.get("html").should('have.css', 'font-size', '16px')
      );

    cy.get('#colors-switch').check({force: true}); 
    expect(
        cy.get("html").should('have.css', 'font-weight', '700'), 
        cy.get("html").should('have.css', 'font-size', '17.6px')
      );

      cy.get('#colors-switch').uncheck({force: true}); 
      expect(
          cy.get("html").should('have.css', 'font-weight', '400'), 
          cy.get("html").should('have.css', 'font-size', '16px')
        );

        cy.get('#colors-switch').check({force: true}); 
        expect(
            cy.get("html").should('have.css', 'font-weight', '700'), 
            cy.get("html").should('have.css', 'font-size', '17.6px')
          );

      cy.get('select').eq(1).select('ko');
      
      cy.get("#pomobear-header").should('have.text', '뽀모곰');
      cy.get("#settings-header").should('have.text', '설정');
      cy.get("#stats-header").should('have.text', '사용자 통계');
  
      cy.get('select').eq(1).select('es');
  
      cy.get("#pomobear-header").should('have.text', 'Oso pomodoro');
      cy.get("#settings-header").should('have.text', 'Configuración');
      cy.get("#stats-header").should('have.text', 'Estadísticas de usuario');
  
      cy.get('select').eq(1).select('enUS');
  
      cy.get("#pomobear-header").should('have.text', 'Pomobear');
      cy.get("#settings-header").should('have.text', 'Settings');
      cy.get("#stats-header").should('have.text', 'User Statistics');

      cy.get('select').eq(0).select('desert');
      expect(
        cy.get('html').should('have.css', 'background-image', background_2_path)
      );

      cy.get('select').eq(0).select('original');
      expect(
        cy.get('html').should('have.css', 'background-image', background_1_path)
      );

      cy.get('select').eq(0).select('lake');
      expect(
        cy.get('html').should('have.css', 'background-image', background_3_path)
      );

  });


  it('Change multiple of each intertwined', () => {
    cy.get('#settings-open-button').click();
    expect(
        cy.get("html").should('have.css', 'font-weight', '400'),
        cy.get("html").should('have.css', 'font-size', '16px')
      );

    cy.get('#colors-switch').check({force: true}); 
    expect(
        cy.get("html").should('have.css', 'font-weight', '700'), 
        cy.get("html").should('have.css', 'font-size', '17.6px')
      );

      cy.get('select').eq(1).select('es');
  
      cy.get("#pomobear-header").should('have.text', 'Oso pomodoro');
      cy.get("#settings-header").should('have.text', 'Configuración');
      cy.get("#stats-header").should('have.text', 'Estadísticas de usuario');

      cy.get('select').eq(0).select('original');
      expect(
        cy.get('html').should('have.css', 'background-image', background_1_path)
      );

      cy.get('#colors-switch').uncheck({force: true}); 
      expect(
          cy.get("html").should('have.css', 'font-weight', '400'), 
          cy.get("html").should('have.css', 'font-size', '16px')
        );

        cy.get('select').eq(0).select('lake');
        expect(
          cy.get('html').should('have.css', 'background-image', background_3_path)
        );

        cy.get('select').eq(1).select('ko');
      
        cy.get("#pomobear-header").should('have.text', '뽀모곰');
        cy.get("#settings-header").should('have.text', '설정');
        cy.get("#stats-header").should('have.text', '사용자 통계');

        cy.get('#colors-switch').check({force: true}); 
        expect(
            cy.get("html").should('have.css', 'font-weight', '700'), 
            cy.get("html").should('have.css', 'font-size', '17.6px')
          );
  
      cy.get('select').eq(1).select('enUS');
  
      cy.get("#pomobear-header").should('have.text', 'Pomobear');
      cy.get("#settings-header").should('have.text', 'Settings');
      cy.get("#stats-header").should('have.text', 'User Statistics');

      cy.get('select').eq(0).select('desert');
      expect(
        cy.get('html').should('have.css', 'background-image', background_2_path)
      );
  });

  it('Intertwine changing languages and toggling colorblind ', () => {
    cy.get('#settings-open-button').click();
    expect(
        cy.get("html").should('have.css', 'font-weight', '400'),
        cy.get("html").should('have.css', 'font-size', '16px')
      );

    cy.get('#colors-switch').check({force: true}); 
    expect(
        cy.get("html").should('have.css', 'font-weight', '700'), 
        cy.get("html").should('have.css', 'font-size', '17.6px')
      );

      cy.get('select').eq(1).select('es');
  
      cy.get("#pomobear-header").should('have.text', 'Oso pomodoro');
      cy.get("#settings-header").should('have.text', 'Configuración');
      cy.get("#stats-header").should('have.text', 'Estadísticas de usuario');

    cy.get('#colors-switch').uncheck({force: true}); 
    expect(
        cy.get("html").should('have.css', 'font-weight', '400'),
        cy.get("html").should('have.css', 'font-size', '16px')
      );

      cy.get('select').eq(1).select('ko');
      
      cy.get("#pomobear-header").should('have.text', '뽀모곰');
      cy.get("#settings-header").should('have.text', '설정');
      cy.get("#stats-header").should('have.text', '사용자 통계');

    cy.get('#colors-switch').check({force: true}); 
    expect(
        cy.get("html").should('have.css', 'font-weight', '700'), 
        cy.get("html").should('have.css', 'font-size', '17.6px')
      );
      cy.get('select').eq(1).select('ko');
      
      cy.get("#pomobear-header").should('have.text', '뽀모곰');
      cy.get("#settings-header").should('have.text', '설정');
      cy.get("#stats-header").should('have.text', '사용자 통계');
  
      cy.get('select').eq(1).select('enUS');
  
      cy.get("#pomobear-header").should('have.text', 'Pomobear');
      cy.get("#settings-header").should('have.text', 'Settings');
      cy.get("#stats-header").should('have.text', 'User Statistics');
    
    cy.get('#colors-switch').uncheck({force: true}); 
    expect(
        cy.get("html").should('have.css', 'font-weight', '400'), 
        cy.get("html").should('have.css', 'font-size', '16px')
      );
      
      cy.get('select').eq(1).select('es');
  
      cy.get("#pomobear-header").should('have.text', 'Oso pomodoro');
      cy.get("#settings-header").should('have.text', 'Configuración');
      cy.get("#stats-header").should('have.text', 'Estadísticas de usuario');
  });
});