const express = require('express');
const router = express.Router();

const { IndexController } = require('../controllers/controllers');

const indexController = new IndexController();

const setRoutes = () => {
    router.get('/', indexController.getIndex.bind(indexController));
    // Add more routes here as needed
    return router;
};

module.exports = { setRoutes };