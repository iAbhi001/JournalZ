describe("Forgot Password Page", () => {
    beforeEach(() => {
        cy.clearCookies(); // Clear cookies before tests
    cy.visit("/forgot-password"); // Navigate to the Forgot Password page
    });
  
    it("displays the Forgot Password form", () => {
      cy.get("h4").contains("Forgot Password"); // Verify title
      cy.get("input[placeholder='Email']").should("exist"); // Check for email input
      cy.get("button").contains("Send Reset Link").should("exist"); // Check for reset link button
    });
  
    it("sends a reset link for a valid registered email", () => {
      const registeredEmail = "user1733735189122@example.com"; // Replace with a valid test email
      cy.get("input[placeholder='Email']").type(registeredEmail);
      cy.get("button").contains("Send Reset Link").click();
  
      // Verify success message
      cy.get(".MuiAlert-root").should("contain", "Reset link sent to your email.");
    });
  
    it("shows an error for an unregistered email", () => {
      const unregisteredEmail = "invaliduser@example.com";
      cy.get("input[placeholder='Email']").type(unregisteredEmail);
      cy.get("button").contains("Send Reset Link").click();
  
      // Verify error message
      cy.get(".MuiAlert-root").should("contain", "User not found.");
    });
  
    it("shows an error for invalid email format", () => {
      const invalidEmail = "not-an-email";
      cy.get("input[placeholder='Email']").type(invalidEmail);
      cy.get("button").contains("Send Reset Link").click();
  
      // Verify error message
      cy.get(".MuiAlert-root").should("contain", "Invalid email format.");
    });
  
    it("disables the button while processing", () => {
      const validEmail = "testuser@example.com";
      cy.get("input[placeholder='Email']").type(validEmail);
      cy.get("button").contains("Send Reset Link").click();
  
      // Verify button is disabled during processing
      cy.get("button").should("be.disabled");
    });
  });
  