const Router = require("koa-router")

const LobbyController = require('../../controllers/Lobby/LobbyController')

const router = new Router();

router
.post("/lobby", LobbyController.create)
.get("/lobby", LobbyController.getAll)
.get("/lobby/:id", LobbyController.getById)

module.exports = router.routes()
