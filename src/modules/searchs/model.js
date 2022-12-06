const PG = require('../../lib/postgress/postgress')

class Searchs extends PG {
   SEARCH_SHRINE(data, type) {
      return this.fetchAll(`
      SELECT 
               shrine_id AS id,
               shrine_name_oz AS name_oz,
               shrine_name_uz AS name_uz,
               shrine_name_ru AS name_ru,
               shrine_name_en AS name_en,
               shrine_title_oz AS title_oz,
               shrine_title_uz AS title_uz,
               shrine_title_ru AS title_ru,
               shrine_title_en AS title_en,               
               shrine_photo AS photo               
         FROM
                  shrines
         WHERE 
                  shrine_is_delete = false AND shrine_status = true AND shrine_type = $2 AND (shrine_name_oz ILIKE $1 OR shrine_name_uz ILIKE $1 OR shrine_name_ru ILIKE $1 OR shrine_name_en ILIKE $1 OR shrine_info_oz ILIKE $1 OR shrine_info_uz ILIKE $1 OR shrine_info_ru ILIKE $1 OR shrine_info_en ILIKE $1 OR shrine_title_oz ILIKE $1 OR shrine_title_uz ILIKE $1 OR shrine_title_ru ILIKE $1 OR shrine_title_en ILIKE $1)
      `, data, type)
   }

   ALL_SHRINE(type) {
      return this.fetchAll(`
      SELECT 
               shrine_id AS id,
               shrine_name_oz AS name_oz,
               shrine_name_uz AS name_uz,
               shrine_name_ru AS name_ru,
               shrine_name_en AS name_en,
               shrine_title_oz AS title_oz,
               shrine_title_uz AS title_uz,
               shrine_title_ru AS title_ru,
               shrine_title_en AS title_en,               
               shrine_photo AS photo               
         FROM
                  shrines
         WHERE 
                  shrine_is_delete = false AND shrine_status = true AND shrine_type = $2
      `, type)
   }

   SEARCH_TOP_SHRINE(data) {
      return this.fetchAll(`
      SELECT 
               shrine_id AS id,
               shrine_name_oz AS name_oz,
               shrine_name_uz AS name_uz,
               shrine_name_ru AS name_ru,
               shrine_name_en AS name_en,
               shrine_title_oz AS title_oz,
               shrine_title_uz AS title_uz,
               shrine_title_ru AS title_ru,
               shrine_title_en AS title_en,               
               shrine_photo AS photo               
         FROM
                  shrines
         WHERE 
                  shrine_is_delete = false AND shrine_status = true AND shrine_top > 100 AND (shrine_name_oz ILIKE $1 OR shrine_name_uz ILIKE $1 OR shrine_name_ru ILIKE $1 OR shrine_name_en ILIKE $1 OR shrine_info_oz ILIKE $1 OR shrine_info_uz ILIKE $1 OR shrine_info_ru ILIKE $1 OR shrine_info_en ILIKE $1 OR shrine_title_oz ILIKE $1 OR shrine_title_uz ILIKE $1 OR shrine_title_ru ILIKE $1 OR shrine_title_en ILIKE $1)
      `, data)
   }

   TOP_SHRINE() {
      return this.fetchAll(`
      SELECT 
               shrine_id AS id,
               shrine_name_oz AS name_oz,
               shrine_name_uz AS name_uz,
               shrine_name_ru AS name_ru,
               shrine_name_en AS name_en,
               shrine_title_oz AS title_oz,
               shrine_title_uz AS title_uz,
               shrine_title_ru AS title_ru,
               shrine_title_en AS title_en,               
               shrine_photo AS photo               
         FROM
                  shrines
         WHERE 
                  shrine_is_delete = false AND shrine_status = true AND shrine_top > 100 
      `)
   }

   SEARCH_OBJECT(data, type) {
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
               object_is_delete = false AND object_type = $2 AND object_status = true AND (object_name_oz ILIKE $1 OR object_name_uz ILIKE $1 OR object_name_ru ILIKE $1 OR object_name_en ILIKE $1 OR object_info_oz ILIKE $1 OR object_info_uz ILIKE $1 OR object_info_ru ILIKE $1 OR object_info_en ILIKE $1 OR object_title_oz ILIKE $1 OR object_title_uz ILIKE $1 OR object_title_ru ILIKE $1 OR object_title_en ILIKE $1)
      ORDER BY
               object_id DESC
   `, data, type)
   }

   ALL_OBJECT(type) {
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
               object_is_delete = false AND object_type = $2 AND object_status = true 
      ORDER BY
               object_id DESC
   `, type)
   }
}

module.exports = new Searchs