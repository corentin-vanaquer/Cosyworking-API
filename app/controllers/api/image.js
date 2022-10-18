const imageDatamapper = require('../../Datamapper/image');
const fs = require('fs');

module.exports = {

    async delete(req, res) {

        const workspaceId = req.params.id;
        const searchDetails = req.body;
    
        const workspaceImageDeleted = await imageDatamapper.deleteWorkspaceImages(workspaceId, searchDetails);
    
        if(workspaceImageDeleted){    
          fs.unlinkSync(`public/${searchDetails.image_link}`);
        } else {
          console.log(`can not find ${imagePath} into ${workspaceImageDeleted}`)
        }


        res.json(workspaceImageDeleted);
    
      }
}