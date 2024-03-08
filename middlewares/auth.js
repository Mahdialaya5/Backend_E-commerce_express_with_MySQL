const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const  connectiondb = require("../config/connectdb"); // Replace with your MySQL database configuration



const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secretKey;

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const [user] = await connectiondb.query(
        "SELECT id, user_name, email,role FROM users WHERE id = ?",
        [jwt_payload.id]
      );

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

const isAuth = () => passport.authenticate("jwt", { session: false });

module.exports = isAuth;


