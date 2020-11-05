const passport = require('koa-passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const users = [
  {
    id: '1',
    name: 'rob',
  },
];

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

passport.use(
  new JwtStrategy(opts, ((jwt, done) => {
    // CHECK IF THE USER IN THE JWT IS VALID
    const authenticatedUser = users.filter((user) => user.id === jwt.id)[0];

    if (authenticatedUser) {
      done(null, authenticatedUser);
    } else {
      done(null, false);
    }
  })),
);
