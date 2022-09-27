const PG = require('../../lib/postgress/postgress')

class Foods extends PG {
   ALL_FOODS(page, limit) {
      return this.fetchAll(`
         SELECT 
                  food_id AS id,
                  food_name_oz AS name_oz,
                  food_name_uz AS name_uz,
                  food_name_ru AS name_ru,
                  food_name_en AS name_en,
                  food_title_oz AS title_oz,
                  food_title_uz AS title_uz,
                  food_title_ru AS title_ru,
                  food_title_en AS title_en,
                  food_info_oz AS info_oz,
                  food_info_uz AS info_uz,
                  food_info_ru AS info_ru,
                  food_info_en AS info_en,
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
                  food_name_oz AS name_oz,
                  food_name_uz AS name_uz,
                  food_name_ru AS name_ru,
                  food_name_en AS name_en,
                  food_title_oz AS title_oz,
                  food_title_uz AS title_uz,
                  food_title_ru AS title_ru,
                  food_title_en AS title_en,
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
                  food_name_oz AS name_oz,
                  food_name_uz AS name_uz,
                  food_name_ru AS name_ru,
                  food_name_en AS name_en,
                  food_title_oz AS title_oz,
                  food_title_uz AS title_uz,
                  food_title_ru AS title_ru,
                  food_title_en AS title_en,
                  food_info_oz AS info_oz,
                  food_info_uz AS info_uz,
                  food_info_ru AS info_ru,
                  food_info_en AS info_en,
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
                  food_name_oz AS name_oz,
                  food_name_uz AS name_uz,
                  food_name_ru AS name_ru,
                  food_name_en AS name_en,
                  food_title_oz AS title_oz,
                  food_title_uz AS title_uz,
                  food_title_ru AS title_ru,
                  food_title_en AS title_en,
                  food_info_oz AS info_oz,
                  food_info_uz AS info_uz,
                  food_info_ru AS info_ru,
                  food_info_en AS info_en,
                  food_photo AS photo,
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
                  food_name_oz AS name_oz,
                  food_name_uz AS name_uz,
                  food_name_ru AS name_ru,
                  food_name_en AS name_en,
                  food_title_oz AS title_oz,
                  food_title_uz AS title_uz,
                  food_title_ru AS title_ru,
                  food_title_en AS title_en,
                  food_info_oz AS info_oz,
                  food_info_uz AS info_uz,
                  food_info_ru AS info_ru,
                  food_info_en AS info_en,
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

   ADD_FOOD (name_oz, name_uz, name_ru, name_en, title_oz, title_uz, title_ru, title_en,  info_oz, info_uz,info_ru, info_en, photo, photo_name, status) {
      return this.fetch(`
         INSERT INTO
                     foods (
                        food_name_oz,
                        food_name_uz,
                        food_name_ru,
                        food_name_en,
                        food_title_oz,
                        food_title_uz,
                        food_title_ru,
                        food_title_en,
                        food_info_oz,
                        food_info_uz,
                        food_info_ru,
                        food_info_en,
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
                        $6,
                        $7,
                        $8,
                        $9,
                        $10,
                        $11,
                        $12, 
                        $13,
                        $14,
                        $15
                  )          
      RETURNING *`, name_oz, name_uz, name_ru, name_en, title_oz, title_uz, title_ru, title_en,  info_oz, info_uz,info_ru, info_en, photo, photo_name, status)
   }

   UPDATE_FOOD (id, name_oz, name_uz, name_ru, name_en, title_oz, title_uz, title_ru, title_en,  info_oz, info_uz,info_ru, info_en, photo, photo_name, status) {
      return this.fetch(`
            UPDATE
                     foods
            SET
                     food_name_oz = $2,
                     food_name_uz = $3,
                     food_name_ru = $4,
                     food_name_en = $5,
                     food_title_oz = $6,
                     food_title_uz = $7,
                     food_title_ru = $8,
                     food_title_en = $9,
                     food_info_oz = $10,
                     food_info_uz = $11,
                     food_info_ru = $12,
                     food_info_en = $13,
                     food_photo = $14, 
                     food_photo_name = $15, 
                     food_status = $16
            WHERE
                     food_id = $1

      RETURNING *`, id, name_oz, name_uz, name_ru, name_en, title_oz, title_uz, title_ru, title_en,  info_oz, info_uz,info_ru, info_en, photo, photo_name, status)
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