const client = require('../config/db');
const { ApiError } = require('../errors/apiErrors');

module.exports = {

    async insertNewBookingRef() {

        const queryString = `INSERT INTO booking_ref DEFAULT VALUES returning id`;
        const result = await client.query(queryString); 
        return result.rows[0].id;

    },

    async updatePrice(bookingRefId, bookingRefPrice) {
        const queryString = `UPDATE booking_ref SET price = $1 WHERE id = $2`;

        await client.query(queryString, [bookingRefPrice, bookingRefId]);

        return;
    }

}
