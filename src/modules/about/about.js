const model = require('./model')

module.exports = {
   GET: async (_, res) => {
     try {
      res.json({
         status: 200,
         data: await model.ALL_ABOUT()
      })
      
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

         const {about, target, status} = req.body;

         const updateAbout = await model.UPDATE_ABOUT(about, target, status)

        if(updateAbout) {
         res.json({
            status: 200,
            message: 'About info updated' 
          })
        }
        else{
         res.statusCode = 500
         res.json({
            status: 500,
            message: 'Internal server error' 
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

         const { status } = req.body;

         const editAbout = await model.EDIT_ABOUT( status )
         
         if(editAbout) {
            res.json({
               status: 200,
               message: 'About status edited' 
             })
         }
         else {
            res.statusCode = 500
            res.json({
               status: 500,
               message: 'Internal server error' 
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