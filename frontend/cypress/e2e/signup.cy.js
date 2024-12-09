describe("Signup Page", () => {
    beforeEach(() => {
      cy.clearCookies();
      cy.visit("/signup");
    });
  
    it("registers a new user with a unique email", () => {
      cy.fixture("emails").then((emails) => {
        const uniqueEmail =
          emails && emails.length > 0
            ? emails[Math.floor(Math.random() * emails.length)]
            : `user${Date.now()}@example.com`;
  
        cy.get("input[placeholder='Name']").type("Test User");
        cy.get("input[placeholder='Email']").type(uniqueEmail);
        cy.get("input[placeholder='Password']").type("password123");
        cy.get("input[placeholder='Confirm Password']").type("password123");
        cy.get("button").contains("Sign Up").click();
  
        cy.get(".MuiAlert-root").should(
          "contain",
          "Account created successfully! Redirecting to login..."
        );
        cy.url().should("include", "/login");
      });
    });
  });
  