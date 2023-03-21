const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    if (req.session.loggedin) {
      res.render("dashboard.ejs", {rname: req.session.rname})
    }
})

module.exports = router;