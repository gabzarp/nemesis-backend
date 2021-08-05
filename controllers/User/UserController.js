const User = require("../../models/User/User");
const axios = require("axios");
const { ErrorHandler } = require("../../services/ErrorHandler");
const { validateEmail } = require("../../services/Validation");
const qs = require('querystring');

const rankTranslate = {
  "I": 1,
  "II": 2,
  "III": 3,
  "IV": 4,
  "V": 5,
};

const UserController = {
  signup: async (ctx) => {
    var body = ctx.request.body;
    const requiredFields = ['email', 'password'];
    
    for await (field of requiredFields){
      let prop = body[field];
      if(typeof prop === 'undefined' || prop == null || prop === ""){
        ctx = ErrorHandler(ctx, 400, "MISSING_FIELD");
        return;
      }
    };

    if(body.password.length < 6){
      ctx.body = ErrorHandler(ctx, 400, "INVALID_PASSWORD");
      return;
    }

    if(!validateEmail(body.email)){
      ctx.body = ErrorHandler(ctx, 400, "INVALID_EMAIL");
      return;
    }

    const emailUser = await User.find({ "email": body.email }).exec();

    if (emailUser.length !== 0) {
      ctx.body = ErrorHandler(ctx, 409, "EMAIL_ALREADY_REGISTERED");
      return;
    }

    try {

      const summoner = await axios.get("https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+ encodeURIComponent(body.summonerName),
      {
        headers:{
          'X-Riot-Token': process.env.RIOT_API
        }
      });

      const summonerLeague = await axios.get("https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + summoner.data.id,
      {
        headers:{
          'X-Riot-Token': process.env.RIOT_API
        }
      });
      const user = await User.create({
        name: body.name,
        email: body.email,
        password: body.password,
        rank: rankTranslate[summonerLeague.data[1].rank],
        tier: summonerLeague.data[1].tier,
        summonerId: summoner.data.id,
        summonarName: body.summonerName
      });
      
      ctx.body = user;
      ctx.status = 200;
    } catch (error) {
      ctx.body = error;
      ctx.status = 500;
      console.log(error)
    }
  },
  login: async (ctx) => {
    try {
      var user = await User.findOne({ email: ctx.request.body.email });
      var auth = await user.checkPassword(ctx.request.body.password);
      if (auth) {
        user = await userTypeModel[user.user_type].findOne({user: user._id})
      }
      console.log(user)
      ctx.body = auth ? user : auth;
      ctx.status = 200;
    } catch (error) {
      ctx.body = error;
      ctx.status = 500;
      console.log(error);
    }
  },
};
module.exports = UserController;
