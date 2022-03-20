import express from 'express';
import request from 'supertest';
import { getApiRouter } from './api.router';

describe('Api router', () => {
  describe('Get api router', () => {
    let app: express.Express;

    beforeEach(() => {
      app = express();
      app.use(getApiRouter());
    });

    it('serves the api', async() => {
      await request(app).get('/api')
        .expect(200, 'api works!');
    });
  });
});
