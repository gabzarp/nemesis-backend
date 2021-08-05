const Company = require("../models/User/Company");
const { createIndexes } = require("../models/User/Member");
const Member = require("../models/User/Member");

const entities = {
  Company,
  Member,
};

module.exports = {
  create: async (type, user, body) => {
    const createType = entities[type];
    return await createType.create({ body, user });
  },
};
