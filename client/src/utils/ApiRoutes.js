const HOST = "http://localhost:3005";

const AUTH_ROUTE = `${HOST}/api/auth`;
const MESSAGE_ROUTE = `${HOST}/api/message`;

const CHECK_USER_ROUTE = `${AUTH_ROUTE}/check-user`;
const ONBOARD_USER_ROUTE = `${AUTH_ROUTE}/onboard-user`;
const GET_ALL_CONTACTS = `${AUTH_ROUTE}/get-contacts`;

const ADD_MESSAGE_ROUTE = `${MESSAGE_ROUTE}/add-message`

module.exports= {HOST, CHECK_USER_ROUTE, ONBOARD_USER_ROUTE, GET_ALL_CONTACTS, ADD_MESSAGE_ROUTE };