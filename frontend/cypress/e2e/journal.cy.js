describe("Fetch Journals", () => {
    beforeEach(() => {
      // Visit the login page and perform login
      cy.visit("/login");
      cy.get("input[placeholder='Email']").type("hi@ex.com"); // Replace with valid credentials
      cy.get("input[placeholder='Password']").type("1234");
      cy.get("button").contains("Login").click();
  
      // Ensure successful login redirects to the dashboard
      cy.url().should("include", "/dashboard");
    });
  
    it("fetches and displays public journals", () => {
      // Navigate to the Public Journals page
      cy.contains("View Public Journals").click();
      cy.url().should("include", "/public-journals");
  
      // Check if journals are being fetched and displayed
      cy.get(".journal-card").should("have.length.at.least", 1); // Ensure at least one journal is displayed
      cy.get(".journal-card").first().within(() => {
        cy.get(".journal-title").should("exist"); // Ensure title exists
      });
    });
  
    it("fetches and displays user's own journals", () => {
      // Navigate to the My Journals page
      cy.contains("View My Journals").click();
      cy.url().should("include", "/my-journals");
  
      // Check if journals are being fetched and displayed
      cy.get(".journal-card").should("have.length.at.least", 1); // Ensure at least one journal is displayed
      cy.get(".journal-card").first().within(() => {
        cy.get(".journal-title").should("exist"); // Ensure title exists
      });
    });
  
  
  });
  