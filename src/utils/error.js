const { ApolloError } = require("apollo-server");

module.exports = {
  newError(msg, res, status, exception) {
    if (!status) status = 500;
    res.status(status);

    let code = "";
    if (status == 400) code = "BAD_REQUEST";
    else if (status === 401) code = "UNAUTHORIZED";
    else if (status === 404) code = "NOT_FOUND";
    else code = "INTERNAL_SERVER_ERROR";

    if (exception) return new ApolloError(msg, code, exception);
    else return new ApolloError(msg, code, exception);
  }
};
