// Định nghĩa cấu trúc dữ liệu bằng JSDoc cho code JavaScript

/**
 * @typedef {Object} FoodItem
 * @property {number} id
 * @property {string} name
 * @property {string} [description]
 * @property {number} price
 * @property {string} category
 */

/**
 * @typedef {Object} Order
 * @property {number} id
 * @property {FoodItem[]} items
 * @property {number} totalAmount
 * @property {'pending'|'completed'|'canceled'} status
 */

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} username
 * @property {string} password
 * @property {string} email
 * @property {'customer'|'admin'} role
 */