const PG = require('../../lib/postgress/postgress')

class Statistics extends PG {
   STATISTIC_SHRINE () {
      return this.fetch(`
      SELECT 
               COUNT(*) 
      FROM
               shrines
      WHERE 
               shrine_is_delete = false AND shrine_status = true
      `)
   }

   STATISTIC_REGION () {
      return this.fetch(`
      SELECT 
               COUNT(*) 
      FROM
               regions
      WHERE 
               region_is_delete = false AND region_status = true
      `)
   }

   STATISTIC_OBJECT () {
      return this.fetch(`
      SELECT 
               COUNT(*) 
      FROM
               special_object
      WHERE 
               object_is_delete = false AND object_status = true
      `)
   }
}

module.exports = new Statistics