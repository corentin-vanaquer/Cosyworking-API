const Joi = require('joi');

module.exports = Joi.object({
    user_id: Joi.number().required(),
    workspace_id: Joi.number().required(),
}).required();
