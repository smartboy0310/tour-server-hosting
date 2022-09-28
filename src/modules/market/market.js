const model = require('./model')
const path = require('path')
const FS = require('../../lib/fs/fs')
require('dotenv').config()

module.exports = {
   GET: async (req, res) => {
      try {
         const { search_data, page, limit } = req.query

         const sendData = []
         const name = {}
         const title = {}
         const info = {}
         const address = {}
         const location = {}
         const type = {}

         const countMarket = await model.COUNT_MARKETS()
         const countMarketSearch = await model.COUNT_MARKETS_SEARCH(`%${search_data}%`)
         
         if (search_data) {

            const foundData = await model.SEARCH_MARKETS(`%${search_data}%`, page, limit)

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
                  address: address,
                  location: location,
                  phone: e.phone,
                  work_time: e.work_time,
                  link: e.link,
                  photo: e.photo,
                  type: type,
                  status: e.status,
                  region_id: e.region_id,
                  shrine_id: e.shrine_id
               })
            })

            res.json({
               status: 200,
               totalPages: Math.ceil(parseInt(countMarketSearch?.count) / limit),
               totalItems: parseInt(countMarketSearch?.count),
               data: sendData
            })
         }
         else {

            const foundData = await model.ALL_MARKETS(page, limit)

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
                  address: address,
                  location: location,
                  phone: e.phone,
                  work_time: e.work_time,
                  link: e.link,
                  photo: e.photo,
                  type: type,
                  status: e.status,
                  region_id: e.region_id,
                  shrine_id: e.shrine_id
               })
            })

            res.json({
               status: 200,
               totalPages: Math.ceil(parseInt(countMarket?.count) / limit),
               totalItems: parseInt(countMarket?.count),
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

   GET_SINGLE: async (req, res) => {
      try {
         const { id } = req.params

         const sendData = {}
         const name = {}
         const title = {}
         const info = {}
         const address = {}
         const location = {}
         const type = {}

         const foundData = await model.SINGLE_MARKET(id)

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
         sendData.address = address
         sendData.location = location
         sendData.phone = foundData?.phone
         sendData.work_time = foundData?.work_time
         sendData.link = foundData?.link
         sendData.photo = foundData?.photo
         sendData.type = type
         sendData.status = foundData?.status
         sendData.region_id = foundData?.region_id
         sendData.shrine_id = foundData?.shrine_id
         
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
         const { reg_id, shrine_id } = req.query
        
         const name = {}
         const title = {}

         const foundByRegion = await model.MARKETS_BY_REGION(reg_id)
         const foundByShrine = await model.MARKETS_BY_SHRINE(shrine_id)

         if (foundByShrine) {

            const sendData = {}

            name.oz = foundByShrine?.name_oz
            name.uz = foundByShrine?.name_uz
            name.ru = foundByShrine?.name_ru
            name.en = foundByShrine?.name_en

            title.oz = foundByShrine?.title_oz
            title.uz = foundByShrine?.title_uz
            title.ru = foundByShrine?.title_ru
            title.en = foundByShrine?.title_en

            sendData.id = foundByShrine?.id
            sendData.name = name
            sendData.title = title
            sendData.photo = foundByShrine?.photo

            res.json({
               status: 200,
               data: sendData
            })
         }
         else if (foundByRegion) {
            
            const sendData = []

            foundByRegion?.forEach(e => {
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
               photo: e.photo
            })
         })

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
         const address = {}
         const location = {}
         
         const foundData = await model.SINGLE_ACTIVE_MARKET(id)

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

         address.oz = foundData?.address_oz
         address.uz = foundData?.address_uz
         address.ru = foundData?.address_ru
         address.en = foundData?.address_en

         location.x = foundData?.location_x
         location.y = foundData?.location_y         

         sendData.id = foundData?.id
         sendData.name = name
         sendData.title = title
         sendData.info = info
         sendData.address = address
         sendData.location = location
         sendData.phone = foundData?.phone
         sendData.work_time = foundData?.work_time
         sendData.link = foundData?.link
         sendData.photo = foundData?.photo
        
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

         const { name, title, info, address, location, phone, work_time, link, type, status, region_id, shrine_id } = req.body;

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

         const photo = []
         const photo_name = []

         mediaUpload.forEach(e => {
            photo.push(`${process.env.BACKEND_URL}/${e.filename}`)
            photo_name.push(e.filename)
         })

         const createMarket = await model.ADD_MARKET(name_oz, name_uz, name_ru, name_en, title_oz, title_uz, title_ru, title_en, info_oz, info_uz, info_ru, info_en, address_oz, address_uz, address_ru, address_en, location_x, location_y, phone, work_time, link, photo, photo_name, type_oz, type_uz, type_ru, type_en, status, region_id, shrine_id)

         if (createMarket) {
            res.json({
               status: 200,
               message: 'Market Created'
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

         const { id, name, title, info, address, location, phone, work_time, link, type, status, region_id, shrine_id } = req.body;

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

         const photo = []
         const photo_name = []

         const foundMarket = await model.SELECT_MARKET(id)

         if (mediaUpload.length) {

            foundMarket?.photo_name.forEach(e => {
               new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media', `${e}`)).delete()
            })

            mediaUpload.forEach(e => {
               photo.push(`${process.env.BACKEND_URL}/${e.filename}`)
               photo_name.push(e.filename)
            })
         }
         else {
            foundMarket?.photo.forEach(e => {
               photo.push(e)
            })
            foundMarket?.photo_name.forEach(e => {
               photo_name.push(e)
            })
         }

         const updateMarket = await model.UPDATE_MARKET(id, name_oz, name_uz, name_ru, name_en, title_oz, title_uz, title_ru, title_en, info_oz, info_uz, info_ru, info_en, address_oz, address_uz, address_ru, address_en, location_x, location_y, phone, work_time, link, photo, photo_name, type_oz, type_uz, type_ru, type_en, status, region_id, shrine_id)

         if (updateMarket) {
            res.json({
               status: 200,
               message: 'Market Updated'
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

         const editMarket = await model.EDIT_MARKET(id, status)

         if (editMarket) {
            res.json({
               status: 200,
               message: 'Market status edited'
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

         const deleteMarket = await model.DELETE_MARKET(id)

         const foundMarket = await model.SELECT_MARKET(id)


         if (deleteMarket) {

            foundMarket?.photo_name.forEach(e => {
               new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media', `${e}`)).delete()
            })

            res.json({
               status: 200,
               message: 'Market Deleted'
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