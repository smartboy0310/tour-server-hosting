const PG = require('../../lib/postgress/postgress')

class Shrine extends PG {
   ALL_SHRINE (page, limit) {
      return this.fetchAll(`
         SELECT 
               shrine_id AS id,
               shrine_name AS name,
               shrine_title AS title,
               shrine_info AS info,
               shrine_add_title AS add_title,
               shrine_add_info AS add_info,
               shrine_address AS address,
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
               shrine_name AS name,
               shrine_title AS title,
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
               shrine_name AS name,
               shrine_title AS title,
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
                  shrine_name AS name,
                  shrine_title AS title,
                  shrine_info AS info,
                  shrine_add_title AS add_title,
                  shrine_add_info AS add_info,
                  shrine_address AS address,
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
               shrine_name AS name
         FROM
               shrines
         WHERE 
               shrine_is_delete = false AND region_id = $1
         ORDER BY
                  shrine_id DESC
      `, reg_id)
   }


   SEARCH_SHRINE (search_data, page, limit) {
      return this.fetchAll(`
         SELECT 
                  shrine_id AS id,
                  shrine_name AS name,
                  shrine_title AS title,
                  shrine_info AS info,
                  shrine_add_title AS add_title,
                  shrine_add_info AS add_info,
                  shrine_address AS address,
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
                  shrine_is_delete = false AND (shrine_name ->> 'oz' ILIKE $1 OR shrine_name ->> 'uz' ILIKE $1 OR shrine_name ->> 'ru' ILIKE $1 OR shrine_name ->> 'en' ILIKE $1 OR shrine_info ->> 'oz' ILIKE $1 OR shrine_info ->> 'uz' ILIKE $1 OR shrine_info ->> 'ru' ILIKE $1 OR shrine_info ->> 'en' ILIKE $1 OR shrine_type ->> 'oz' ILIKE $1 OR shrine_type ->> 'uz' ILIKE $1 OR shrine_type ->> 'ru' ILIKE $1 OR shrine_type ->> 'en' ILIKE $1)
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
               shrine_is_delete = false AND (shrine_name ->> 'oz' ILIKE $1 OR shrine_name ->> 'uz' ILIKE $1 OR shrine_name ->> 'ru' ILIKE $1 OR shrine_name ->> 'en' ILIKE $1 OR shrine_info ->> 'oz' ILIKE $1 OR shrine_info ->> 'uz' ILIKE $1 OR shrine_info ->> 'ru' ILIKE $1 OR shrine_info ->> 'en' ILIKE $1 OR shrine_type ->> 'oz' ILIKE $1 OR shrine_type ->> 'uz' ILIKE $1 OR shrine_type ->> 'ru' ILIKE $1 OR shrine_type ->> 'en' ILIKE $1)
      `, search_data)
   }

   SINGLE_SHRINE( shrine_id ) {
      return this.fetch(`
         SELECT
                  shrine_id AS id,
                  shrine_name AS name,
                  shrine_title AS title,
                  shrine_info AS info,
                  shrine_add_title AS add_title,
                  shrine_add_info AS add_info,
                  shrine_address AS address,
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

   ADD_SHRINE(name, title, info, add_title, add_info, address, location, phone, type, top, video, video_name, audio, audio_name, photo, photo_name, status, region_id ) {
      return this.fetch(`
         INSERT INTO
                     shrines(
                        shrine_name,
                        shrine_title,
                        shrine_info,
                        shrine_add_title,
                        shrine_add_info,
                        shrine_address,
                        shrine_location,
                        shrine_phone,
                        shrine_type,
                        shrine_top,
                        shrine_video,
                        shrine_video_name,
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
                        $18                     
                     )
      RETURNING *`, name, title, info, add_title, add_info, address, location, phone, type, top, video, video_name, audio, audio_name, photo, photo_name, status, region_id)
   }

   UPDATE_SHRINE(id, name, title, info, add_title, add_info, address, location, phone, type, top, video, video_name, audio, audio_name, photo, photo_name, status, region_id) {
      return this.fetch(`
         UPDATE
                  shrines
         SET
                     shrine_name = $2,
                     shrine_title = $3,
                     shrine_info = $4,
                     shrine_add_title = $5,
                     shrine_add_info = $6,
                     shrine_address = $7,
                     shrine_location = $8,
                     shrine_phone = $9,
                     shrine_type = $10,
                     shrine_top = $11,
                     shrine_video = $12,
                     shrine_video_name = $13,
                     shrine_audio = $14,
                     shrine_audio_name = $15,
                     shrine_photo = $16,
                     shrine_photo_name = $17,
                     shrine_status = $18,
                     region_id = $19
         WHERE
                  shrine_id = $1  
      RETURNING *`, id, name, title, info, add_title, add_info, address, location, phone, type, top, video, video_name, audio, audio_name, photo, photo_name, status, region_id)
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