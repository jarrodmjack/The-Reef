module.exports = {
  getMainLayout: (req, res) => {
    res.render('login', {
        layout: './layouts/mainLayout',
    })
  },
  

};
