const model = require('./model')
const path = require('path')
const FS = require('../../lib/fs/fs')
require('dotenv').config()

module.exports = {
   GET: async (req, res) => {
      try {
         const { type } = req.params
         const { search_data, page, limit, } = req.query

         const sendData = []                
         
         const countObject = await model.COUNT_OBJECTS(type)
         const countObjectSearch = await model.COUNT_OBJECTS_SEARCH(`%${search_data}%`, type)

         if (search_data) {

            const foundData = await model.SEARCH_TRAINS(`%${search_data}%`, page, limit, type)

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
                  address: {
                     oz : e.address_oz,
                     uz : e.address_uz,
                     ru : e.address_ru,
                     en : e.address_en
                  },
                  location: e.location,
                  phone: e.phone,
                  link: e.link,
                  work_time: e.work_time,
                  photo: e.photo,
                  type: e.type,
                  status: e.status,
                  region_id: e.region_id,
                  shrine_id: e.shrine_id
               })
            })
            res.json({
               status: 200,
               totalPages: Math.ceil(parseInt(countObjectSearch?.count) / limit),
               totalItems: parseInt(countObjectSearch?.count),
               data: sendData
            })
         }
         else {

            const foundData = await model.ALL_OBJECTS(page, limit, type)

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
                  address: {
                     oz : e.address_oz,
                     uz : e.address_uz,
                     ru : e.address_ru,
                     en : e.address_en
                  },
                  location: e.location,
                  phone: e.phone,
                  link: e.link,
                  photo: e.photo,
                  work_time: e.work_time,
                  type: e.type,
                  status: e.status,
                  region_id: e.region_id,
                  shrine_id: e.shrine_id
               })
            })

            res.json({
               status: 200,
               totalPages: Math.ceil(parseInt(countObject?.count) / limit),
               totalItems: parseInt(countObject?.count),
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
         const { type, id } = req.params
         const sendData = {}
         const name = {}
         const title = {}
         const info = {}         
         const address = {}
                 
         const foundData = await model.SINGLE_OBJECT(id, type)

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
        
         sendData.id = foundData?.id
         sendData.name = name
         sendData.title = title
         sendData.info = info
         sendData.address = address
         sendData.location = foundData?.location
         sendData.phone = foundData?.phone
         sendData.link = foundData?.link
         sendData.work_time = foundData?.work_time
         sendData.photo = foundData?.photo
         sendData.type = foundData?.type      
         sendData.status = foundData?.status
         sendData.region_id = foundData?.region_id
         sendData.shrine_id = foundData?.shrine_id
         
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
   
   GET_BY_REGION: async (req, res) => {
      try {
         const { type, region_id } = req.params

         const sendData = []        

         const foundData = await model.OBJECTS_BY_REGION(region_id, type)

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
               photo: e.photo
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

   GET_BY_SHRINE: async (req, res) => {
      try {
         const { type } = req.params
         const { reg_id, shrine_id } = req.query

         const sendData = {}
         const name = {}
         const title = {}

         const foundByRegion = await model.OBJECTS_BY_REGION(reg_id, type)
         const foundByShrine = await model.OBJECT_BY_SHRINE(shrine_id, type)

         if (foundByShrine) {

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

            name.oz = foundByRegion[0]?.name_oz
            name.uz = foundByRegion[0]?.name_uz
            name.ru = foundByRegion[0]?.name_ru
            name.en = foundByRegion[0]?.name_en

            title.oz = foundByRegion[0]?.title_oz
            title.uz = foundByRegion[0]?.title_uz
            title.ru = foundByRegion[0]?.title_ru
            title.en = foundByRegion[0]?.title_en

            sendData.id = foundByShrine?.id
            sendData.name = name
            sendData.title = title
            sendData.photo = foundByShrine?.photo

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
         const { type, id } = req.params

         const sendData = {}
         const name = {}
         const title = {}
         const info = {}         
         const address = {}
                  
         const foundData = await model.SINGLE_ACTIVE_OBJECT(id, type)

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

         sendData.id = foundData?.id
         sendData.name = name
         sendData.title = title
         sendData.info = info
         sendData.address = address
         sendData.location = foundData?.location
         sendData.phone = foundData?.phone
         sendData.link = foundData?.link
         sendData.work_time = foundData?.work_time
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

         const { type } = req.params
         const mediaUpload = req.files;

         const { name : names, title : titles, info : infos, address : addresss, location, phone, link, work_time, status, region_id, shrine_id } = req.body;

         const shrineId = shrine_id ? shrine_id : null
         const workTime = work_time ? work_time : null
         const links = link ? link : null

         const name = JSON.parse(names)
         const title = JSON.parse(titles)
         const info = JSON.parse(infos)              
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

         const address_oz = address?.oz
         const address_uz = address?.uz
         const address_ru = address?.ru
         const address_en = address?.en        

         const photo = []
         const photo_name = []

         mediaUpload.forEach(e => {
            photo.push(`${process.env.BACKEND_URL}/${e.filename}`)
            photo_name.push(e.filename)
         })


         const createObject = await model.ADD_OBJECT(name_oz, name_uz, name_ru, name_en, title_oz, title_uz, title_ru, title_en, info_oz, info_uz, info_ru, info_en, address_oz, address_uz, address_ru, address_en, location, phone, workTime, links, photo, photo_name, type, status, region_id, shrineId)

         if (createObject) {
            res.json({
               status: 200,
               message: `${type} created`
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

         const { type } = req.params
         const mediaUpload = req.files;

         const { id, name : names, title : titles, info : infos, address : addresss, location, phone, link, work_time, status, region_id, shrine_id } = req.body;

         const shrineId = shrine_id ? shrine_id : null
         const workTime = work_time ? work_time : null
         const links = link ? link : null

         const name = JSON.parse(names)
         const title = JSON.parse(titles)
         const info = JSON.parse(infos)               
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

         const address_oz = address?.oz
         const address_uz = address?.uz
         const address_ru = address?.ru
         const address_en = address?.en

         const photo = []
         const photo_name = []

         const foundObject = await model.SELECT_OBJECT(id, type)

         if (mediaUpload.length) {

            foundObject?.photo_name.forEach(e => {
               new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media', `${e}`)).delete()
            })

            mediaUpload.forEach(e => {
               photo.push(`${process.env.BACKEND_URL}/${e.filename}`)
               photo_name.push(e.filename)
            })
         }
         else {
            foundObject?.photo.forEach(e => {
               photo.push(e)
            })
            foundObject?.photo_name.forEach(e => {
               photo_name.push(e)
            })
         }

         const updateObject = await model.UPDATE_OBJECT(id, name_oz, name_uz, name_ru, name_en, title_oz, title_uz, title_ru, title_en, info_oz, info_uz, info_ru, info_en, address_oz, address_uz, address_ru, address_en, location, phone, workTime, links, photo, photo_name, type, status, region_id, shrineId)

         if (updateObject) {
            res.json({
               status: 200,
               message: `${type} created`
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
         const { type } = req.params
         const { id, status } = req.body

         const editObject = await model.EDIT_OBJECT(id, status, type)

         if (editObject) {
            res.json({
               status: 200,
               message: `${type} status edited`
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
         const { type } = req.params
         const { id } = req.body;

         const deleteObject = await model.DELETE_OBJECT(id, type)

         const foundObject = await model.SELECT_OBJECT(id, type)


         if (deleteObject) {

            foundObject?.photo_name.forEach(e => {
               new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media', `${e}`)).delete()
            })

            res.json({
               status: 200,
               message: `${type} deleted`
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