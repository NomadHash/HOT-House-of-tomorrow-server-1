const { verify } = require('jsonwebtoken');
const { Post } = require('../../../models');
const config = require('../../../config/index');
const { SECRET } = config;

module.exports = async (req, res) => {
  let token = req.cookies.x_auth;

  if (!token) {
    return res.json({ code: 400, message: 'not token' });
  } else {
    try {
      verify(token, SECRET);
      let userData = await Post.findAll();
      userData = userData.map((el) => el.dataValues);
      res.status(200).send(userData);
    } catch (err) {
      res.json({ code: 404, postLoad: false });
    }
  }
};