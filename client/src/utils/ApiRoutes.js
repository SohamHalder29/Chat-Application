const HOST = "http://localhost:3005";

const AUTH_ROUTE = `${HOST}/api/auth`;
const CHECK_USER_ROUTE = `${AUTH_ROUTE}/check-user`

module.exports= {HOST, CHECK_USER_ROUTE};