const PG = require('../../lib/postgress/postgress')

class Shrine extends PG {
   ALL_SHRINE (page, limit) {
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
               shrine_info_oz AS info_oz,
               shrine_info_uz AS info_uz,
               shrine_info_ru AS info_ru,
               shrine_info_en AS info_en,
               shrine_add_title_oz AS add_title_oz,
               shrine_add_title_uz AS add_title_uz,
               shrine_add_title_ru AS add_title_ru,
               shrine_add_title_en AS add_title_en,
               shrine_add_info_oz AS add_info_oz,
               shrine_add_info_uz AS add_info_uz,
               shrine_add_info_ru AS add_info_ru,
               shrine_add_info_en AS add_info_en,
               shrine_address_oz AS address_oz,
               shrine_address_uz AS address_uz,
               shrine_address_ru AS address_ru,
               shrine_address_en AS address_en,
               shrine_location AS location,
               shrine_phone AS phone,
               shrine_type AS type,               
               shrine_top AS top,
               shrine_video AS video,
               shrine_audio AS audio,
               shrine_photo AS photo,
               shrine_status AS status,
               region_id
         FROM
                  shrines
         WHERE 
                  shrine_is_delete = false 
         ORDER BY
                  shrine_id DESC
         OFFSET $1 LIMIT $2
      `, (page-1)*limit, limit)
   }

   TOP_SHRINE () {
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
               shrine_photo AS photo,
               region_id
         FROM
                  shrines
         WHERE 
                  shrine_is_delete = false AND  shrine_top > 1 
         ORDER BY
                  shrine_top 
      `)
   }

   SHRINE_BY_REGION (reg_id) {
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
               shrine_photo AS photo,
               region_id
         FROM
                  shrines
         WHERE 
                  shrine_is_delete = false  AND region_id = $1 AND shrine_status = true
         ORDER BY
                  shrine_top
      `, reg_id)
   }

   SINGLE_ACTIVE_SHRINE( shrine_id ) {
      return this.fetch(`
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
               shrine_info_oz AS info_oz,
               shrine_info_uz AS info_uz,
               shrine_info_ru AS info_ru,
               shrine_info_en AS info_en,
               shrine_add_title_oz AS add_title_oz,
               shrine_add_title_uz AS add_title_uz,
               shrine_add_title_ru AS add_title_ru,
               shrine_add_title_en AS add_title_en,
               shrine_add_info_oz AS add_info_oz,
               shrine_add_info_uz AS add_info_uz,
               shrine_add_info_ru AS add_info_ru,
               shrine_add_info_en AS add_info_en,
               shrine_address_oz AS address_oz,
               shrine_address_uz AS address_uz,
               shrine_address_ru AS address_ru,
               shrine_address_en AS address_en,
               shrine_location AS location,
               shrine_phone AS phone,
               shrine_video AS video,
               shrine_audio AS audio,
               shrine_photo AS photo,
               region_id
         FROM  
                  shrines
         WHERE
                  shrine_id = $1 AND shrine_is_delete = false AND shrine_status = true
      `, shrine_id)
   }  

   REF_SHRINE (reg_id) {
      return this.fetchAll(`
         SELECT 
               shrine_id AS id,
               shrine_name_oz AS name_oz,
               shrine_name_uz AS name_uz,
               shrine_name_ru AS name_ru,
               shrine_name_en AS name_en
         FROM
               shrines
         WHERE 
               shrine_is_delete = false AND region_id = $1 AND shrine_status = true
         ORDER BY
                  shrine_id DESC
      `, reg_id)
   }


   SEARCH_SHRINE (search_data, page, limit) {
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
               shrine_info_oz AS info_oz,
               shrine_info_uz AS info_uz,
               shrine_info_ru AS info_ru,
               shrine_info_en AS info_en,
               shrine_add_title_oz AS add_title_oz,
               shrine_add_title_uz AS add_title_uz,
               shrine_add_title_ru AS add_title_ru,
               shrine_add_title_en AS add_title_en,
               shrine_add_info_oz AS add_info_oz,
               shrine_add_info_uz AS add_info_uz,
               shrine_add_info_ru AS add_info_ru,
               shrine_add_info_en AS add_info_en,
               shrine_address_oz AS address_oz,
               shrine_address_uz AS address_uz,
               shrine_address_ru AS address_ru,
               shrine_address_en AS address_en,
               shrine_location AS location,
               shrine_phone AS phone,
               shrine_type AS type,             
               shrine_top AS top,
               shrine_video AS video,
               shrine_audio AS audio,
               shrine_photo AS photo,
               shrine_status AS status,
               region_id
         FROM
                  shrines
         WHERE 
                  shrine_is_delete = false AND (shrine_name_oz ILIKE $1 OR shrine_name_uz ILIKE $1 OR shrine_name_ru ILIKE $1 OR shrine_name_en ILIKE $1 OR shrine_info_oz ILIKE $1 OR shrine_info_uz ILIKE $1 OR shrine_info_ru ILIKE $1 OR shrine_info_en ILIKE $1 OR shrine_title_oz ILIKE $1 OR shrine_title_uz ILIKE $1 OR shrine_title_ru ILIKE $1 OR shrine_title_en ILIKE $1)
         ORDER BY
                  shrine_id DESC
         OFFSET $2 LIMIT $3
      `, search_data, (page-1)*limit, limit)
   }

   COUNT_SHRINE() {
      return this.fetch(`
         SELECT 
               COUNT(*) 
         FROM
               shrines
         WHERE 
               shrine_is_delete = false
      `)
   }

   COUNT_SHRINE_SEARCH(search_data) {
      return this.fetch(`
         SELECT 
               COUNT(*) 
         FROM
               shrines
         WHERE 
               shrine_is_delete = false AND (shrine_name_oz ILIKE $1 OR shrine_name_uz ILIKE $1 OR shrine_name_ru ILIKE $1 OR shrine_name_en ILIKE $1 OR shrine_info_oz ILIKE $1 OR shrine_info_uz ILIKE $1 OR shrine_info_ru ILIKE $1 OR shrine_info_en ILIKE $1 OR shrine_title_oz ILIKE $1 OR shrine_title_uz ILIKE $1 OR shrine_title_ru ILIKE $1 OR shrine_title_en ILIKE $1)
      `, search_data)
   }

   SINGLE_SHRINE( shrine_id ) {
      return this.fetch(`
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
               shrine_info_oz AS info_oz,
               shrine_info_uz AS info_uz,
               shrine_info_ru AS info_ru,
               shrine_info_en AS info_en,
               shrine_add_title_oz AS add_title_oz,
               shrine_add_title_uz AS add_title_uz,
               shrine_add_title_ru AS add_title_ru,
               shrine_add_title_en AS add_title_en,
               shrine_add_info_oz AS add_info_oz,
               shrine_add_info_uz AS add_info_uz,
               shrine_add_info_ru AS add_info_ru,
               shrine_add_info_en AS add_info_en,
               shrine_address_oz AS address_oz,
               shrine_address_uz AS address_uz,
               shrine_address_ru AS address_ru,
               shrine_address_en AS address_en,
               shrine_location AS location,
               shrine_phone AS phone,
               shrine_type AS type,
               shrine_top AS top,
               shrine_video AS video,
               shrine_audio AS audio,
               shrine_photo AS photo,
               shrine_status AS status,
               region_id
         FROM  
                  shrines
         WHERE
                  shrine_id = $1 AND shrine_is_delete = false
      `, shrine_id )
   }

   SELECT_SHRINE( shrine_id ) {
      return this.fetch(`
         SELECT
                  shrine_photo,
                  shrine_photo_name,
                  shrine_video,
                  shrine_video_name,
                  shrine_audio, 
                  shrine_audio_name
         FROM  
                  shrines
         WHERE
                  shrine_id = $1
      `, shrine_id )
   }

   ADD_SHRINE(name_oz, name_uz, name_ru, name_en, title_oz, title_uz, title_ru, title_en, info_oz, info_uz, info_ru, info_en, add_title_oz, add_title_uz, add_title_ru, add_title_en, add_info_oz, add_info_uz, add_info_ru, add_info_en, address_oz, address_uz, address_ru, address_en, location, phone, type, top, video, audio, audio_name, photo, photo_name, status, region_id ) {
      return this.fetch(`
         INSERT INTO
                     shrines(
                        shrine_name_oz,
                        shrine_name_uz,
                        shrine_name_ru,
                        shrine_name_en,
                        shrine_title_oz,
                        shrine_title_uz,
                        shrine_title_ru,
                        shrine_title_en,
                        shrine_info_oz,
                        shrine_info_uz,
                        shrine_info_ru,
                        shrine_info_en,
                        shrine_add_title_oz,
                        shrine_add_title_uz,
                        shrine_add_title_ru,
                        shrine_add_title_en,
                        shrine_add_info_oz,
                        shrine_add_info_uz,
                        shrine_add_info_ru,
                        shrine_add_info_en,
                        shrine_address_oz,
                        shrine_address_uz,
                        shrine_address_ru,
                        shrine_address_en,
                        shrine_location,
                        shrine_phone,
                        shrine_type,
                        shrine_top,
                        shrine_video,
                        shrine_audio,
                        shrine_audio_name,
                        shrine_photo,
                        shrine_photo_name,
                        shrine_status,
                        region_id
                     )
         VALUES      (
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
                        $27,
                        $28,
                        $29,
                        $30, 
                        $31,
                        $32,
                        $33,
                        $34,
                        $35                
                     )
      RETURNING *`, name_oz, name_uz, name_ru, name_en, title_oz, title_uz, title_ru, title_en, info_oz, info_uz, info_ru, info_en, add_title_oz, add_title_uz, add_title_ru, add_title_en, add_info_oz, add_info_uz, add_info_ru, add_info_en, address_oz, address_uz, address_ru, address_en, location, phone, type, top, video, audio, audio_name, photo, photo_name, status, region_id )
   }

   UPDATE_SHRINE(id, name_oz, name_uz, name_ru, name_en, title_oz, title_uz, title_ru, title_en, info_oz, info_uz, info_ru, info_en, add_title_oz, add_title_uz, add_title_ru, add_title_en, add_info_oz, add_info_uz, add_info_ru, add_info_en, address_oz, address_uz, address_ru, address_en, location, phone, type, top, video, audio, audio_name, photo, photo_name, status, region_id) {
      return this.fetch(`
         UPDATE
                  shrines
         SET
                     shrine_name_oz = $2,
                     shrine_name_uz = $3,
                     shrine_name_ru = $4,
                     shrine_name_en = $5,
                     shrine_title_oz = $6,
                     shrine_title_uz = $7,
                     shrine_title_ru = $8,
                     shrine_title_en = $9,
                     shrine_info_oz = $10,
                     shrine_info_uz = $11,
                     shrine_info_ru = $12,
                     shrine_info_en = $13,
                     shrine_add_title_oz = $14,
                     shrine_add_title_uz = $15,
                     shrine_add_title_ru = $16,
                     shrine_add_title_en = $17,
                     shrine_add_info_oz = $18,
                     shrine_add_info_uz = $19,
                     shrine_add_info_ru = $20,
                     shrine_add_info_en = $21,
                     shrine_address_oz = $22,
                     shrine_address_uz = $23,
                     shrine_address_ru = $24,
                     shrine_address_en = $25,
                     shrine_location = $26,                     
                     shrine_phone = $27,
                     shrine_type = $28,                     
                     shrine_top = $29,
                     shrine_video = $30,
                     shrine_audio = $31,
                     shrine_audio_name = $32,
                     shrine_photo = $33,
                     shrine_photo_name = $34,
                     shrine_status = $35,
                     region_id = $36
         WHERE
                  shrine_id = $1  
      RETURNING *`, id, name_oz, name_uz, name_ru, name_en, title_oz, title_uz, title_ru, title_en, info_oz, info_uz, info_ru, info_en, add_title_oz, add_title_uz, add_title_ru, add_title_en, add_info_oz, add_info_uz, add_info_ru, add_info_en, address_oz, address_uz, address_ru, address_en, location, phone, type, top, video, audio, audio_name, photo, photo_name, status, region_id)
   }

   EDIT_SHRINE(shrine_id, shrine_status) {
      return this.fetch(`
         UPDATE
                  shrines
         SET
                  shrine_status = $2
         WHERE
                  shrine_id = $1
      RETURNING *`, shrine_id, shrine_status)
   }

   DELETE_SHRINE(shrine_id) {
      return this.fetch(`
         UPDATE
                  shrines
         SET
                  shrine_is_delete = true,
                  shrine_deleted_at = CURRENT_TIMESTAMP
         WHERE
                  shrine_id = $1
      RETURNING *`, shrine_id)
   }
}

module.exports = new Shrine