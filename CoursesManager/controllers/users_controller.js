// import outsoursed modules
const User = require("../models/user_model");
const http_status_text = require("../utils/http_status_text");
const async_wrapper = require("../middlewares/async_wrapper");
const app_error = require("../utils/app_error");
const jwt_generation = require("../utils/generate_jwt");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generate_jwt = require("../utils/generate_jwt");

// get_all_users
const get_all_users = async (req, res) => {
  //pagenation
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;

  const users = await User.find({}, { __v: false, password: false })
    .limit(limit)
    .skip(skip);
  //.limit(limit).skip(1)
  res.json({ status: http_status_text.SUCSSESS, data: { users } });
};

//registeration
const register = async_wrapper(async (req, res, next) => {
  const { first_name, last_name, email, password,role } = req.body;
  //validate no dublicate emails
  const old_user = await User.findOne({ email: email });
  if (old_user) {
    const error = app_error.create(
      "email already exist",
      404,
      http_status_text.FAIL
    );
    return next(error);
  }
  // console.log(req.body);
  // password hashing:
  const hashed_password = await bcryptjs.hash(password, 10);

  const new_user = new User({
    first_name,
    last_name,
    email,
    password: hashed_password,
    role
  });
  // generate jsonwebtaken:
    const token = await generate_jwt({
    email: new_user.email,
    id: new_user._id,
  });

  new_user.token = token;
  await new_user.save();
  res.json({ status: http_status_text.SUCSSESS, data: { user: new_user } });
});

// //login
// // we compare data entred in registeration with data entred in login:

const login = async_wrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const error = app_error.create(
      "this field is required ",
      400,
      http_status_text.FAIL
    );
    return next(error);
  }
  const user = await User.findOne({ email: email });

  if (!user) {
    const error = app_error.create(
      "user not found",
      400,
      http_status_text.FAIL
    );
    return next(error);
  }
  const compared_password = await bcryptjs.compare(password, user.password);
  if (user && compared_password) {
    // loged in successfuly
    // generate jsonwebtaken:
    const token = await generate_jwt({ email: user.email, id: user._id });

    return res.json({ status: http_status_text.SUCSSESS, data: {token} });
  } else {
    const error = app_error.create(
      "some thing wrong",
      500,
      http_status_text.ERROR
    );
    return next(error);
  }
});

module.exports = {
  get_all_users,
  register,
  login
};
