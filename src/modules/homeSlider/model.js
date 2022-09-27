const PG = require('../../lib/postgress/postgress')

class HomeSlider extends PG {
   ALL_SLIDER() {
      return this.fetchAll(`
         SELECT
               slide_id AS id, 
               slide_title_oz AS title_oz,
               slide_title_uz AS title_uz,
               slide_title_ru AS title_ru,
               slide_title_en AS title_en,
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
               slide_title_oz AS title_oz,
               slide_title_uz AS title_uz,
               slide_title_ru AS title_ru,
               slide_title_en AS title_en,
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
               slide_title_oz AS title_oz,
               slide_title_uz AS title_uz,
               slide_title_ru AS title_ru,
               slide_title_en AS title_en,
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

   ADD_SLIDER( title_oz, title_uz, title_ru, title_en, photo, photo_name, status) {
      return this.fetch(`
         INSERT INTO 
                     homeslider(
                        slide_title_oz,
                        slide_title_uz,
                        slide_title_ru,
                        slide_title_en,
                        slide_photo, 
                        slide_photo_name, 
                        slide_status
                     )
         VALUES      (
                        $1,
                        $2,
                        $3,
                        $4,
                        $5,
                        $6,
                        $7
                     )
      RETURNING *`, title_oz, title_uz, title_ru, title_en, photo, photo_name, status)
   }

   UPDATE_SLIDER( id, title_oz, title_uz, title_ru, title_en, photo, photo_name, status) {
      return this.fetch (`
         UPDATE
                  homeslider
         SET   
                  slide_title_oz = $2,
                  slide_title_uz = $3,
                  slide_title_ru = $4,
                  slide_title_en = $5, 
                  slide_photo = $6, 
                  slide_photo_name = $7, 
                  slide_status = $8
         WHERE
                  slide_id = $1
      RETURNING *`, id, title_oz, title_uz, title_ru, title_en, photo, photo_name, status)
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