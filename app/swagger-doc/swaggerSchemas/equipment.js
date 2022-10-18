const { string } = require("joi");

    //~ ------------------------------ USER

    const equipmentProperties = {
        id: { type: 'integer' },
        description: { type: 'string' },
        icon_link: { type: 'string' },
    
        id: { type: 'integer' },
        description: { type: 'string' },
        icon_link: { type: 'string' },

        id: { type: 'integer' },
        description: { type: 'string' },
        icon_link: { type: 'string' },

        id: { type: 'integer' },
        description: { type: 'string' },
        icon_link: { type: 'string' },

        id: { type: 'integer' },
        description: { type: 'string' },
        icon_link: { type: 'string' },

        id: { type: 'integer' },
        description: { type: 'string' },
        icon_link: { type: 'string' },
    };

const equipmentExample = {
        id: 'integer',
        description: 'string',
        icon_link: 'string',

        id: 'integer',
        description: 'string',
        icon_link: 'string',

        id: 'integer',
        description: 'string',
        icon_link: 'string',

        id: 'integer',
        description: 'string',
        icon_link: 'string',

        id: 'integer',
        description: 'string',
        icon_link: 'string',

        id: 'integer',
        description: 'string',
        icon_link: 'string',
    };

module.exports = { equipmentProperties, equipmentExample };