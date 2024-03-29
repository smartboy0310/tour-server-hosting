const model = require('./model')
const path = require('path')
const FS = require('../../lib/fs/fs')
require('dotenv').config()

module.exports = {
   GET: async (req, res) => {
      try {
         const { search_data, page, limit } = req.query;
         
         const sendData = []
         
         const countShrine = await model.COUNT_SHRINE()
         const countShrineSearch = await model.COUNT_SHRINE_SEARCH(`%${search_data}%`)

         if (search_data) {

            const foundData = await model.SEARCH_SHRINE(`%${search_data}%`, page, limit)

            foundData?.forEach(e => {                          
              
               sendData.push({
                  id: e.id,
                  name: {
                     oz : e.name_oz,
                     uz : e.name_uz,
                     ru : e.name_ru,
                     en : e.name_en
                  },
                  title: {
                     oz : e.title_oz,
                     uz : e.title_uz,
                     ru : e.title_ru,
                     en : e.title_en
                  },
                  info: {
                     oz : e.info_oz,
                     uz : e.info_uz,
                     ru : e.info_ru,
                     en : e.info_en
                  },
                  add_title: {
                     oz : e.add_title_oz,
                     uz : e.add_title_uz,
                     ru : e.add_title_ru,
                     en : e.add_title_en
                  },
                  add_info: {
                     oz : e.add_info_oz,
                     uz : e.add_info_uz,
                     ru : e.add_info_ru,
                     en : e.add_info_en
                  },
                  address: {
                     oz : e.address_oz,
                     uz : e.address_uz,
                     ru : e.address_ru,
                     en : e.address_en
                  },
                  location: e.location,
                  phone: e.phone,
                  type: e.type,
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
            
            const foundData = await model.ALL_SHRINE(page, limit)

            foundData?.forEach(e => {
               
               sendData.push({
                  id: e.id,
                  name: {
                     oz : e.name_oz,
                     uz : e.name_uz,
                     ru : e.name_ru,
                     en : e.name_en
                  },
                  title: {
                     oz : e.title_oz,
                     uz : e.title_uz,
                     ru : e.title_ru,
                     en : e.title_en
                  },
                  info: {
                     oz : e.info_oz,
                     uz : e.info_uz,
                     ru : e.info_ru,
                     en : e.info_en
                  },
                  add_title: {
                     oz : e.add_title_oz,
                     uz : e.add_title_uz,
                     ru : e.add_title_ru,
                     en : e.add_title_en
                  },
                  add_info: {
                     oz : e.add_info_oz,
                     uz : e.add_info_uz,
                     ru : e.add_info_ru,
                     en : e.add_info_en
                  },
                  address: {
                     oz : e.address_oz,
                     uz : e.address_uz,
                     ru : e.address_ru,
                     en : e.address_en
                  },
                  location: e.location,
                  phone: e.phone,
                  type: e.type,
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
         
         foundData?.forEach(e => {
            
            sendData.push({
               id: e.id,
               name: {
                  oz : e.name_oz,
                  uz : e.name_uz,
                  ru : e.name_ru,
                  en : e.name_en
               }
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
        
         sendData.id = foundData?.id
         sendData.name = name
         sendData.title = title
         sendData.info = info
         sendData.add_title = add_title
         sendData.add_info = add_info
         sendData.address = address
         sendData.location = foundData?.location
         sendData.phone = foundData?.phone
         sendData.type = foundData?.type
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
               
         const foundData = await model.SHRINE_BY_REGION(reg_id)

         foundData?.forEach(e => {           

            sendData.push({
               id: e.id,
               name: {
                  oz : e.name_oz,
                  uz : e.name_uz,
                  ru : e.name_ru,
                  en : e.name_en
               },
               title: {
                  oz : e.title_oz,
                  uz : e.title_uz,
                  ru : e.title_ru,
                  en : e.title_en
               },
               info: {
                  oz : e.info_oz,
                  uz : e.info_uz,
                  ru : e.info_ru,
                  en : e.info_en
               },
               add_title: {
                  oz : e.add_title_oz,
                  uz : e.add_title_uz,
                  ru : e.add_title_ru,
                  en : e.add_title_en
               },
               add_info: {
                  oz : e.add_info_oz,
                  uz : e.add_info_uz,
                  ru : e.add_info_ru,
                  en : e.add_info_en
               },
               address: {
                  oz : e.address_oz,
                  uz : e.address_uz,
                  ru : e.address_ru,
                  en : e.address_en
               },
               location: e.location,
               phone: e.phone,
               type: e.type,
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

         const foundData = await model.TOP_SHRINE()

         foundData?.forEach(e => {
            
            sendData.push({
               id: e.id,
               name: {
                  oz : e.name_oz,
                  uz : e.name_uz,
                  ru : e.name_ru,
                  en : e.name_en
               },
               title: {
                  oz : e.title_oz,
                  uz : e.title_uz,
                  ru : e.title_ru,
                  en : e.title_en
               },
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
       
         sendData.id = foundData?.id
         sendData.name = name
         sendData.title = title
         sendData.info = info
         sendData.add_title = add_title
         sendData.add_info = add_info
         sendData.address = address
         sendData.location = foundData?.location
         sendData.phone = foundData?.phone        
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

         const { name : names, title : titles, info : infos, add_title : add_titles, add_info:  add_infos, address : addresss, location, phone, type, top, video, status, region_id } = req.body;

         const name = JSON.parse(names)
         const title = JSON.parse(titles)
         const info = JSON.parse(infos)
         const add_title = JSON.parse(add_titles)
         const add_info = JSON.parse(add_infos)
         const address = JSON.parse(addresss)
        
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

         const createShrine = await model.ADD_SHRINE(name_oz, name_uz, name_ru, name_en, title_oz, title_uz, title_ru, title_en, info_oz, info_uz, info_ru, info_en, add_title_oz, add_title_uz, add_title_ru, add_title_en, add_info_oz, add_info_uz, add_info_ru, add_info_en, address_oz, address_uz, address_ru, address_en, location, phone, type, top, video, shrine_audio, shrine_audio_name, shrine_photo, shrine_photo_name, status, region_id)

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

         const { id, name : names, title : titles, info : infos, add_title : add_titles, add_info:  add_infos, address : addresss, location, phone, type, top, video, status, region_id } = req.body;

         const name = JSON.parse(names)
         const title = JSON.parse(titles)
         const info = JSON.parse(infos)
         const add_title = JSON.parse(add_titles)
         const add_info = JSON.parse(add_infos)
         const address = JSON.parse(addresss)
         
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

         const updateShrine = await model.UPDATE_SHRINE(id, name_oz, name_uz, name_ru, name_en, title_oz, title_uz, title_ru, title_en, info_oz, info_uz, info_ru, info_en, add_title_oz, add_title_uz, add_title_ru, add_title_en, add_info_oz, add_info_uz, add_info_ru, add_info_en, address_oz, address_uz, address_ru, address_en, location, phone, type, top, video, shrine_audio, shrine_audio_name, shrine_photo, shrine_photo_name, status, region_id)

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