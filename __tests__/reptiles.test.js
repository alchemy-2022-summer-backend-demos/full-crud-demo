const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('animal routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/animals should return a list of animals id and type', async () => {
    const resp = await request(app).get('/reptiles');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        name: 'Aligator',
        genus: 'Alligator',
        family: 'Alligatoridae',
      },
      { id: '2', name: 'Green Iguana', genus: 'Iguana', family: 'Iguanidae' },
      {
        id: '3',
        name: 'American Crocodile',
        genus: 'Crocodylus',
        family: 'Crocodylidae',
      },
      {
        id: '4',
        name: 'Gila Monster',
        genus: 'Heloderma',
        family: 'Helodermatidae',
      },
    ]);
  });
  afterAll(() => {
    pool.end();
  });
});
