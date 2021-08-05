const compose = require('koa-compose');

const User = require('../routes/User/UserRoutes')
const Lobby = require('../routes/Lobby/LobbyRoutes')

module.exports = compose([User, Lobby])
