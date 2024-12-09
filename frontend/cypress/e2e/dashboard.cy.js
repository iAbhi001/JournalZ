describe("Dashboard Page", () => {
    beforeEach(() => {
      // Visit the login page and perform a normal login
      cy.visit("/login");
      cy.get("input[placeholder='Email']").type("hi@ex.com"); // Replace with valid credentials
      cy.get("input[placeholder='Password']").type("1234");
      cy.get("button").contains("Login").click();
  
      // Ensure successful login redirects to the dashboard
      cy.url().should("include", "/dashboard");
    });
  
    it("displays the main sections of the dashboard", () => {
 
      // Check the cards
      cy.contains("View Public Journals").should("exist");
      cy.contains("View My Journals").should("exist");
      cy.contains("My Profile").should("exist");
  
      // Check streaks
      cy.contains("Current Streak").should("exist");
    });
  
    it("navigates to Public Journals when the card is clicked", () => {
      cy.contains("View Public Journals").click();
      cy.url().should("include", "/public-journals");
    });
  
    it("navigates to My Journals when the card is clicked", () => {
      cy.contains("View My Journals").click();
      cy.url().should("include", "/my-journals");
    });
  
    it("navigates to My Profile when the card is clicked", () => {
      cy.contains("My Profile").click();
      cy.url().should("include", "/profile");
    });
  });
  