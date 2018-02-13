const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const setexAsync = promisify(client.setex).bind(client);


// Incase any error pops up, log it
client.on('error', (err) => {
  console.log(`Error ${err}`);
});

async function getCache(req, res, next) {
  try {
    const key = `${req.path}_${req.query['messenger user id']}`;
    const jsonData = await getAsync(key);
    const data = JSON.parse(jsonData);

    if (data != null) {
      res.json(data);
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  client,
  getCache,
  getAsync,
  setexAsync
};
