const Lobby = require("../../models/Lobby/Lobby");
const axios = require("axios");
const { ErrorHandler } = require("../../services/ErrorHandler");

const LobbyController = {
    create: function(ctx){
        var body = ctx.request.body;
        const requiredFields = ['creatorId'];

        for await (field of requiredFields){
            let prop = body[field];
            if(typeof prop === 'undefined' || prop == null || prop === ""){
              ctx = ErrorHandler(ctx, 400, "MISSING_FIELD");
              return;
            }
        };

        try {
            const lobby = await Lobby.create(body)
            ctx.body = lobby;
            ctx.status = 200;
        } catch (error) {
            ctx.body = error;
            ctx.status = 500;
        }
    },
    getAll: function(ctx){
        try {
            const lobbies = await Lobby.findAll();
            ctx.body = lobbies;
            ctx.status = 200;
        } catch (error) {
            ctx.body = error;
            ctx.status = 500;
        }
    },
    getById: function(ctx){
        try {
            const lobby = await Lobby.findOne({_id: ctx.params.id})
            ctx.body = lobby;
            ctx.status = 200;
        } catch (error) {
            ctx.body = error;
            ctx.status = 500;
        }
    }
}

module.exports = LobbyController;