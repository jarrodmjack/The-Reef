module.exports = {
  // getIndex: (req, res) => {
  //   res.render("index.ejs");
  // },

  getMainLayout: (req, res) => {
    res.render('login', {
        layout: './layouts/mainLayout',
    })
  },
  

};
