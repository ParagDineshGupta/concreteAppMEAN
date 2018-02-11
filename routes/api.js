const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.json({msg:'api works',
            status:true});
});

module.exports = router;