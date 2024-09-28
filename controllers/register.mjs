import loadData from '../utils/loadData.mjs'
import saveData from '../utils/saveData.mjs'

export const getRegisterHandler = (req, res) => {
  res.status(200).render('registration', { theme: req.cookies.theme ?? 'light' })
}

export const postRegisterHandler = async (req, res) => {
  const { username, password, confirmPassword } = req.body

  if (password !== confirmPassword) {
    return res.status(400).render('registration', { theme: req.cookies.theme ?? 'light', error: 'Passwords do not match' })
  }

  try {
    const users = await loadData("users");

    const isUserExist = users.some(user => user.username === username);
    if (isUserExist) {
      return res.status(400).render('registration', { theme: req.cookies.theme ?? 'light', error: 'Username already exists' });
    }

    const newUser = {
      id: users.length + 1,
      username: username,
      password: password
    };

    users.push(newUser);
    await saveData("users", users);

    req.login(newUser, (err) => {
      if (err) {
        console.error('Login error:', err);
        return res.status(500).send('Internal Server Error');
      }
      res.redirect('/');
    });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).send('Internal Server Error');
  }
}