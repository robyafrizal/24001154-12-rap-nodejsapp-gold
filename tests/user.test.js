const app = require("../src/handler/user");

const mockRequest = (body = {}, params = {}, query = {}) => {
  return {
    body: body,
    params: params,
    query: query,
  };
};
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("GET /users", () => {
  test("res.json called with {status:true, users: serviceRes.users}", (done) => {
    const req = mockRequest();
    const res = mockResponse();

    app.getAll(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      status: true,
      users: serviceRes.users,
    });
    done();
  });
});
