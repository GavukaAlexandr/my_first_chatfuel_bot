const { Router } = require('express');
const controller = require('./chatfuel.controller');

let router = new Router();

router.post('/chatfuel/order-name', controller.handleOrderName);
router.post('/chatfuel/order-size', controller.handleOrderSize);
router.post('/chatfuel/order-color', controller.handleOrderColor);

module.exports = router;
