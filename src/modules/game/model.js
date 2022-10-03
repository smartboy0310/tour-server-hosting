const PG = require('../../lib/postgress/postgress')

class Games extends PG {
   ALL_GAMES(page, limit) {
      return this.fetchAll(`
         SELECT 
                  game_id AS id,
                  game_name_oz AS name_oz,
                  game_name_uz AS name_uz,
                  game_name_ru AS name_ru,
                  game_name_en AS name_en,
                  game_title_oz AS title_oz,
                  game_title_uz AS title_uz,
                  game_title_ru AS title_ru,
                  game_title_en AS title_en,
                  game_info_oz AS info_oz,
                  game_info_uz AS info_uz,
                  game_info_ru AS info_ru,
                  game_info_en AS info_en,
                  game_video AS video,
                  game_photo AS photo,
                  game_type AS type,            
                  game_status AS status,
                  region_id  
         FROM 
                  games
         WHERE
                  game_is_delete = false
         ORDER BY
                  game_id  DESC
         OFFSET $1 LIMIT $2
      `, (page-1)*limit, limit)
   }

   ALL_ACTIVE_GAMES() {
      return this.fetchAll(`
         SELECT 
                  game_id AS id,
                  game_name_oz AS name_oz,
                  game_name_uz AS name_uz,
                  game_name_ru AS name_ru,
                  game_name_en AS name_en,
                  game_title_oz AS title_oz,
                  game_title_uz AS title_uz,
                  game_title_ru AS title_ru,
                  game_title_en AS title_en,
                  game_photo AS photo
         FROM 
                  games
         WHERE
                  game_is_delete = false AND game_status = true
         ORDER BY
                  game_id  DESC
      `)
   }

   SINGLE_ACTIVE_GAME(game_id) {
      return this.fetch(`
         SELECT
                  game_id AS id,
                  game_name_oz AS name_oz,
                  game_name_uz AS name_uz,
                  game_name_ru AS name_ru,
                  game_name_en AS name_en,
                  game_title_oz AS title_oz,
                  game_title_uz AS title_uz,
                  game_title_ru AS title_ru,
                  game_title_en AS title_en,
                  game_info_oz AS info_oz,
                  game_info_uz AS info_uz,
                  game_info_ru AS info_ru,
                  game_info_en AS info_en,
                  game_video AS video,
                  game_photo AS photo  
         FROM
                  games
         WHERE
                  game_id = $1 AND game_is_delete = false AND game_status = true
      `, game_id)
   }

   GAME_BY_REGION(reg_id) {
      return this.fetchAll(`
         SELECT
                  game_id AS id,
                  game_name_oz AS name_oz,
                  game_name_uz AS name_uz,
                  game_name_ru AS name_ru,
                  game_name_en AS name_en,
                  game_title_oz AS title_oz,
                  game_title_uz AS title_uz,
                  game_title_ru AS title_ru,
                  game_title_en AS title_en,
                  game_info_oz AS info_oz,
                  game_info_uz AS info_uz,
                  game_info_ru AS info_ru,
                  game_info_en AS info_en,
                  game_video AS video,
                  game_photo AS photo  
         FROM
                  games
         WHERE
                  region_id = $1 AND game_is_delete = false AND game_status = true
      `, reg_id)
   }

   SEARCH_GAMES(search_data, page, limit) {
      return this.fetchAll(`
         SELECT 
                  game_id AS id,
                  game_name_oz AS name_oz,
                  game_name_uz AS name_uz,
                  game_name_ru AS name_ru,
                  game_name_en AS name_en,
                  game_title_oz AS title_oz,
                  game_title_uz AS title_uz,
                  game_title_ru AS title_ru,
                  game_title_en AS title_en,
                  game_info_oz AS info_oz,
                  game_info_uz AS info_uz,
                  game_info_ru AS info_ru,
                  game_info_en AS info_en,
                  game_video AS video,
                  game_photo AS photo,
                  game_type AS type,                 
                  game_status AS status,
                  region_id   
         FROM 
                  games
         WHERE
                  game_is_delete = false AND (game_name_oz ILIKE $1 OR game_name_uz ILIKE $1 OR game_name_ru ILIKE $1 OR game_name_en ILIKE $1 OR game_info_oz ILIKE $1 OR game_info_uz ILIKE $1 OR game_info_ru ILIKE $1 OR game_info_en ILIKE $1 OR game_title_oz ILIKE $1 OR game_title_uz ILIKE $1 OR game_title_ru ILIKE $1 OR game_title_en ILIKE $1)
         ORDER BY
                  game_id  DESC
         OFFSET $2 LIMIT $3
      `, search_data, (page-1)*limit, limit)
   }

   COUNT_GAMES() {
      return this.fetch(`
         SELECT 
               COUNT(*) 
         FROM
               games
         WHERE 
               game_is_delete = false
      `)
   }

   COUNT_GAMES_SEARCH(search_data) {
      return this.fetch(`
         SELECT 
               COUNT(*) 
         FROM
               games
         WHERE 
               game_is_delete = false AND (game_name_oz ILIKE $1 OR game_name_uz ILIKE $1 OR game_name_ru ILIKE $1 OR game_name_en ILIKE $1 OR game_info_oz ILIKE $1 OR game_info_uz ILIKE $1 OR game_info_ru ILIKE $1 OR game_info_en ILIKE $1 OR game_title_oz ILIKE $1 OR game_title_uz ILIKE $1 OR game_title_ru ILIKE $1 OR game_title_en ILIKE $1)
      `, search_data)
   }

   SINGLE_GAME(game_id) {
      return this.fetch(`
         SELECT
                  game_id AS id,
                  game_name_oz AS name_oz,
                  game_name_uz AS name_uz,
                  game_name_ru AS name_ru,
                  game_name_en AS name_en,
                  game_title_oz AS title_oz,
                  game_title_uz AS title_uz,
                  game_title_ru AS title_ru,
                  game_title_en AS title_en,
                  game_info_oz AS info_oz,
                  game_info_uz AS info_uz,
                  game_info_ru AS info_ru,
                  game_info_en AS info_en,
                  game_video AS video,
                  game_photo AS photo,
                  game_type AS type,
                  game_status AS status,
                  region_id  
         FROM
                  games
         WHERE
                  game_id = $1 AND game_is_delete = false
      `, game_id)
   }

   SELECTED_GAME(game_id) {
      return this.fetch(`
         SELECT
                  game_video, 
                  game_video_name,
                  game_photo, 
                  game_photo_name  
         FROM
                  games
         WHERE
                  game_id = $1
      `, game_id)
   }

   ADD_GAME (name_oz, name_uz, name_ru, name_en, title_oz, title_uz, title_ru, title_en, info_oz, info_uz, info_ru, info_en, video, video_name, photo, photo_name, type, status, region_id) {
      return this.fetch(`
         INSERT INTO
                     games (
                        game_name_oz,
                        game_name_uz,
                        game_name_ru,
                        game_name_en,
                        game_title_oz,
                        game_title_uz,
                        game_title_ru,
                        game_title_en,
                        game_info_oz,
                        game_info_uz,
                        game_info_ru,
                        game_info_en,
                        game_video,
                        game_video_name,
                        game_photo,
                        game_photo_name,
                        game_type,                        
                        game_status,
                        region_id
                     )
         VALUES     (
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
                        $19
                  )          
      RETURNING *`, name_oz, name_uz, name_ru, name_en, title_oz, title_uz, title_ru, title_en, info_oz, info_uz, info_ru, info_en, video, video_name, photo, photo_name, type, status, region_id)
   }

   UPDATE_GAME(id, name_oz, name_uz, name_ru, name_en, title_oz, title_uz, title_ru, title_en, info_oz, info_uz, info_ru, info_en, video, video_name, photo, photo_name, type, status, region_id) {
      return this.fetch(`
            UPDATE
                     games
            SET
                     game_name_oz = $2,
                     game_name_uz = $3,
                     game_name_ru = $4,
                     game_name_en = $5,
                     game_title_oz = $6,
                     game_title_uz = $7,
                     game_title_ru = $8,
                     game_title_en = $9,
                     game_info_oz = $10,
                     game_info_uz = $11,
                     game_info_ru = $12,
                     game_info_en = $13,
                     game_video = $14,
                     game_video_name = $15,
                     game_photo = $16,
                     game_photo_name = $17,
                     game_type = $18,               
                     game_status = $19,
                     region_id = $20
            WHERE
                     game_id = $1
      RETURNING *`, id, name_oz, name_uz, name_ru, name_en, title_oz, title_uz, title_ru, title_en, info_oz, info_uz, info_ru, info_en, video, video_name, photo, photo_name, type, status, region_id)
   }

   EDIT_GAME(game_id, game_status) {
      return this.fetch(`
         UPDATE
                  games
         SET
                  game_status = $2
         WHERE
                  game_id = $1
      RETURNING *`, game_id, game_status)
   }

   DELETE_GAME(game_id) {
      return this.fetch(`
         UPDATE
                  games
         SET
                  game_is_delete = true,
                  game_deleted_at = CURRENT_TIMESTAMP
         WHERE
                  game_id = $1
      RETURNING *`, game_id)
   }
} 

module.exports = new Games