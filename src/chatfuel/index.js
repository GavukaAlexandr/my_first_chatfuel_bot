const { Router } = require('express');
const controller = require('./chatfuel.controller');
const { getCache } = require('./cache');

const router = new Router();

router.post('/chatfuel/order-name', controller.handleOrderName);
router.post('/chatfuel/order-size', controller.handleOrderSize);
router.post('/chatfuel/order-color', controller.handleOrderColor);
router.post('/chatfuel/order-img-url', controller.handleOrderImgUrl);
router.get('/chatfuel/show-orders-list', getCache);
router.get('/chatfuel/show-orders-list', controller.handleShowOrdersList);
router.get('/chatfuel/show-orders-gallery', getCache);
router.get('/chatfuel/show-orders-gallery', controller.handleShowOrdersGallery);
router.get('/chatfuel/delete-order/:id', controller.handleDeleteOrder);

module.exports = router;
