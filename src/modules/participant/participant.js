const model = require('./model') 
const path = require('path')
const FS = require('../../lib/fs/fs')
require('dotenv').config()

module.exports = {
   GET: async (req, res) => {
      try {

         const { search_data, page, limit } = req.query;
         const countParticipant = await model.COUNT_PARTICIPANT()
         const countParticipantSearch = await model.COUNT_PARTICIPANT_SEARCH(`%${search_data}%`)
         if (search_data) {
            res.json({
               status: 200,
               totalPages: Math.ceil(parseInt(countParticipantSearch?.count)/limit),
               totalItems: parseInt(countParticipantSearch?.count),
               data: await model.SEARCH_PARTICIPANT(`%${search_data}%`, page, limit),
            })
         }
         else {
            res.json({
               status: 200,
               totalPages: Math.ceil(parseInt(countParticipant?.count)/limit),
               totalItems: parseInt(countParticipant?.count),
               data: await model.ALL_PARTICIPANT(page, limit)
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
         
         const foundData = await model.SINGLE_PARTICIPANT(id)
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
         const { name, role, info, status } = req.body
         const participant_photo = `${process.env.BACKEND_URL}/${uploadPhoto.filename}`
         const participant_photo_name = uploadPhoto.filename

         const createdParticipant = await model.ADD_PARTICIPANT(name, role, info, participant_photo, participant_photo_name, status)
         
         if(createdParticipant) {
            res.json({
               status: 200,
               message: 'Participant Created'
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
         const {id, name, role, info, status } = req.body
         
         let participant_photo = ''
         let participant_photo_name = ''

         const foundParticipant = model.SELECTED_PARTICIPANT(id)
         if (uploadPhoto) {
            new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media',`${foundParticipant?.participant_photo_name}`)).delete()
            participant_photo = `${process.env.BACKEND_URL}/${uploadPhoto.filename}`
            participant_photo_name = uploadPhoto.filename
         }
         else {
            participant_photo = foundParticipant?.participant_photo_name
            participant_photo_name = foundParticipant?.participant_photo_name
         }

         const updatedParticipant = await model.UPDATE_PARTICIPANT(id, name, role, info, participant_photo, participant_photo_name, status)
         
         if(updatedParticipant) {
            res.json({
               status: 200,
               message: 'Participant Update'
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

         const statusParticipant = await model.EDIT_PARTICIPANT(id, status)

         if(statusParticipant) {
            res.json({
               status: 200,
               message: 'Participant status edited'
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

         const deleteParticipant = await model.DELETE_PARTICIPANT(id)
         const foundParticipant = await model.SELECTED_PARTICIPANT(id)

         if(deleteParticipant) {

            new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media',`${foundParticipant?.participant_photo_name}`)).delete()
                       
            res.json({
               status: 200,
               message: 'Participant Deleted'
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