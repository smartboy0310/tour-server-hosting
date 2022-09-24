const model = require('./model')
const path = require('path')
const FS = require('../../lib/fs/fs')
require('dotenv').config()

module.exports = {
   GET: async(req, res) => {
      try {
         const {  search_data, page, limit } = req.query
         const countMarket = await model.COUNT_MARKETS()
         const countMarketSearch = await model.COUNT_MARKETS_SEARCH(`%${search_data}%`)
         if (search_data) {
            res.json({
               status: 200,
               totalPages: Math.ceil(parseInt(countMarketSearch?.count)/limit),
               totalItems: parseInt(countMarketSearch?.count),
               data: await model.SEARCH_MARKETS(`%${search_data}%`, page, limit),
            })
         }
         else {
            res.json({
               status: 200,
               totalPages: Math.ceil(parseInt(countMarket?.count)/limit),
               totalItems: parseInt(countMarket?.count),
               data: await model.ALL_MARKETS(page, limit)
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
            const foundData = await model.SINGLE_MARKET(id)
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
            const foundByRegion = await model.MARKETS_BY_REGION(reg_id)
            const foundByShrine = await model.MARKETS_BY_SHRINE(shrine_id)
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
            const foundData = await model.SINGLE_ACTIVE_MARKET(id)
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

         const {name, title, info, address, location, phone, work_time, link, type, status, region_id, shrine_id} = req.body;
        
         const photo = []
         const photo_name = []

         mediaUpload.forEach(e => {           
               photo.push(`${process.env.BACKEND_URL}/${e.filename}`)
               photo_name.push(e.filename)
            })

         
         const createMarket = await model.ADD_MARKET( name, title, info, address, location, phone, work_time, link, photo, photo_name, type, status, region_id, shrine_id )

         if(createMarket) {
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

         const {id, name, title, info, address, location, phone, work_time, link, type, status, region_id, shrine_id} = req.body;

         
         const photo = []
         const photo_name = []

         const foundMarket = await model.SELECT_MARKET(id)

         if(mediaUpload.length) {

               foundMarket?.photo_name.forEach(e => {
                  new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media',`${e}`)).delete()
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
         
         const updateMarket = await model.UPDATE_MARKET( id, name, title, info, address, location, phone, work_time, link, photo, photo_name, type, status, region_id, shrine_id)

         if(updateMarket) {
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
            const {id, status} = req.body
            
            const editMarket = await model.EDIT_MARKET(id, status)

            if(editMarket) {
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


         if(deleteMarket) {
           
            foundMarket?.photo_name.forEach(e => {
               new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media',`${e}`)).delete()
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