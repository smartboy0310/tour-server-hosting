const model = require('./model')
const path = require('path')
const FS = require('../../lib/fs/fs')
require('dotenv').config()

module.exports = {
   GET: async (req, res) => {
      try {

         const sendData = []

         const foundData = await model.ALL_SLIDER()

         foundData?.forEach(e => {

            sendData.push({
               id: e.id,
               title: {
                  oz: e.title_oz,
                  uz: e.title_uz,
                  ru: e.title_ru,
                  en: e.title_en
               },
               photo: e.photo,
               status: e.status
            })
         })

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

   GET_SINGLE: async (req, res) => {
      try {
         const { id } = req.params

         const sendData = {}
         const title = {}

         const foundData = await model.SINGLE_SLIDER(id)

         title.oz = foundData?.title_oz
         title.uz = foundData?.title_uz
         title.ru = foundData?.title_ru
         title.en = foundData?.title_en

         sendData.id = foundData?.id
         sendData.title = title
         sendData.photo = foundData?.photo
         sendData.status = foundData?.status

         if (foundData) {
            res.json({
               status: 200,
               data: sendData
            })
         }
         else {
            res.statusCode = 404
            res.json({
               status: 404,
               message: 'Not found'
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

   GET_ACTIVE: async (_, res) => {
      try {

         const sendData = []

         const foundData = await model.ALL_ACTIVE_SLIDER()

         foundData?.forEach(e => {

            
            sendData.push({
               id: e.id,
               title: {
                  oz: e.title_oz,
                  uz: e.title_uz,
                  ru: e.title_ru,
                  en: e.title_en
               },
               photo: e.photo
            })
         })

         if (foundData) {
            res.json({
               status: 200,
               data: sendData
            })
         }
         else {
            res.statusCode = 404
            res.json({
               status: 404,
               message: 'Not found'
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

   POST: async (req, res) => {
      try {

         const mediaUpload = req.file;
         const { title: titles, status } = req.body;

         const title = JSON.parse(titles)

         const title_oz = title.oz
         const title_uz = title.uz
         const title_ru = title.ru
         const title_en = title.en

         const photo = `${process.env.BACKEND_URL}/${mediaUpload.filename}`
         const photo_name = mediaUpload.filename

         const createSlider = await model.ADD_SLIDER(title_oz, title_uz, title_ru, title_en, photo, photo_name, status)

         if (createSlider) {
            res.json({
               status: 200,
               message: 'Slider Created'
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
   },

   PUT: async (req, res) => {
      try {

         const mediaUpload = req.file;
         const { id, title: titles, status } = req.body;

         const title = JSON.parse(titles)

         const title_oz = title.oz
         const title_uz = title.uz
         const title_ru = title.ru
         const title_en = title.en

         let photo = ''
         let photo_name = ''

         const foundSilder = await model.SELECTED_SLIDER(id)

         if (mediaUpload) {
            new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media', `${foundSilder?.photo_name}`)).delete()

            photo = `${process.env.BACKEND_URL}/${mediaUpload.filename}`
            photo_name = mediaUpload.filename
         }
         else {
            photo = foundSilder?.photo
            photo_name = foundSilder?.photo_name
         }

         const updateSlider = await model.UPDATE_SLIDER(id, title_oz, title_uz, title_ru, title_en, photo, photo_name, status)

         if (updateSlider) {
            res.json({
               status: 200,
               message: 'Slider Updated'
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
   },

   EDIT_STATUS: async (req, res) => {
      try {
         const { id, status } = req.body

         const editSlider = await model.EDIT_SLIDER(id, status)

         if (editSlider) {
            res.json({
               status: 200,
               message: 'Slider status edited'
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
   },

   DELETE: async (req, res) => {
      try {

         const { id } = req.body;

         const deleteSlider = await model.DELETE_SLIDER(id)

         const foundSlider = await model.SELECTED_SLIDER(id)


         if (deleteSlider) {

            new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media', `${foundSlider?.photo_name}`)).delete()

            res.json({
               status: 200,
               message: 'Slider Deleted'
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