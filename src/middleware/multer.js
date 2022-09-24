const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.resolve(__dirname, '..','..','public','media'));
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() +'-'+ file.originalname.split(" ").join(""))
    }
})
const upload = multer({ storage: storage })

module.exports = upload