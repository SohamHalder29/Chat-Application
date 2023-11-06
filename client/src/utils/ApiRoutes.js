const HOST = "http://localhost:3005";

const AUTH_ROUTE = `${HOST}/api/auth`;
const CHECK_USER_ROUTE = `${AUTH_ROUTE}/check-user`;
const ONBOARD_USER_ROUTE = `${AUTH_ROUTE}/onboard-user`;
const GET_ALL_CONTACTS = `${AUTH_ROUTE}/get-contacts`;

module.exports= {HOST, CHECK_USER_ROUTE, ONBOARD_USER_ROUTE, GET_ALL_CONTACTS};