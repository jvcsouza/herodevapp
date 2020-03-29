const express = require("express");
const routes = express.Router();
const { celebrate, Joi, Segments } = require("celebrate");

const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

routes.post("/api/session", SessionController.create);

// prettier-ignore
routes.post("/api/ongs", celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.string().required().min(10).max(11),
      city: Joi.string().required(),
      uf: Joi.string().required().length(2)
    })
  }),
  OngController.store
);

// prettier-ignore
routes.get("/api/incidents", celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number()
    })
  }),
  IncidentController.index
);
// prettier-ignore
routes.delete("/api/incidents/:id", celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required()
    })
  }),
  IncidentController.Delete
);
routes.post("/api/incidents", IncidentController.store);

// routes.get(
//   "/profile",
//   celebrate({
//     [Segments.HEADERS]: Joi.object({
//       authorization: Joi.string().required()
//     }).unknown()
//   }),
//   ProfileController.index
// );
routes.use("/api/profile", ProfileController.validate);
routes.get("/api/profile", ProfileController.index);

module.exports = routes;
