
const runAt = Math.floor(Date.now() / 1000);
const username = `cypressUser_${runAt}`;

describe('App', () => {
  beforeEach(() => cy.visit('/'));

  it('should login and share a movie correctly', () => {
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type('cypressUser');
    cy.contains('Login / Register').click();

    cy.contains('Welcome cypressUser').should('be.visible');
    cy.contains('Share a movie').click();

    cy.get('input[name="url"]').type('https://www.youtube.com/watch?v=9c87NbLjH0I');
    cy.get('[data-testid="share-button"]').click();

    cy.contains('Shared by: cypressUser').should('be.visible');
    cy.contains('Description:').should('be.visible');
    cy.contains('BLACKPINK - 7th ANNIVERSARY').should('be.visible');
    cy.contains('#BLACKPINK #블랙핑크 #20230808 #THEBLACKPINKQUIZ #BLACKPINK7thANNIVERSARY #7YEARSWITHBLINKS #YG').should('be.visible');

    cy.contains('Logout').click();
    cy.contains('Login / Register').should('be.visible');
  });

  it('should NOT login', () => {
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type('abc');
    cy.contains('Login / Register').click();
    cy.contains('Login / Register').should('be.visible');
  });
});
