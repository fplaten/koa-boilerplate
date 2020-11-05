const test = require('ava');
const http = require('http');
const listen = require('test-listen');
const got = require('got');

const app = require('../src/app');

test.before(async t => {
  t.context.server = http.createServer(app);
  t.context.prefixUrl = await listen(t.context.server);
});

test.after.always(t => {
  t.context.server.close();
});

// TODO: Find out why prefixUrl is not working as per documentation, see https://github.com/avajs/ava/blob/master/docs/recipes/endpoint-testing.md

test('Get /users with success', async t => {
  const user = await got('users', { 
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWQiOiIxIiwiaWF0IjoxNTE2MjM5MDIyfQ.CAN_YoxP3msRpRIdPr5pTe0INxnx4jF8w1bUkq0SgZs',
    },
    prefixUrl: 'http://localhost:3000' 
  }).json();
  t.deepEqual(user, { name: 'Name' });
});

test('Get /users with invalid bearer returns 401', async t => {
  try {
    await got('users', { prefixUrl: 'http://localhost:3000' });
  } catch (err) {
    t.is(err.response.statusCode, 401);
  }
});