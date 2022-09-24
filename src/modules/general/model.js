const PG = require('../../lib/postgress/postgress')

class General extends PG {
   GENERAL() {
      return this.fetch(`
         SELECT
                  home_video AS video,
                  telegram_link AS telegram,
                  facebook_link AS facebook,
                  instagram_link AS instagram
         FROM
               general
      `)
   } 
   
   GENERAL_FOUND() {
      return this.fetch(`
         SELECT
                  home_video AS video,
                  home_video_name AS video_name
         FROM
               general
      `)
   }  

   UPDATE_GERERAL(home_video, home_video_name, telegram_link, facebook_link, instagram_link) {
      return this.fetch(`
      
         UPDATE
                  general
         SET
               home_video = $1,
               home_video_name = $2,
               telegram_link = $3,
               facebook_link = $4,
               instagram_link = $5
               
      RETURNING *`, home_video, home_video_name, telegram_link, facebook_link, instagram_link)

   }
}

module.exports = new General