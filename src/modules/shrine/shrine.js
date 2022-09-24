const model = require('./model')
const path = require('path')
const FS = require('../../lib/fs/fs')
require('dotenv').config()

module.exports = {
   GET: async (req, res) => {
      try {
         const { search_data, page, limit } = req.query;
         const countShrine = await model.COUNT_SHRINE()
         const countShrineSearch = await model.COUNT_SHRINE_SEARCH(`%${search_data}%`)
         if (search_data) {
            res.json({
               status: 200,
               totalPages: Math.ceil(parseInt(countShrineSearch?.count) / limit),
               totalItems: parseInt(countShrineSearch?.count),
               data: await model.SEARCH_SHRINE(`%${search_data}%`, page, limit),
            })
         }
         else {
            res.json({
               status: 200,
               totalPages: Math.ceil(parseInt(countShrine?.count) / limit),
               totalItems: parseInt(countShrine?.count),
               data: await model.ALL_SHRINE(page, limit)
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

   GET_REF: async (req, res) => {
      try {
         const { reg_id } = req.params
         res.json({
            status: 200,
            data: await model.REF_SHRINE(reg_id)
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
         const foundData = await model.SINGLE_SHRINE(id)
         if (foundData) {
            res.json({
               status: 200,
               data: foundData
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

   GET_ACTIVE: async (req, res) => {
      try {
         const { reg_id } = req.params
         const foundData = await model.SHRINE_BY_REGION(reg_id)
         if (foundData) {
            res.json({
               status: 200,
               data: foundData
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

   GET_TOP: async (_, res) => {
      try {
         const foundData = await model.TOP_SHRINE()
         if (foundData) {
            res.json({
               status: 200,
               data: foundData
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

   GET_ACTIVE_SINGLE: async (req, res) => {
      try {
         const { id } = req.params
         const foundData = await model.SINGLE_ACTIVE_SHRINE(id)
         if (foundData) {
            res.json({
               status: 200,
               data: foundData
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

         const mediaUpload = req.files;

         const { name, title, info, add_title, add_info, address, location, phone, type, top, status, region_id } = req.body;

         const shrine_video = `${process.env.BACKEND_URL}/${mediaUpload?.video[0].filename}`
         const shrine_video_name = mediaUpload?.video[0].filename

         const audio_oz = `${process.env.BACKEND_URL}/${mediaUpload?.audiooz[0].filename}`
         const audio_oz_name = mediaUpload?.audiooz[0].filename
         const audio_ru = `${process.env.BACKEND_URL}/${mediaUpload?.audioru[0].filename}`
         const audio_ru_name = mediaUpload?.audioru[0].filename
         const audio_en = `${process.env.BACKEND_URL}/${mediaUpload?.audioen[0].filename}`
         const audio_en_name = mediaUpload?.audioen[0].filename

         const shrine_audio = {
            oz: audio_oz,
            ru: audio_ru,
            en: audio_en
         }
         const shrine_audio_name = {
            oz: audio_oz_name,
            ru: audio_ru_name,
            en: audio_en_name
         }

         const shrine_photo = []
         const shrine_photo_name = []

         mediaUpload?.photo.forEach(e => {
            shrine_photo.push(`${process.env.BACKEND_URL}/${e.filename}`)
            shrine_photo_name.push(e.filename)
         })

         const createShrine = await model.ADD_SHRINE(name, title, info, add_title, add_info, address, location, phone, type, top, shrine_video, shrine_video_name, shrine_audio, shrine_audio_name, shrine_photo, shrine_photo_name, status, region_id)

         if (createShrine) {
            res.json({
               status: 200,
               message: 'Shrine Created'
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

         const mediaUpload = req.files;

         const { id, name, title, info, add_title, add_info, address, location, phone, type, top, status, region_id } = req.body;

         let shrine_video = ''
         let shrine_video_name = ''
         let audio_oz = ''
         let audio_oz_name = ''
         let audio_ru = ''
         let audio_ru_name = ''
         let audio_en = '' 
         let audio_en_name = ''
         const shrine_photo = []
         const shrine_photo_name = []

         const foundShrine = await model.SELECT_SHRINE(id)

         if (mediaUpload?.photo) {
            foundShrine?.shrine_photo_name.forEach(e => {
               new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media', `${e}`)).delete()
            })
            mediaUpload?.photo.forEach(e => {
               shrine_photo.push(`${process.env.BACKEND_URL}/${e.filename}`)
               shrine_photo_name.push(e.filename)
            })
         }
         else {
            foundShrine?.shrine_photo.forEach(e => {
               shrine_photo.push(e)
            })
            foundShrine?.shrine_photo_name.forEach(e => {
               shrine_photo_name.push(e)
            })
         }

         if (mediaUpload?.video) {            
               new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media', `${foundShrine?.shrine_video_name}`)).delete()
            
               shrine_video = `${process.env.BACKEND_URL}/${mediaUpload?.video[0].filename}`
               shrine_video_name = mediaUpload?.video[0].filename
         }
         else {
               shrine_video = foundShrine?.shrine_video
               shrine_video_name = foundShrine?.shrine_video_name         
         }

         if (mediaUpload?.audiooz) {            
               new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media', `${foundShrine?.shrine_audio_name.oz}`)).delete()
         
               audio_oz = `${process.env.BACKEND_URL}/${mediaUpload?.audiooz[0].filename}`
               audio_oz_name = mediaUpload?.audiooz[0].filename
         }
         else {
               audio_oz = foundShrine?.shrine_audio.oz
               audio_oz_name = foundShrine?.shrine_audio_name.oz         
         }

         if (mediaUpload?.audioru) {            
               new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media', `${foundShrine?.shrine_audio_name.ru}`)).delete()
         
               audio_ru = `${process.env.BACKEND_URL}/${mediaUpload?.audioru[0].filename}`
               audio_ru_name = mediaUpload?.audioru[0].filename
         }
         else {
               audio_ru = foundShrine?.shrine_audio.ru
               audio_ru_name = foundShrine?.shrine_audio_name.ru         
         }
          
         if (mediaUpload?.audioen) {            
               new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media', `${foundShrine?.shrine_audio_name.en}`)).delete()
         
               audio_en = `${process.env.BACKEND_URL}/${mediaUpload?.audioen[0].filename}`
               audio_en_name = mediaUpload?.audioen[0].filename
         }
         else {
               audio_en = foundShrine?.shrine_audio.en
               audio_en_name = foundShrine?.shrine_audio_name.en         
         }

         const shrine_audio = {
            oz: audio_oz,
            ru: audio_ru,
            en: audio_en
         }
         const shrine_audio_name = {
            oz: audio_oz_name,
            ru: audio_ru_name,
            en: audio_en_name
         }

         const updateShrine = await model.UPDATE_SHRINE(id, name, title, info, add_title, add_info, address, location, phone, type, top, shrine_video, shrine_video_name, shrine_audio, shrine_audio_name, shrine_photo, shrine_photo_name, status, region_id)

         if (updateShrine) {
            res.json({
               status: 200,
               message: 'Shrine Updated'
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

         const editShrine = await model.EDIT_SHRINE(id, status)

         if (editShrine) {
            res.json({
               status: 200,
               message: 'Shrine status edited'
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

         const deleteShrine = await model.DELETE_SHRINE(id)

         const foundShrine = await model.SELECT_SHRINE(id)


         if (deleteShrine) {

            new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media', `${foundShrine?.shrine_audio_name}`)).delete()
            new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media', `${foundShrine?.shrine_video_name}`)).delete()

            foundShrine?.shrine_photo_name.forEach(e => {
               new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media', `${e}`)).delete()
            })

            res.json({
               status: 200,
               message: 'Shrine Deleted'
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