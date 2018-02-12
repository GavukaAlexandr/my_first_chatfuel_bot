// const axios = require("axios");
const DFService = require('./dialogFlow.service');
const { User, Order } = require('../database/models');

// TODO: Cделай чтобы через ChatFuel шло сообщение и
// ты создавал сесию когда отправляешь месседж в DialogFlow
// и в ответе получаешь context и inten
// TODO: Теперь подыми базу и
// сделай юзеров и заказы.
// И создание заказа в мессенджере.
//  Юзер должен указать название товара, цвет и размер.
// добавить кнопку в persisted menu "Show my orders" для юзера
// кешировать Orders на 1 минуту через редис
//
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
  try {
    const user = await User.findOne({
      where: {
        messenger_user_id: userFromReq.messenger_user_id
      }
    });
    if (!user) {
      try {
        User.create({
          ...userFromReq
        });
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }
  res.json({
    messages: [{ text: DFResponse.result.fulfillment.speech }],
    redirect_to_blocks: ['get order size']
  });
}

async function handleOrderSize(req, res) {
  // console.log(req.body);
  const DFResponse = await DFService.dialogFlowRequest(
    req.body.orderSize,
    req.body['messenger user id']
  );

  res.json({
    messages: [{ text: DFResponse.result.fulfillment.speech }],
    redirect_to_blocks: ['get order color']
  });
}

async function handleOrderColor(req, res) {
  // console.log(req.body);
  try {
    const user = await User.findOne({
      where: {
        messenger_user_id: req.body['messenger user id']
      }
    });

    const DFResponse = await DFService.dialogFlowRequest(
      req.body.orderColor,
      req.body['messenger user id']
    );

    const order = {
      name: DFResponse.result.contexts['0'].parameters.OrderName,
      size: DFResponse.result.contexts['0'].parameters.OrderSize,
      color: DFResponse.result.contexts['0'].parameters.OrderColor,
      userId: user.id
    };

    console.log('>>>>>>>>>>>USER_ID');
    console.log(order.userId);

    try {
      await Order.create(order);
    } catch (err) {
      console.log(err);
    }
    res.json({
      messages: [{ text: DFResponse.result.fulfillment.speech }],
      redirect_to_blocks: ['order is accepted']
    });
  } catch (err) {
    console.log(err);
  }
}

async function renderOrderList(orders) {
  return orders.map(order => ({
    title: order.name,
    subtitle: `size ${order.size}, color ${order.color}`,
  }));
}

async function handleShowOrders(req, res) {
  try {
    // TODO: get orders for user from req
    const userOrders = await User.findOne({
      where: {
        messenger_user_id: req.body['messenger user id'],
      },
      include: [{
        model: Order,
      }],
    });

    console.log(userOrders);
  } catch (err) {
    console.log(err);
  }

  // try {
  //   const orders = await Order.findAll({
  //     where: {
  //       // messenger_user_id: req.body['messenger user id']
  //       messenger_user_id: req.body['messenger user id']
  //     }
  //   });

  //   res.json({
  //     messages: [
  //       {
  //         attachment: {
  //           type: 'template',
  //           payload: {
  //             template_type: 'list',
  //             top_element_style: 'large',
  //             elements: await renderOrderList(orders),
  //           }
  //         }
  //       }
  //     ]
  //   });
  // } catch (err) {
  //   console.log(err);
  // }
}

module.exports = {
  handleOrderName,
  handleOrderSize,
  handleOrderColor,
  handleShowOrders,
};
