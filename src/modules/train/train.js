const model = require('./model')
const path = require('path')
const FS = require('../../lib/fs/fs')
require('dotenv').config()

module.exports = {
   GET: async(req, res) => {
      try {
         const { search_data, page, limit } = req.query
         const countTrains = await model.COUNT_TRAINS()
         const countTrainsSearch = await model.COUNT_TRAINS_SEARCH(`%${search_data}%`)
         if (search_data) {
            res.json({
               status: 200,
               totalPages: Math.ceil(parseInt(countTrainsSearch?.count)/limit),
               totalItems: parseInt(countTrainsSearch?.count),
               data: await model.SEARCH_TRAINS(`%${search_data}%`, page, limit),
            })
         }
         else {
            res.json({
               status: 200,
               totalPages: Math.ceil(parseInt(countTrains?.count)/limit),
               totalItems: parseInt(countTrains?.count),
               data: await model.ALL_TRAINS(page, limit)
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
            const foundData = await model.SINGLE_TRAIN(id)
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

   GET_ACTIVE: async (req, res) => {
      try {
         const { reg_id, shrine_id } = req.query
            const foundByRegion = await model.TRAINS_BY_REGION(reg_id)
            const foundByShrine = await model.TRAINS_BY_SHRINE(shrine_id)
            if (foundByShrine) {
               res.json({
                  status: 200,
                  data: foundByShrine
               })
            }
             else if (foundByRegion){
               res.json({
                  status: 200,
                  data: foundByRegion
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
            const foundData = await model.SINGLE_ACTIVE_TRAIN(id)
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

   POST: async (req, res) => {
      try {

         const  mediaUpload = req.files;

         const {name, title, info, address, location, phone, link, type, status, region_id, shrine_id} = req.body;
        
         const photo = []
         const photo_name = []

         mediaUpload.forEach(e => {           
               photo.push(`${process.env.BACKEND_URL}/${e.filename}`)
               photo_name.push(e.filename)
            })

         
         const createTrain = await model.ADD_TRAIN( name, title, info, address, location, phone, link, photo, photo_name, type, status, region_id, shrine_id )

         if(createTrain) {
            res.json({
               status: 200,
               message: 'Train Created'
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

         const {id, name, title, info, address, location, phone, link, type, status, region_id, shrine_id} = req.body;

         
         const photo = []
         const photo_name = []

         const founTrain = await model.SELECT_TRAIN(id)

         if(mediaUpload.length) {

               founTrain?.photo_name.forEach(e => {
                  new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media',`${e}`)).delete()
               })

               mediaUpload.forEach(e => {                  
                     photo.push(`${process.env.BACKEND_URL}/${e.filename}`)
                     photo_name.push(e.filename)               
               })      
        }
         else {            
            founTrain?.photo.forEach(e => {
               photo.push(e)
            })
            founTrain?.photo_name.forEach(e => {
               photo_name.push(e)
            })
         }
         
         const updateTrain = await model.UPDATE_TRAIN( id, name, title, info, address, location, phone, link, photo, photo_name, type, status, region_id, shrine_id)

         if(updateTrain) {
            res.json({
               status: 200,
               message: 'Train Updated'
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
            const {id, status} = req.body
            
            const editTrain = await model.EDIT_TRAIN(id, status)

            if(editTrain) {
               res.json({
                  status: 200,
                  message: 'Train status edited'
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

         const deleteTrain = await model.DELETE_TRAIN(id)

         const foundTrain = await model.SELECT_TRAIN(id)


         if(deleteTrain) {
           
            foundTrain?.photo_name.forEach(e => {
               new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media',`${e}`)).delete()
            })

            res.json({
               status: 200,
               message: 'Train Deleted'
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