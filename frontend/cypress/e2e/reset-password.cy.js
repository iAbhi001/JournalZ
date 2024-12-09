describe("Reset Password Page", () => {
    beforeEach(() => {
      // Navigate to the reset password page with a mock token
      cy.visit("/reset-password/mockValidToken");
    });
  
    it("displays the reset password form", () => {
      // Check for title and input fields
      cy.get("h4").contains("Reset Password"); // Verify title
      cy.get("input[placeholder='New Password']").should("exist");
      cy.get("input[placeholder='Confirm Password']").should("exist");
      cy.get("button").contains("Reset Password").should("exist");
    });
  
    it("shows an error for empty fields", () => {
      // Click reset without filling any fields
      cy.get("button").contains("Reset Password").click();
  
      // Verify error message
      cy.get(".MuiAlert-root").should("contain", "Passwords cannot be empty");
    });
  
    it("shows an error for mismatched passwords", () => {
      // Enter passwords that don't match
      cy.get("input[placeholder='New Password']").type("newPassword123");
      cy.get("input[placeholder='Confirm Password']").type("differentPassword");
      cy.get("button").contains("Reset Password").click();
  
      // Verify error message
      cy.get(".MuiAlert-root").should("contain", "Passwords do not match");
    });
  
    it("shows an error for invalid or expired token", () => {
      // Simulate invalid token
      cy.visit("/reset-password/mockInvalidToken");
  
      // Enter passwords
      cy.get("input[placeholder='New Password']").type("newPassword123");
      cy.get("input[placeholder='Confirm Password']").type("newPassword123");
      cy.get("button").contains("Reset Password").click();
  
      // Verify error message
      cy.get(".MuiAlert-root").should("contain", "Invalid or expired token");
    });
  });
  