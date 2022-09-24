const PG = require('../../lib/postgress/postgress')

class HomeSlider extends PG {
   ALL_SLIDER() {
      return this.fetchAll(`
         SELECT
               slide_id AS id, 
               slide_title AS title,
               slide_photo AS photo,
               slide_status AS status
         FROM
               homeslider
         WHERE
               slide_is_delete = false
      `)
   }
   SINGLE_SLIDER(slide_id) {
      return this.fetch(`
         SELECT
               slide_id AS id, 
               slide_title AS title,
               slide_photo AS photo,
               slide_status AS status
         FROM
               homeslider
         WHERE
               slide_id = $1 and slide_is_delete = false
      `, slide_id)
   }

   ALL_ACTIVE_SLIDER() {
      return this.fetchAll(`
         SELECT
               slide_id AS id, 
               slide_title AS title,
               slide_photo AS photo
         FROM
               homeslider
         WHERE
               slide_is_delete = false AND slide_status = true
      `)
   }

   SELECTED_SLIDER(slide_id) {
      return this.fetch(`
         SELECT 
               slide_photo AS photo,
               slide_photo_name AS photo_name
         FROM
               homeslider
         WHERE
               slide_id = $1
      `, slide_id)
   }

   ADD_SLIDER( title, photo, photo_name, status) {
      return this.fetch(`
         INSERT INTO 
                     homeslider(
                        slide_title, 
                        slide_photo, 
                        slide_photo_name, 
                        slide_status
                     )
         VALUES      (
                        $1,
                        $2,
                        $3,
                        $4
                     )
      RETURNING *`, title, photo, photo_name, status)
   }

   UPDATE_SLIDER( id, title, photo, photo_name, status ) {
      return this.fetch (`
         UPDATE
                  homeslider
         SET   
                  slide_title = $2, 
                  slide_photo = $3, 
                  slide_photo_name = $4, 
                  slide_status = $5
         WHERE
                  slide_id = $1
      RETURNING *`, id, title, photo, photo_name, status)
   }

   EDIT_SLIDER(slide_id, slide_status) {
      return this.fetch(`
         UPDATE
                  homeslider
         SET
                  slide_status = $2
         WHERE
                  slide_id = $1
      RETURNING *`, slide_id, slide_status)
   }

   DELETE_SLIDER(slide_id) {
      return this.fetch(`
         UPDATE
                  homeslider
         SET
                  slide_is_delete = true,
                  slide_deleted_at = CURRENT_TIMESTAMP
         WHERE
                  slide_id = $1
      RETURNING *`, slide_id)
   }
}

module.exports = new HomeSlider