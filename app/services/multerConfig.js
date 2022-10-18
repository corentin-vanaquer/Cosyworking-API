const multer = require('multer');

const multerConfig = {
  editStorage() {
    const storage = multer.diskStorage(
     {
        destination: function (req, res, cb ) {

        if (req.files[0].fieldname === 'avatar') {
          cb(null, `./public/images/avatar`);

        } else if (req.files[0].fieldname.includes('workspace')) {
          cb(null, `./public/images/workspace`);

        } else if (req.files[0].fieldname === 'equipment'){
          cb(null, `./public/images/equipment`);
        }

        },
        filename: function ( _, file, cb ) {
          cb( null, Date.now() + '-' + file.originalname);
        }
     }
    );
  
    const bodyParser = multer({ storage: storage });
  
    return bodyParser;
  }

}

module.exports = multerConfig;