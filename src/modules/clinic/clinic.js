const model = require('./model')
const path = require('path')
const FS = require('../../lib/fs/fs')
require('dotenv').config()

module.exports = {
   GET: async(req, res) => {
      try {
         const {  search_data, page, limit } = req.query
         const countClinic = await model.COUNT_CLINICS()
         const countClinicSearch = await model.COUNT_CLINICS_SEARCH(`%${search_data}%`)
         if (search_data) {
            res.json({
               status: 200,
               totalPages: Math.ceil(parseInt(countClinicSearch?.count)/limit),
               totalItems: parseInt(countClinicSearch?.count),
               data: await model.SEARCH_CLINICS(`%${search_data}%`, page, limit),
            })
         }
         else {
            res.json({
               status: 200,
               totalPages: Math.ceil(parseInt(countClinic?.count)/limit),
               totalItems: parseInt(countClinic?.count),
               data: await model.ALL_CLINICS(page, limit)
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
            const foundData = await model.SINGLE_CLINIC(id)
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
            const foundByRegion = await model.CLINICS_BY_REGION(reg_id)
            const foundByShrine = await model.CLINICS_BY_SHRINE(shrine_id)
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
            const foundData = await model.SINGLE_ACTIVE_CLINIC(id)
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

         
         const createClinic = await model.ADD_CLINIC( name, title, info, address, location, phone, link, photo, photo_name, type, status, region_id, shrine_id )

         if(createClinic) {
            res.json({
               status: 200,
               message: 'Clinic Created'
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

         const foundClinic = await model.SELECT_CLINIC(id)

         if(mediaUpload.length) {

               foundClinic?.photo_name.forEach(e => {
                  new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media',`${e}`)).delete()
               })

               mediaUpload.forEach(e => {                  
                     photo.push(`${process.env.BACKEND_URL}/${e.filename}`)
                     photo_name.push(e.filename)               
               })      
        }
         else {            
            foundClinic?.photo.forEach(e => {
               photo.push(e)
            })
            foundClinic?.photo_name.forEach(e => {
               photo_name.push(e)
            })
         }
         
         const updateClinic = await model.UPDATE_CLINIC( id, name, title, info, address, location, phone, link, photo, photo_name, type, status, region_id, shrine_id)

         if(updateClinic) {
            res.json({
               status: 200,
               message: 'Clinic Updated'
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
            
            const editClinic = await model.EDIT_CLINIC(id, status)

            if(editClinic) {
               res.json({
                  status: 200,
                  message: 'Clinic status edited'
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

         const deleteClinic = await model.DELETE_CLINIC(id)

         const foundClinic = await model.SELECT_CLINIC(id)


         if(deleteClinic) {
           
            foundClinic?.photo_name.forEach(e => {
               new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media',`${e}`)).delete()
            })

            res.json({
               status: 200,
               message: 'Clinic Deleted'
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