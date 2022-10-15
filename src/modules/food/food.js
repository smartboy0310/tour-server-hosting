const model = require('./model')
const path = require('path')
const FS = require('../../lib/fs/fs')
require('dotenv').config()

module.exports = {
   GET: async (req, res) => {
      try {

         const sendData = []    
         const { search_data, page, limit } = req.query;
         const countFood = await model.COUNT_FOODS()
         const countFoodSearch = await model.COUNT_FOODS_SEARCH(`%${search_data}%`)
         if (search_data) {                   
           
            const foundData = await model.SEARCH_FOODS(`%${search_data}%`, page, limit)

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
                  photo: e.photo,
                  status: e.status                  
               })
            })

            res.json({
               status: 200,
               totalPages: Math.ceil(parseInt(countFoodSearch?.count)/limit),
               totalItems: parseInt(countFoodSearch?.count),
               data: sendData,
            })
         }
         else {
           
            const foundData = await model.ALL_FOODS(page, limit)

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
                  photo: e.photo,
                  status: e.status                  
               })
            })

            res.json({
               status: 200,
               totalPages: Math.ceil(parseInt(countFood?.count)/limit),
               totalItems: parseInt(countFood?.count),
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
        
         const foundData = await model.SINGLE_FOOD(id)

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

         sendData.id = foundData?.id
         sendData.name = name
         sendData.title = title
         sendData.info = info
         sendData.photo = foundData?.photo
         sendData.status = foundData?.status
         
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
               
         const foundData = await model.ALL_ACTIVE_FOODS()

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

   GET_ACTIVE_SINGLE: async (req, res) => {
      try {
         const { id } = req.params

         const sendData = {}
         const name = {}
         const title = {}
         const info = {}
        
         const foundData = await model.SINGLE_ACTIVE_FOOD(id)

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

         sendData.id = foundData?.id
         sendData.name = name
         sendData.title = title
         sendData.info = info
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

         const uploadMedia = req.files
         const {name : names, title : titles, info : infos, status } = req.body
         
         const name = JSON.parse(names)
         const title = JSON.parse(titles)
         const info = JSON.parse(infos)        
         
         const name_oz = name.oz
         const name_uz = name.uz
         const name_ru = name.ru
         const name_en = name.en

         const title_oz = title.oz
         const title_uz = title.uz
         const title_ru = title.ru
         const title_en = title.en

         const info_oz = info.oz
         const info_uz = info.uz
         const info_ru = info.ru
         const info_en = info.en

         const food_photo = []
         const food_photo_name = []

         uploadMedia.forEach(e => {
            food_photo.push(`${process.env.BACKEND_URL}/${e.filename}`)
            food_photo_name.push(food_photo.push(e.filename))
         })



         const createdFood = await model.ADD_FOOD(name_oz, name_uz, name_ru, name_en, title_oz, title_uz, title_ru, title_en, info_oz, info_uz, info_ru, info_en, food_photo, food_photo_name, status)

         if (createdFood) {
            res.json({
               status: 200,
               message: 'Food Created'
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
         const {id, name : names, title : titles, info : infos, status } = req.body
         
         const name = JSON.parse(names)
         const title = JSON.parse(titles)
         const info = JSON.parse(infos)      

         const name_oz = name.oz
         const name_uz = name.uz
         const name_ru = name.ru
         const name_en = name.en

         const title_oz = title.oz
         const title_uz = title.uz
         const title_ru = title.ru
         const title_en = title.en

         const info_oz = info.oz
         const info_uz = info.uz
         const info_ru = info.ru
         const info_en = info.en

         const food_photo = []
         const food_photo_name = []

         const foundFood = await model.SELECTED_FOOD(id)

         if (uploadMedia.length) {

            foundFood?.food_photo_name.forEach(e =>
               new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media',`${e}`)).delete()
            )

            uploadMedia.forEach(e => {
               food_photo.push(`${process.env.BACKEND_URL}/${e.filename}`)
               food_photo_name.push(food_photo.push(e.filename))
            })
         }
         else {
            foundFood?.food_photo.forEach(e => {
               food_photo.push(e)
            })
            foundFood?.food_photo_name.forEach(e => {
               food_photo_name.push(e)
            })
         }

         const updateFood = await model.UPDATE_FOOD(id, name_oz, name_uz, name_ru, name_en, title_oz, title_uz, title_ru, title_en, info_oz, info_uz, info_ru, info_en, food_photo, food_photo_name, status)

         if (updateFood) {
            res.json({
               status: 200,
               message: 'Food Updated'
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

         const statusFood = await model.EDIT_FOOD(id, status)

         if (statusFood) {
            res.json({
               status: 200,
               message: 'Food status edited'
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

         const deleteFood = await model.DELETE_FOOD(id)
         const foundFood = await model.SELECTED_FOOD(id)

         if (deleteFood) {

            foundFood?.food_photo_name.forEach(e => {
               new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media', `${e}`)).delete()
            })

            res.json({
               status: 200,
               message: 'Food Deleted'
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