const model = require('./model')
const path = require('path')
const FS = require('../../lib/fs/fs')
require('dotenv').config()

module.exports = {
   GET: async (req, res) => {
      try {
         const { search_data } = req.params

         if (search_data) {

            const sendData = []
            const name = {}
            const short_info = {}
            const foundData = await model.SEARCH_REGION(`%${search_data}%`)
            
            foundData?.forEach(e => {
               name.oz = e.name_oz
               name.uz = e.name_uz
               name.ru = e.name_ru
               name.en = e.name_en

               short_info.oz = e.short_info_oz
               short_info.uz = e.short_info_uz
               short_info.ru = e.short_info_ru
               short_info.en = e.short_info_en

               sendData.push({
                  id : e.id,
                  name: name,
                  short_info : short_info,
                  shrine_count : e.shrine_count,
                  video : e.video,
                  photo : e.photo,
                  status : e.status
               })
            })
            res.json({
               status: 200,
               data: sendData
            })
         }
         else {

            const sendData = []
            const name = {}
            const short_info = {}
            const foundData = await model.ALL_REGION()
            
            foundData?.forEach(e => {
               name.oz = e.name_oz
               name.uz = e.name_uz
               name.ru = e.name_ru
               name.en = e.name_en

               short_info.oz = e.short_info_oz
               short_info.uz = e.short_info_uz
               short_info.ru = e.short_info_ru
               short_info.en = e.short_info_en

               sendData.push({
                  id : e.id,
                  name: name,
                  short_info : short_info,
                  shrine_count : e.shrine_count,
                  video : e.video,
                  photo : e.photo,
                  status : e.status
               })
            })
            res.json({
               status: 200,
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

   GET_REF: async (_, res) => {
      try {
            const sendData = []
            const name = {}
            const refData = await model.REF_REGION()

            refData?.forEach(e => {

               name.oz = e.name_oz
               name.uz = e.name_uz
               name.ru = e.name_ru
               name.en = e.name_en

               sendData.push({
                  id : e.id,
                  name: name
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
         const name = {}
         const short_info = {}
         const foundData = await model.SINGLE_REGION(id)

         name.oz = foundData?.name_oz
         name.uz = foundData?.name_uz
         name.ru = foundData?.name_ru
         name.en = foundData?.name_en

         short_info.oz = foundData?.short_info_oz
         short_info.uz = foundData?.short_info_uz
         short_info.ru = foundData?.short_info_ru
         short_info.en = foundData?.short_info_en

         sendData.id = foundData?.id
         sendData.name = name
         sendData.short_info = foundData?.short_info
         sendData.shrine_count = foundData?.shrine_count
         sendData.video =  foundData?.video
         sendData.photo =  foundData?.photo
         sendData.status =  foundData?.status

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
            const name = {}
            const short_info = {}
            const foundData = await model.ALL_ACTIVE_REGION()
            
            foundData?.forEach(e => {
               name.oz = e.name_oz
               name.uz = e.name_uz
               name.ru = e.name_ru
               name.en = e.name_en

               short_info.oz = e.short_info_oz
               short_info.uz = e.short_info_uz
               short_info.ru = e.short_info_ru
               short_info.en = e.short_info_en

               sendData.push({
                  id : e.id,
                  name: name,
                  short_info : short_info,
                  shrine_count : e.shrine_count,
                  video : e.video,
                  photo : e.photo,
                  status : e.status
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

   GET_ACTIVE_SINGLE: async (req, res) => {
      try {
         const { id } = req.params

         const sendData = {}
         const name = {}
         const short_info = {}
         const foundData = await model.SINGLE_ACTIVE_REGION(id)

         name.oz = foundData?.name_oz
         name.uz = foundData?.name_uz
         name.ru = foundData?.name_ru
         name.en = foundData?.name_en

         short_info.oz = foundData?.short_info_oz
         short_info.uz = foundData?.short_info_uz
         short_info.ru = foundData?.short_info_ru
         short_info.en = foundData?.short_info_en

         sendData.id = foundData?.id
         sendData.name = name
         sendData.short_info = foundData?.short_info
         sendData.shrine_count = foundData?.shrine_count
         sendData.video =  foundData?.video
         sendData.photo =  foundData?.photo
         sendData.status =  foundData?.status

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

         const uploadMedia = req.files;
         const { name, short_info, shrine_count, status } = req.body

         const name_oz = name.oz
         const name_uz = name.uz
         const name_ru = name.ru
         const name_en = name.en

         const short_info_oz = short_info.oz
         const short_info_uz = short_info.uz
         const short_info_ru = short_info.ru
         const short_info_en = short_info.en

         const reg_photo = [];
         const reg_photo_name = [];
         const reg_video = `${process.env.BACKEND_URL}/${uploadMedia?.video[0].filename}`
         const reg_video_name = uploadMedia?.video[0].filename

         uploadMedia?.photo.forEach(e => {
            reg_photo.push(`${process.env.BACKEND_URL}/${e.filename}`)
            reg_photo_name.push(e.filename)
         })

         const createdRegion = await model.ADD_REGION(name_oz, name_uz, name_ru, name_en, short_info_oz, short_info_uz, short_info_ru, short_info_en, shrine_count, reg_video, reg_video_name, reg_photo, reg_photo_name, status)

         if (createdRegion) {
            res.json({
               status: 200,
               message: 'Region Created'
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

         const uploadMedia = req.files
         const { id, name, short_info, shrine_count, status } = req.body

         const name_oz = name.oz
         const name_uz = name.uz
         const name_ru = name.ru
         const name_en = name.en

         const short_info_oz = short_info.oz
         const short_info_uz = short_info.uz
         const short_info_ru = short_info.ru
         const short_info_en = short_info.en

         const region_photo = []
         const region_photo_name = []

         let region_video = ''
         let region_video_name = ''

         const foundRegion = await model.SELECTED_REGION(id)

         if (uploadMedia?.photo) {

            foundRegion?.region_photo_name.forEach(e => {
               new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media', `${e}`)).delete()
            })

            uploadMedia?.photo.forEach(e => {
               region_photo.push(`${process.env.BACKEND_URL}/${e.filename}`)
               region_photo_name.push(e.filename)
            })
         }
         else {
            foundRegion?.region_photo.forEach(e => {
               region_photo.push(e)
            })
            foundRegion?.region_photo_name.forEach(e => {
               region_photo_name.push(e)
            })
         }

         if (uploadMedia?.video) {
            new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media', `${foundRegion?.region_video_name}`)).delete()

            region_video = `${process.env.BACKEND_URL}/${uploadMedia?.video[0].filename}`
            region_video_name = uploadMedia?.video[0].filename
         }
         else {
            region_video = foundRegion?.region_video
            region_video_name = foundRegion?.region_video_name
         }

         const updateRegion = await model.UPDATE_REGION(id, name_oz, name_uz, name_ru, name_en, short_info_oz, short_info_uz, short_info_ru, short_info_en, shrine_count, region_video, region_video_name, region_photo, region_photo_name, status)

         if (updateRegion) {
            res.json({
               status: 200,
               message: 'Region Updated'
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

         const statusRegion = await model.EDIT_REGION(id, status)

         if (statusRegion) {
            res.json({
               status: 200,
               message: 'Region status edited'
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

         const deleteRegion = await model.DELETE_REGION(id)
         const foundRegion = await model.SELECTED_REGION(id)

         if (deleteRegion) {

            new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media', `${foundRegion?.region_video_name}`)).delete()

            foundRegion?.region_photo_name.forEach(e => {
               new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media', `${e}`)).delete()
            })

            res.json({
               status: 200,
               message: 'Region Deleted'
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