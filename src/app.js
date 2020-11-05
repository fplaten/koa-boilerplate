const Koa = require('koa');
const passport = require('koa-passport');

const user = require('./api/user');

const app = new Koa();

require('./auth');

app.use(passport.initialize());

app.use(user.routes());

app.listen(3000);
console.info('listening on port 3000');
