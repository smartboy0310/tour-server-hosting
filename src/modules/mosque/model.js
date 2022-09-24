const PG = require('../../lib/postgress/postgress')

class Mosques extends PG {
   ALL_MOSQUES(page, limit) {
      return this.fetchAll(`
      SELECT   
               object_id AS id,
               object_name AS name,
               object_title AS title,
               object_info AS info,
               object_address AS address,
               object_location AS location,
               object_phone AS phone,
               object_link AS link,
               object_photo AS photo,
               object_type AS type,
               object_status AS status,
               region_id,
               shrine_id
      FROM
            special_object
      WHERE 
               object_is_delete = false AND object_add_type = 'mosque'
      ORDER BY
               object_id DESC
      OFFSET $1 LIMIT $2 
   `, (page - 1) * limit, limit)
   }

   MOSQUES_BY_REGION(reg_id) {
      return this.fetchAll(`
      SELECT   
               object_id AS id,
               object_name AS name,
               object_title AS title,
               object_photo AS photo
      FROM
            special_object
      WHERE 
               object_is_delete = false AND object_add_type = 'mosque' AND  object_status = true AND region_id = $1
      ORDER BY
               object_id DESC
   `, reg_id)
   }

   MOSQUES_BY_SHRINE(shrine_id) {
      return this.fetchAll(`
      SELECT   
               object_id AS id,
               object_name AS name,
               object_title AS title,
               object_photo AS photo
      FROM
            special_object
      WHERE 
               object_is_delete = false AND object_add_type = 'mosque' AND  object_status = true AND shrine_id = $1
      ORDER BY
               object_id DESC
   `, shrine_id)
   }

   SINGLE_ACTIVE_MOSQUE(object_id) {
      return this.fetch(`
         SELECT   
                  object_id AS id,
                  object_name AS name,
                  object_title AS title,
                  object_info AS info,
                  object_address AS address,
                  object_location AS location,
                  object_phone AS phone,
                  object_link AS link,
                  object_photo AS photo
         FROM
               special_object
         WHERE 
                  object_id = $1 AND object_add_type = 'mosque' AND  object_status = true
      `, object_id)
   }

   SEARCH_MOSQUES(search_data, page, limit) {
      return this.fetchAll(`
      SELECT   
               object_id AS id,
               object_name AS name,
               object_title AS title,
               object_info AS info,
               object_address AS address,
               object_location AS location,
               object_phone AS phone,
               object_link AS link,
               object_photo AS photo,
               object_type AS type,
               object_status AS status,
               region_id,
               shrine_id
      FROM
            special_object
      WHERE 
               object_is_delete = false AND object_add_type = 'mosque' AND (object_name ->> 'oz' ILIKE $2 OR object_name ->> 'uz' ILIKE $2 OR object_name ->> 'ru' ILIKE $2 OR object_name ->> 'en' ILIKE $2 OR object_info ->> 'oz' ILIKE $2 OR object_info ->> 'uz' ILIKE $2 OR object_info ->> 'ru' ILIKE $2 OR object_info ->> 'en' ILIKE $2)
      ORDER BY
               object_id DESC
     OFFSET $2 LIMIT $3  
   `, search_data, (page - 1) * limit, limit)
   }

   COUNT_MOSQUES_SEARCH(search_data) {
      return this.fetch(`
      SELECT 
            COUNT(*) 
      FROM
            special_object
      WHERE 
            object_is_delete = false AND object_add_type = 'mosque' AND (object_name ->> 'oz' ILIKE $1 OR object_name ->> 'uz' ILIKE $1 OR object_name ->> 'ru' ILIKE $1 OR object_name ->> 'en' ILIKE $1 OR object_info ->> 'oz' ILIKE $1 OR object_info ->> 'uz' ILIKE $1 OR object_info ->> 'ru' ILIKE $1 OR object_info ->> 'en' ILIKE $1)
   `, search_data)
   }

   COUNT_MOSQUES() {
      return this.fetch(`
      SELECT 
            COUNT(*) 
      FROM
            special_object
      WHERE 
            object_is_delete = false AND object_add_type = 'mosque'
   `)
   }

   SINGLE_MOSQUE(object_id) {
      return this.fetch(`
         SELECT   
                  object_id AS id,
                  object_name AS name,
                  object_title AS title,
                  object_info AS info,
                  object_address AS address,
                  object_location AS location,
                  object_phone AS phone,
                  object_link AS link,
                  object_photo AS photo,
                  object_type AS type,
                  object_status AS status,
                  region_id,
                  shrine_id
         FROM
               special_object
         WHERE 
                  object_id = $1 AND object_add_type = 'mosque'
      `, object_id)
   }

   SELECT_MOSQUE(object_id) {
      return this.fetch(`
         SELECT
                  object_photo AS photo,
                  object_photo_name AS photo_name
         FROM  
                  special_object
         WHERE
                  object_id = $1 AND object_add_type = 'mosque'
      `, object_id)
   }

   ADD_MOSQUE(object_name, object_title, object_info, object_address, object_location, object_phone, object_link, object_photo, object_photo_name, object_type, object_status, region_id, shrine_id) {
      return this.fetch(`
         INSERT INTO
                     special_object ( 
                           object_name, 
                           object_title, 
                           object_info, 
                           object_address, 
                           object_location, 
                           object_phone,   
                           object_link, 
                           object_photo, 
                           object_photo_name, 
                           object_type, 
                           object_add_type, 
                           object_status, 
                           region_id, 
                           shrine_id
                        )
         VALUES         (
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
                           'mosque',
                           $11,
                           $12,
                           $13
                        )
         RETURNING *`, object_name, object_title, object_info, object_address, object_location, object_phone, object_link, object_photo, object_photo_name, object_type, object_status, region_id, shrine_id)
   }

   UPDATE_MOSQUE(object_id, object_name, object_title, object_info, object_address, object_location, object_phone, object_link, object_photo, object_photo_name, object_type, object_status, region_id, shrine_id) {
      return this.fetch(`
         UPDATE
                  special_object 
         SET
                     object_name = $2, 
                     object_title = $3, 
                     object_info = $4, 
                     object_address = $5, 
                     object_location = $6, 
                     object_phone = $7,  
                     object_link = $8, 
                     object_photo = $9, 
                     object_photo_name = $10, 
                     object_type = $11, 
                     object_status = $12, 
                     region_id = $13, 
                     shrine_id = $14
         WHERE 
                     object_id = $1      
                           
         RETURNING *`, object_id, object_name, object_title, object_info, object_address, object_location, object_phone, object_link, object_photo, object_photo_name, object_type, object_status, region_id, shrine_id)
   }

   EDIT_MOSQUE(object_id, object_status) {
      return this.fetch(`
         UPDATE
                  special_object
         SET
                  object_status = $2
         WHERE
                  object_id = $1
      RETURNING *`, object_id, object_status)
   }

   DELETE_MOSQUE(object_id) {
      return this.fetch(`
         UPDATE
                  special_object
         SET
                  object_is_delete = true,
                  object_deleted_at = CURRENT_TIMESTAMP
         WHERE
                  object_id = $1
      RETURNING *`, object_id)
   }
}

module.exports = new Mosques