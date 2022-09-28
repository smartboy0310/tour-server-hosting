const PG = require('../../lib/postgress/postgress')

class Airports extends PG {
   ALL_AIRPORTS(page, limit) {
      return this.fetchAll(`
      SELECT   
               object_id AS id,
               object_name_oz AS name_oz,
               object_name_uz AS name_uz,
               object_name_ru AS name_ru,
               object_name_en AS name_en,
               object_title_oz AS title_oz,
               object_title_uz AS title_uz,
               object_title_ru AS title_ru,
               object_title_en AS title_en,
               object_info_oz AS info_oz,
               object_info_uz AS info_uz,
               object_info_ru AS info_ru,
               object_info_en AS info_en,
               object_address_oz AS address_oz,
               object_address_uz AS address_uz,
               object_address_ru AS address_ru,
               object_address_en AS address_en,
               object_location_x AS location_x,
               object_location_y AS location_y,
               object_phone AS phone,
               object_link AS link,
               object_photo AS photo,
               object_type_oz AS type_oz,
               object_type_uz AS type_uz,
               object_type_ru AS type_ru,
               object_type_en AS type_en,
               object_status AS status,
               region_id
      FROM
            special_object
      WHERE 
               object_is_delete = false AND object_add_type = 'airport'
      ORDER BY
               object_id DESC
      OFFSET $1 LIMIT $2 
   `, (page - 1) * limit, limit)
   }

   AIRPORT_BY_REGION(reg_id) {
      return this.fetchAll(`
      SELECT   
               object_id AS id,
               object_name_oz AS name_oz,
               object_name_uz AS name_uz,
               object_name_ru AS name_ru,
               object_name_en AS name_en,
               object_title_oz AS title_oz,
               object_title_uz AS title_uz,
               object_title_ru AS title_ru,
               object_title_en AS title_en,
               object_photo AS photo
      FROM
            special_object
      WHERE 
               object_is_delete = false AND object_add_type = 'airport' AND object_status = true AND region_id = $1
      ORDER BY
               object_id DESC
   `, reg_id)
   }

   SINGLE_ACTIVE_AIRPORT(object_id) {
      return this.fetch(`
         SELECT   
               object_id AS id,
               object_name_oz AS name_oz,
               object_name_uz AS name_uz,
               object_name_ru AS name_ru,
               object_name_en AS name_en,
               object_title_oz AS title_oz,
               object_title_uz AS title_uz,
               object_title_ru AS title_ru,
               object_title_en AS title_en,
               object_info_oz AS info_oz,
               object_info_uz AS info_uz,
               object_info_ru AS info_ru,
               object_info_en AS info_en,
               object_address_oz AS address_oz,
               object_address_uz AS address_uz,
               object_address_ru AS address_ru,
               object_address_en AS address_en,
               object_location_x AS location_x,
               object_location_y AS location_y,
               object_phone AS phone,
               object_link AS link,
               object_photo AS photo
         FROM
               special_object
         WHERE 
                  object_id = $1 AND object_add_type = 'airport' AND object_status = true AND object_is_delete = false
      `, object_id)
   }

   SEARCH_AIRPORTS(search_data, page, limit) {
      return this.fetchAll(`
      SELECT   
               object_id AS id,
               object_name_oz AS name_oz,
               object_name_uz AS name_uz,
               object_name_ru AS name_ru,
               object_name_en AS name_en,
               object_title_oz AS title_oz,
               object_title_uz AS title_uz,
               object_title_ru AS title_ru,
               object_title_en AS title_en,
               object_info_oz AS info_oz,
               object_info_uz AS info_uz,
               object_info_ru AS info_ru,
               object_info_en AS info_en,
               object_address_oz AS address_oz,
               object_address_uz AS address_uz,
               object_address_ru AS address_ru,
               object_address_en AS address_en,
               object_location_x AS location_x,
               object_location_y AS location_y,
               object_phone AS phone,
               object_link AS link,
               object_photo AS photo,
               object_type_oz AS type_oz,
               object_type_uz AS type_uz,
               object_type_ru AS type_ru,
               object_type_en AS type_en,
               object_status AS status,
               region_id
      FROM
            special_object
      WHERE 
               object_is_delete = false AND object_add_type = 'airport' AND (object_name_oz ILIKE $1 OR object_name_uz ILIKE $1 OR object_name_ru ILIKE $1 OR object_name_en ILIKE $1 OR object_info_oz ILIKE $1 OR object_info_uz ILIKE $1 OR object_info_ru ILIKE $1 OR object_info_en ILIKE $1)
      ORDER BY
               object_id DESC
     OFFSET $2 LIMIT $3  
   `, search_data, (page - 1) * limit, limit)
   }

   COUNT_AIRPORTS_SEARCH(search_data) {
      return this.fetch(`
      SELECT 
            COUNT(*) 
      FROM
            special_object
      WHERE 
            object_is_delete = false AND object_add_type = 'airport' AND (object_name_oz ILIKE $1 OR object_name_uz ILIKE $1 OR object_name_ru ILIKE $1 OR object_name_en ILIKE $1 OR object_info_oz ILIKE $1 OR object_info_uz ILIKE $1 OR object_info_ru ILIKE $1 OR object_info_en ILIKE $1)
   `, search_data)
   }

   COUNT_AIRPORTS() {
      return this.fetch(`
      SELECT 
            COUNT(*) 
      FROM
            special_object
      WHERE 
            object_is_delete = false AND object_add_type = 'airport'
   `)
   }

   SINGLE_AIRPORT(object_id) {
      return this.fetch(`
         SELECT   
               object_id AS id,
               object_name_oz AS name_oz,
               object_name_uz AS name_uz,
               object_name_ru AS name_ru,
               object_name_en AS name_en,
               object_title_oz AS title_oz,
               object_title_uz AS title_uz,
               object_title_ru AS title_ru,
               object_title_en AS title_en,
               object_info_oz AS info_oz,
               object_info_uz AS info_uz,
               object_info_ru AS info_ru,
               object_info_en AS info_en,
               object_address_oz AS address_oz,
               object_address_uz AS address_uz,
               object_address_ru AS address_ru,
               object_address_en AS address_en,
               object_location_x AS location_x,
               object_location_y AS location_y,
               object_phone AS phone,
               object_link AS link,
               object_photo AS photo,
               object_type_oz AS type_oz,
               object_type_uz AS type_uz,
               object_type_ru AS type_ru,
               object_type_en AS type_en,
               object_status AS status,
               region_id
         FROM
               special_object
         WHERE 
                  object_id = $1 
      `, object_id)
   }

   SELECT_AIRPORT(object_id) {
      return this.fetch(`
         SELECT
                  object_photo AS photo,
                  object_photo_name AS photo_name
         FROM  
                  special_object
         WHERE
                  object_id = $1
      `, object_id)
   }

   ADD_AIRPORT(name_oz, name_uz, name_ru, name_en, title_oz, title_uz, title_ru, title_en, info_oz, info_uz, info_ru, info_en, address_oz, address_uz, address_ru, address_en, location_x, location_y, phone, link, photo, photo_name, type_oz, type_uz, type_ru, type_en, status, region_id) {
      return this.fetch(`
         INSERT INTO
                     special_object ( 
                        object_name_oz,
                        object_name_uz,
                        object_name_ru,
                        object_name_en,
                        object_title_oz,
                        object_title_uz,
                        object_title_ru,
                        object_title_en,
                        object_info_oz,
                        object_info_uz,
                        object_info_ru,
                        object_info_en,
                        object_address_oz,
                        object_address_uz,
                        object_address_ru,
                        object_address_en,
                        object_location_x,
                        object_location_y,
                        object_phone,
                        object_link,
                        object_photo,
                        object_photo_name,
                        object_type_oz,
                        object_type_uz,
                        object_type_ru,
                        object_type_en,
                        object_add_type, 
                        object_status, 
                        region_id
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
                           $11,
                           $12,
                           $13,
                           $14,
                           $15,
                           $16,
                           $17,
                           $18,
                           $19,
                           $20,
                           $21,
                           $22,
                           $23,
                           $24,
                           $25,
                           $26,
                           'airport',
                           $27,
                           $28                           
                        )
         RETURNING *`, name_oz, name_uz, name_ru, name_en, title_oz, title_uz, title_ru, title_en, info_oz, info_uz, info_ru, info_en, address_oz, address_uz, address_ru, address_en, location_x, location_y, phone, link, photo, photo_name, type_oz, type_uz, type_ru, type_en, status, region_id)
   }

   UPDATE_AIRPORT(id, name_oz, name_uz, name_ru, name_en, title_oz, title_uz, title_ru, title_en, info_oz, info_uz, info_ru, info_en, address_oz, address_uz, address_ru, address_en, location_x, location_y, phone, link, photo, photo_name, type_oz, type_uz, type_ru, type_en, status, region_id) {
      return this.fetch(`
         UPDATE
                  special_object 
         SET
                        object_name_oz = $2,
                        object_name_uz = $3,
                        object_name_ru = $4,
                        object_name_en = $5,
                        object_title_oz = $6,
                        object_title_uz = $7,
                        object_title_ru = $8,
                        object_title_en = $9,
                        object_info_oz = $10,
                        object_info_uz = $11,
                        object_info_ru = $12,
                        object_info_en = $13,
                        object_address_oz = $14,
                        object_address_uz = $15,
                        object_address_ru = $16,
                        object_address_en = $17,
                        object_location_x = $18,
                        object_location_y = $19,
                        object_phone = $20,
                        object_link = $21,
                        object_photo = $22,
                        object_photo_name = $23,
                        object_type_oz = $24,
                        object_type_uz = $25,
                        object_type_ru = $26,
                        object_type_en = $27, 
                        object_status = $28, 
                        region_id = $29
         WHERE 
                     object_id = $1      
                           
         RETURNING *`, id, name_oz, name_uz, name_ru, name_en, title_oz, title_uz, title_ru, title_en, info_oz, info_uz, info_ru, info_en, address_oz, address_uz, address_ru, address_en, location_x, location_y, phone, link, photo, photo_name, type_oz, type_uz, type_ru, type_en, status, region_id)
   }

   EDIT_AIRPORT(object_id, object_status) {
      return this.fetch(`
         UPDATE
                  special_object
         SET
                  object_status = $2
         WHERE
                  object_id = $1
      RETURNING *`, object_id, object_status)
   }

   DELETE_AIRPORT(object_id) {
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

module.exports = new Airports