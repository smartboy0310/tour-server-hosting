const PG = require('../../lib/postgress/postgress')

class Essential extends PG {
   ALL_ESSENTIALS() {
      return this.fetchAll(`
         SELECT 
                  essential_id AS id,
                  essential_name AS name,
                  essential_title AS title,
                  essential_info AS info,
                  essential_photo AS photo,
                  essential_status AS status
         FROM 
                  essentials
         WHERE
                  essential_is_delete = false
         ORDER BY
                  essential_id  DESC
      `)
   }

   SEARCH_ESSENTIALS(search_data) {
      return this.fetchAll(`
         SELECT 
                  essential_id AS id,
                  essential_name AS name, 
                  essential_title AS title,
                  essential_info AS info,
                  essential_photo AS photo,
                  essential_status AS status 
         FROM 
                  essentials
         WHERE
                  essential_is_delete = false AND (essential_name ->> 'oz' ILIKE $1 OR essential_name ->> 'uz' ILIKE $1 OR essential_name ->> 'ru' ILIKE $1 OR essential_name ->> 'en' ILIKE $1 OR essential_info ->> 'oz' ILIKE $1 OR essential_info ->> 'uz' ILIKE $1 OR essential_info ->> 'ru' ILIKE $1 OR essential_info ->> 'en' ILIKE $1)
         ORDER BY
                  essential_id  DESC

      `, search_data)
   }

   SINGLE_ESSENTIAL(essential_id) {
      return this.fetch(`
         SELECT
                  essential_id AS id,
                  essential_name AS name, 
                  essential_title AS title,
                  essential_info AS info,
                  essential_photo AS photo,
                  essential_status AS status 
         FROM
                  essentials
         WHERE
                  essential_id = $1 AND essential_is_delete = false
      `, essential_id)
   }

   SELECTED_ESSENTIAL(essential_id) {
      return this.fetch(`
         SELECT
                  essential_photo, 
                  essential_photo_name  
         FROM
                  essentials
         WHERE
                  essential_id = $1
      `, essential_id)
   }

   ADD_ESSENTIAL (name, title, info, photo, photo_name, status) {
      return this.fetch(`
         INSERT INTO
                     essentials (
                        essential_name, 
                        essential_title, 
                        essential_info, 
                        essential_photo, 
                        essential_photo_name,  
                        essential_status
                     )
         VALUES     (
                        $1,
                        $2, 
                        $3,
                        $4,
                        $5,
                        $6
                  )          
      RETURNING *`, name, title, info, photo, photo_name, status)
   }

   UPDATE_ESSENTIAL (id, name, title, info, photo, photo_name, status) {
      return this.fetch(`
            UPDATE
                     essentials
            SET
                     essential_name = $2, 
                     essential_title = $3, 
                     essential_info = $4, 
                     essential_photo = $5, 
                     essential_photo_name = $6, 
                     essential_status = $7
            WHERE
                     essential_id = $1

      RETURNING *`, id, name, title, info, photo, photo_name, status)
   }

   EDIT_ESSENTIAL(essential_id, essential_status) {
      return this.fetch(`
         UPDATE
                  essentials
         SET
                  essential_status = $2
         WHERE
                  essential_id = $1

      RETURNING *`, essential_id, essential_status)
   }

   DELETE_ESSENTIAL(essential_id) {
      return this.fetch(`
         UPDATE
                  essentials
         SET
                  essential_is_delete = true,
                  essential_deleted_at = CURRENT_TIMESTAMP
         WHERE
                  essential_id = $1

      RETURNING *`, essential_id)
   }
}

module.exports = new Essential