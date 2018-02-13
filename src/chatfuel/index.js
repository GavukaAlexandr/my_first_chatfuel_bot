const { Router } = require('express');
const controller = require('./chatfuel.controller');
const { getCache } = require('./cache');

const router = new Router();

router.post('/chatfuel/order-name', controller.handleOrderName);
router.post('/chatfuel/order-size', controller.handleOrderSize);
router.post('/chatfuel/order-color', controller.handleOrderColor);
router.get('/chatfuel/show-orders', getCache);
router.get('/chatfuel/show-orders', controller.handleShowOrders);

module.exports = router;
