const model = require('./model') 
const path = require('path')
const FS = require('../../lib/fs/fs')
require('dotenv').config()

module.exports = {
   GET: async (_, res) => {
      try {
         res.json({
            status: 200,
            data: await model.ALL_LEADER()
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
         
         const foundData = await model.SINGLE_LEADER(id)
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
         const {name, role, info, phone, email, status} = req.body
         const leader_photo = `${process.env.BACKEND_URL}/${uploadPhoto.filename}`
         const leader_photo_name = uploadPhoto.filename

         const createdLeader = await model.ADD_LEADER(name, role, info, phone, email, leader_photo, leader_photo_name, status)
         
         if(createdLeader) {
            res.json({
               status: 200,
               message: 'Leader Created'
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
         const {id, name, role, info, phone, email, status} = req.body
         
         let leader_photo = ''
         let leader_photo_name = ''

         const foundLeader = await model.SELECTED_LEADER(id)
         if (uploadPhoto) {
            new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media',`${foundLeader?.leader_photo_name}`)).delete()
            leader_photo = `${process.env.BACKEND_URL}/${uploadPhoto.filename}`
            leader_photo_name = uploadPhoto.filename
         }
         else {
            leader_photo = foundLeader?.leader_photo
            leader_photo_name = foundLeader?.leader_photo_name
         }

         const updatedLeader = await model.UPDATE_LEADER(id, name, role, info, phone, email, leader_photo, leader_photo_name, status)
         
         if(updatedLeader) {
            res.json({
               status: 200,
               message: 'Leader Update'
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

         const statusLeader = await model.EDIT_LEADER(id, status)

         if(statusLeader) {
            res.json({
               status: 200,
               message: 'Leader status edited'
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

         const deleteLeader = await model.DELETE_LEADER(id)
         const foundLeader = await model.SELECTED_LEADER(id)

         if(deleteLeader) {

            new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media',`${foundLeader?.leader_photo_name}`)).delete()
            
            res.json({
               status: 200,
               message: 'Leader Deleted'
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