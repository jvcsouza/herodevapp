const generateUniqueId = require("../utils/generateUniqueId");
const connection = require("../database/connection");

module.exports = {
  async index(_, resp) {
    const ongs = await connection("ongs").select("*");
    return resp.json(ongs);
  },
  async store(req, resp) {
    const { name, email, whatsapp, city, uf } = req.body;

    const id = generateUniqueId();

    await connection("ongs").insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });

    return resp.json({ id });
  }
};
