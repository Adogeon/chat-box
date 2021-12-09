describe("The Login Page", () => {
  it("should successfully loads", () => {
    cy.visit("http://localhost:3000/login");

    cy.get('[data-testid="sign-in-form"]');
  });

  it("should be switchable between sign in and sign out page", () => {
    cy.get('[data-testid="login-mode-switch"]').click();
    cy.get('[data-testid="sign-up-form"]').should("exist");
    cy.get('[data-testid="login-mode-switch"]').click();
    cy.get('[data-testid="sign-in-form"]').should("exist");
  });

  it("should log in user successfully", () => {
    cy.get("input[name=username]").type("testbot2");
    cy.get("input[name=password]").type(`testtesttest{enter}`);
    cy.url().should("not.contain", "/login");
  });
});
