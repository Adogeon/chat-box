describe("The Auth Process", () => {
  it("should transfer user to a the log in page", () => {
    cy.visit("/");
    cy.get('[data-testid="sign-in-form"').should("exist");
  });

  it("should be switchable between sign in and sign out page", () => {
    cy.get('[data-testid="login-mode-switch"]').click();
    cy.get('[data-testid="sign-up-form"]').should("exist");
    cy.get('[data-testid="login-mode-switch"]').click();
    cy.get('[data-testid="sign-in-form"]').should("exist");
    cy.get('[data-testid="login-mode-switch"]').click();
  });

  it("should allow user to sign up successfully", () => {
    cy.get("input[name=username]").type("testbot1");
    cy.get("input[name=email]").type("test1@bot.edu");
    cy.get("input[name=password]").type(`testtesttest`);
    cy.get("input[name=repassword").type(`testtesttest{enter}`);

    cy.url().should("not.contain", "/login", () => {
      expect(localStorage.get("authToken")).to.exist().and.not.equal("");
    });
  });

  it("should allow user to sign out", () => {
    cy.get('[data-testid="sign-out-button"]').click();

    cy.url().should("contain", "/login", () => {
      expect(localStorage.get("authToken")).to.not.exist();
    });
  });

  it("should allow user to sign in", () => {
    cy.get("input[name=username]").type("testbot1");
    cy.get("input[name=password]").type(`testtesttest{enter}`);
    cy.url().should("not.contain", "/login", () => {
      expect(localStorage.get("authToken")).to.exist().and.not.equal("");
    });
  });
});
