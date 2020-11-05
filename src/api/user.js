const Router = require('koa-router');
const passport = require('koa-passport');

const router = new Router();

router.get('/users', passport.authenticate('jwt', { session: false }), async (ctx) => {
  console.log('User was requested.');
  ctx.body = { name: 'Name' };
});

module.exports = router;
