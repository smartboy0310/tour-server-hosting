const model = require('./model')
const path = require('path')
const FS = require('../../lib/fs/fs')
require('dotenv').config()

module.exports = {
   GET: async (req, res) => {
      try {

         const { search_data, page, limit } = req.query;
         const countGame = await model.COUNT_GAMES()
         const countGameSearch = await model.COUNT_GAMES_SEARCH(`%${search_data}%`)
         if (search_data) {
            res.json({
               status: 200,
               totalPages: Math.ceil(parseInt(countGameSearch?.count)/limit),
               totalItems: parseInt(countGameSearch?.count),
               data: await model.SEARCH_GAMES(`%${search_data}%`, page, limit),
            })
         }
         else {
            res.json({
               status: 200,
               totalPages: Math.ceil(parseInt(countGame?.count)/limit),
               totalItems: parseInt(countGame?.count),
               data: await model.ALL_GAMES(page, limit)
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
         
         const foundData = await model.SINGLE_GAME(id)
         if (foundData) {
            res.json({
               status: 200,
               data: foundData
            })
         }
          else{
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
         
         const foundData = await model.ALL_ACTIVE_GAMES()
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

         const foundData = await model.SINGLE_ACTIVE_GAME(id)
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

   GET_BY_REGION: async (req, res) => {
      try {
         const { reg_id } = req.params

         const foundData = await model.GAME_BY_REGION(reg_id)
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

        const uploadMedia = req.files
        const {name, title, info, type, status, region_id} = req.body

        const game_photo = []
        const game_photo_name = []
        const game_video = `${process.env.BACKEND_URL}/${uploadMedia?.video[0].filename}` 
        const game_video_name = uploadMedia?.video[0].filename

        uploadMedia?.photo.forEach(e => {         
            game_photo.push(`${process.env.BACKEND_URL}/${e.filename}`)
            game_photo_name.push(e.filename)  
         })

        const createdGame = await model.ADD_GAME(name, title, info, game_video, game_video_name, game_photo, game_photo_name, type, status, region_id)
         
        if(createdGame) {
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
        const {id, name, title, info, type, status, region_id} = req.body

        const game_photo = [] 
        const game_photo_name = []
        let game_video = ''
        let game_video_name = ''

        const foundGame = await model.SELECTED_GAME(id)

        if (uploadMedia?.photo) {

         foundGame?.game_photo_name.forEach(e => {
            new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media', `${e}`)).delete()
         })

         uploadMedia?.photo.forEach(e => {
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

      if (uploadMedia?.video) {
         new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media', `${foundGame?.game_video_name}`)).delete()

         game_video = `${process.env.BACKEND_URL}/${uploadMedia?.video[0].filename}`
         game_video_name = uploadMedia?.video[0].filename
      }
      else {
         game_video = foundGame?.game_video
         game_video_name = foundGame?.game_video_name
      }
        const updateGame = await model.UPDATE_GAME(id, name, title, info, game_video, game_video_name, game_photo, game_photo_name, type, status, region_id)
         
        if(updateGame) {
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

         const {id, status} = req.body;

         const statusGame = await model.EDIT_GAME(id, status)

         if(statusGame) {
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
         
         const {id} = req.body;

         const deleteGame = await model.DELETE_GAME(id)
         const foundGame = await model.SELECTED_GAME(id)

         if(deleteGame) {
            new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media',`${foundGame?.game_video_name}`)).delete()

            foundGame?.game_photo_name.forEach(e => {
               new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media',`${e}`)).delete()
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