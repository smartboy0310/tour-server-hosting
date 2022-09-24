const model = require('./model')
const path = require('path')
const FS = require('../../lib/fs/fs')
require('dotenv').config()

module.exports = {
   GET: async(_, res) => {
      try {
         res.json({
            status: 200,
            data: await model.GENERAL()
         })

      } catch (err) {
         res.statusCode = 500
         res.json({
            status: 500,
            message: err.message
         })
      }
   },

   PUT: async (req, res) => {
      try {

         const mediaUpload = req.file
         const { telegram, facebook, instagram } = req.body

         let home_video = ''
         let home_video_name = ''

         const foundData = await model.GENERAL_FOUND()
         
        if(mediaUpload) {
            new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media',`${foundData?.video_name}`)).delete()

            home_video = `${process.env.BACKEND_URL}/${e.filename}`
            home_video_name = mediaUpload.filename
        }
        else {
            home_video = foundData?.video
            home_video_name = foundData.video_name
        }

         const updateGeneral = await model.UPDATE_GERERAL( home_video, home_video_name, telegram, facebook, instagram)

         if(updateGeneral) {
            res.json({
               status: 200,
               message: 'General Updated'
            })
         }
         else {
            res.statusCode = 500
            res.json({
               status: 500,
               message: "Internal server error"
            })
         }
         
      } catch (err) {
         res.statusCode = 500
         res.json({
            status: 500,
            message: err.message
         })
      }
   }
}