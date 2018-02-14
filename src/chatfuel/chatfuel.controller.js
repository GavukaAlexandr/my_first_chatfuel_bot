const DFService = require('./dialogFlow.service');
const {
  createUser,
  getUserByMessengerId,
  getUserOrdersByUserId,
  createOrder,
  deleteOrderById,
} = require('./dbQueries');
const {
  messageWithRedirectToBlock,
  renderList,
  renderGallery,
} = require('./jsonApiComponents');
const { setexAsync } = require('./cache');

async function handleOrderName(req, res) {
  const DFResponse = await DFService.dialogFlowRequest(
    req.body.orderName,
    req.body['messenger user id']
  );
  const userFromReq = {
    first_name: req.body['first name'],
    last_name: req.body['last name'],
    messenger_user_id: req.body['messenger user id']
  };
  const user = await getUserByMessengerId(req.body['messenger user id']);
  if (!user) {
    createUser(userFromReq);
  }

  res.json(messageWithRedirectToBlock(
    DFResponse.result.fulfillment.speech,
    ['get order size']
  ));
}

async function handleOrderSize(req, res) {
  const DFResponse = await DFService.dialogFlowRequest(
    req.body.orderSize,
    req.body['messenger user id']
  );

  res.json(messageWithRedirectToBlock(
    DFResponse.result.fulfillment.speech,
    ['get order color']
  ));
}

async function handleOrderColor(req, res) {
  try {
    const DFResponse = await DFService.dialogFlowRequest(
      req.body.orderColor,
      req.body['messenger user id']
    );

    res.json(messageWithRedirectToBlock(
      DFResponse.result.fulfillment.speech,
      ['get order img url']
    ));
  } catch (err) {
    console.log(err);
  }
}

async function handleOrderImgUrl(req, res) {
  const DFResponse = await DFService.dialogFlowRequest(
    req.body.orderImgUrl,
    req.body['messenger user id'],
  );

  await createOrder(DFResponse);

  res.json(messageWithRedirectToBlock(
    DFResponse.result.fulfillment.speech,
    ['order is accepted']
  ));
}

async function handleShowOrdersGallery(req, res) {
  const userOrders = await getUserOrdersByUserId(req.query['messenger user id']);

  const resronseGallery = await renderGallery(userOrders);

  setexAsync(`${req.path}_${req.query['messenger user id']}`, 3600, JSON.stringify(resronseGallery));
  res.json(resronseGallery);
}

async function handleShowOrdersList(req, res) {
  const userOrders = await getUserOrdersByUserId(req.query['messenger user id']);

  const resronseList = await renderList(userOrders);

  setexAsync(`${req.path}_${req.query['messenger user id']}`, 3600, JSON.stringify(resronseList));
  res.json(resronseList);
}

async function handleDeleteOrder(req, res) {
  const orderId = req.params.id;
  await deleteOrderById(orderId);

  res.json({
    messages: [{ text: `order by id:${orderId}  deleted` }],
  });
}

module.exports = {
  handleOrderName,
  handleOrderSize,
  handleOrderColor,
  handleOrderImgUrl,
  handleShowOrdersList,
  handleShowOrdersGallery,
  handleDeleteOrder,
};
