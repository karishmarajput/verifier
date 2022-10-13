const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser')
const mongoose = require('mongoose');
const app = express()
const cors = require('cors');
const sgail = require('@sendgrid/mail');
const pdf = require('pdf-creator-node')
const uri = process.env.MONGO_URI;
mongoose.congit nect(uri,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log('Connection Success');
})
app.post('/api/sendemail',(req,res,next)=>{
    const email = req.body.email
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
    to: email,
    from: 'vinayakpatkar42@gmail.com', // Use the email address or domain you verified above
    subject: 'Test Case 1',
    text: 'and easy to do anywhere, even with Node.js',
    html: '',
    };
//ES6
sgMail
  .send(msg)
  .then(() => {}, error => {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  });
//ES8
(async () => {
  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  }
})();
})