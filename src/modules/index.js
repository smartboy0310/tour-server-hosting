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
const Theater = require('./theater/theater')
const Restaurant = require('./restaurant/restaurant')
const Park = require('./park/park')
const Mosque = require('./mosque/mosque')
const Hotel = require('./hotel/hotel')
const Airport = require('./airport/airport')
const Train = require('./train/train')
const Clinic = require('./clinic/clinic')
const Market = require('./market/market')
const Museum = require('./museum/museum')
const Bank = require('./bank/bank')
const General = require('./general/general')
const Homeslider = require('./homeSlider/homeSlider')
const Statistics = require('./statistics/statistics')

router
      .post('/login', Admin.LOGIN)
      .post('/check_token', Admin.POST_AUTH)
      .put('/login', Authorized.AUTH, Admin.PUT_PASS)

      .get('/region', Region.GET)
      .get('/region/:search_data', Region.GET)
      .get('/region/single/:id', Authorized.AUTH, Region.GET_SINGLE)
      .get('/referens/region', Authorized.AUTH, Region.GET_REF)
      .post('/region', Authorized.AUTH, FileUpload.fields([
            {
                  name: 'photo', maxCount: 10
            },
            {
                  name: 'video', maxCount: 1
            }
      ]), Region.POST)
      .put('/region', Authorized.AUTH, FileUpload.fields([
            {
                  name: 'photo', maxCount: 10
            },
            {
                  name: 'video', maxCount: 1
            }
      ]), Region.PUT)
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
                  name: 'video', maxCount: 1
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
                  name: 'video', maxCount: 1
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
      .post('/game', Authorized.AUTH, FileUpload.fields([
            {
                  name: 'photo', maxCount: 10
            },
            {
                  name: 'video', maxCount: 1
            }
      ]), Game.POST)
      .put('/game', Authorized.AUTH, FileUpload.fields([
            {
                  name: 'photo', maxCount: 10
            },
            {
                  name: 'video', maxCount: 1
            }
      ]), Game.PUT)
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

      .get('/theater', Theater.GET)
      .get('/theater/single/:id', Authorized.AUTH, Theater.GET_SINGLE)
      .post('/theater', Authorized.AUTH, FileUpload.array('media'), Theater.POST)
      .put('/theater', Authorized.AUTH, FileUpload.array('media'), Theater.PUT)
      .put('/statusTheater', Authorized.AUTH, Theater.EDIT_STATUS)
      .delete('/theater', Authorized.AUTH, Theater.DELETE)

      .get('/restaurant', Restaurant.GET)
      .get('/restaurant/single/:id', Authorized.AUTH, Restaurant.GET_SINGLE)
      .post('/restaurant', Authorized.AUTH, FileUpload.array('media'), Restaurant.POST)
      .put('/restaurant', Authorized.AUTH, FileUpload.array('media'), Restaurant.PUT)
      .put('/statusRestaurant', Authorized.AUTH, Restaurant.EDIT_STATUS)
      .delete('/restaurant', Authorized.AUTH, Restaurant.DELETE)

      .get('/park', Park.GET)
      .get('/park/single/:id', Authorized.AUTH, Park.GET_SINGLE)
      .post('/park', Authorized.AUTH, FileUpload.array('media'), Park.POST)
      .put('/park', Authorized.AUTH, FileUpload.array('media'), Park.PUT)
      .put('/statusPark', Authorized.AUTH, Park.EDIT_STATUS)
      .delete('/park', Authorized.AUTH, Park.DELETE)

      .get('/mosque', Mosque.GET)
      .get('/mosque/single/:id', Authorized.AUTH, Mosque.GET_SINGLE)
      .post('/mosque', Authorized.AUTH, FileUpload.array('media'), Mosque.POST)
      .put('/mosque', Authorized.AUTH, FileUpload.array('media'), Mosque.PUT)
      .put('/statusMosque', Authorized.AUTH, Mosque.EDIT_STATUS)
      .delete('/mosque', Authorized.AUTH, Mosque.DELETE)

      .get('/hotel', Hotel.GET)
      .get('/hotel/single/:id', Authorized.AUTH, Hotel.GET_SINGLE)
      .post('/hotel', Authorized.AUTH, FileUpload.array('media'), Hotel.POST)
      .put('/hotel', Authorized.AUTH, FileUpload.array('media'), Hotel.PUT)
      .put('/statusHotel', Authorized.AUTH, Hotel.EDIT_STATUS)
      .delete('/hotel', Authorized.AUTH, Hotel.DELETE)

      .get('/airport', Hotel.GET)
      .get('/airport/single/:id', Authorized.AUTH, Airport.GET_SINGLE)
      .post('/airport', Authorized.AUTH, FileUpload.array('media'), Airport.POST)
      .put('/airport', Authorized.AUTH, FileUpload.array('media'), Airport.PUT)
      .put('/statusAirport', Authorized.AUTH, Airport.EDIT_STATUS)
      .delete('/airport', Authorized.AUTH, Airport.DELETE)

      .get('/train', Train.GET)
      .get('/train/single/:id', Authorized.AUTH, Train.GET_SINGLE)
      .post('/train', Authorized.AUTH, FileUpload.array('media'), Train.POST)
      .put('/train', Authorized.AUTH, FileUpload.array('media'), Train.PUT)
      .put('/statusTrain', Authorized.AUTH, Train.EDIT_STATUS)
      .delete('/train', Authorized.AUTH, Train.DELETE)

      .get('/bank', Bank.GET)
      .get('/bank/single/:id', Authorized.AUTH, Bank.GET_SINGLE)
      .post('/bank', Authorized.AUTH, FileUpload.array('media'), Bank.POST)
      .put('/bank', Authorized.AUTH, FileUpload.array('media'), Bank.PUT)
      .put('/statusBank', Authorized.AUTH, Bank.EDIT_STATUS)
      .delete('/bank', Authorized.AUTH, Bank.DELETE)

      .get('/market', Market.GET)
      .get('/market/single/:id', Authorized.AUTH, Market.GET_SINGLE)
      .post('/market', Authorized.AUTH, FileUpload.array('media'), Market.POST)
      .put('/market', Authorized.AUTH, FileUpload.array('media'), Market.PUT)
      .put('/statusMarket', Authorized.AUTH, Market.EDIT_STATUS)
      .delete('/market', Authorized.AUTH, Market.DELETE)

      .get('/clinic', Clinic.GET)
      .get('/clinic/single/:id', Authorized.AUTH, Clinic.GET_SINGLE)
      .post('/clinic', Authorized.AUTH, FileUpload.array('media'), Clinic.POST)
      .put('/clinic', Authorized.AUTH, FileUpload.array('media'), Clinic.PUT)
      .put('/statusClinic', Authorized.AUTH, Clinic.EDIT_STATUS)
      .delete('/clinic', Authorized.AUTH, Clinic.DELETE)

      .get('/museum', Museum.GET)
      .get('/museum/single/:id', Authorized.AUTH, Museum.GET_SINGLE)
      .post('/museum', Authorized.AUTH, FileUpload.array('media'), Museum.POST)
      .put('/museum', Authorized.AUTH, FileUpload.array('media'), Museum.PUT)
      .put('/statusMuseum', Authorized.AUTH, Museum.EDIT_STATUS)
      .delete('/museum', Authorized.AUTH, Museum.DELETE)

      .get('/general', General.GET)
      .put('/general', Authorized.AUTH, FileUpload.array('media'), General.PUT)

      .get('/homeslider', Homeslider.GET)
      .get('/homeslider/single/:id', Authorized.AUTH, Homeslider.GET_SINGLE)
      .post('/homeslider', Authorized.AUTH, FileUpload.single('media'), Homeslider.POST)
      .put('/homeslider', Authorized.AUTH, FileUpload.single('media'), Homeslider.PUT)
      .put('/statusHomeslider', Authorized.AUTH, Homeslider.EDIT_STATUS)
      .delete('/homeslider', Authorized.AUTH, Homeslider.DELETE)

      .get('/activeRegion', Region.GET_ACTIVE)
      .get('/activeRegion/single/:id', Region.GET_ACTIVE_SINGLE)

      .get('/activeFood', Food.GET_ACTIVE)
      .get('/activeFood/single/:id', Food.GET_ACTIVE_SINGLE)

      .get('/activeGame', Game.GET_ACTIVE)
      .get('/gameByRegion/:reg_id', Game.GET_BY_REGION)
      .get('/activeGame/single/:id', Game.GET_ACTIVE_SINGLE)

      .get('/activeSlider', Homeslider.GET_ACTIVE)

      .get('/general', General.GET)

      .get('/topShrine', Shrine.GET_TOP)
      .get('/activeShrine/:reg_id', Shrine.GET_ACTIVE)
      .get('/activeShrine/single/:id', Shrine.GET_ACTIVE_SINGLE)

      .get('/hotelByRegion/:reg_id', Hotel.GET_ACTIVE)
      .get('/hotelByShrine/:shrine_id', Hotel.GET_ACTIVE_BY_SHRINE)
      .get('/activeHotel/single/:id', Hotel.GET_ACTIVE_SINGLE)

      .get('/parkByRegion/:reg_id', Park.GET_ACTIVE)
      .get('/parkByShrine/:shrine_id', Park.GET_ACTIVE_BY_SHRINE)
      .get('/activePark/single/:id', Park.GET_ACTIVE_SINGLE)

      .get('/theaterByRegion/:reg_id', Theater.GET_ACTIVE)
      .get('/theaterByShrine/:shrine_id', Theater.GET_ACTIVE_BY_SHRINE)
      .get('/activeTheater/single/:id', Theater.GET_ACTIVE_SINGLE)

      .get('/restaurantByRegion/:reg_id', Restaurant.GET_ACTIVE)
      .get('/restaurantByShrine/:shrine_id', Restaurant.GET_ACTIVE_BY_SHRINE)
      .get('/activeRestaurant/single/:id', Restaurant.GET_ACTIVE_SINGLE)

      .get('/mosqueByRegion/:reg_id', Mosque.GET_ACTIVE)
      .get('/mosqueByShrine/:shrine_id', Mosque.GET_ACTIVE_BY_SHRINE)
      .get('/activeMosque/single/:id', Mosque.GET_ACTIVE_SINGLE)

      .get('/activeAirport/:reg_id', Airport.GET_ACTIVE)
      .get('/activeAirport/single/:id', Airport.GET_ACTIVE_SINGLE)

      .get('/activTrain', Train.GET_ACTIVE)
      .get('/activeTrain/single/:id', Train.GET_ACTIVE_SINGLE)

      .get('/activeMuseum', Museum.GET_ACTIVE)
      .get('/activeMuseum/single/:id', Museum.GET_ACTIVE_SINGLE)

      .get('/activeMarket', Market.GET_ACTIVE)
      .get('/activeMarket/single/:id', Market.GET_ACTIVE_SINGLE)

      .get('/activeClinic', Clinic.GET_ACTIVE)
      .get('/activeClinic/single/:id', Clinic.GET_ACTIVE_SINGLE)

      .get('/activeBank', Bank.GET_ACTIVE)
      .get('/activeBank/single/:id', Bank.GET_ACTIVE_SINGLE)

      .get('/statistics', Statistics.GET)

module.exports = router