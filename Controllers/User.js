const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { db } = require('../DAL/Connection');

const salt = 10;

//user registration controller
const register = async (req, res) => {
    try {
        console.log(req.body)
        const { userName, Password, Mobile_number, bio } = req.body;
        // used bcrypt to encode the password
        const hashedPassword = await bcrypt.hash(Password, parseInt(process.env.SALT) || salt);

        const newUser = await db.query(`INSERT INTO users(
                                        user_name, password, Mobile_number, bio, Availability_from, Availability_Till)
                                        VALUES ($1, $2, $3, $4, '09:00:00', '18:00:00');`, [userName, hashedPassword, Mobile_number, bio]);

        res.status(201).json({ message: `user registerd ${newUser}` });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: `some error has occurd` });
    }
};

//User login controller
const Login = async (req, res) => {
    try {
        const { userName, Password } = req.body;
        const user = await db.query(`SELECT * FROM users
                                WHERE user_name = $1;`, [userName]);

        //validating user
        if (!user) {
            return res.status(400).json({ message: `Invalid credentials` });
        }
        const isMatch = await bcrypt.compare(Password, user[0]['password'])
        if (!isMatch) {
            return res.status(400).json({ message: `Invalid credentials` });
        }
        
        // using jwt to authenticate user
        const token = jwt.sign({ id: user[0]['id'] }, process.env.SECRET)
        let date_ob = new Date();
        let time = `${date_ob.getHours()}:${date_ob.getMinutes()}:${date_ob.getSeconds()}`
        
        //checking users availibility
        if (user[0].availability_from <= time && user[0].availability_till >= time) {
            const checkNotice = await db.query(`SELECT * 
            FROM notification
            WHERE isCritical = true AND (userid IS NULL or userid = $1);`, [user[0]['id']])
            res.status(200).json({ token, checkNotice });
        } else {
            // geting critical notice only
            const checkImportantNotice = await db.query(`SELECT * 
                FROM notification
                WHERE userid IS NULL or userid = $1;`, [user[0].id])
            res.status(200).json({ token, checkImportantNotice });
        }

    } catch (error) {
        res.status(500).json({ message: `some error has occurd` });
    }
};

// controller to Update user data
const UpdateData = async (req, res) => {
    try {
        const { userName, Password, mobile_number, bio, availability_from, availability_till } = req.body;
        const hashedPassword = await bcrypt.hash(Password, salt);
        const id = req.params['id']
        const updateUserData = await db.query(`UPDATE users
                                                    SET user_name=$1, password=$2, mobile_number=$3, bio=$4, availability_from=$6, availability_till=$6
                                                    WHERE id = $5;`, [userName, hashedPassword, mobile_number, bio, id, availability_from, availability_till])
        res.status(201).json({ message: `user updated ${updateUserData}` });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: `some error has occurd` });
    }
}

module.exports = { register, Login, UpdateData }