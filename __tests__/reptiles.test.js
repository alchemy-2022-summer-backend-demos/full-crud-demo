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
      { id: '2', name: 'Green Igana', genus: 'Iguana', family: 'Iguanidae' },
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

  it('POST /reptiles should create a new reptile', async () => {
    const resp = await request(app).post('/reptiles').send({
      name: 'Gila Monster',
      genus: 'Heloderma',
      family: 'Helodermatidae',
    });
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual('Gila Monster');
    expect(resp.body.genus).toEqual('Heloderma');
    expect(resp.body.family).toEqual('Helodermatidae');
    expect(resp.body.id).not.toBeUndefined();
  });

  it('PUT /reptiles/:id should update reptile', async () => {
    const resp = await request(app)
      .put('/reptiles/2')
      .send({ name: 'Green Iguana' });
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual('Green Iguana');
  });

  it('DELETE /reptiles/:id should delete a reptile', async () => {
    const resp = await request(app).delete('/reptiles/2');
    expect(resp.status).toEqual(200);

    const { body } = await request(app).get('/reptiles/2');
    expect(body).toEqual('');
  });

  afterAll(() => {
    pool.end();
  });
});
