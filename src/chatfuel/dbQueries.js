const { User, Order } = require('../database/models');

async function createUser(user) {
  try {
    User.create(user);
  } catch (err) {
    console.log(err);
  }
}

async function getUserByMessengerId(messengerId) {
  console.log(messengerId);
  try {
    const user = await User.findOne({
      where: {
        messenger_user_id: messengerId
      }
    });
    return user;
  } catch (err) {
    console.log(err);
  }
}


async function createOrder(DFResponse) {
  const user = await getUserByMessengerId(DFResponse.sessionId);
  const order = {
    name: DFResponse.result.contexts['0'].parameters.OrderName,
    size: DFResponse.result.contexts['0'].parameters.OrderSize,
    color: DFResponse.result.contexts['0'].parameters.OrderColor,
    imgUrl: DFResponse.result.contexts['0'].parameters.url,
    userId: user.id,
  };

  try {
    await Order.create(order);
  } catch (err) {
    console.log(err);
  }
}

async function getUserOrdersByUserId(userId) {
  try {
    const userOrders = await User.findOne({
      where: {
        messenger_user_id: userId,
      },
      include: [{
        model: Order,
      }],
    });

    return userOrders;
  } catch (err) {
    console.log(err);
  }
}

async function deleteOrderById(orderId) {
  Order.destroy({
    where: {
      id: orderId,
    }
  });
}

module.exports = {
  createUser,
  getUserByMessengerId,
  createOrder,
  getUserOrdersByUserId,
  deleteOrderById,
};
