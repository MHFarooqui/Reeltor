const express = require('express');

const { register, Login, UpdateData } = require('../Controllers/User');
const authenticate = require('../Middlewares/Authentication');

const router = express.Router();

router.post("/register", register);
router.get("/login", Login);
router.put("/Update/:id",authenticate, UpdateData);

module.exports = router;