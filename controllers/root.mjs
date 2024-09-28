const getRootHandler = (req, res) => {
  const theme = req.cookies.theme
  // console.log(eq.isAuthenticated())
  res.render('index', { theme: theme ?? 'light', auth: req.isAuthenticated() })
}

export { getRootHandler }
