export const EMAIL_REGEX = /^\w+([._]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
export const PHONE_REGEX = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;

export const ACCESS_TOKEN_LIFETIME = 1000 * 60 * 60 * 2;
export const REFRESH_TOKEN_LIFETIME = 1000 * 60 * 60 * 24 * 7;

export const PAYMENT_METHODS = ["Cash On Delivery", "Bank"];
