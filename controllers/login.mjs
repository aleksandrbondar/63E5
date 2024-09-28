import loadData from '../utils/loadData.mjs'

export const getLoginHandler = (req, res) => {
  res.render('login', { theme: req.cookies.theme ?? 'light' })
}

export const postLoginHandler = async (req, res) => {
  const { username, password } = req.body

  try {
    const users = await loadData("users");

    const userIndex = users.findIndex(user => user.username === username);
    if (userIndex === -1) {
      res.render('login', { theme: req.cookies.theme ?? 'light', error: 'User does not exist. You need to register first!', isNeedToReg: true });
    } else {
      if (users[userIndex].password === password) {
        req.login(users[userIndex], (err) => {
          if (err) {
            console.error('Login error:', err);
            return res.status(500).send('Internal Server Error');
          }
          res.redirect('/');
        });
      } else {
        res.render('login', { theme: req.cookies.theme ?? 'light', error: 'Wrong username or password' });
      }
    }
  } catch (err) {
    console.error('Error loading users:', err);
    res.status(500).send('Internal Server Error');
  }
}