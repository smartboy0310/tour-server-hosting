const model = require('./model')
const path = require('path')
const FS = require('../../lib/fs/fs')
require('dotenv').config()

module.exports = {
   GET: async (_, res) => {
      try {

         const sendData = []
         const name = {}
         const role = {}
         const info = {}

         const foundData = await model.ALL_LEADER()

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

   GET_ACTIVE: async (_, res) => {
      try {

         const sendData = []
         const name = {}
         const role = {}
         const info = {}

         const foundData = await model.ACTIVE_LEADER()

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

         const name = {}
         const role = {}
         const info = {}

         const foundData = await model.SINGLE_LEADER(id)

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
            photo: foundData?.photo,
            status: foundData?.status
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
         const { name : names, role : roles, info : infos, phone, email, status } = req.body

         const name = JSON.parse(names)
         const role = JSON.parse(roles)
         const info = JSON.parse(infos)

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

         const leader_photo = `${process.env.BACKEND_URL}/${uploadPhoto.filename}`
         const leader_photo_name = uploadPhoto.filename

         const createdLeader = await model.ADD_LEADER(name_oz, name_uz, name_ru, name_en, role_oz, role_uz, role_ru, role_en, info_oz, info_uz, info_ru, info_en, phone, email, leader_photo, leader_photo_name, status)

         if (createdLeader) {
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
         const { id, name : names, role : roles, info : infos, phone, email, status } = req.body

         const name = JSON.parse(names)
         const role = JSON.parse(roles)
         const info = JSON.parse(infos)

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


         let leader_photo = ''
         let leader_photo_name = ''

         const foundLeader = await model.SELECTED_LEADER(id)
         if (uploadPhoto) {
            new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media', `${foundLeader?.leader_photo_name}`)).delete()
            leader_photo = `${process.env.BACKEND_URL}/${uploadPhoto.filename}`
            leader_photo_name = uploadPhoto.filename
         }
         else {
            leader_photo = foundLeader?.leader_photo
            leader_photo_name = foundLeader?.leader_photo_name
         }

         const updatedLeader = await model.UPDATE_LEADER(name_oz, name_uz, name_ru, name_en, role_oz, role_uz, role_ru, role_en, info_oz, info_uz, info_ru, info_en, phone, email, leader_photo, leader_photo_name, status)

         if (updatedLeader) {
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

         const { id, status } = req.body;

         const statusLeader = await model.EDIT_LEADER(id, status)

         if (statusLeader) {
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

         const { id } = req.body;

         const deleteLeader = await model.DELETE_LEADER(id)
         const foundLeader = await model.SELECTED_LEADER(id)

         if (deleteLeader) {

            new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media', `${foundLeader?.leader_photo_name}`)).delete()

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