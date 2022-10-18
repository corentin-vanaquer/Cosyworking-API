const Joi = require('joi');

module.exports = Joi.object({
    state: Joi.string().required(),
}).required();

