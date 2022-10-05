const PG = require('../../lib/postgress/postgress')

class SpecialObject extends PG {
   ALL_OBJECTS(page, limit, type) {
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
               object_location AS location,
               object_phone AS phone,
               object_work_time AS work_time,
               object_link AS link,
               object_photo AS photo,
               object_type AS type,
               object_status AS status,
               region_id,
               shrine_id
      FROM
            special_object
      WHERE 
               object_is_delete = false AND object_type = $3
      ORDER BY
               object_id DESC
      OFFSET $1 LIMIT $2 
   `, (page - 1) * limit, limit, type)
   }

   OBJECTS_BY_REGION(reg_id, type) {
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
               object_is_delete = false AND object_type = $2 AND object_status = true AND region_id = $1
      ORDER BY
               object_id DESC
   `, reg_id, type)
   }

   OBJECT_BY_SHRINE(shrine_id, type) {
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
               object_photo AS photo
      FROM
            special_object
      WHERE 
               object_is_delete = false AND object_type = $2 AND object_status = true AND shrine_id = $1
      ORDER BY
               object_id DESC
   `, shrine_id, type)
   }

   SINGLE_ACTIVE_OBJECT(object_id, type) {
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
                  object_location AS location,
                  object_phone AS phone,
                  object_work_time AS work_time,
                  object_link AS link,
                  object_photo AS photo
         FROM
               special_object 
         WHERE 
                  object_id = $1 AND object_type = $2 AND  object_is_delete = false AND object_status = true
      `, object_id, type)
   }

   SEARCH_OBJECTS(search_data, page, limit, type) {
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
               object_location AS location,
               object_phone AS phone,
               object_work_time AS work_time,
               object_link AS link,
               object_photo AS photo,
               object_type AS type,
               object_status AS status,
               region_id,
               shrine_id
      FROM
            special_object
      WHERE 
               object_is_delete = false AND object_type = $4 AND (object_name_oz ILIKE $1 OR object_name_uz ILIKE $1 OR object_name_ru ILIKE $1 OR object_name_en ILIKE $1 OR object_info_oz ILIKE $1 OR object_info_uz ILIKE $1 OR object_info_ru ILIKE $1 OR object_info_en ILIKE $1 OR object_title_oz ILIKE $1 OR object_title_uz ILIKE $1 OR object_title_ru ILIKE $1 OR object_title_en ILIKE $1)
      ORDER BY
               object_id DESC
     OFFSET $2 LIMIT $3  
   `, search_data, (page - 1) * limit, limit, type)
   }

   COUNT_OBJECTS_SEARCH(search_data, type) {
      return this.fetch(`
      SELECT 
            COUNT(*) 
      FROM
            special_object
      WHERE 
            object_is_delete = false AND object_type = $2 AND (object_name_oz ILIKE $1 OR object_name_uz ILIKE $1 OR object_name_ru ILIKE $1 OR object_name_en ILIKE $1 OR object_info_oz ILIKE $1 OR object_info_uz ILIKE $1 OR object_info_ru ILIKE $1 OR object_info_en ILIKE $1 OR object_title_oz ILIKE $1 OR object_title_uz ILIKE $1 OR object_title_ru ILIKE $1 OR object_title_en ILIKE $1)
   `, search_data, type)
   }

   COUNT_OBJECTS(type) {
      return this.fetch(`
      SELECT 
            COUNT(*) 
      FROM
            special_object
      WHERE 
            object_is_delete = false AND object_type = $1
   `, type)
   }

   SINGLE_OBJECT(object_id, type) {
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
                  object_location AS location,
                  object_phone AS phone,
                  object_work_time AS work_time,
                  object_link AS link,
                  object_photo AS photo,
                  object_type AS type,
                  object_status AS status,
                  region_id,
                  shrine_id
         FROM
               special_object 
         WHERE 
                  object_id = $1 AND object_type = $2
         `, object_id, type)
   }

   SELECT_OBJECT(object_id, type) {
      return this.fetch(`
         SELECT
                  object_photo AS photo,
                  object_photo_name AS photo_name
         FROM  
                  special_object
         WHERE
                  object_id = $1 AND object_type = $2
      `, object_id, type)
   }

   ADD_OBJECT(name_oz, name_uz, name_ru, name_en, title_oz, title_uz, title_ru, title_en, info_oz, info_uz, info_ru, info_en, address_oz, address_uz, address_ru, address_en, location, phone, work_time, link, photo, photo_name, type, status, region_id, shrine_id) {
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
                        object_location,
                        object_phone,
                        object_work_time,
                        object_link,
                        object_photo,
                        object_photo_name,
                        object_type,                        
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
                           $26                                                     
                        )
         RETURNING *`, name_oz, name_uz, name_ru, name_en, title_oz, title_uz, title_ru, title_en, info_oz, info_uz, info_ru, info_en, address_oz, address_uz, address_ru, address_en, location, phone, work_time, link, photo, photo_name, type, status, region_id, shrine_id)
   }

   UPDATE_OBJECT(id, name_oz, name_uz, name_ru, name_en, title_oz, title_uz, title_ru, title_en, info_oz, info_uz, info_ru, info_en, address_oz, address_uz, address_ru, address_en, location, phone, work_time, link, photo, photo_name, type, status, region_id, shrine_id) {
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
                        object_location = $18,
                        object_phone = $19,
                        object_work_time = $20
                        object_link = $21,
                        object_photo = $22,
                        object_photo_name = $23,
                        object_type = $24, 
                        object_status = $25, 
                        region_id = $26, 
                        shrine_id = $27
         WHERE 
                     object_id = $1      
                           
         RETURNING *`, id, name_oz, name_uz, name_ru, name_en, title_oz, title_uz, title_ru, title_en, info_oz, info_uz, info_ru, info_en, address_oz, address_uz, address_ru, address_en, location, phone, work_time, link, photo, photo_name, type, status, region_id, shrine_id)
   }

   EDIT_OBJECT(object_id, object_status, type) {
      return this.fetch(`
         UPDATE
                  special_object
         SET
                  object_status = $2
         WHERE
                  object_id = $1 AND object_type = $3
      RETURNING *`, object_id, object_status, type)
   }

   DELETE_OBJECT(object_id, type) {
      return this.fetch(`
         UPDATE
                  special_object
         SET
                  object_is_delete = true,
                  object_deleted_at = CURRENT_TIMESTAMP
         WHERE
                  object_id = $1 AND object_type = $2
      RETURNING *`, object_id, type)
   }
}

module.exports = new SpecialObject