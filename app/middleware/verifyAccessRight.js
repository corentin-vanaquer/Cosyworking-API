require('dotenv').config();
const jwt = require('jsonwebtoken');

const verifyAccesRight = {

    /**
     * Method to verify/decode a token on a header's request
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
  verifyToken(req, res, next) {
    
    // We put the token value into the token variable
    const token = req.headers["x-access-token"];
  
    // We verify if the token is empty
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }
  
    // We decode the token and handle if it is not the right one
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

      if (err) {
        if (err.message = "jwt expired") {
          return res.status(401).send({
            message: "Token Expired !"
          })
        }
        return res.status(401).send({
          message: "Unauthorized!"
        });
      }

    // We put user's id and user's role into those two session variable
    req.userId = decoded.userId;
    req.roleDescription = decoded.userRoleDescription

      next();
    });
  },

  /**
   * Method to verify the user's role and give acces according to his rights
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   * @returns 
   */
  isCoworker(req, res, next) {

    if(req.roleDescription === 'coworker' || req.roleDescription === 'admin') {
      next();
    } else {
      return res.status(403).send({message: 'require coworker role'})
    }
    
  },

    /**
   * Method to verify the user's role and give acces according to his rights
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   * @returns 
   */
  isHost(req, res, next) {

    if(req.roleDescription === 'host'|| req.roleDescription === 'admin') {
      next();

    } else {

      return res.status(403).send({message: 'require host role'})
    }
    
  },

    /**
   * Method to verify the user's role and give acces according to his rights
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   * @returns 
   */
  isAuthenticate(req, res, next) {

    if (req.roleDescription === 'host' || req.roleDescription === 'coworker' || req.roleDescription === 'admin') {
      next();

    } else {
      return res.status(403).send({message: 'require to be authenticate'})
    }
  },

    /**
   * Method to verify the user's role and give acces according to his rights
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   * @returns 
   */
  isAdmin(req, res, next) {

    if(req.roleDescription === 'admin') {
      next();
    } else {
      
      return res.status(403).send({message: 'require admin role'})
    }
    
  }

};

module.exports = verifyAccesRight;
