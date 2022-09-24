const JWT = require('../lib/jwt/jwt')

module.exports = {
   AUTH: (req, res, next) => {
       try {
           const { token } = req.headers; 
           const userStatus = JWT.verify(token)
    
           if(!token && !userStatus ){
               res.statusCode = 401
               res.json({
                status: 401, 
                message: 'Unauthorized'
            })
           }              
           else {
               next()
           }

       } catch (err) {
           res.statusCode = 401
           res.json({
               status: 401, 
               message: 'Unauthorized'
           })
       }
   }
}