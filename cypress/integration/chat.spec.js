const io = require("socket.io-client");

describe("The chat page", () => {
  before(() => {
    cy.task("seed:db");
  });

  beforeEach(() => {
    cy.request("POST", "/api/signin", {
      username: "testbot1",
      password: "testtesttest",
    }).then((resp) => {
      localStorage.setItem("authToken", resp.body.token);
    });

    cy.request("POST", "/api/signin", {
      username: "testbot2",
      password: "testtesttest",
    })
      .its("body")
      .its("token")
      .as("user2Token");
  });

  it("should successfully load when user has sign in", () => {
    cy.visit("/");

    cy.log("display log");
    cy.contains("testbox").should("exist");

    cy.log("display user enter message");
    cy.get(".MuiCardActions-root").within(() => {
      cy.get("textarea").type("Hello there");
      cy.get("button").click();
    });
    cy.contains("div", "Hello there").should("exist");
    cy.window()
      .its("store")
      .invoke("getState")
      .its("room")
      .its("currentRoom")
      .as("currentRoom");

    cy.get("@user2Token").then((result) => {
      const socket = io.connect("ws://localhost:8000", {
        auth: {
          token: result,
        },
        transports: ["websocket"],
      });
      cy.log("emitting a message");
      cy.get("@currentRoom").then((result) => {
        socket.emit("newMessage", { room: result._id, message: "Boo!" });
      });
      cy.log("receiving message");
      cy.contains("testbot2").should("exist");
      cy.contains("Boo!")
        .should("exist")
        .then(() => {
          socket.close();
        });
    });

    cy.log("Another try");
    cy.get(".MuiCardActions-root").within(() => {
      cy.get("textarea").type("AHHHH!!");
      cy.get("button").click();
    });
    cy.get("@user2Token").then((result) => {
      const socket = io.connect("ws://localhost:8000", {
        auth: {
          token: result,
        },
        transports: ["websocket"],
      });
      cy.get("@currentRoom").then((result) => {
        socket.emit("newMessage", { room: result._id, message: "HAHAHAHA!" });
      });
      cy.contains("HAHAHAHA!")
        .should("exist")
        .then(() => {
          socket.close();
        });
    });
  });
});
