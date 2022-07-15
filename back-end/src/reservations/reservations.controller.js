const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const {
  bodyDataHasFirstName,
  bodyDataHasLastName,
  bodyDataHasMobile,
  bodyDataHasPeople,
  bodyDataHasDate,
  bodyDataHasTime,
} = require("../validations/bodyDataHas");
const {
  checkOpen,
  checkFutureDate,
  checkPastTime,
  checkOpenTime,
} = require("../validations/validReservations");


async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}

async function listOnDate(req, res) {
  const { date } = req.query;
  const data = await service.listOnDate(date);
  res.json({ data });
}

async function create(req, res) {
  const reservation = req.body.data;
  const data = await service.create(reservation);
  res.status(201).json({ data });
}

async function read(req, res) {
  const data = res.locals.reservation;
  res.status(200).json({ data });
}

async function validReservationId(req, res, next) {
  const reservationId = req.params.reservation_id;
  const data = await service.read(reservationId);
  if (data) {
    res.locals.reservation = data;
    next();
  } else {
    next({ status: 404, message: `Reservation Id ${reservationId} not found` });
  }
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  listOnDate: [asyncErrorBoundary(listOnDate)],
  read: [asyncErrorBoundary(validReservationId), read],
  create: [
    bodyDataHasFirstName,
    bodyDataHasLastName,
    bodyDataHasMobile,
    bodyDataHasDate,
    bodyDataHasTime,
    bodyDataHasPeople,
    checkOpen,
    checkFutureDate,
    checkPastTime,
    checkOpenTime,
    asyncErrorBoundary(create),
  ],
};
