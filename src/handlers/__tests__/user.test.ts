import * as user from "../user";

describe("user handler", () => {
  it("should create a user", async () => {
    const req = {
      body: { username: "monica", password: "123456" },
    };

    const res = {
      json({ token }) {
        expect(token).toBeTruthy();
      },
    };

    await user.createNewUser(req, res, () => {});
  });
});
