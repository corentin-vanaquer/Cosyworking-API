const bookingDatamapper = require("../../Datamapper/booking");
const bookingRefDatamaper = require('../../Datamapper/booking_ref');
const securityDatamapper = require("../../Datamapper/security");
const workspaceDatamapper = require("../../Datamapper/workspace");


module.exports = {

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async findBookingByCoworker(req, res) {

        if (req.userId !== parseInt(req.params.id) ) {
            return res.json({message : "nope"});
          }

        const coworkerId = req.params.id;

        const result = await bookingDatamapper.getCoworkerReservationsById(coworkerId);

        result[0].city = result[0].city.charAt(0).toUpperCase() + result[0].city.slice(1);

        res.json(result)
    },

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async findBookingByHost(req, res) {

        if (req.userId !== parseInt(req.params.hostid) ) {
            return res.json({message : "nope"});
          }

        const hostId = req.params.hostid;

        const result = await bookingDatamapper.getBookingByHostId(hostId);

        for (const workspace of result ) {
            workspace.city = workspace.city.charAt(0).toUpperCase() + workspace.city.slice(1);
        }
        
        res.json(result);
    },

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async findBookedDate(req, res) {

        const workspaceId = req.params.id;

        const result = await bookingDatamapper.getBookedDateByWorkspace(workspaceId);

        res.json(result);
    },

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async bookingRequest(req, res) {

    let bookingToInsert = req.body;

    bookingToInsert.user_id = parseInt(req.userId);

    const { date_list } = bookingToInsert;
    delete bookingToInsert.date_list;
    
    bookingToInsert.booking_ref_id = await bookingRefDatamaper.insertNewBookingRef();

    const workspacePrice = await workspaceDatamapper.getWorkspacesPrices(bookingToInsert.workspace_id);

    let bookingRefPrice = 0;
    
    for (const booking of date_list) {
        bookingToInsert.start_date = booking.start_date;
        bookingToInsert.end_date = booking.end_date;

        const startHour = new Date(booking.start_date);
        const endHour = new Date(booking.end_date);
        const duringTime = (endHour - startHour) / 3600000;

        if (duringTime <= 4 ) {
            bookingToInsert.price = parseInt(workspacePrice[0].half_day_price);

        } else {
            bookingToInsert.price = parseInt(workspacePrice[0].day_price);
        }
        
        bookingRefPrice += bookingToInsert.price;
        
        await bookingDatamapper.PostBookingRequest(bookingToInsert);
    }

    await bookingRefDatamaper.updatePrice(bookingToInsert.booking_ref_id, bookingRefPrice);

    res.json({message: "Booking are created successfully"});
    },

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async stateUpdate(req, res) {

        const bookingRefId = parseInt(req.params.id);

        const isAuthorizedToUpdate = await securityDatamapper.checkBooking(req.userId, bookingRefId);

        if (!isAuthorizedToUpdate) {
            return res.status(403).send({
            message: "This is not your booking ! "
        });
    }
        
        await bookingDatamapper.UpdateBookingState(req.body, bookingRefId );

        res.json({message: `The booking with the id ${bookingRefId} has been succesfully updated with the state ${req.body.state}`});
    },

}