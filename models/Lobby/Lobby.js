const mongoose = require("../../database/mongodb");

const LobbySchema = new mongoose.Schema({
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    mapSide: {
        type: String,
        enum: ['BLUE', 'RED'],
        default: 'BLUE'
    },
    maxElo: {
        type: String,
        enum: ['IRON', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND', 'MASTER', 'GRANDMASTER', 'CHALLENGER'],
        default: 'CHALLENGER'
    }
}, {
    timestamps: true
})

const Lobby = mongoose.model('Lobby', LobbySchema)

module.exports = Lobby