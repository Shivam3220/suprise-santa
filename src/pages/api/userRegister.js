import UserSchema from "../../../database/schemas/UserSchema";
import connectDB from "../../../database/dbConnect";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwtSecret = process.env.jwt_secret;

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      // checking if user with email already exits or not
      const exitingUser = await UserSchema.find({ email: req.body.email });
      if (exitingUser.length == 0) {
        // creating a new user
        const { name, email, password, phone } = req.body;
        const hashPassword = bcrypt.hashSync(password, saltRounds);
        const NewUser = new UserSchema({
          name: name,
          email: email,
          password: hashPassword,
          phone: phone,
        });
        const UserAdded = await NewUser.save();
        var token = jwt.sign(
          { userId: UserAdded._id, name: UserAdded.name },
          jwtSecret
        );
        return res.status(200).send({
          msg: "User Registered",
          stat: true,
          token: token,
          userId: UserAdded._id,
        });
      }
      return res.status(409).send({
        msg: "server error",
        stat: false,
        error: "User name already exits try to log in",
      });
    } catch (error) {
      res
        .status(500)
        .send({ msg: "server error", stat: false, error: error.message });
    }
  }

  if (req.method == "GET") {
    try {
      const token = req.headers.token;
      var decoded = await jwt.verify(token, jwtSecret);
      return res.status(200).send({
        msg: "Token verified",
        stat: true,
        user: decoded,
      });
    } catch (error) {
      return res.status(500).send({
        msg: "Token verification error",
        stat: false,
        error: error,
      });
    }
  }
};

export default connectDB(handler);
