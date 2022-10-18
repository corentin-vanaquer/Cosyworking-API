const { string } = require("joi");

    //~ ------------------------------ USER

    const userProperties = {
        id: { type: 'integer' },
        avatar: { type: 'string'},
        first_name: { type: 'string'},
        username: { type: 'string'},
        about: { type: 'string'},
        created_at: { type: 'timestamptz'},
        role: { type: 'string'},
        workspace_id: { type: 'integer'},
        workspace_title: { type: 'string'},
        image_link: { type: 'string'}
    };

const userExample = {
      get_user: {
        id: 'integer' ,
        avatar: 'string',
        first_name: 'string',
        username: 'string',
        about: 'string',
        created_at: 'timestamptz',
        role: 'string',
        workspaces: [
          {
            workspace_id: 'integer',
            workspace_title: 'string',
            image_link: 'string'
          }
        ]
      }
    };

module.exports = { userProperties, userExample };