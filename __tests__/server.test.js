const request = require('supertest');
const createServer = require('../server');

let server;

beforeAll(() => {
  server = createServer().listen(); // 随机端口
});

afterAll((done) => {
  server.close(done);
});

describe('HTTP Calculator Server', () => {
  test('should add two numbers', async () => {
    const res = await request(server).get('/?a=3&b=4&op=add');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Result: 7\n');
  });

  test('should subtract two numbers', async () => {
    const res = await request(server).get('/?a=10&b=4&op=sub');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Result: 6\n');
  });

  test('should return unsupported operation for invalid op', async () => {
    const res = await request(server).get('/?a=1&b=2&op=mul');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Result: Unsupported operation, use "add" or "sub"\n');
  });

  test('should return error for missing query parameters', async () => {
    const res = await request(server).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Result: Please provide query parameters: ?a=number&b=number&op=add|sub\n');
  });

  test('should return error for non-numeric parameters', async () => {
    const res = await request(server).get('/?a=foo&b=bar&op=add');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Result: Please provide query parameters: ?a=number&b=number&op=add|sub\n');
  });
});
