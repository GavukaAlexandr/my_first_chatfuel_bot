import { Router } from 'express';
import controller from './chatfuel.controller';

let router = new Router();

router.post('/chatfuel', controller.chatfuelHandler);

module.exports = router;
