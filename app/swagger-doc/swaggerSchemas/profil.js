
    //~ ------------------------------ PROFIL

    const profilProperties = {
        id: {type: 'integer'},
        last_name: {type: 'string'},
        first_name: {type: 'string'},
        email: {type: 'string'},
        username: {type: 'string'},
        avatar: {type: 'string'},
        about: {type: 'string'},
        gender: {type: 'string'},
        role: {type: 'string'},
      };
  
    const profilExample = {
        id: 'integer',
        last_name: 'string',
        first_name: 'string',
        email: 'string',
        username: 'string',
        avatar: 'string',
        about: 'string',
        gender: 'string',
        role: 'string',
      };
  
      //~ ------------------------------ UPDATE PROFIL
  
    const updateProfilProperties = {
        id: {type: 'integer'},
        last_name: {type: 'string'},
        first_name: {type: 'string'},
        email: {type: 'string'},
        username: {type: 'string'},
        avatar: {type: 'string'},
        about: {type: 'string'},
        gender: {type: 'string'},
        role: {type: 'string'},
      };
  
    const updateProfilExample = {
        id: 'integer',
        last_name: 'string',
        first_name: 'string',
        email: 'string',
        username: 'string',
        avatar: 'string',
        about: 'string',
        gender: 'string',
        role: 'string',
      };
  
module.exports = { profilProperties, profilExample, updateProfilProperties, updateProfilProperties };