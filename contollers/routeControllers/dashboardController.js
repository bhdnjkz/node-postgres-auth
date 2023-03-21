module.exports = {
    get: (req, res) => {
        if (req.session.loggedin) {
          res.render("dashboard.ejs", {rname: req.session.rname})
        }
    }
}