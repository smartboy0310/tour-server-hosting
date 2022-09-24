const model = require('./model')
const path = require('path')
const FS = require('../../lib/fs/fs')
require('dotenv').config()

module.exports = {
   GET: async(req, res) => {
      try {
         
            res.json({
               status: 200,
               data: await model.ALL_SLIDER()
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
            const foundData = await model.SINGLE_SLIDER(id)
            if (foundData) {
               res.json({
                  status: 200,
                  data: foundData
               })
            }
             else{
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
            const foundData = await model.ALL_ACTIVE_SLIDER()
            if (foundData) {
               res.json({
                  status: 200,
                  data: foundData
               })
            }
             else{
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

         const  mediaUpload = req.file;
         const {title, status} = req.body;
        
         const photo = `${process.env.BACKEND_URL}/${mediaUpload.filename}`
         const photo_name = mediaUpload.filename
         
         const createSlider = await model.ADD_SLIDER( title, photo, photo_name,  status)

         if(createSlider) {
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
         const {id, title, status} = req.body;
         
         let photo = ''
         let photo_name = ''

         const foundSilder = await model.SELECTED_SLIDER(id)

         if(mediaUpload) {
            new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media',`${foundSilder?.photo_name}`)).delete()
            
            photo = `${process.env.BACKEND_URL}/${mediaUpload.filename}`
            photo_name = mediaUpload.filename     
        }
         else {            
            photo = foundSilder?.photo           
            photo_name = foundSilder?.photo_name
         }
         
         const updateSlider = await model.UPDATE_SLIDER( id, title, photo, photo_name, status)

         if(updateSlider) {
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
            const {id, status} = req.body
            
            const editSlider = await model.EDIT_SLIDER(id, status)

            if(editSlider) {
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


         if(deleteSlider) {
           
            new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media',`${foundSlider?.photo_name}`)).delete()

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