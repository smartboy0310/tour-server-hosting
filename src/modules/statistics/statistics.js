const model = require('./model')

module.exports = {
   GET: async (_, res) => {
     try {
         const dataRegion = await model.STATISTIC_REGION()
         const dataShrine = await model.STATISTIC_SHRINE()
         const dataObject = await model.STATISTIC_OBJECT()

      res.json({
         status: 200,
         totalActiceRegion: parseInt(dataRegion?.count),
         totalActiceShrine: parseInt(dataShrine?.count),
         totalActiceObject: parseInt(dataObject?.count)
      })
      
     } catch (err) {
      res.statusCode = 500
      res.json({
         status: 500,
         message: err.message
      })
     }
   }
}