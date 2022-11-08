const PHONE_1_REGEX =
  /(^8|7|\+7)((\d{10})|(\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}))/g;

const PHONE_2_REGEX =
  /(^8|7|\+7)(\s)(\(\d{3}\))\s(\d{3})(\-)(\d{2})(\-)(\d{2})/g;

const EMAIL_REGEX = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;

function extractPhoneNumbers(text) {
  return text.match(PHONE_1_REGEX) || text.match(PHONE_2_REGEX);
}

function extractEmails(text) {
  return text.match(EMAIL_REGEX);
}
