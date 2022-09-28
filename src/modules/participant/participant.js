const model = require('./model')
const path = require('path')
const FS = require('../../lib/fs/fs')
require('dotenv').config()

module.exports = {
   GET: async (req, res) => {
      try {

         const { search_data, page, limit } = req.query;

         const sendData = []
         const name = {}
         const role = {}
         const info = {}

         const countParticipant = await model.COUNT_PARTICIPANT()
         const countParticipantSearch = await model.COUNT_PARTICIPANT_SEARCH(`%${search_data}%`)
         
         if (search_data) {

            const foundData = await model.SEARCH_PARTICIPANT(`%${search_data}%`, page, limit)

            foundData?.forEach(e => {
               name.oz = e.name_oz
               name.uz = e.name_uz
               name.ru = e.name_ru
               name.en = e.name_en

               role.oz = e.title_oz
               role.uz = e.title_uz
               role.ru = e.title_ru
               role.en = e.title_en

               info.oz = e.info_oz
               info.uz = e.info_uz
               info.ru = e.info_ru
               info.en = e.info_en

               sendData.push({
                  id: e.id,
                  name: name,
                  role: role,
                  info: info,
                  photo: e.photo,
                  status: e.status
               })
            })

            res.json({
               status: 200,
               totalPages: Math.ceil(parseInt(countParticipantSearch?.count) / limit),
               totalItems: parseInt(countParticipantSearch?.count),
               data: sendData
            })
         }
         else {          

            const foundData = await model.ALL_PARTICIPANT(page, limit)

            foundData?.forEach(e => {
               name.oz = e.name_oz
               name.uz = e.name_uz
               name.ru = e.name_ru
               name.en = e.name_en

               role.oz = e.title_oz
               role.uz = e.title_uz
               role.ru = e.title_ru
               role.en = e.title_en

               info.oz = e.info_oz
               info.uz = e.info_uz
               info.ru = e.info_ru
               info.en = e.info_en

               sendData.push({
                  id: e.id,
                  name: name,
                  role: role,
                  info: info,
                  photo: e.photo,
                  status: e.status
               })
            })

            res.json({
               status: 200,
               totalPages: Math.ceil(parseInt(countParticipant?.count) / limit),
               totalItems: parseInt(countParticipant?.count),
               data: sendData
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
         const name = {}
         const role = {}
         const info = {}

         const foundData = await model.ACTIVE_PARTICIPANT()

         foundData?.forEach(e => {
            name.oz = e.name_oz
            name.uz = e.name_uz
            name.ru = e.name_ru
            name.en = e.name_en

            role.oz = e.title_oz
            role.uz = e.title_uz
            role.ru = e.title_ru
            role.en = e.title_en

            info.oz = e.info_oz
            info.uz = e.info_uz
            info.ru = e.info_ru
            info.en = e.info_en

            sendData.push({
               id: e.id,
               name: name,
               role: role,
               info: info,
               phone: e.phone,
               email: e.email,
               photo: e.photo
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

         const name = {}
         const role = {}
         const info = {}

         const foundData = await model.SINGLE_PARTICIPANT(id)

         name.oz = foundData?.name_oz
         name.uz = foundData?.name_uz
         name.ru = foundData?.name_ru
         name.en = foundData?.name_en

         role.oz = foundData?.title_oz
         role.uz = foundData?.title_uz
         role.ru = foundData?.title_ru
         role.en = foundData?.title_en

         info.oz = foundData?.info_oz
         info.uz = foundData?.info_uz
         info.ru = foundData?.info_ru
         info.en = foundData?.info_en

         const sendData = {
            id: foundData?.id,
            name: name,
            role: role,
            info: info,
            phone: foundData?.phone,
            email: foundData?.email,
            photo: foundData?.photo
         }
         
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
         const uploadPhoto = req.file
         const { name, role, info, status } = req.body

         const name_oz = name.oz
         const name_uz = name.uz
         const name_ru = name.ru
         const name_en = name.en

         const role_oz = role.oz
         const role_uz = role.uz
         const role_ru = role.ru
         const role_en = role.en

         const info_oz = info.oz
         const info_uz = info.uz
         const info_ru = info.ru
         const info_en = info.en

         const participant_photo = `${process.env.BACKEND_URL}/${uploadPhoto.filename}`
         const participant_photo_name = uploadPhoto.filename

         const createdParticipant = await model.ADD_PARTICIPANT(name_oz, name_uz, name_ru, name_en, role_oz, role_uz, role_ru, role_en, info_oz, info_uz, info_ru, info_en, participant_photo, participant_photo_name, status)

         if (createdParticipant) {
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
         const { id, name, role, info, status } = req.body

         const name_oz = name.oz
         const name_uz = name.uz
         const name_ru = name.ru
         const name_en = name.en

         const role_oz = role.oz
         const role_uz = role.uz
         const role_ru = role.ru
         const role_en = role.en

         const info_oz = info.oz
         const info_uz = info.uz
         const info_ru = info.ru
         const info_en = info.en

         let participant_photo = ''
         let participant_photo_name = ''

         const foundParticipant = model.SELECTED_PARTICIPANT(id)
         if (uploadPhoto) {
            new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media', `${foundParticipant?.participant_photo_name}`)).delete()
            participant_photo = `${process.env.BACKEND_URL}/${uploadPhoto.filename}`
            participant_photo_name = uploadPhoto.filename
         }
         else {
            participant_photo = foundParticipant?.participant_photo_name
            participant_photo_name = foundParticipant?.participant_photo_name
         }

         const updatedParticipant = await model.UPDATE_PARTICIPANT(id, name_oz, name_uz, name_ru, name_en, role_oz, role_uz, role_ru, role_en, info_oz, info_uz, info_ru, info_en, participant_photo, participant_photo_name, status)

         if (updatedParticipant) {
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

         const { id, status } = req.body;

         const statusParticipant = await model.EDIT_PARTICIPANT(id, status)

         if (statusParticipant) {
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

         const { id } = req.body;

         const deleteParticipant = await model.DELETE_PARTICIPANT(id)
         const foundParticipant = await model.SELECTED_PARTICIPANT(id)

         if (deleteParticipant) {

            new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media', `${foundParticipant?.participant_photo_name}`)).delete()

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