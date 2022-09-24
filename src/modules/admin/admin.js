require('dotenv').config()
const model = require('./model');
const JWT = require('../../lib/jwt/jwt')


module.exports = {

	POST_AUTH: async (req, res) => {
		try {

			const { token : accessToken } = req.body
			const userStatus =  JWT.verify(accessToken)
			
			const foundUser = await model.FOUND_ADMIN(userStatus?.data)
			
			if( accessToken && userStatus ){
					res.statusCode = 200
					res.json({ 
				   message: 'Authorized',
					data: foundUser
			  })
			}              
			else {
				res.statusCode = 401
				res.json({
					message: 'Unauthorized'
			  })
			}

	  } catch (err) {
			res.statusCode = 401
			res.json({
				 message: 'Unauthorized'
			})
	  }
	},

	LOGIN: async (req, res) => {
		try {
			
			const { login, pass } = req.body;   			    
			const foundAdmin = await model.ADMIN(login, pass);
			

			if (foundAdmin) {
				const token = JWT.sign(foundAdmin.id)
				res.json({
					status: 200,
					token: token,
					data: foundAdmin
				});
			} else {
				res.statusCode = 401
				res.json({
						status: 401,
						message: 'Unauthorized'
					})
			}
		} catch (err) {
			res.statusCode = 500
	      res.json({
				status: 500,
				message: err.message,
			})
		}
	},
	PUT_PASS: async (req, res) => {
		try {
			const {user_id, login, old_pass, new_pass} = req.body

			const oldPassword = await model.ADMIN(login, old_pass) 
			
			if(oldPassword) {
				await model.UPADTE_PASS(user_id, new_pass)
				res.json({
					status: 200, 
					message: "Password Updated"
				})
			}
			else {
				res.statusCode = 401
				res.json({
						status: 401,
						message: 'Unauthorized'
					})
			}
			
		} catch (err) {
			res.statusCode = 500
	      res.json({
				status: 500,
				message: err.message,
			})
		}
	}
};
