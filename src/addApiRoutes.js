function AddApiRoutes(app) {
    app.use(require('./chatfuel/index.js'));
}
module.exports = function (app) {
    return new AddApiRoutes(app);
};
