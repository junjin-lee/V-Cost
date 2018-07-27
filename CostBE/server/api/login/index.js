'use strict';

const express = require('express');
const auth = require('../../config/authentication');
const jwt = require('jsonwebtoken');

let router = express.Router();

router.post('/', function (req, res) {
  let username = req.body.username;
  let password = new Buffer(req.body.password, 'base64').toString();

  auth.checkW3SSO(username, password).then(err => {
    if (err) {
      res.status(500).send(err);
    } else {
      var payload = {
        user: username
      };

      let myToken = jwt.sign(payload,
        'cv1isAwes0me!', {
          expiresIn: 24 * 60 * 60
        });
      res.send({
        'token': myToken
      });
    }
  }).catch(function (err) {
    res.status(400).json({
      message: "用户名或密码错误！",
      detail: err
    });
  });
});

module.exports = router;
