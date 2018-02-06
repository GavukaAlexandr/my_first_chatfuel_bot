// import MessengerService from './messenger.service';
import apiai from "apiai";

//token for DialogFlow API
const apiaiApp = apiai("a186779904624176984a3e98eebb4e65");

class ChatfuelController {
    chatfuelHandler(req, res, next) {
        // console.log(req.body);

        let request = apiaiApp.textRequest(req.body.text, {
            sessionId: "123456789"
        });

        // console.log(request);

        request.on("response", function (response) {
            console.log(response);
            res.status(200).send({
                "redirect_to_blocks": ["Default answer"]
            });
        });

        request.on('error', function (error) {
            console.log(error);
        });

        request.end();
    }
}

export default new ChatfuelController();
