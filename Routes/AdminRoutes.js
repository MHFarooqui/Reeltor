const express = require('express');

const { SendNotice } = require('../Controllers/Admin');

const router = express.Router();

// create notification endpoint
router.post("/send", SendNotice);

module.exports = router;