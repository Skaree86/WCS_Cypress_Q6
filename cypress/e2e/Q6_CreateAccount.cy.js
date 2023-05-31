import { MailSlurp } from "mailslurp-client";
import { faker } from "@faker-js/faker";

describe("Backmarket", () => {
  // let userEmail = faker.internet.email();

  it.skip("creation de compte", () => {
    cy.intercept({
      url: "https://preprod.backmarket.fr/bm/search/v2/popular",
      method: "GET",
    }).as("loadRegisterPage");
    cy.intercept({
      url: "https://preprod.backmarket.fr/bm/search/v2/popular",
      method: "POST",
    }).as("getToken");

    cy.visit("https://preprod.backmarket.fr/fr-fr");
    cy.get(".mb-6 > .body-2-bold").click();
    cy.wait("@loadRegisterPage");
    cy.get('[data-test="icon-avatar"] > .mr-5').click();
    cy.get("#email").type("0d7a0e78-706d-4fd3-b97f-67a577065b12@mailslurp.com");
    cy.get("#submit-login").click();
    cy.get("#password").type(
      faker.internet.password({ length: 10, RegExp: /\w/ })
    );
    cy.get('[data-testid="password-indicator"]').should(
      "have.class",
      "mr-2 h-2 w-2 shrink-0 rounded-full bg-neutral bg-success"
    );
    cy.get("#first-name").type("Testeur");
    cy.get("#last-name").type("WCS");
    // cy.get("#first-name").type(faker.person.firstName());
    // cy.get("#last-name").type(faker.person.lastName());
    cy.get(".cursor-pointer > .flex").click();
    cy.get("#submit-signup").click();
    cy.get(".bg-transparent > .body-1-light").click({});
  });

  it("recuperation de mdp", () => {
    cy.visit("https://preprod.backmarket.fr/fr-fr/password-reset");
    cy.get(".mb-6 > .body-2-bold").click();
    cy.get("#email").type("0d7a0e78-706d-4fd3-b97f-67a577065b12@mailslurp.com");
    cy.get('[data-test="password-reset-submit-button"]').click();
    cy.mailslurp()
      .then((mailslurp) =>
        mailslurp.waitForLatestEmail(
          "0d7a0e78-706d-4fd3-b97f-67a577065b12",
          40000,
          true
        )
      )
      .then(
        (
          email //expect(email.subject).to.contain("Nouveau mot de passe"));
        ) => cy.document().invoke("write", email.body)
      );
    cy.get(".t_pt20px > a").click();
    cy.get("#newPassword").type("Azerty14");
    cy.get("#newPasswordConfirmation").type("Azerty14");
    cy.get(".MkLAMntR").click();
    cy.get("#email").type("0d7a0e78-706d-4fd3-b97f-67a577065b12@mailslurp.com");
    cy.get("#submit-login").click();
    cy.get("#password").type("Azerty14");
    cy.get("#submit-login").click();
  });
});
