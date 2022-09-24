const PG = require('../../lib/postgress/postgress');

class Region extends PG {
	ALL_REGION() {
		return this.fetchAll(`
         SELECT
                  region_id AS id,
                  region_name AS name,
                  region_short_info AS short_info,
                  region_shrine_count AS shrine_count,
                  region_video AS video,
                  region_photo AS photo,
                  region_status AS status
         FROM
                  regions
         WHERE 
                  region_is_delete = false
         ORDER BY
                  region_id DESC
      `);
	}

   ALL_ACTIVE_REGION() {
		return this.fetchAll(`
         SELECT
                  region_id AS id,
                  region_name AS name,
                  region_short_info AS short_info,
                  region_shrine_count AS shrine_count,
                  region_photo AS photo
         FROM
                  regions
         WHERE 
                  region_is_delete = false AND region_status = true
         ORDER BY
                  region_id DESC
      `);
	}

   SINGLE_ACTIVE_REGION(reg_id) {
      return this.fetch(`
         SELECT
                  region_id AS id,
                  region_name AS name,
                  region_short_info AS short_info,
                  region_shrine_count AS shrine_count,
                  region_video AS video,
                  region_photo AS photo
         FROM  
                  regions
         WHERE
                  region_id = $1 AND region_is_delete = false AND region_status = true
      `, reg_id)
   }


   REF_REGION() {
		return this.fetchAll(`
         SELECT
                  region_id AS id,
                  region_name AS name
         FROM
                  regions
         WHERE 
                  region_is_delete = false
         ORDER BY
                  region_id DESC
      `);
	}


   SEARCH_REGION(search_data) {
      return this.fetchAll(`
         SELECT
                  region_id AS id,
                  region_name AS name,
                  region_short_info AS short_info,
                  region_shrine_count AS shrine_count,
                  region_video AS video,
                  region_photo AS photo,
                  region_status AS status
         FROM
                  regions
         WHERE
                  region_is_delete = false AND (region_name ->> 'oz' LIKE $1 OR region_name ->> 'uz' LIKE $1 OR region_name ->> 'ru' ILIKE $1 OR region_name ->> 'en' ILIKE $1)
         ORDER BY
                  region_id DESC
      `, search_data)
   }

   SINGLE_REGION(reg_id) {
      return this.fetch(`
         SELECT
                  region_id AS id,
                  region_name AS name,
                  region_short_info AS short_info,
                  region_shrine_count AS shrine_count,
                  region_video AS video,
                  region_photo AS photo,
                  region_status AS status
         FROM  
                  regions
         WHERE
                  region_id = $1 AND region_is_delete = false
      `, reg_id)
   }

   
   SELECTED_REGION(reg_id) {
      return this.fetch(`
         SELECT
                  region_photo,
                  region_photo_name,
                  region_video,
                  region_video_name
         FROM  
                  regions
         WHERE
                  region_id = $1
      `, reg_id)
   }

	ADD_REGION(name, short_info, shrine_count, video, video_name,  photo,  photo_name, status) {
		return this.fetch(`
         INSERT INTO
                     regions (
                           region_name,
                           region_short_info,
                           region_shrine_count,
                           region_video,
                           region_video_name,
                           region_photo,
                           region_photo_name,
                           region_status
                     )       
         VALUES      (
                        $1,
                        $2, 
                        $3,
                        $4,
                        $5,
                        $6,
                        $7,
                        $8
                     )
      RETURNING *`, name, short_info, shrine_count, video, video_name,  photo,  photo_name, status);
	}

   UPDATE_REGION(id, name, short_info, shrine_count, video, video_name,  photo,  photo_name, status) {
      return this.fetch(`
         UPDATE 
                  regions
         SET
                     region_name = $2,
                     region_short_info = $3,
                     region_shrine_count = $4,
                     region_video = $5,
                     region_video_name = $6,
                     region_photo = $7,
                     region_photo_name = $8,
                     region_status = $9
         WHERE 
                  region_id = $1      
      RETURNING *`, id, name, short_info, shrine_count, video, video_name,  photo,  photo_name, status)
   }

   EDIT_REGION(reg_id, reg_status) {
      return this.fetch(`
         UPDATE 
                  regions
         SET
                  region_status = $2
         WHERE 
                  region_id = $1
      RETURNING *`,reg_id, reg_status)
   }
   DELETE_REGION(reg_id) {
      return this.fetch(`
         UPDATE
                  regions
         SET
                  region_is_delete = true,
                  region_deleted_at = CURRENT_TIMESTAMP
         WHERE
                  region_id = $1
      RETURNING *`, reg_id)
   }
}

module.exports = new Region();
