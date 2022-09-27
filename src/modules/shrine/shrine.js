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

            const sendData = []
            const name = {}
            const title = {}
            const info = {}
            const add_title = {}
            const add_info = {}
            const address = {}
            const location = {}
            const type = {}

            const foundData = await model.SEARCH_SHRINE(`%${search_data}%`, page, limit)

            foundData?.forEach(e => {
               name.oz = e.name_oz
               name.uz = e.name_uz
               name.ru = e.name_ru
               name.en = e.name_en

               title.oz = e.title_oz
               title.uz = e.title_uz
               title.ru = e.title_ru
               title.en = e.title_en

               info.oz = e.info_oz
               info.uz = e.info_uz
               info.ru = e.info_ru
               info.en = e.info_en

               add_title.oz = e.add_title_oz
               add_title.uz = e.add_title_uz
               add_title.ru = e.add_title_ru
               add_title.en = e.add_title_en

               add_info.oz = e.add_info_oz
               add_info.uz = e.add_info_uz
               add_info.ru = e.add_info_ru
               add_info.en = e.add_info_en

               address.oz = e.address_oz
               address.uz = e.address_uz
               address.ru = e.address_ru
               address.en = e.address_en

               location.x = e.location_x
               location.y = e.location_y

               type.oz = e.type_oz
               type.uz = e.type_uz
               type.ru = e.type_ru
               type.en = e.type_en

               sendData.push({
                  id: e.id,
                  name: name,
                  title: title,
                  info: info,
                  add_title: add_title,
                  add_info: add_info,
                  address: address,
                  location: location,
                  phone: e.phone,
                  type: type,
                  top: e.top,
                  video: e.video,
                  audio: e.audio,
                  photo: e.photo,
                  status: e.status,
                  region_id: e.region_id
               })
            })

            res.json({
               status: 200,
               totalPages: Math.ceil(parseInt(countShrineSearch?.count) / limit),
               totalItems: parseInt(countShrineSearch?.count),
               data: sendData
            })
         }
         else {

            const sendData = []
            const name = {}
            const title = {}
            const info = {}
            const add_title = {}
            const add_info = {}
            const address = {}
            const location = {}
            const type = {}

            const foundData = await model.ALL_SHRINE(page, limit)

            foundData?.forEach(e => {
               name.oz = e.name_oz
               name.uz = e.name_uz
               name.ru = e.name_ru
               name.en = e.name_en

               title.oz = e.title_oz
               title.uz = e.title_uz
               title.ru = e.title_ru
               title.en = e.title_en

               info.oz = e.info_oz
               info.uz = e.info_uz
               info.ru = e.info_ru
               info.en = e.info_en

               add_title.oz = e.add_title_oz
               add_title.uz = e.add_title_uz
               add_title.ru = e.add_title_ru
               add_title.en = e.add_title_en

               add_info.oz = e.add_info_oz
               add_info.uz = e.add_info_uz
               add_info.ru = e.add_info_ru
               add_info.en = e.add_info_en

               address.oz = e.address_oz
               address.uz = e.address_uz
               address.ru = e.address_ru
               address.en = e.address_en

               location.x = e.location_x
               location.y = e.location_y

               type.oz = e.type_oz
               type.uz = e.type_uz
               type.ru = e.type_ru
               type.en = e.type_en

               sendData.push({
                  id: e.id,
                  name: name,
                  title: title,
                  info: info,
                  add_title: add_title,
                  add_info: add_info,
                  address: address,
                  location: location,
                  phone: e.phone,
                  type: type,
                  top: e.top,
                  video: e.video,
                  audio: e.audio,
                  photo: e.photo,
                  status: e.status,
                  region_id: e.region_id
               })
            })

            res.json({
               status: 200,
               totalPages: Math.ceil(parseInt(countShrine?.count) / limit),
               totalItems: parseInt(countShrine?.count),
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

   GET_REF: async (req, res) => {
      try {
         const { reg_id } = req.params
         const foundData = await model.REF_SHRINE(reg_id)
         const sendData = []
         const name = {}

         foundData?.forEach(e => {
            name.oz = e.name_oz
            name.uz = e.name_uz
            name.ru = e.name_ru
            name.en = e.name_en

            sendData.push({
               id: e.id,
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
         const title = {}
         const info = {}
         const add_title = {}
         const add_info = {}
         const address = {}
         const location = {}
         const type = {}

         const foundData = await model.SINGLE_SHRINE(id)


         name.oz = foundData?.name_oz
         name.uz = foundData?.name_uz
         name.ru = foundData?.name_ru
         name.en = foundData?.name_en

         title.oz = foundData?.title_oz
         title.uz = foundData?.title_uz
         title.ru = foundData?.title_ru
         title.en = foundData?.title_en

         info.oz = foundData?.info_oz
         info.uz = foundData?.info_uz
         info.ru = foundData?.info_ru
         info.en = foundData?.info_en

         add_title.oz = foundData?.add_title_oz
         add_title.uz = foundData?.add_title_uz
         add_title.ru = foundData?.add_title_ru
         add_title.en = foundData?.add_title_en

         add_info.oz = foundData?.add_info_oz
         add_info.uz = foundData?.add_info_uz
         add_info.ru = foundData?.add_info_ru
         add_info.en = foundData?.add_info_en

         address.oz = foundData?.address_oz
         address.uz = foundData?.address_uz
         address.ru = foundData?.address_ru
         address.en = foundData?.address_en

         location.x = foundData?.location_x
         location.y = foundData?.location_y

         type.oz = foundData?.type_oz
         type.uz = foundData?.type_uz
         type.ru = foundData?.type_ru
         type.en = foundData?.type_en

         sendData.id = foundData?.id
         sendData.name = name
         sendData.title = title
         sendData.info = info
         sendData.add_title = add_title
         sendData.add_info = add_info
         sendData.address = address
         sendData.location = location
         sendData.phone = foundData?.phone
         sendData.type = type
         sendData.top = foundData?.top
         sendData.video = foundData?.video
         sendData.audio = foundData?.audio
         sendData.photo = foundData?.photo
         sendData.status = foundData?.status
         sendData.region_id = foundData?.region_id


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

   GET_ACTIVE: async (req, res) => {
      try {
         const { reg_id } = req.params

         const sendData = []
         const name = {}
         const title = {}
         const info = {}
         const add_title = {}
         const add_info = {}
         const address = {}
         const location = {}
         const type = {}

         const foundData = await model.SHRINE_BY_REGION(reg_id)

         foundData?.forEach(e => {
            name.oz = e.name_oz
            name.uz = e.name_uz
            name.ru = e.name_ru
            name.en = e.name_en

            title.oz = e.title_oz
            title.uz = e.title_uz
            title.ru = e.title_ru
            title.en = e.title_en

            info.oz = e.info_oz
            info.uz = e.info_uz
            info.ru = e.info_ru
            info.en = e.info_en

            add_title.oz = e.add_title_oz
            add_title.uz = e.add_title_uz
            add_title.ru = e.add_title_ru
            add_title.en = e.add_title_en

            add_info.oz = e.add_info_oz
            add_info.uz = e.add_info_uz
            add_info.ru = e.add_info_ru
            add_info.en = e.add_info_en

            address.oz = e.address_oz
            address.uz = e.address_uz
            address.ru = e.address_ru
            address.en = e.address_en

            location.x = e.location_x
            location.y = e.location_y

            type.oz = e.type_oz
            type.uz = e.type_uz
            type.ru = e.type_ru
            type.en = e.type_en

            sendData.push({
               id: e.id,
               name: name,
               title: title,
               info: info,
               add_title: add_title,
               add_info: add_info,
               address: address,
               location: location,
               phone: e.phone,
               type: type,
               top: e.top,
               video: e.video,
               audio: e.audio,
               photo: e.photo,
               status: e.status,
               region_id: e.region_id
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

   GET_TOP: async (_, res) => {
      try {

         const sendData = []
         const name = {}
         const title = {}

         const foundData = await model.TOP_SHRINE()

         foundData?.forEach(e => {
            name.oz = e.name_oz
            name.uz = e.name_uz
            name.ru = e.name_ru
            name.en = e.name_en

            title.oz = e.title_oz
            title.uz = e.title_uz
            title.ru = e.title_ru
            title.en = e.title_en


            sendData.push({
               id: e.id,
               name: name,
               title: title,
               photo: e.photo,
               region_id: e.region_id
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

   GET_ACTIVE_SINGLE: async (req, res) => {
      try {
         const { id } = req.params

         const sendData = {}
         const name = {}
         const title = {}
         const info = {}
         const add_title = {}
         const add_info = {}
         const address = {}
         const location = {}
         const type = {}

         const foundData = await model.SINGLE_ACTIVE_SHRINE(id)


         name.oz = foundData?.name_oz
         name.uz = foundData?.name_uz
         name.ru = foundData?.name_ru
         name.en = foundData?.name_en

         title.oz = foundData?.title_oz
         title.uz = foundData?.title_uz
         title.ru = foundData?.title_ru
         title.en = foundData?.title_en

         info.oz = foundData?.info_oz
         info.uz = foundData?.info_uz
         info.ru = foundData?.info_ru
         info.en = foundData?.info_en

         add_title.oz = foundData?.add_title_oz
         add_title.uz = foundData?.add_title_uz
         add_title.ru = foundData?.add_title_ru
         add_title.en = foundData?.add_title_en

         add_info.oz = foundData?.add_info_oz
         add_info.uz = foundData?.add_info_uz
         add_info.ru = foundData?.add_info_ru
         add_info.en = foundData?.add_info_en

         address.oz = foundData?.address_oz
         address.uz = foundData?.address_uz
         address.ru = foundData?.address_ru
         address.en = foundData?.address_en

         location.x = foundData?.location_x
         location.y = foundData?.location_y

         type.oz = foundData?.type_oz
         type.uz = foundData?.type_uz
         type.ru = foundData?.type_ru
         type.en = foundData?.type_en

         sendData.id = foundData?.id
         sendData.name = name
         sendData.title = title
         sendData.info = info
         sendData.add_title = add_title
         sendData.add_info = add_info
         sendData.address = address
         sendData.location = location
         sendData.phone = foundData?.phone
         sendData.type = type
         sendData.top = foundData?.top
         sendData.video = foundData?.video
         sendData.audio = foundData?.audio
         sendData.photo = foundData?.photo
         sendData.status = foundData?.status
         sendData.region_id = foundData?.region_id

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

         const mediaUpload = req.files;

         const { name, title, info, add_title, add_info, address, location, phone, type, top, status, region_id } = req.body;

         const name_oz = name?.oz
         const name_uz = name?.uz
         const name_ru = name?.ru
         const name_en = name?.en

         const title_oz = title?.oz
         const title_uz = title?.uz
         const title_ru = title?.ru
         const title_en = title?.en

         const info_oz = info?.oz
         const info_uz = info?.uz
         const info_ru = info?.ru
         const info_en = info?.en

         const add_title_oz = add_title?.oz
         const add_title_uz = add_title?.uz
         const add_title_ru = add_title?.ru
         const add_title_en = add_title?.en

         const add_info_oz = add_info?.oz
         const add_info_uz = add_info?.uz
         const add_info_ru = add_info?.ru
         const add_info_en = add_info?.en

         const address_oz = address?.oz
         const address_uz = address?.uz
         const address_ru = address?.ru
         const address_en = address?.en

         const location_x = location?.x
         const location_y = location?.y

         const type_oz = type?.oz
         const type_uz = type?.uz
         const type_ru = type?.ru
         const type_en = type?.en

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

         const createShrine = await model.ADD_SHRINE(name_oz, name_uz, name_ru, name_en, title_oz, title_uz, title_ru, title_en, info_oz, info_uz, info_ru, info_en, add_title_oz, add_title_uz, add_title_ru, add_title_en, add_info_oz, add_info_uz, add_info_ru, add_info_en, address_oz, address_uz, address_ru, address_en, location_x, location_y, phone, type_oz, type_uz, type_ru, type_en, top, shrine_video, shrine_video_name, shrine_audio, shrine_audio_name, shrine_photo, shrine_photo_name, status, region_id)

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

         const name_oz = name?.oz
         const name_uz = name?.uz
         const name_ru = name?.ru
         const name_en = name?.en

         const title_oz = title?.oz
         const title_uz = title?.uz
         const title_ru = title?.ru
         const title_en = title?.en

         const info_oz = info?.oz
         const info_uz = info?.uz
         const info_ru = info?.ru
         const info_en = info?.en

         const add_title_oz = add_title?.oz
         const add_title_uz = add_title?.uz
         const add_title_ru = add_title?.ru
         const add_title_en = add_title?.en

         const add_info_oz = add_info?.oz
         const add_info_uz = add_info?.uz
         const add_info_ru = add_info?.ru
         const add_info_en = add_info?.en

         const address_oz = address?.oz
         const address_uz = address?.uz
         const address_ru = address?.ru
         const address_en = address?.en

         const location_x = location?.x
         const location_y = location?.y

         const type_oz = type?.oz
         const type_uz = type?.uz
         const type_ru = type?.ru
         const type_en = type?.en

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

         const updateShrine = await model.UPDATE_SHRINE(name_oz, name_uz, name_ru, name_en, title_oz, title_uz, title_ru, title_en, info_oz, info_uz, info_ru, info_en, add_title_oz, add_title_uz, add_title_ru, add_title_en, add_info_oz, add_info_uz, add_info_ru, add_info_en, address_oz, address_uz, address_ru, address_en, location_x, location_y, phone, type_oz, type_uz, type_ru, type_en, top, shrine_video, shrine_video_name, shrine_audio, shrine_audio_name, shrine_photo, shrine_photo_name, status, region_id)

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