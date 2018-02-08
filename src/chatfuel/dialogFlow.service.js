const apiai = require("apiai");

class DFService {
    async dialogFlowRequest(text, messengerUserId) {
        return new Promise((resolve, reject) => {
            //token for DialogFlow API
            const apiaiApp = apiai("a186779904624176984a3e98eebb4e65");

            let request = apiaiApp.textRequest(text, {
                sessionId: messengerUserId
            });

            request.on("response", function (response) {
                // console.log(response);
                resolve(response);
            });

            request.on('error', function (error) {
                console.log(error);
                reject(error);
            });

            request.end();
        })
    }
}

module.exports = new DFService();
