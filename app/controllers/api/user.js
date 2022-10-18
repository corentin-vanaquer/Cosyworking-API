require("dotenv").config();
const userDatamapper = require("../../Datamapper/user");
const roleDatamapper = require("../../Datamapper/role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {

  /**
   * Method to sign up
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  async signup(req, res) {

    // We get user's information
    const userToInsert = req.body;

    // We fetch the role_id from the user created
    const idRole = await roleDatamapper.findByDescription(userToInsert.role_id);

    if (!idRole) {
      res.status(400).send({
        message: "Failed! Role not found!"
      });
      return;
    }

    // We change the value from role to role_id
    userToInsert.role_id = idRole[0].id;

    // We update the password into crypted string
    userToInsert.password = bcrypt.hashSync(req.body.password, 8);

    const result = await userDatamapper.create(userToInsert);

    res.json(result);
  },

  /**
   * Method to login
   * @param {*} req 
   * @param {*} res 
   */
  async login(req, res) {

    const emailToFInd = req.body.email;

    // We fetch the user according to his email
    const user = await userDatamapper.findUserLoggedByEmail(emailToFInd);

    // If user don't exist, obligatory send a 0 length 
    if (user.length === 0) {
      res.status(404).send({
        message: "User not found"});
    }

    // Compare the user password with the crypted password in Db, return boolean
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user[0].password
    );

    if (!passwordIsValid) {
      res.status(401).send({
        message: "Invalid password"});
    }

    // We create the user's token
    // attached to it's id and role
    // to have a direct access
    const token = jwt.sign({
      userId: user[0].id, 
      userRoleDescription: user[0].role_description}, 
      process.env.JWT_SECRET,
      {
      expiresIn: 3600 // 24 hours
    });

    // We create an object for the Front response
    const userLogged = {
      userId: user[0].id, 
      userRoleDescription: user[0].role_description,  
      userToken: token,
      userAvatar: user[0].avatar
    }

    res.json(userLogged);
  },

  async findUserById(req,res) {

    const userId = req.params.id;

    const result = await userDatamapper.getUserByPk(userId);

    res.json(result);
  },

};



