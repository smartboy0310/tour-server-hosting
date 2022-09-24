const PG = require('../../lib/postgress/postgress')

class Foods extends PG {
   ALL_FOODS(page, limit) {
      return this.fetchAll(`
         SELECT 
                  food_id AS id,
                  food_name AS name,
                  food_title AS title,
                  food_info AS info,
                  food_photo AS photo,
                  food_status AS status
         FROM 
                  foods
         WHERE
                  food_is_delete = false
         ORDER BY
                  food_id  DESC
         OFFSET $1 LIMIT $2
      `, (page-1)*limit, limit)
   }

   ALL_ACTIVE_FOODS() {
      return this.fetchAll(`
         SELECT 
                  food_id AS id,
                  food_name AS name,
                  food_title AS title,
                  food_photo AS photo
         FROM 
                  foods
         WHERE
                  food_is_delete = false AND food_status = true
         ORDER BY
                  food_id  DESC
      `)
   }

   SINGLE_ACTIVE_FOOD (food_id) {
      return this.fetch(`
         SELECT
                  food_id AS id,
                  food_name AS name,
                  food_title AS title,
                  food_info AS info,
                  food_photo AS photo 
         FROM
                  foods
         WHERE
                  food_id = $1 AND food_is_delete = false AND food_status = true
      `, food_id)
   }

   SEARCH_FOODS(search_data, page, limit) {
      return this.fetchAll(`
         SELECT 
                  food_id AS id,
                  food_name AS name,
                  food_title AS title,
                  food_info AS info,
                  food_photo AS photo,
                  food_photo_name AS photo_name,
                  food_status AS status 
         FROM 
                  foods
         WHERE
                  food_is_delete = false AND (food_name ->> 'oz' ILIKE $1 OR food_name ->> 'uz' ILIKE $1 OR food_name ->> 'ru' ILIKE $1 OR food_name ->> 'en' ILIKE $1 OR food_info ->> 'oz' ILIKE $1 OR food_info ->> 'uz' ILIKE $1 OR food_info ->> 'ru' ILIKE $1 OR food_info ->> 'en' ILIKE $1)
         ORDER BY
                  food_id  DESC
         OFFSET $2 LIMIT $3
      `, search_data, (page-1)*limit, limit)
   }

   COUNT_FOODS() {
      return this.fetch(`
         SELECT 
               COUNT(*) 
         FROM
               foods
         WHERE 
               food_is_delete = false
      `)
   }

   COUNT_FOODS_SEARCH(search_data) {
      return this.fetch(`
         SELECT 
               COUNT(*) 
         FROM
               foods
         WHERE 
               food_is_delete = false AND (food_name ->> 'oz' ILIKE $1 OR food_name ->> 'uz' ILIKE $1 OR food_name ->> 'ru' ILIKE $1 OR food_name ->> 'en' ILIKE $1 OR food_info ->> 'oz' ILIKE $1 OR food_info ->> 'uz' ILIKE $1 OR food_info ->> 'ru' ILIKE $1 OR food_info ->> 'en' ILIKE $1)
      `, search_data)
   }

   SINGLE_FOOD(food_id) {
      return this.fetch(`
         SELECT
                  food_id AS id,
                  food_name AS name,
                  food_title AS title,
                  food_info AS info,
                  food_photo AS photo,
                  food_status AS status  
         FROM
                  foods
         WHERE
                  food_id = $1 AND food_is_delete = false
      `, food_id)
   }

   SELECTED_FOOD(food_id) {
      return this.fetch(`
         SELECT
                  food_photo, 
                  food_photo_name  
         FROM
                  foods
         WHERE
                  food_id = $1
      `, food_id)
   }

   ADD_FOOD (name, title, info, photo, photo_name, status) {
      return this.fetch(`
         INSERT INTO
                     foods (
                        food_name, 
                        food_info, 
                        food_title,
                        food_photo, 
                        food_photo_name,   
                        food_status
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

   UPDATE_FOOD (id, name, title, info, photo, photo_name, status) {
      return this.fetch(`
            UPDATE
                     foods
            SET
                     food_name = $2, 
                     food_info = $3, 
                     food_title = $4, 
                     food_photo = $5, 
                     food_photo_name = $6, 
                     food_status = $7
            WHERE
                     food_id = $1

      RETURNING *`, id, name, title, info, photo, photo_name, status)
   }

   EDIT_FOOD(food_id, food_status) {
      return this.fetch(`
         UPDATE
                  foods
         SET
                  food_status = $2
         WHERE
                  food_id = $1

      RETURNING *`, food_id, food_status)
   }

   DELETE_FOOD(food_id) {
      return this.fetch(`
         UPDATE
                  foods
         SET
                  food_is_delete = true,
                  food_deleted_at = CURRENT_TIMESTAMP
         WHERE
                  food_id = $1

      RETURNING *`, food_id)
   }
}

module.exports = new Foods