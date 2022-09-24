const model = require('./model')
const path = require('path')
const FS = require('../../lib/fs/fs')
require('dotenv').config()

module.exports = {
   GET: async(req, res) => {
      try {
         const {  search_data, page, limit } = req.query
         const countBank = await model.COUNT_BANKS()
         const countBankSearch = await model.COUNT_BANKS_SEARCH(`%${search_data}%`)
         if (search_data) {
            res.json({
               status: 200,
               totalPages: Math.ceil(parseInt(countBankSearch?.count)/limit),
               totalItems: parseInt(countBankSearch?.count),
               data: await model.SEARCH_BANKS(`%${search_data}%`, page, limit),
            })
         }
         else {
            res.json({
               status: 200,
               totalPages: Math.ceil(parseInt(countBank?.count)/limit),
               totalItems: parseInt(countBank?.count),
               data: await model.ALL_BANKS(page, limit)
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
            const foundData = await model.SINGLE_BANK(id)
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
            const foundByRegion = await model.BANKS_BY_REGION(reg_id)
            const foundByShrine = await model.BANKS_BY_SHRINE(shrine_id)
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
            const foundData = await model.SINGLE_ACTIVE_BANK(id)
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

         
         const createBank = await model.ADD_BANK( name, title, info, address, location, phone, work_time, link, photo, photo_name, type, status, region_id, shrine_id )

         if(createBank) {
            res.json({
               status: 200,
               message: 'Bank Created'
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

         const foundBank = await model.SELECT_BANK(id)

         if(mediaUpload.length) {

               foundBank?.photo_name.forEach(e => {
                  new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media',`${e}`)).delete()
               })

               mediaUpload.forEach(e => {                  
                     photo.push(`${process.env.BACKEND_URL}/${e.filename}`)
                     photo_name.push(e.filename)               
               })      
        }
         else {            
            foundBank?.photo.forEach(e => {
               photo.push(e)
            })
            foundBank?.photo_name.forEach(e => {
               photo_name.push(e)
            })
         }
         
         const updateBank = await model.UPDATE_BANK( id, name, title, info, address, location, phone, work_time, link, photo, photo_name, type, status, region_id, shrine_id)

         if(updateBank) {
            res.json({
               status: 200,
               message: 'Bank Updated'
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
            
            const editBank = await model.EDIT_BANK(id, status)

            if(editBank) {
               res.json({
                  status: 200,
                  message: 'Bank status edited'
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

         const deleteBank = await model.DELETE_BANK(id)

         const foundBank = await model.SELECT_BANK(id)


         if(deleteBank) {
           
            foundBank?.photo_name.forEach(e => {
               new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'media',`${e}`)).delete()
            })

            res.json({
               status: 200,
               message: 'Bank Deleted'
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