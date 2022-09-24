const model = require('./model')
const path = require('path')
const FS = require('../../lib/fs/fs')
require('dotenv').config()

module.exports = {
   GET: async (req, res) => {
      try {

         const {search_data} = req.params;

         if(search_data) {
            res.json({
               status: 200,
               data: await model.SEARCH_ESSENTIALS(`%${search_data}%`)
            })
         }
         else {
            res.json({
               status: 200,
               data: await model.ALL_ESSENTIALS()
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

   GET_SINGLE: async (req, res) => {
      try {
         const { id } = req.params
         
         const foundData = await model.SINGLE_ESSENTIAL(id)
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

        const uploadPhoto = req.file
        const {name, title, info, status} = req.body

        const essential_photo = `${process.env.BACKEND_URL}/${uploadPhoto.filename}`
        const essential_photo_name = uploadPhoto.filename

        const createdEssential = await model.ADD_ESSENTIAL(name, title, info, essential_photo, essential_photo_name, status)
         
        if(createdEssential) {
            res.json({
               status: 200,
               message: 'Essential Created'
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

        const uploadPhoto = req.file
        const { id, name, title, info, status } = req.body

        let essential_photo = '' 
        let essential_photo_name = ''

        const foundEssential = await model.SELECTED_ESSENTIAL(id)

       if(uploadPhoto) {
         new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media',`${foundEssential?.essential_photo_name}`)).delete()
         essential_photo = `${process.env.BACKEND_URL}/${uploadPhoto.filename}`
         essential_photo_name = uploadPhoto.filename
       }
       else {
         essential_photo = foundEssential?.essential_photo
         essential_photo_name = foundEssential?.essential_photo_name
       }

        const updateEssential = await model.UPDATE_ESSENTIAL(id, name, title, info, essential_photo, essential_photo_name, status)
         
        if(updateEssential) {
            res.json({
               status: 200,
               message: 'Essential Updated'
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

         const {id, status} = req.body;

         const statusEssential = await model.EDIT_ESSENTIAL(id, status)

         if(statusEssential) {
            res.json({
               status: 200,
               message: 'Essential status edited'
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
         
         const {id} = req.body;

         const deleteEssential = await model.DELETE_ESSENTIAL(id)
         const foundEssential = await model.SELECTED_ESSENTIAL(id)

         if(deleteEssential) {

            new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media',`${foundEssential?.essential_photo_name}`)).delete()
           
            res.json({
               status: 200,
               message: 'Essential Deleted'
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