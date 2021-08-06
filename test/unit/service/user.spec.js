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

  describe("addContact", () => {
    test("Should update both current user and contact user", async () => {
      const mockUpdate = jest.fn((x) => {
        return x;
      });
      const mockFind = jest.fn((x) => ({
        ...x,
        update: mockUpdate,
      }));
      const mockUserModel = {
        findById: mockFind,
        findByIdAndUpdate: mockUpdate,
      };

      const userService = new UserService(
        mockUserModel,
        {},
        "mock-current-user"
      );
      const updateRecord = await userService.addContact("mock-other-user");

      expect(updateRecord).toBeTruthy();
      expect(mockFind.mock.calls.length).toBe(1);
      expect(mockFind.mock.calls[0][0]).toBe("mock-other-user");
      expect(mockUpdate.mock.calls.length).toBe(2);
      expect(mockUpdate.mock.calls[1][0]).toBe("mock-current-user");
    });

    test("Should throw error if the other user id can't be found", async () => {
      const mockFind = jest.fn((x) => null);

      const mockUserModel = {
        findById: mockFind,
      };

      const userService = new UserService(
        mockUserModel,
        {},
        "mock-current-user"
      );
      try {
        const updateRecord = await userService.addContact("mock-other-user");
      } catch (e) {
        expect(e.message).toMatch("Invalid userId for new contact");
      }
    });
  });

  describe("joinRoom", () => {
    describe("successful run", () => {
      const mockUpdate = jest.fn((x) => x);
      const mockFind = jest.fn((x) => ({
        ...x,
        update: mockUpdate,
      }));
      const mockUserModel = {
        findByIdAndUpdate: mockUpdate,
      };

      const mockRoomModel = {
        findById: mockFind,
      };
      beforeAll(async () => {
        const userService = new UserService(
          mockUserModel,
          mockRoomModel,
          "mock-current-user"
        );

        await userService.joinRoom("mock-room-id");
      });

      test("Should add userId to room", () => {
        expect(mockFind).toBeCalledTimes(1);
        expect(mockFind).toBeCalledWith("mock-room-id");
        expect(mockUpdate).toBeCalledTimes(2);
        expect(mockUpdate).toHaveBeenNthCalledWith(1, {
          $push: { member: ["mock-current-user"] },
        });
      });

      test("Should add roomId to current user", () => {
        expect(mockUpdate).toHaveBeenNthCalledWith(
          2,
          "mock-current-user",
          {
            $push: { box: ["mock-room-id"] },
          },
          { new: true }
        );
      });
    });
  });
  
});
