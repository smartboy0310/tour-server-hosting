const PG = require('../../lib/postgress/postgress')

class Admin extends PG {
   FOUND_ADMIN(id) {
      return this.fetch(`
         SELECT
               user_name,
               user_role
         FROM
               users
         WHERE user_id = $1
      `, id)
   }

   ADMIN(login, pass) {
      return this.fetch(`
         SELECT
               user_id as id, 
               user_name,
               user_role
         FROM
               users
         WHERE user_login = $1 and user_password = $2
      `, login, pass)
   }
   UPADTE_PASS(user_id, new_pass) {
      return this.fetch (`
         UPDATE
                users
         SET
                user_password  = $2
         WHERE
               user_id = $1
      `, user_id, new_pass)
   }
}

module.exports = new Admin