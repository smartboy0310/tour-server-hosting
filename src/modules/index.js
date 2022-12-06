const express = require("express")
const router = express.Router()
const FileUpload = require('../middleware/multer')
const Authorized = require('../middleware/authorized')

const Admin = require('./admin/admin')
const Region = require('./region/region')
const Shrine = require('./shrine/shrine')
const Game = require('./game/game')
const Food = require('./food/food')
const Essential = require('./essential/essential')
const About = require('./about/about')
const Leader = require('./leader/leader')
const Participant = require('./participant/participant')
const General = require('./general/general')
const HomeSlider = require('./homeSlider/homeSlider')
const Statistics = require('./statistics/statistics')
const Searchs = require('./searchs/searchs')
const SpecialObject = require('./specialObject/specialObject')

router
      .post('/login', Admin.LOGIN)
      .post('/check_token', Admin.POST_AUTH)
      .put('/login', Authorized.AUTH, Admin.PUT_PASS)

      .get('/region', Region.GET)
      .get('/region/:search_data', Region.GET)
      .get('/region/single/:id', Authorized.AUTH, Region.GET_SINGLE)
      .get('/referens/region', Authorized.AUTH, Region.GET_REF)
      .post('/region', Authorized.AUTH, FileUpload.array('photo'), Region.POST)
      .put('/region', Authorized.AUTH, FileUpload.array('photo'), Region.PUT)
      .put('/statusRegion', Authorized.AUTH, Region.EDIT_STATUS)
      .delete('/region', Authorized.AUTH, Region.DELETE)

      .get('/shrine', Shrine.GET)
      .get('/shrine/single/:id', Authorized.AUTH, Shrine.GET_SINGLE)
      .get('/referens/shrine/:reg_id', Authorized.AUTH, Shrine.GET_REF)
      .post('/shrine', Authorized.AUTH, FileUpload.fields([
            {
                  name: 'photo', maxCount: 10
            },
            {
                  name: 'audiooz', maxCount: 1
            },
            {
                  name: 'audioru', maxCount: 1
            },
            {
                  name: 'audioen', maxCount: 1
            }
      ]), Shrine.POST)
      .put('/shrine', Authorized.AUTH, FileUpload.fields([
            {
                  name: 'photo', maxCount: 10
            },
            {
                  name: 'audiooz', maxCount: 1
            },
            {
                  name: 'audioru', maxCount: 1
            },
            {
                  name: 'audioen', maxCount: 1
            }
      ]), Shrine.PUT)
      .put('/statusShrine', Authorized.AUTH, Shrine.EDIT_STATUS)
      .delete('/shrine', Authorized.AUTH, Shrine.DELETE)

      .get('/game', Game.GET)
      .get('/game/single/:id', Authorized.AUTH, Game.GET_SINGLE)
      .post('/game', Authorized.AUTH, FileUpload.array('photo'), Game.POST)
      .put('/game', Authorized.AUTH, FileUpload.array('photo'), Game.PUT)
      .put('/statusGame', Authorized.AUTH, Game.EDIT_STATUS)
      .delete('/game', Authorized.AUTH, Game.DELETE)

      .get('/food', Food.GET)
      .get('/food/single/:id', Authorized.AUTH, Food.GET_SINGLE)
      .post('/food', Authorized.AUTH, FileUpload.array('media'), Food.POST)
      .put('/food', Authorized.AUTH, FileUpload.array('media'), Food.PUT)
      .put('/statusFood', Authorized.AUTH, Food.EDIT_STATUS)
      .delete('/food', Authorized.AUTH, Food.DELETE)

      .get('/essential', Essential.GET)
      .get('/essential/:search_data', Essential.GET)
      .get('/essential/single/:id', Authorized.AUTH, Essential.GET_SINGLE)
      .post('/essential', Authorized.AUTH, FileUpload.single('media'), Essential.POST)
      .put('/essential', Authorized.AUTH, FileUpload.single('media'), Essential.PUT)
      .put('/statusEssential', Authorized.AUTH, Essential.EDIT_STATUS)
      .delete('/essential', Authorized.AUTH, Essential.DELETE)

      .get('/about', About.GET)
      .put('/about', Authorized.AUTH, About.PUT)
      .put('/statusAbout', Authorized.AUTH, About.EDIT_STATUS)

      .get('/leader', Leader.GET)
      .get('/leader/single/:id', Authorized.AUTH, Leader.GET_SINGLE)
      .post('/leader', Authorized.AUTH, FileUpload.single('media'), Leader.POST)
      .put('/leader', Authorized.AUTH, FileUpload.single('media'), Leader.PUT)
      .put('/statusLeader', Authorized.AUTH, Leader.EDIT_STATUS)
      .delete('/leader', Authorized.AUTH, Leader.DELETE)

      .get('/participant', Participant.GET)
      .get('/participant/single/:id', Authorized.AUTH, Participant.GET_SINGLE)
      .post('/participant', Authorized.AUTH, FileUpload.single('media'), Participant.POST)
      .put('/participant', Authorized.AUTH, FileUpload.single('media'), Participant.PUT)
      .put('/statusParticipant', Authorized.AUTH, Participant.EDIT_STATUS)
      .delete('/participant', Authorized.AUTH, Participant.DELETE)

      .get('/objects/:type', SpecialObject.GET)
      .get('/objects/:type/single/:id', Authorized.AUTH, SpecialObject.GET_SINGLE)
      .post('/objects/:type', Authorized.AUTH, FileUpload.array('media'), SpecialObject.POST)
      .put('/objects/:type', Authorized.AUTH, FileUpload.array('media'), SpecialObject.PUT)
      .put('/objects/status/:type', Authorized.AUTH, SpecialObject.EDIT_STATUS)
      .delete('/objects/:type', Authorized.AUTH, SpecialObject.DELETE)

      .get('/general', General.GET)
      .put('/general', Authorized.AUTH, FileUpload.array('media'), General.PUT)

      .get('/homeslider', HomeSlider.GET)
      .get('/homeslider/single/:id', Authorized.AUTH, HomeSlider.GET_SINGLE)
      .post('/homeslider', Authorized.AUTH, FileUpload.single('media'), HomeSlider.POST)
      .put('/homeslider', Authorized.AUTH, FileUpload.single('media'), HomeSlider.PUT)
      .put('/statusHomeslider', Authorized.AUTH, HomeSlider.EDIT_STATUS)
      .delete('/homeslider', Authorized.AUTH, HomeSlider.DELETE)

      .get('/activeRegion', Region.GET_ACTIVE)
      .get('/activeRegion/single/:id', Region.GET_ACTIVE_SINGLE)

      .get('/activeFood', Food.GET_ACTIVE)
      .get('/activeFood/single/:id', Food.GET_ACTIVE_SINGLE)

      .get('/activeGame', Game.GET_ACTIVE)
      .get('/gameByRegion/:reg_id', Game.GET_BY_REGION)
      .get('/activeGame/single/:id', Game.GET_ACTIVE_SINGLE)

      .get('/activeSlider', HomeSlider.GET_ACTIVE)

      .get('/general', General.GET)

      .get('/topShrine', Shrine.GET_TOP)
      .get('/activeShrine/:reg_id', Shrine.GET_ACTIVE)
      .get('/activeShrine/single/:id', Shrine.GET_ACTIVE_SINGLE)

      .get('/activeObjects/:type/:region_id', SpecialObject.GET_BY_REGION)
      .get('/activeObjects/:type', SpecialObject.GET_BY_SHRINE)
      .get('/activeObjects/:type/single/:id', SpecialObject.GET_ACTIVE_SINGLE)
     
      .get('/statistics', Statistics.GET)
      .get('/search', Searchs.GET_SEARCH)

      

module.exports = router