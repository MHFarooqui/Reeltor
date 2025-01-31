const express = require("express")
const router = express.Router()
require('dotenv').config();

const { db } = require('../DAL/Connection');

// creating notification 
const SendNotice = async (req, res) => {
    try {
        const { NoticeContent, SpecificUser, userid, isCritical } = req.body;
        console.log(userid)
        const content = await db.query(`INSERT INTO notification(
                                   notice_content, specificuser, userid, iscritical)
                                    VALUES ($1, $2, $3, $4 );`, [NoticeContent, SpecificUser, userid, isCritical]);
        
         res.status(201).json({message : `notification send ${content}`});
    } catch (error) {
        console.log(error)
        res.status(500).json({message : `some error has occurd`});
    }
};

module.exports = { SendNotice };