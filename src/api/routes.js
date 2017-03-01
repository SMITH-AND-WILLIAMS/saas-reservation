// import reservationCtrl from './reservationsCtrl';
const reservationCtrl = require('./reservationsCtrl');

module.exports.endPoints = [{ method: 'GET', path: '/api/reservations', config: reservationCtrl.get }];
