// libraries
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// models
const UserModel = require("../../models/user");

const {
  USER_ALREAY_EXISTS,
  USER_NOT_FOUND,
  INVALID_PASSWORD
} = require("../constants/errorMessages");
const { transformUser } = require("./mergeUtils");

const authResolver = {
  login: async ({ authInput }) => {
    try {
      const { email, password } = authInput;

      // 1. get user
      const user = await UserModel.findOne({ email: email });
      if (!user) {
        throw new Error(USER_NOT_FOUND);
      }

      // 2. verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error(INVALID_PASSWORD);
      }

      // 3. create JWT
      const token = jwt.sign({ user: email, expirationTime: 1 }, "secretkey", {
        expiresIn: "1h"
      });

      return {
        token,
        expirationTime: 1,
        user: email
      };
    } catch (error) {
      throw error;
    }
  },
  users: async () => {
    // only sending the id and email and filtering out password from user document.
    const users = await UserModel.find();
    return users.map(user => ({
      ...transformUser(user),
      password: null
    }));
  },
  createUser: async ({ userInput }) => {
    const { email, password } = userInput;

    try {
      const user = await UserModel.findOne({ email });
      if (user) {
        throw Error(USER_ALREAY_EXISTS);
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const createdUser = await new UserModel({
        email,
        password: hashedPassword
      }).save();
      return {
        email: createdUser.email,
        _id: createdUser.id,
        password: null
      };
    } catch (saveError) {
      throw saveError;
    }
  }
};

exports.transformUser = transformUser;
exports.authResolver = authResolver;
