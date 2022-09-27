const PG = require('../../lib/postgress/postgress')

class About extends PG {
   ALL_ABOUT () {
      return this.fetch(`
         SELECT 
                  project_about_oz AS about_oz, 
                  project_about_uz AS about_uz, 
                  project_about_ru AS about_ru, 
                  project_about_en AS about_en, 
                  project_target_oz AS target_oz, 
                  project_target_uz AS target_uz, 
                  project_target_ru AS target_ru, 
                  project_target_en AS target_en, 
                  project_status AS status
         FROM
                  about
         WHERE 
                  project_status = true
      `)
   }
   UPDATE_ABOUT (about_oz, about_uz, about_ru, about_en, target_oz, target_uz, target_ru, target_en, status) {
      return this.fetch(`
         UPDATE
                  about
         SET
                  project_about_oz = $1,
                  project_about_uz = $2,
                  project_about_ru = $3,
                  project_about_en = $4,
                  project_target_oz = $5,
                  project_target_uz = $6,
                  project_target_ru = $7,
                  project_target_en = $8,          
                  project_status = $9 

      RETURNING *`, about_oz, about_uz, about_ru, about_en, target_oz, target_uz, target_ru, target_en, status)
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