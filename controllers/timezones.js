const TimeZones = require('../models/timezones')

exports.getTimeZones = (req,res) =>
{

    TimeZones.find(this).then((zone) => {
        // console.log(huesped)
        res.status(200).send(zone)
        });  
}