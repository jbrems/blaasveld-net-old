import * as express from 'express';

export function getApiRouter () {
  const router = express.Router();

  router.get('/api', (req, res) => { res.send('api works!'); });

  return router;
}
