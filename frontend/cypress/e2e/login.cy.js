describe("Login Page", () => {
    beforeEach(() => {
        cy.clearCookies(); // Clear cookies before tests
        cy.visit("/login"); // Navigate to the login page

});

it("displays the login form", () => {
      cy.get("h4").contains("Login"); // Check for the title
      cy.get("input[placeholder='Email']").should("exist"); // Check for email input
      cy.get("input[placeholder='Password']").should("exist"); // Check for password input
    });
  
    it("shows an error for invalid credentials", () => {
      cy.get("input[placeholder='Email']").type("invalid@example.com");
      cy.get("input[placeholder='Password']").type("wrongpassword");
      cy.get("button").contains("Login").click();
  
      cy.get(".MuiAlert-root").should("contain", "Invalid email or password");
    });
  
    it("redirects to the dashboard after successful login", () => {
        cy.get("label").contains("Email").parent().find("input").type("hi@ex.com");
        cy.get("label").contains("Password").parent().find("input").type("1234");
        cy.get("button").contains("Login").click();
        cy.url().should("include", "/dashboard");
      });
      
  });
  