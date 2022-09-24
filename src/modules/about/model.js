const PG = require('../../lib/postgress/postgress')

class About extends PG {
   ALL_ABOUT () {
      return this.fetch(`
         SELECT 
                  project_about AS about, 
                  project_target AS target, 
                  project_status AS status
         FROM
                  about
         WHERE 
                  project_status = true
      `)
   }
   UPDATE_ABOUT (about, target, status) {
      return this.fetch(`
         UPDATE
                  about
         SET
                  project_about = $1,
                  project_target = $2,
                  project_status = $3 

      RETURNING *`, about, target, status)
   }

   EDIT_ABOUT (project_status) {
      return this.fetch(`
         UPDATE
                  about
         SET
                  project_status = $1

      RETURNING *`, project_status)
   }
}

module.exports = new About