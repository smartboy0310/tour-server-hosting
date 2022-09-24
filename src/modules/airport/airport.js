const model = require('./model')
const path = require('path')
const FS = require('../../lib/fs/fs')
require('dotenv').config()

module.exports = {
   GET: async(req, res) => {
      try {
         const { search_data, page, limit } = req.query
         const countAirports = await model.COUNT_AIRPORTS()
         const countAirportsSearch = await model.COUNT_AIRPORTS_SEARCH(`%${search_data}%`)
         if (search_data) {
            res.json({
               status: 200,
               totalPages: Math.ceil(parseInt(countAirportsSearch?.count)/limit),
               totalItems: parseInt(countAirportsSearch?.count),
               data: await model.SEARCH_AIRPORTS(`%${search_data}%`, page, limit),
            })
         }
         else {
            res.json({
               status: 200,
               totalPages: Math.ceil(parseInt(countAirports?.count)/limit),
               totalItems: parseInt(countAirports?.count),
               data: await model.ALL_AIRPORTS(page, limit)
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
            const foundData = await model.SINGLE_AIRPORT(id)
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
         const { reg_id } = req.params
            const foundByRegion = await model.AIRPORT_BY_REGION(reg_id)
            if (foundByRegion){
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
            const foundData = await model.SINGLE_ACTIVE_AIRPORT(id)
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

         const {name, title, info, address, location, phone, link, type, status, region_id} = req.body;
        
         const photo = []
         const photo_name = []

         mediaUpload.forEach(e => {           
               photo.push(`${process.env.BACKEND_URL}/${e.filename}`)
               photo_name.push(e.filename)
            })

         
         const createAirport = await model.ADD_AIRPORT( name, title, info, address, location, phone, link, photo, photo_name, type, status, region_id )

         if(createAirport) {
            res.json({
               status: 200,
               message: 'Airport Created'
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

         const {id, name, title, info, address, location, phone, link, type, status, region_id} = req.body;

         
         const photo = []
         const photo_name = []

         const founAirport = await model.SELECT_AIRPORT(id)

         if(mediaUpload.length) {

               founAirport?.photo_name.forEach(e => {
                  new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media',`${e}`)).delete()
               })

               mediaUpload.forEach(e => {                  
                     photo.push(`${process.env.BACKEND_URL}/${e.filename}`)
                     photo_name.push(e.filename)               
               })      
        }
         else {            
            founAirport?.photo.forEach(e => {
               photo.push(e)
            })
            founAirport?.photo_name.forEach(e => {
               photo_name.push(e)
            })
         }
         
         const updateAirport = await model.UPDATE_AIRPORT( id, name, title, info, address, location, phone, link, photo, photo_name, type, status, region_id)

         if(updateAirport) {
            res.json({
               status: 200,
               message: 'Airport Updated'
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
            
            const editAirport = await model.EDIT_AIRPORT(id, status)

            if(editAirport) {
               res.json({
                  status: 200,
                  message: 'Airport status edited'
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

         const deleteAirport = await model.DELETE_AIRPORT(id)

         const foundAirport = await model.SELECT_AIRPORT(id)


         if(deleteAirport) {
           
            foundAirport?.photo_name.forEach(e => {
               new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media',`${e}`)).delete()
            })

            res.json({
               status: 200,
               message: 'Airport Deleted'
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