const model = require('./model')
const path = require('path')
const FS = require('../../lib/fs/fs')
require('dotenv').config()

module.exports = {
   GET: async(req, res) => {
      try {
         const {  search_data, page, limit } = req.query
         const countMuseum = await model.COUNT_MUSEUMS()
         const countMuseumSearch = await model.COUNT_MUSEUMS_SEARCH(`%${search_data}%`)
         if (search_data) {
            res.json({
               status: 200,
               totalPages: Math.ceil(parseInt(countMuseumSearch?.count)/limit),
               totalItems: parseInt(countMuseumSearch?.count),
               data: await model.SEARCH_MUSEUMS(`%${search_data}%`, page, limit),
            })
         }
         else {
            res.json({
               status: 200,
               totalPages: Math.ceil(parseInt(countMuseum?.count)/limit),
               totalItems: parseInt(countMuseum?.count),
               data: await model.ALL_MUSEUMS(page, limit)
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
            const foundData = await model.SINGLE_MUSEUM(id)
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
            const foundByRegion = await model.MUSEUMS_BY_REGION(reg_id)
            const foundByShrine = await model.MUSEUMS_BY_SHRINE(shrine_id)
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
            const foundData = await model.SINGLE_ACTIVE_MUSEUM(id)
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

         
         const createMuseum = await model.ADD_MUSEUM( name, title, info, address, location, phone, work_time, link, photo, photo_name, type, status, region_id, shrine_id )

         if(createMuseum) {
            res.json({
               status: 200,
               message: 'Museum Created'
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

         const foundMuseum = await model.SELECT_MUSEUM(id)

         if(mediaUpload.length) {

               foundMuseum?.photo_name.forEach(e => {
                  new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media',`${e}`)).delete()
               })

               mediaUpload.forEach(e => {                  
                     photo.push(`${process.env.BACKEND_URL}/${e.filename}`)
                     photo_name.push(e.filename)               
               })      
        }
         else {            
            foundMuseum?.photo.forEach(e => {
               photo.push(e)
            })
            foundMuseum?.photo_name.forEach(e => {
               photo_name.push(e)
            })
         }
         
         const updateMuseum = await model.UPDATE_MUSEUM( id, name, title, info, address, location, phone, work_time, link, photo, photo_name, type, status, region_id, shrine_id)

         if(updateMuseum) {
            res.json({
               status: 200,
               message: 'Museum Updated'
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
            
            const editMuseum = await model.EDIT_MUSEUM(id, status)

            if(editMuseum) {
               res.json({
                  status: 200,
                  message: 'Museum status edited'
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

         const deleteMuseum = await model.DELETE_MUSEUM(id)

         const foundMuseum = await model.SELECT_MUSEUM(id)


         if(deleteMuseum) {
           
            foundMuseum?.photo_name.forEach(e => {
               new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media',`${e}`)).delete()
            })

            res.json({
               status: 200,
               message: 'Museum Deleted'
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