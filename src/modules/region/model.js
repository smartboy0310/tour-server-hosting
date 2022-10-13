const PG = require('../../lib/postgress/postgress');

class Region extends PG {
	ALL_REGION() {
		return this.fetchAll(`
         SELECT
                  region_id AS id,
                  region_name_oz AS name_oz,
                  region_name_uz AS name_uz,
                  region_name_ru AS name_ru,
                  region_name_en AS name_en,
                  region_short_info_oz AS short_info_oz,
                  region_short_info_uz AS short_info_uz,
                  region_short_info_ru AS short_info_ru,
                  region_short_info_en AS short_info_en,
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
                  region_name_oz AS name_oz,
                  region_name_uz AS name_uz,
                  region_name_ru AS name_ru,
                  region_name_en AS name_en,
                  region_short_info_oz AS short_info_oz,
                  region_short_info_uz AS short_info_uz,
                  region_short_info_ru AS short_info_ru,
                  region_short_info_en AS short_info_en,
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
                  region_name_oz AS name_oz,
                  region_name_uz AS name_uz,
                  region_name_ru AS name_ru,
                  region_name_en AS name_en,
                  region_short_info_oz AS short_info_oz,
                  region_short_info_uz AS short_info_uz,
                  region_short_info_ru AS short_info_ru,
                  region_short_info_en AS short_info_en,
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
                  region_name_oz AS name_oz,
                  region_name_uz AS name_uz,
                  region_name_ru AS name_ru,
                  region_name_en AS name_en
         FROM
                  regions
         WHERE 
                  region_is_delete = false AND region_status = true
         ORDER BY
                  region_id DESC
      `);
	}


   SEARCH_REGION(search_data) {
      return this.fetchAll(`
         SELECT
                  region_id AS id,
                  region_name_oz AS name_oz,
                  region_name_uz AS name_uz,
                  region_name_ru AS name_ru,
                  region_name_en AS name_en,
                  region_short_info_oz AS short_info_oz,
                  region_short_info_uz AS short_info_uz,
                  region_short_info_ru AS short_info_ru,
                  region_short_info_en AS short_info_en,
                  region_shrine_count AS shrine_count,
                  region_video AS video,
                  region_photo AS photo,
                  region_status AS status
         FROM
                  regions
         WHERE
                  region_is_delete = false AND (region_name_oz LIKE $1 OR region_name_uz LIKE $1 OR region_name_ru ILIKE $1 OR region_name_en ILIKE $1)
         ORDER BY
                  region_id DESC
      `, search_data)
   }

   SINGLE_REGION(reg_id) {
      return this.fetch(`
         SELECT
                  region_id AS id,
                  region_name_oz AS name_oz,
                  region_name_uz AS name_uz,
                  region_name_ru AS name_ru,
                  region_name_en AS name_en,
                  region_short_info_oz AS short_info_oz,
                  region_short_info_uz AS short_info_uz,
                  region_short_info_ru AS short_info_ru,
                  region_short_info_en AS short_info_en,
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
         FROM  
                  regions
         WHERE
                  region_id = $1
      `, reg_id)
   }

	ADD_REGION(name_oz, name_uz, name_ru, name_en, short_info_oz, short_info_uz, short_info_ru, short_info_en, shrine_count, video, photo,  photo_name, status) {
		return this.fetch(`
         INSERT INTO
                     regions (
                           region_name_oz,
                           region_name_uz,
                           region_name_ru,
                           region_name_en,
                           region_short_info_oz,
                           region_short_info_uz,
                           region_short_info_ru,
                           region_short_info_en,
                           region_shrine_count,
                           region_video,                          
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
                        $8,
                        $9,
                        $10,
                        $11,
                        $12,
                        $13
                     )
      RETURNING *`, name_oz, name_uz, name_ru, name_en, short_info_oz, short_info_uz, short_info_ru, short_info_en, shrine_count, video, photo,  photo_name, status);
	}

   UPDATE_REGION(id, name_oz, name_uz, name_ru, name_en, short_info_oz, short_info_uz, short_info_ru, short_info_en, shrine_count, video, photo,  photo_name, status) {
      return this.fetch(`
         UPDATE 
                  regions
         SET
                     region_name_oz = $2,
                     region_name_uz = $3,
                     region_name_ru = $4,
                     region_name_en = $5,
                     region_short_info_oz = $6,
                     region_short_info_uz = $7,
                     region_short_info_ru = $8,
                     region_short_info_en = $9,
                     region_shrine_count = $10,
                     region_video = $11,
                     region_photo = $12,
                     region_photo_name = $13,
                     region_status = $14
         WHERE 
                  region_id = $1      
      RETURNING *`,id, name_oz, name_uz, name_ru, name_en, short_info_oz, short_info_uz, short_info_ru, short_info_en, shrine_count, video, photo,  photo_name, status)
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
