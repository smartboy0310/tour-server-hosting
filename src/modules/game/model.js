const PG = require('../../lib/postgress/postgress')

class Games extends PG {
   ALL_GAMES(page, limit) {
      return this.fetchAll(`
         SELECT 
                  game_id AS id,
                  game_name AS name,
                  game_title AS title,
                  game_info AS info,
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
                  game_name AS name,
                  game_title AS title,
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
                  game_name AS name,
                  game_title AS title,
                  game_info AS info,
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
                  game_name AS name,
                  game_title AS title,
                  game_info AS info,
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
                  game_name AS name,
                  game_title AS title,
                  game_info AS info,
                  game_video AS video,
                  game_photo AS photo,
                  game_type AS type,
                  game_status AS status,
                  region_id   
         FROM 
                  games
         WHERE
                  game_is_delete = false AND (game_name ->> 'oz' ILIKE $1 OR game_name ->> 'uz' ILIKE $1 OR game_name ->> 'ru' ILIKE $1 OR game_name ->> 'en' ILIKE $1 OR game_info ->> 'oz' ILIKE $1 OR game_info ->> 'uz' ILIKE $1 OR game_info ->> 'ru' ILIKE $1 OR game_info ->> 'en' ILIKE $1)
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
               game_is_delete = false AND (game_name ->> 'oz' ILIKE $1 OR game_name ->> 'uz' ILIKE $1 OR game_name ->> 'ru' ILIKE $1 OR game_name ->> 'en' ILIKE $1 OR game_info ->> 'oz' ILIKE $1 OR game_info ->> 'uz' ILIKE $1 OR game_info ->> 'ru' ILIKE $1 OR game_info ->> 'en' ILIKE $1)
      `, search_data)
   }

   SINGLE_GAME(game_id) {
      return this.fetch(`
         SELECT
                  game_id AS id,
                  game_name AS name,
                  game_title AS title,
                  game_info AS info,
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

   ADD_GAME (name, title, info, video, video_name, photo, photo_name, type, status, region_id) {
      return this.fetch(`
         INSERT INTO
                     games (
                        game_name,
                        game_title,
                        game_info,
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
                        $10
                  )          
      RETURNING *`, name, title, info, video, video_name, photo, photo_name, type, status, region_id)
   }

   UPDATE_GAME(id, name, title, info, video, video_name, photo, photo_name, type, status, region_id) {
      return this.fetch(`
            UPDATE
                     games
            SET
                     game_name = $2,
                     game_title = $3,
                     game_info = $4,
                     game_video = $5,
                     game_video_name = $6,
                     game_photo = $7,
                     game_photo_name = $8,
                     game_type = $9,
                     game_status = $10,
                     region_id = $11
            WHERE
                     game_id = $1
      RETURNING *`, id, name, title, info, video, video_name, photo, photo_name, type, status, region_id)
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