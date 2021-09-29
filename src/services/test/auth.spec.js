const AuthService = require("../auth.js");

const bcrypt = require("bcrypt");

describe("Auth service unit test", () => {
  describe("Signup", () => {
    test("Should create user record and return user record without hash password", async () => {
      const userModel = {
        create: (user) => {
          return {
            toObject: () => {
              return {
                ...user,
                _id: "mock-user-id",
              };
            },
          };
        },
      };

      const userAuthInput = {
        username: "test-bot",
        password: "testtesttest",
      };

      const authService = new AuthService(userModel);
      const userRecord = await authService.Signup(userAuthInput);

      expect(userRecord).toBeDefined();
      expect(userRecord._id).toBeDefined();
      expect(userRecord.hash).not.toBeDefined();
    });
  });

  describe("Signin", () => {
    test("Should return user record without the hash password", async () => {
      const userModel = {
        findOne: async (username) => {
          const hash = await bcrypt.hash("testtesttest", 10);
          return {
            hash,
            toObject: () => {
              return {
                username: username,
                hash,
                _id: "mock-user-id",
              };
            },
          };
        },
      };

      const userAuthInput = {
        username: "test-bot",
        password: "testtesttest",
      };

      const authService = new AuthService(userModel);
      const userRecord = await authService.Signin(userAuthInput);

      expect(userRecord).toBeDefined();
      expect(userRecord._id).toBeDefined();
      expect(userRecord.hash).not.toBeDefined();
    });

    test("Should throw an error if the password doesn't match", async () => {
      const userModel = {
        findOne: async (username) => {
          const hash = await bcrypt.hash("test19102910210", 10);
          return {
            hash,
            toObject: () => {
              return {
                username: username,
                hash,
                _id: "mock-user-id",
              };
            },
          };
        },
      };

      const userAuthInput = {
        username: "test-bot",
        password: "testtesttest",
      };

      const authService = new AuthService(userModel);
      try {
        const userRecord = await authService.Signin(userAuthInput);
      } catch (e) {
        expect(e.message).toMatch("Invalid Password");
      }
    });
  });
});
