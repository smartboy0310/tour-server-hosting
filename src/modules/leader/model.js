const PG = require('../../lib/postgress/postgress')

class Leader extends PG {
   ALL_LEADER() {
      return this.fetchAll(`      
         SELECT
                  leader_id AS id,
                  leader_name_oz AS name_oz,
                  leader_name_uz AS name_uz,
                  leader_name_ru AS name_ru,
                  leader_name_en AS name_en,
                  leader_role_oz AS role_oz,
                  leader_role_uz AS role_uz,
                  leader_role_ru AS role_ru,
                  leader_role_en AS role_en,
                  leader_info_oz AS info_oz,
                  leader_info_uz AS info_uz,
                  leader_info_ru AS info_ru,
                  leader_info_en AS info_en,
                  leader_phone AS phone,
                  leader_email AS email,
                  leader_photo AS photo,
                  leader_status AS status
         FROM
                  leader
         WHERE
                  leader_is_delete = false
      `)
   }

   SINGLE_LEADER(leader_id) {
      return this.fetch(`
         SELECT
                  leader_id AS id,
                  leader_name_oz AS name_oz,
                  leader_name_uz AS name_uz,
                  leader_name_ru AS name_ru,
                  leader_name_en AS name_en,
                  leader_role_oz AS role_oz,
                  leader_role_uz AS role_uz,
                  leader_role_ru AS role_ru,
                  leader_role_en AS role_en,
                  leader_info_oz AS info_oz,
                  leader_info_uz AS info_uz,
                  leader_info_ru AS info_ru,
                  leader_info_en AS info_en,
                  leader_phone AS phone,
                  leader_email AS email,
                  leader_photo AS photo,
                  leader_status AS status 
         FROM
                  leader
         WHERE
                  leader_id = $1 AND leader_is_delete = false
      `, leader_id)
   }

   ACTIVE_LEADER() {
      return this.fetchAll(`      
         SELECT
                  leader_id AS id,
                  leader_name_oz AS name_oz,
                  leader_name_uz AS name_uz,
                  leader_name_ru AS name_ru,
                  leader_name_en AS name_en,
                  leader_role_oz AS role_oz,
                  leader_role_uz AS role_uz,
                  leader_role_ru AS role_ru,
                  leader_role_en AS role_en,
                  leader_info_oz AS info_oz,
                  leader_info_uz AS info_uz,
                  leader_info_ru AS info_ru,
                  leader_info_en AS info_en,
                  leader_phone AS phone,
                  leader_email AS email,
                  leader_photo AS photo
         FROM
                  leader
         WHERE
                  leader_is_delete = false AND leader_status = true
      `)
   }
   
   SELECTED_LEADER(leader_id) {
      return this.fetch(`
         SELECT
                  leader_photo, 
                  leader_photo_name  
         FROM
                  leader
         WHERE
                  leader_id = $1
      `, leader_id)
   }

   ADD_LEADER(name_oz, name_uz, name_ru, name_en, role_oz, role_uz, role_ru, role_en, info_oz, info_uz, info_ru, info_en, phone, email, photo, photo_name, status) {
      return this.fetch(`
         INSERT INTO
                        leader (
                           leader_name_oz,
                           leader_name_uz,
                           leader_name_ru,
                           leader_name_en,
                           leader_role_oz,
                           leader_role_uz,
                           leader_role_ru,
                           leader_role_en,
                           leader_info_oz,
                           leader_info_uz,
                           leader_info_ru,
                           leader_info_en,
                           leader_phone,
                           leader_email,
                           leader_photo,
                           leader_photo_name,
                           leader_status
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
                           $17
                        )
      RETURNING *`, name_oz, name_uz, name_ru, name_en, role_oz, role_uz, role_ru, role_en, info_oz, info_uz, info_ru, info_en, phone, email, photo, photo_name, status)
   }

   UPDATE_LEADER(id, name_oz, name_uz, name_ru, name_en, role_oz, role_uz, role_ru, role_en, info_oz, info_uz, info_ru, info_en, phone, email, photo, photo_name, status) {
      return this.fetch(`
         UPDATE
                  leader
         SET
                  leader_name_oz = $2,
                  leader_name_uz = $3,
                  leader_name_ru = $4,
                  leader_name_en = $5,
                  leader_role_oz = $6,
                  leader_role_uz = $7,
                  leader_role_ru = $8,
                  leader_role_en = $9,
                  leader_info_oz = $10,
                  leader_info_uz = $11,
                  leader_info_ru = $12,
                  leader_info_en = $13,                 
                  leader_phone = $14,
                  leader_email = $15,
                  leader_photo = $16,
                  leader_photo_name = $17,                  
                  leader_status = $18
         WHERE
                  leader_id = $1
      RETURNING *`, id, name_oz, name_uz, name_ru, name_en, role_oz, role_uz, role_ru, role_en, info_oz, info_uz, info_ru, info_en, phone, email, photo, photo_name, status)
   }

   EDIT_LEADER(id, status) {
      return this.fetch(`
        UPDATE
                 leader
         SET
                  leader_status = $2
         WHERE
                  leader_id = $1
      RETURNING *`, id, status)
   }

   DELETE_LEADER(leader_id) {
      return this.fetch(`
        UPDATE
                 leader
         SET
                 leader_is_delete = true,
                 leader_deleted_at = CURRENT_TIMESTAMP
         WHERE
                  leader_id = $1
      RETURNING *`, leader_id)
   }
}

module.exports = new Leader