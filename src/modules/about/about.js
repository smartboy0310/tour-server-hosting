const model = require('./model')

module.exports = {
   GET: async (_, res) => {
      try {
         const about = {}
         const target = {}
         const foundData = await model.ALL_ABOUT()

         about.oz = foundData?.about_oz
         about.uz = foundData?.about_uz
         about.ru = foundData?.about_ru
         about.en = foundData?.about_en

         target.oz = foundData?.target_oz
         target.uz = foundData?.target_uz
         target.ru = foundData?.target_ru
         target.en = foundData?.target_en

         const sendData = {
            about: about,
            target: target
         }

         res.json({
            status: 200,
            data: sendData
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

         const { about, target, status } = req.body;

         const about_oz = about.oz
         const about_uz = about.uz
         const about_ru = about.ru
         const about_en = about.en

         const target_oz = target.oz
         const target_uz = target.uz
         const target_ru = target.ru
         const target_en = target.en

         const updateAbout = await model.UPDATE_ABOUT(about_oz, about_uz, about_ru, about_en, target_oz, target_uz, target_ru, target_en, status)

         if (updateAbout) {
            res.json({
               status: 200,
               message: 'About info updated'
            })
         }
         else {
            res.statusCode = 500
            res.json({
               status: 500,
               message: 'Internal server error'
            })
         }

      } catch (err) {
         res.statusCode = 500
         res.json({
            status: 500,
            message: err.message
         })
      }
   },

   EDIT_STATUS: async (req, res) => {
      try {

         const { status } = req.body;

         const editAbout = await model.EDIT_ABOUT(status)

         if (editAbout) {
            res.json({
               status: 200,
               message: 'About status edited'
            })
         }
         else {
            res.statusCode = 500
            res.json({
               status: 500,
               message: 'Internal server error'
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