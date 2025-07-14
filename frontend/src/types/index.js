/**
 * @typedef {Object} MenuItem
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {number} price
 * @property {string} category
 */

/**
 * @typedef {Object} Order
 * @property {number} id
 * @property {MenuItem[]} items
 * @property {number} totalAmount
 * @property {string} customerName
 * @property {'pending'|'completed'|'canceled'} status
 */

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} username
 * @property {string} password
 * @property {'customer'|'admin'} role
 */