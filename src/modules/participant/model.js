const PG = require('../../lib/postgress/postgress')

class Participant extends PG {
   ALL_PARTICIPANT(page, limit) {
      return this.fetchAll(`
         SELECT
                  participant_id AS id,
                  participant_name AS name,
                  participant_role AS role,
                  participant_info AS info,
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

   SEARCH_PARTICIPANT(search_data, page, limit) {
      return this.fetchAll(`
         SELECT
                  participant_id AS id,
                  participant_name AS name,
                  participant_role AS role,
                  participant_info AS info,
                  participant_photo AS photo,
                  participant_status AS status
         FROM
                  participant
         WHERE
                  participant_is_delete = false AND ( participant_name ->> 'oz' ILIKE $1 OR participant_name ->> 'uz' ILIKE $1 OR participant_name ->> 'ru' ILIKE $1 OR participant_name ->> 'en' ILIKE $1 OR participant_info ->> 'oz' ILIKE $1 OR  participant_info ->> 'uz' ILIKE $1 OR  participant_info ->> 'ru' ILIKE $1 OR  participant_info ->> 'en' ILIKE $1 OR participant_role ->> 'oz' ILIKE $1 OR participant_role ->> 'uz' ILIKE $1 OR participant_role ->> 'ru' ILIKE $1 OR participant_role ->> 'en' ILIKE $1)
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
               participant_is_delete = false AND (participant_name ->> 'oz' ILIKE $1 OR participant_name ->> 'uz' ILIKE $1 OR participant_name ->> 'ru' ILIKE $1 OR participant_name ->> 'en' ILIKE $1 OR participant_info ->> 'oz' ILIKE $1 OR  participant_info ->> 'uz' ILIKE $1 OR  participant_info ->> 'ru' ILIKE $1 OR  participant_info ->> 'en' ILIKE $1 OR participant_role ->> 'oz' ILIKE $1 OR participant_role ->> 'uz' ILIKE $1 OR participant_role ->> 'ru' ILIKE $1 OR participant_role ->> 'en' ILIKE $1)
      `, search_data)
   }

   SINGLE_PARTICIPANT(participant_id) {
      return this.fetch(`
         SELECT
                  participant_id AS id,
                  participant_name AS name,
                  participant_role AS role,
                  participant_info AS info,
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

   ADD_PARTICIPANT(participant_name, participant_role, participant_info, participant_photo, participant_photo_name, participant_status) {
      return this.fetch(`
         INSERT INTO 
                        participant (
                           participant_name,
                           participant_role,
                           participant_info,
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
                           $6
                        )
      RETURNING *`, participant_name, participant_role, participant_info, participant_photo, participant_photo_name, participant_status)
   }

   UPDATE_PARTICIPANT(participant_id, participant_name, participant_role, participant_info, participant_photo, participant_photo_name, participant_status) {
      return this.fetch(`
         UPDATE
                  participant
         SET
                  participant_name = $2,
                  participant_role = $3,
                  participant_info = $4,
                  participant_photo = $5,
                  participant_photo_name = $6,
                  participant_status = $7
         WHERE
                  participant_id = $1
      RETURNING *`, participant_id, participant_name, participant_role, participant_info, participant_photo, participant_photo_name, participant_status)
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