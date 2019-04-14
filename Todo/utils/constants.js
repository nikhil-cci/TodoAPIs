
const DEFAULT_ERROR_MESSAGE_JSON = '{ "errorMessage" : "Some error occurred" }';
const DEFAULT_ERROR_MESSAGE_JSON_TEMPLATE = '{ "errorMessage" : "$message" }';
const DEFAULT_ERROR_MESSAGE_JSON_TEMPLATE_KEY_MESSAGE = '$message';

const saltRounds = 10;

const JWT_SECRET = 'thisisasecret';

module.exports = {
    DEFAULT_ERROR_MESSAGE_JSON,
    DEFAULT_ERROR_MESSAGE_JSON_TEMPLATE,
    DEFAULT_ERROR_MESSAGE_JSON_TEMPLATE_KEY_MESSAGE,
    saltRounds,
    JWT_SECRET
}