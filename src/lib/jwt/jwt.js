require('dotenv').config()
const {sign, verify} = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY 

class JWT {

   sign(data) {
      return sign({data}, SECRET_KEY, {expiresIn: '1h'})
   }
   verify(data) {
      return verify(data, SECRET_KEY)
   }
}

module.exports = new JWT