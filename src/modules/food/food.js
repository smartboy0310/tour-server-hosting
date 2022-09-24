const model = require('./model')
const path = require('path')
const FS = require('../../lib/fs/fs')
require('dotenv').config()

module.exports = {
   GET: async (req, res) => {
      try {

         const { search_data, page, limit } = req.query;
         const countFood = await model.COUNT_FOODS()
         const countFoodSearch = await model.COUNT_FOODS_SEARCH(`%${search_data}%`)
         if (search_data) {
            res.json({
               status: 200,
               totalPages: Math.ceil(parseInt(countFoodSearch?.count)/limit),
               totalItems: parseInt(countFoodSearch?.count),
               data: await model.SEARCH_FOODS(`%${search_data}%`, page, limit),
            })
         }
         else {
            res.json({
               status: 200,
               totalPages: Math.ceil(parseInt(countFood?.count)/limit),
               totalItems: parseInt(countFood?.count),
               data: await model.ALL_FOODS(page, limit)
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

         const foundData = await model.SINGLE_FOOD(id)
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

   GET_ACTIVE: async (_, res) => {
      try {
         
         const foundData = await model.ALL_ACTIVE_FOODS()
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

         const foundData = await model.SINGLE_ACTIVE_FOOD(id)
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
         const { name, title, info, status } = req.body

         const food_photo = []
         const food_photo_name = []

         uploadMedia.forEach(e => {
            food_photo.push(`${process.env.BACKEND_URL}/${e.filename}`)
            food_photo_name.push(food_photo.push(e.filename))
         })



         const createdFood = await model.ADD_FOOD(name, title, info, food_photo, food_photo_name, status)

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
         const { id, name, title, info, status } = req.body

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

         const updateFood = await model.UPDATE_FOOD(id, name, title, info, food_photo, food_photo_name, status)

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