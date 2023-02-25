const model = require('./model')

module.exports = {
   GET_SEARCH: async (req, res) => {
      try {
         const { type, search_data } = req.query
         
         let sendData = []
         if (search_data) {
            switch (type) {
               case 'shrine':
                  const foundShrine = await model.SEARCH_SHRINE(`%${search_data}%`, type);
                  foundShrine?.forEach(e => {
                     sendData.push({
                        id: e.id,
                        name: {
                           oz: e.name_oz,
                           uz: e.name_uz,
                           ru: e.name_ru,
                           en: e.name_en
                        },
                        title: {
                           oz: e.title_oz,
                           uz: e.title_uz,
                           ru: e.title_ru,
                           en: e.title_en
                        },
                        photo: e.photo,
                        region_id: e.region_id
                     })
                  })
                  break;
               case 'top':
                  const foundTopShrine = await model.SEARCH_TOP_SHRINE(`%${search_data}%`);
                  foundTopShrine?.forEach(e => {
                     sendData.push({
                        id: e.id,
                        name: {
                           oz: e.name_oz,
                           uz: e.name_uz,
                           ru: e.name_ru,
                           en: e.name_en
                        },
                        title: {
                           oz: e.title_oz,
                           uz: e.title_uz,
                           ru: e.title_ru,
                           en: e.title_en
                        },
                        photo: e.photo,
                        region_id: e.region_id
                     })
                  })
                  break;
               case 'mosque':
                  const foundMosque = await model.SEARCH_OBJECT(`%${search_data}%`, type)
                  foundMosque?.forEach(e => {
                     sendData.push({
                        id: e.id,
                        name: {
                           oz: e.name_oz,
                           uz: e.name_uz,
                           ru: e.name_ru,
                           en: e.name_en
                        },
                        title: {
                           oz: e.title_oz,
                           uz: e.title_uz,
                           ru: e.title_ru,
                           en: e.title_en
                        },
                        photo: e.photo,
                        region_id: e.region_id,
                        shrine_id: e.shrine_id
                     })
                  })
                  break;
               case 'theater':
                  const foundTheater = await model.SEARCH_OBJECT(`%${search_data}%`, type)
                  foundTheater?.forEach(e => {
                     sendData.push({
                        id: e.id,
                        name: {
                           oz: e.name_oz,
                           uz: e.name_uz,
                           ru: e.name_ru,
                           en: e.name_en
                        },
                        title: {
                           oz: e.title_oz,
                           uz: e.title_uz,
                           ru: e.title_ru,
                           en: e.title_en
                        },
                        photo: e.photo,
                        region_id: e.region_id,
                        shrine_id: e.shrine_id
                     })
                  })
                  break;
               case 'museum':
                  const foundMuseum = await model.SEARCH_OBJECT(`%${search_data}%`, type)
                  foundMuseum?.forEach(e => {
                     sendData.push({
                        id: e.id,
                        name: {
                           oz: e.name_oz,
                           uz: e.name_uz,
                           ru: e.name_ru,
                           en: e.name_en
                        },
                        title: {
                           oz: e.title_oz,
                           uz: e.title_uz,
                           ru: e.title_ru,
                           en: e.title_en
                        },
                        photo: e.photo,
                        region_id: e.region_id,
                        shrine_id: e.shrine_id
                     })
                  })
                  break;
               case 'church':
                  const foundChurch = await model.SEARCH_SHRINE(`%${search_data}%`, type)
                  foundChurch?.forEach(e => {
                     sendData.push({
                        id: e.id,
                        name: {
                           oz: e.name_oz,
                           uz: e.name_uz,
                           ru: e.name_ru,
                           en: e.name_en
                        },
                        title: {
                           oz: e.title_oz,
                           uz: e.title_uz,
                           ru: e.title_ru,
                           en: e.title_en
                        },
                        photo: e.photo,
                        region_id: e.region_id
                     })
                  })
                  break;
               default: sendData = null;
                  break;
            }
         }
         else {
            switch (type) {
               case 'shrine':
                  const foundShrine = await model.ALL_SHRINE(type);
                  foundShrine?.forEach(e => {
                     sendData.push({
                        id: e.id,
                        name: {
                           oz: e.name_oz,
                           uz: e.name_uz,
                           ru: e.name_ru,
                           en: e.name_en
                        },
                        title: {
                           oz: e.title_oz,
                           uz: e.title_uz,
                           ru: e.title_ru,
                           en: e.title_en
                        },
                        photo: e.photo,
                        region_id: e.region_id
                     })
                  })
                  break;
               case 'top':
                  const foundTopShrine = await model.TOP_SHRINE();
                  foundTopShrine?.forEach(e => {
                     sendData.push({
                        id: e.id,
                        name: {
                           oz: e.name_oz,
                           uz: e.name_uz,
                           ru: e.name_ru,
                           en: e.name_en
                        },
                        title: {
                           oz: e.title_oz,
                           uz: e.title_uz,
                           ru: e.title_ru,
                           en: e.title_en
                        },
                        photo: e.photo,
                        region_id: e.region_id
                     })
                  })
                  break;
               case 'mosque':
                  const foundMosque = await model.ALL_OBJECT(type)
                  foundMosque?.forEach(e => {
                     sendData.push({
                        id: e.id,
                        name: {
                           oz: e.name_oz,
                           uz: e.name_uz,
                           ru: e.name_ru,
                           en: e.name_en
                        },
                        title: {
                           oz: e.title_oz,
                           uz: e.title_uz,
                           ru: e.title_ru,
                           en: e.title_en
                        },
                        photo: e.photo,
                        region_id: e.region_id,
                        shrine_id: e.shrine_id
                     })
                  })
                  break;
               case 'theater':
                  const foundTheater = await model.ALL_OBJECT(type)
                  foundTheater?.forEach(e => {
                     sendData.push({
                        id: e.id,
                        name: {
                           oz: e.name_oz,
                           uz: e.name_uz,
                           ru: e.name_ru,
                           en: e.name_en
                        },
                        title: {
                           oz: e.title_oz,
                           uz: e.title_uz,
                           ru: e.title_ru,
                           en: e.title_en
                        },
                        photo: e.photo,
                        region_id: e.region_id,
                        shrine_id: e.shrine_id
                     })
                  })
                  break;
               case 'museum':
                  const foundMuseum = await model.ALL_OBJECT(type)
                  foundMuseum?.forEach(e => {
                     sendData.push({
                        id: e.id,
                        name: {
                           oz: e.name_oz,
                           uz: e.name_uz,
                           ru: e.name_ru,
                           en: e.name_en
                        },
                        title: {
                           oz: e.title_oz,
                           uz: e.title_uz,
                           ru: e.title_ru,
                           en: e.title_en
                        },
                        photo: e.photo,
                        region_id: e.region_id,
                        shrine_id: e.shrine_id
                     })
                  })
                  break;
               case 'church':
                  const foundChurch = await model.ALL_SHRINE(type)
                  foundChurch?.forEach(e => {
                     sendData.push({
                        id: e.id,
                        name: {
                           oz: e.name_oz,
                           uz: e.name_uz,
                           ru: e.name_ru,
                           en: e.name_en
                        },
                        title: {
                           oz: e.title_oz,
                           uz: e.title_uz,
                           ru: e.title_ru,
                           en: e.title_en
                        },
                        photo: e.photo,
                        region_id: e.region_id
                     })
                  })
                  break;
               default: sendData = null;
                  break;
            }
         }
         if (sendData) {
            res.json({
               status: 200,
               data: sendData
            })
         }
         else {
            res.statusCode = 404
            res.json({
               status: 404,
               data: sendData
            })
         }
      } catch (err) {
         res.statusCode = 500
         res.json({
            status: 500,
            message: err.message
         })
      }
   }
}