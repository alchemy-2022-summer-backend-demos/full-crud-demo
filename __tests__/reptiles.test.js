const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('reptile routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/reptiles should return a list of reptiles', async () => {
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
    ]);
  });

  it('/reptiles/:id should return the reptile detail', async () => {
    const resp = await request(app).get('/reptiles/1');
    console.log(resp.body);
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: '1',
      name: 'Aligator',
      genus: 'Alligator',
      family: 'Alligatoridae',
    });
  });

  afterAll(() => {
    pool.end();
  });
});
