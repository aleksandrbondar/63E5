import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import loadData from '../utils/loadData.mjs'

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const users = await loadData('users');
      const user = users.find(user => user.username === username);

      if (!user) {
        return done(null, false, { message: 'Невірні дані' });
      }

      if (user.password !== password) {
        return done(null, false, { message: 'Невірний пароль' });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const users = await loadData('users');
    const user = users.find(user => user.id === id);

    if (!user) {
      return done(new Error('Пользователь не найден'));
    }

    done(null, user);
  } catch (err) {
    done(err);
  }
});