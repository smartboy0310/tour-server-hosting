const PG = require('../../lib/postgress/postgress')

class Leader extends PG {
   ALL_LEADER() {
      return this.fetchAll(`      
         SELECT
                  leader_id AS id,
                  leader_name AS name,
                  leader_role AS role,
                  leader_info AS info,
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
                  leader_name AS name,
                  leader_role AS role,
                  leader_info AS info,
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

   ADD_LEADER(name, role, info, phone, email, photo, photo_name, status) {
      return this.fetch(`
         INSERT INTO
                        leader (
                           leader_name,
                           leader_role,
                           leader_info,
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
                           $8
                        )
      RETURNING *`, name, role, info, phone, email, photo, photo_name, status)
   }

   UPDATE_LEADER(id, name, role, info, phone, email, photo, photo_name, status) {
      return this.fetch(`
         UPDATE
                  leader
         SET
                  leader_name = $2,
                  leader_role = $3,
                  leader_info = $4,
                  leader_phone = $5,
                  leader_email = $6,
                  leader_photo = $7,
                  leader_photo_name = $8,                  
                  leader_status = $9
         WHERE
                  leader_id = $1
      RETURNING *`, id, name, role, info, phone, email, photo, photo_name, status)
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