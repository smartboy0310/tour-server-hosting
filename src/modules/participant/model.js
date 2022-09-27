const PG = require('../../lib/postgress/postgress')

class Participant extends PG {
   ALL_PARTICIPANT(page, limit) {
      return this.fetchAll(`
         SELECT
                  participant_id AS id,
                  participant_name_oz AS name_oz,
                  participant_name_uz AS name_uz,
                  participant_name_ru AS name_ru,
                  participant_name_en AS name_en,
                  participant_role_oz AS role_oz,
                  participant_role_uz AS role_uz,
                  participant_role_ru AS role_ru,
                  participant_role_en AS role_en,
                  participant_info_oz AS info_oz,
                  participant_info_uz AS info_uz,
                  participant_info_ru AS info_ru,
                  participant_info_en AS info_en,
                  participant_photo AS photo,
                  participant_status AS status 
         FROM
                  participant
         WHERE
                  participant_is_delete = false
         ORDER BY
                  participant_id
         OFFSET $1 LIMIT $2
      `, (page-1)*limit, limit)
   }

   ACTIVE_PARTICIPANT() {
      return this.fetchAll(`
         SELECT
                  participant_id AS id,
                  participant_name_oz AS name_oz,
                  participant_name_uz AS name_uz,
                  participant_name_ru AS name_ru,
                  participant_name_en AS name_en,
                  participant_role_oz AS role_oz,
                  participant_role_uz AS role_uz,
                  participant_role_ru AS role_ru,
                  participant_role_en AS role_en,
                  participant_info_oz AS info_oz,
                  participant_info_uz AS info_uz,
                  participant_info_ru AS info_ru,
                  participant_info_en AS info_en,
                  participant_photo AS photo
         FROM
                  participant
         WHERE
                  participant_is_delete = false AND participant_status = true
         ORDER BY
                  participant_id         
      `)
   }

   SEARCH_PARTICIPANT(search_data, page, limit) {
      return this.fetchAll(`
         SELECT
                  participant_id AS id,
                  participant_name_oz AS name_oz,
                  participant_name_uz AS name_uz,
                  participant_name_ru AS name_ru,
                  participant_name_en AS name_en,
                  participant_role_oz AS role_oz,
                  participant_role_uz AS role_uz,
                  participant_role_ru AS role_ru,
                  participant_role_en AS role_en,
                  participant_info_oz AS info_oz,
                  participant_info_uz AS info_uz,
                  participant_info_ru AS info_ru,
                  participant_info_en AS info_en,
                  participant_photo AS photo,
                  participant_status AS status
         FROM
                  participant
         WHERE
                  participant_is_delete = false AND (participant_name_oz ILIKE $1 OR participant_name_uz ILIKE $1 OR participant_name_ru ILIKE $1 OR participant_name_en ILIKE $1 OR participant_info_oz ILIKE $1 OR  participant_info_uz ILIKE $1 OR  participant_info_ru ILIKE $1 OR  participant_info_en ILIKE $1 OR participant_role_oz ILIKE $1 OR participant_role_uz ILIKE $1 OR participant_role_ru ILIKE $1 OR participant_role_en ILIKE $1)
         ORDER BY
                  participant_id
         OFFSET $2 LIMIT $3
      `, search_data, (page-1)*limit, limit)
   }

   COUNT_PARTICIPANT() {
      return this.fetch(`
         SELECT 
               COUNT(*) 
         FROM
               participant
         WHERE 
               participant_is_delete = false
      `)
   }

   COUNT_PARTICIPANT_SEARCH(search_data) {
      return this.fetch(`
         SELECT 
               COUNT(*) 
         FROM
               participant
         WHERE 
               participant_is_delete = false AND (participant_name_oz ILIKE $1 OR participant_name_uz ILIKE $1 OR participant_name_ru ILIKE $1 OR participant_name_en ILIKE $1 OR participant_info_oz ILIKE $1 OR  participant_info_uz ILIKE $1 OR  participant_info_ru ILIKE $1 OR  participant_info_en ILIKE $1 OR participant_role_oz ILIKE $1 OR participant_role_uz ILIKE $1 OR participant_role_ru ILIKE $1 OR participant_role_en ILIKE $1)
      `, search_data)
   }

   SINGLE_PARTICIPANT(participant_id) {
      return this.fetch(`
         SELECT
                  participant_id AS id,
                  participant_name_oz AS name_oz,
                  participant_name_uz AS name_uz,
                  participant_name_ru AS name_ru,
                  participant_name_en AS name_en,
                  participant_role_oz AS role_oz,
                  participant_role_uz AS role_uz,
                  participant_role_ru AS role_ru,
                  participant_role_en AS role_en,
                  participant_info_oz AS info_oz,
                  participant_info_uz AS info_uz,
                  participant_info_ru AS info_ru,
                  participant_info_en AS info_en,
                  participant_photo AS photo,
                  participant_status AS status
         FROM
                  participant
         WHERE
                  participant_id = $1 AND participant_is_delete = false
      
      `, participant_id)
   }

   SELECTED_PARTICIPANT(participant_id) {
      return this.fetch(`
         SELECT
                  participant_photo,
                  participant_photo_name
         FROM
                  participant
         WHERE
                  participant_id = $1
      
      `, participant_id)
   }

   ADD_PARTICIPANT(name_oz, name_uz, name_ru, name_en, role_oz, role_uz, role_ru, role_en, info_oz, info_uz, info_ru, info_en, photo, photo_name, status) {
      return this.fetch(`
         INSERT INTO 
                        participant (
                           participant_name_oz,
                           participant_name_uz,
                           participant_name_ru,
                           participant_name_en,
                           participant_role_oz,
                           participant_role_uz,
                           participant_role_ru,
                           participant_role_en,
                           participant_info_oz,
                           participant_info_uz,
                           participant_info_ru,
                           participant_info_en,
                           participant_photo,
                           participant_photo_name,
                           participant_status
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
                           $15
                        )
      RETURNING *`, name_oz, name_uz, name_ru, name_en, role_oz, role_uz, role_ru, role_en, info_oz, info_uz, info_ru, info_en, photo, photo_name, status)
   }

   UPDATE_PARTICIPANT(id, name_oz, name_uz, name_ru, name_en, role_oz, role_uz, role_ru, role_en, info_oz, info_uz, info_ru, info_en, photo, photo_name, status) {
      return this.fetch(`
         UPDATE
                  participant
         SET
                  participant_name_oz = $2,
                  participant_name_uz = $3,
                  participant_name_ru = $4,
                  participant_name_en = $5,
                  participant_role_oz = $6,
                  participant_role_uz = $7,
                  participant_role_ru = $8,
                  participant_role_en = $9,
                  participant_info_oz = $10,
                  participant_info_uz = $11,
                  participant_info_ru = $12,
                  participant_info_en = $13,
                  participant_photo = $14,
                  participant_photo_name = $15,
                  participant_status = $16
         WHERE
                  participant_id = $1
      RETURNING *`, id, name_oz, name_uz, name_ru, name_en, role_oz, role_uz, role_ru, role_en, info_oz, info_uz, info_ru, info_en, photo, photo_name, status)
   }

   EDIT_PARTICIPANT(participant_id, participant_status) {
      return this.fetch(`
        UPDATE
                  participant
         SET
                  participant_status = $2
         WHERE
                  participant_id = $1
      RETURNING *`, participant_id, participant_status)
   }

   DELETE_PARTICIPANT(participant_id) {
      return this.fetch(`
      UPDATE
                  participant
         SET
                  participant_is_delete = true
                  participant_deleted_at = CURRENT_TIMESTAMP
         WHERE
                  participant_id = $1
      RETURNING *`, participant_id)
   }
}

module.exports = new Participant