const axios = require('axios');
const DFService = require('./dialogFlow.service');
const { User, Order } = require('../database/models');

//TODO: Cделай чтобы через ChatFuel шло сообщение и 
// ты создавал сесию когда отправляешь месседж в DialogFlow
// и в ответе получаешь context и inten
//TODO: Теперь подыми базу и 
// сделай юзеров и заказы. 
// И создание заказа в мессенджере.
//  Юзер должен указать название товара, цвет и размер.
// добавить кнопку в persisted menu "Show my orders" для юзера
// кешировать Orders на 1 минуту через редис
// 
class ChatfuelController {
    async handleOrderName(req, res, next) {
        const DFResponse = await DFService
            .dialogFlowRequest(req.body.orderName, req.body["messenger user id"]);

        res.json({
            "messages": [
                { "text": DFResponse.result.fulfillment.speech }
            ],
            "redirect_to_blocks": ["get order size"]
        });
    }

    async handleOrderSize(req, res, next) {
        // console.log(req.body);
        const DFResponse = await DFService
            .dialogFlowRequest(req.body.orderSize, req.body["messenger user id"]);

        res.json({
            "messages": [
                { "text": DFResponse.result.fulfillment.speech }
            ],
            "redirect_to_blocks": ["get order color"]
        });
    }

    async handleOrderColor(req, res, next) {
        // console.log(req.body);
        const user = {
            first_name: req.body["first name"],
            last_name: req.body["last name"],
            messenger_user_id: req.body["messenger user id"],
        }
        const DFResponse = await DFService
            .dialogFlowRequest(req.body.orderColor, req.body["messenger user id"]);

        const order = {
            name: DFResponse.result.contexts["0"].parameters.OrderName,
            size: DFResponse.result.contexts["0"].parameters.OrderSize,
            color: DFResponse.result.contexts["0"].parameters.OrderColor,
        };

        Order.create({
            ...order,
            UserId: user
        }, {
                include: [{
                    model: User,
                    as: 'userId'
                }]
            })
            .then(() => {
                console.log(SUCCESS);
            })
            .catch((e) => {
                console.log(e);
            });


        res.json({
            "messages": [
                { "text": DFResponse.result.fulfillment.speech }
            ],
            "redirect_to_blocks": ["order is accepted"]
        });
    }
}

module.exports = new ChatfuelController();
