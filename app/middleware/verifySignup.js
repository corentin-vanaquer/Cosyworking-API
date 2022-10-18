const userDatamapper = require('../Datamapper/user');

const verifySignup = {

  /**
   * Method to verify if the email isn't already used
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   * @returns 
   */
  async checkDuplicateEmail (req, res, next) {

    const emailToFind = req.body.email;
    const user = await userDatamapper.findByEmail(emailToFind);

    // If already used, it would obligatory return a string bigger than 0
    if (user.length > 0) {
      res.status(400).send({
        message: "Failed! Email is already in use!"
      });
      return;
    } 

    next();
  }
};

module.exports = verifySignup;
