/// <reference types="Cypress" />
describe("Home page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should open homepage with list of top 20 movies", () => {
    cy.get('[data-test-id="movie-list-item"]').should("have.length", 20);
  });
  it("should navigate to movie details after clicking on the poster", () => {
    cy.get('[data-test-id="movie-list-item"]:first').click();
    cy.url().should("match", /\/movies\/\d+$/);
    cy.contains("Synopsis");
  });
  it("should navigate to the New Movie Form", () => {
    cy.contains("Add Movie").click();
    cy.url().should("match", /\/movies\/new$/);
  });
});

describe("New Movie Form", () => {
  beforeEach(() => {
    cy.visit("/movies/new");
  });

  it("New Movie Form should run validation before submit", () => {
    cy.get('[data-test-id="create-submit-button"]').click();
    cy.contains("is required");
  });

  it("should not include delete buton", () => {
    cy.get('[data-test-id="remove-movie-button"]').should("not.exist");
  });

  it.skip("should fill the form and submit", () => {
    // TODO:
  });
});

describe("Edit Movie Form", () => {
  it("should navigate to Edit form from Movie List, by clicking on edit icon button", () => {
    cy.visit("/");
    cy.get(
      '[data-test-id="movie-list-item"]:first button[aria-label="edit"]'
    ).click();
    cy.url().should("match", /\/movies\/\d+\/edit$/);
  });
  it("should navigate to Edit form from Movie Details page, by clicking button", () => {
    cy.visit("/");
    cy.get('[data-test-id="movie-list-item"]:first').click();
    cy.url().should("match", /\/movies\/\d+$/);
    cy.get('[data-test-id="movie-edit-button"]').click();
    cy.url().should("match", /\/movies\/\d+\/edit$/);
  });
});

describe("Movie Search", () => {
  it("should be able to type search query and submit search form", () => {
    cy.visit("/");
    cy.get('input[aria-label="search"]')
      .type("Home Alone")
      .closest("form")
      .submit();
    cy.get('[data-test-id="movie-list-item"]').should("exist");
    cy.url().should("match", /search\?q=Home\+Alone/i);
  });
  it("should be able to search by modifying URL", () => {
    cy.visit("/search?q=Home+Alone");
    cy.get('[data-test-id="movie-list-item"]').should("exist");
  });
});
