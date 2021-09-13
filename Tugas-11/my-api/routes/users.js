var express = require('express');
var router = express.Router();

/* GET users listing. */

// router.get('/karyawan')
// router.get('/login')

router.get("/:id", function (req, res) {
  console.log("parameters: ", req.params);
  res.send(`hello ${req.params.id} user`);

})

module.exports = router;