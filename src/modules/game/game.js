const model = require('./model')
const path = require('path')
const FS = require('../../lib/fs/fs')
require('dotenv').config()

module.exports = {
   GET: async (req, res) => {
      try {

         const sendData = []                       
         const { search_data, page, limit } = req.query;
         const countGame = await model.COUNT_GAMES()
         const countGameSearch = await model.COUNT_GAMES_SEARCH(`%${search_data}%`)
         if (search_data) {
            
            const foundData = await model.SEARCH_GAMES(`%${search_data}%`, page, limit)

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
                  video: e.video,
                  photo: e.photo,
                  type: e.type,
                  status: e.status,
                  region_id: e.region_id
               })
            })

            res.json({
               status: 200,
               totalPages: Math.ceil(parseInt(countGameSearch?.count) / limit),
               totalItems: parseInt(countGameSearch?.count),
               data: sendData
            })
         }
         else {                
            const foundData = await model.ALL_GAMES(page, limit)

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
                  video: e.video,
                  photo: e.photo,
                  type: e.type,
                  status: e.status,
                  region_id: e.region_id
               })
            })

            res.json({
               status: 200,
               totalPages: Math.ceil(parseInt(countGame?.count) / limit),
               totalItems: parseInt(countGame?.count),
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

         const foundData = await model.SINGLE_GAME(id)

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
         sendData.video = foundData?.video
         sendData.photo = foundData?.photo
         sendData.type = foundData?.type
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

   GET_ACTIVE: async (_, res) => {
      try {

         const sendData = []         
         
         const foundData = await model.ALL_ACTIVE_GAMES()

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
        
         const foundData = await model.SINGLE_ACTIVE_GAME(id)

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
         sendData.video = foundData?.video
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

   GET_BY_REGION: async (req, res) => {
      try {
         const { reg_id } = req.params

         const sendData = []
                 
         const foundData = await model.GAME_BY_REGION(reg_id)

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

   POST: async (req, res) => {
      try {

         const uploadMedia = req.files
         const { name : names, title : titles, info : infos, video, type, status, region_id } = req.body
         
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

         const game_photo = []
         const game_photo_name = []
        
         uploadMedia?.forEach(e => {
            game_photo.push(`${process.env.BACKEND_URL}/${e.filename}`)
            game_photo_name.push(e.filename)
         })

         const createdGame = await model.ADD_GAME(name_oz, name_uz, name_ru, name_en, title_oz, title_uz, title_ru, title_en, info_oz, info_uz, info_ru, info_en, video, game_photo, game_photo_name, type, status, region_id)

         if (createdGame) {
            res.json({
               status: 200,
               message: 'Game Created'
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

         const {id, name : names, title : titles, info : infos, video, type, status, region_id } = req.body
         
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

         const game_photo = []
         const game_photo_name = []
         
         const foundGame = await model.SELECTED_GAME(id)

         if (uploadMedia?.length) {

            foundGame?.game_photo_name.forEach(e => {
               new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media', `${e}`)).delete()
            })

            uploadMedia?.forEach(e => {
               game_photo.push(`${process.env.BACKEND_URL}/${e.filename}`)
               game_photo_name.push(e.filename)
            })
         }
         else {
            foundGame?.game_photo.forEach(e => {
               game_photo.push(e)
            })
            foundGame?.game_photo_name.forEach(e => {
               game_photo_name.push(e)
            })
         }
         
         const updateGame = await model.UPDATE_GAME(id, name_oz, name_uz, name_ru, name_en, title_oz, title_uz, title_ru, title_en, info_oz, info_uz, info_ru, info_en, video, game_photo, game_photo_name, type, status, region_id)

         if (updateGame) {
            res.json({
               status: 200,
               message: 'Game Updated'
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

         const statusGame = await model.EDIT_GAME(id, status)

         if (statusGame) {
            res.json({
               status: 200,
               message: 'Game status edited'
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

         const deleteGame = await model.DELETE_GAME(id)
         const foundGame = await model.SELECTED_GAME(id)

         if (deleteGame) {
            
            foundGame?.game_photo_name.forEach(e => {
               new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media', `${e}`)).delete()
            })

            res.json({
               status: 200,
               message: 'Game Deleted'
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