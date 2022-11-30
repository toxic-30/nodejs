const express = require('express');
const bodyparser=require("body-parser");
const cookieParser = require("cookie-parser");
const { DOUBLE } = require('mysql/lib/protocol/constants/types');
const con = require('./config');
const cors = require('cors');
const bcrypt=require('bcryptjs');

const app = express();
app.use(bodyparser.urlencoded({extended:true}))
app.use('/assets',express.static('assets'))
app.set('view engine','ejs');
app.use('/',require('./routes/router'))
app.use(express.json());
app.use(cors())
app.use(cookieParser());
app.listen(4800)
 

 