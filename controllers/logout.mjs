export const getLogoutHandler = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.clearCookie('token');
    res.clearCookie('theme');
    res.redirect('/');
  });
};