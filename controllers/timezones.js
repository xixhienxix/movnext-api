const TimeZones = require('../models/timezones')

exports.getTimeZones = (req,res) =>
{
    var nombreHotel = req.body.hotel.replace(/\s/g, '_');

    TimeZones.find({hotel:nombreHotel}).then((zone) => {
        res.status(200).send(zone)
        });  
}