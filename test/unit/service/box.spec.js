const BoxService = require("../../../services/box.js");

describe("Box Service", () => {
  describe("createConversation", () => {
    const mockCreate = jest.fn();
    const mockBoxModel = {
      create: mockCreate,
    };
    const boxService = new BoxService(mockBoxModel, {}, "mock-current-user");
    afterEach(() => {
      mockCreate.mockClear();
    });
    test("it should create a room with a single string input", () => {
      const result = boxService.createConversation("mock-other-user");

      expect(mockCreate).toBeCalledTimes(1);
      expect(mockCreate).toBeCalledWith({
        member: ["mock-current-user", "mock-other-user"],
      });
    });
    test("it should create a room with an array input", () => {
      const result = boxService.createConversation([
        "mock-other-user-1",
        "mock-other-user-2",
      ]);

      expect(mockCreate).toBeCalledTimes(1);
      expect(mockCreate).toBeCalledWith({
       member: ["mock-current-user", "mock-other-user-1", "mock-other-user-2"],
      });
    });
  });
});
