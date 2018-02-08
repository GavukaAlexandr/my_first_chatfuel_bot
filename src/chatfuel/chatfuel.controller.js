const axios = require('axios');
const DFService = require('./dialogFlow.service');

//TODO: Cделай чтобы через ChatFuel шло сообщение и 
// ты создавал сесию когда отправляешь месседж в DialogFlow
// и в ответе получаешь context и inten
//TODO: Теперь подыми базу и 
// сделай юзеров и заказы. 
// И создание заказа в мессенджере.
//  Юзер должен указать название товара, цвет и размер.
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

        console.log(DFResponse);

        res.json({
            "messages": [
                { "text": DFResponse.result.fulfillment.speech }
            ],
            "redirect_to_blocks": ["get order color"]
        });
    }

    async handleOrderColor(req, res, next) {
        // console.log(req.body);
        const DFResponse = await DFService
            .dialogFlowRequest(req.body.orderColor, req.body["messenger user id"]);

            //create DB

        res.json({
            "messages": [
                { "text": DFResponse.result.fulfillment.speech }
            ],
            "redirect_to_blocks": ["order is accepted"]
        });
    }

    // broadcasting(req, res, next) {
    //     axios.post('https://api.chatfuel.com/bots/5a799f7be4b01919b30e971e/users/2258584364159051/send?chatfuel_token=vnbqX6cpvXUXFcOKr5RHJ7psSpHDRzO1hXBY8dkvn50ZkZyWML3YdtoCnKH7FSjC&chatfuel_block_name=Default answer&<USER_ATTRIBUTE_1>=<VALUE_1>&<USER_ATTRIBUTE_2>=<VALUE_2>',
    //         {
    //             // firstName: 'Fred',
    //             // lastName: 'Flintstone'
    //         })
    //         .then(function (response) {
    //             console.log(response);
    //             res.status(200).json(response.data);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //             res.status(200).json(error);
    //         });

    // }
}

module.exports = new ChatfuelController();
