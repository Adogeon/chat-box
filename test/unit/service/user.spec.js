const UserService = require("../../../services/user.js");

describe("User service unit test", () => {
  describe("IsLogin", () => {
    test("Should show if userId is provide when initiate service", () => {
      const privateUserService = new UserService({}, {}, "mock-user-id");
      expect(privateUserService.isLogin()).toBe(true);

      const publicUserService = new UserService({}, {});
      expect(publicUserService.isLogin()).toBe(false);

      const blankUserService = new UserService({}, {}, "");
      expect(blankUserService.isLogin()).toBe(false);
    });
  });

  describe("get", () => {
    test("Should call UserModel.findById and pass in the userId", async () => {
      const mockFind = jest.fn((x) => ({
        id: x,
      }));
      const mockUserModel = {
        findById: mockFind,
      };

      const userService = new UserService(mockUserModel, {});
      const user = await userService.get("mock-user-id");
      expect(user).toBeTruthy();
      expect(mockFind.mock.calls.length).toBe(1);
      expect(mockFind.mock.calls[0][0]).toBe("mock-user-id");
    });
  });

  describe("getCurrent", () => {
    test("Should call UserModel.findById and pass in the current userId", async () => {
      const mockFind = jest.fn((x) => ({
        id: x,
      }));
      const mockUserModel = {
        findById: mockFind,
      };

      const userService = new UserService(mockUserModel, {}, "mock-current-id");
      const user = await userService.getCurrent();

      expect(user).toBeTruthy();
      expect(mockFind.mock.calls.length).toBe(1);
      expect(mockFind.mock.calls[0][0]).toBe("mock-current-id");
    });

    test("Should throw a not loggin error", async () => {
      try {
        const userService = new UserService({}, {});
        const user = await userService.getCurrent();
      } catch (e) {
        expect(e.message).toMatch("User is not logged in");
      }
    });
  });
});
