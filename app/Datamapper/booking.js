const client = require('../config/db');
const { ApiError } = require('../errors/apiErrors');


module.exports = {

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
     async getCoworkerReservationsById(coworkerId) {

        const queryString = `
        SELECT booking.id as booking_id, "user".first_name AS Host,booking_ref.price as Booking_ref_price, booking.price as booking_price,"user".avatar AS host_avatar, state.description AS state, image.link AS image_link, workspace.user_id as host_id,workspace.address, workspace.city, workspace.zip_code, workspace.title AS title, workspace.day_price, workspace.half_day_price, booking.start_date, booking.end_date, booking.workspace_id, booking.booking_ref_id
        FROM booking 
        JOIN state ON state.id = booking.state_id
        JOIN workspace ON workspace.id = booking.workspace_id
		JOIN "user" ON "user".id = workspace.user_id
		JOIN image ON image.workspace_id = workspace.id
        JOIN booking_ref ON booking_ref.id = booking.booking_ref_id
        WHERE booking.user_id = $1 AND image.main_image = true
        `;
        const result = await client.query(queryString, [coworkerId]); 
        return result.rows;
    },

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async getBookedDateByWorkspace(workspaceId) {

        const queryString = `
        SELECT booking.start_date, booking.end_date 
        FROM booking 
        JOIN state ON state.id = booking.state_id
        WHERE booking.workspace_id = $1 AND state.description = 'En attente' OR state.description = 'Validé'
        `;

        const result = await client.query(queryString, [workspaceId]); 
        return result.rows;

    },

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async getBookingByHostId(hostId) {

        const queryString = `
        SELECT booking_ref.id AS bookig_ref_id, booking.id AS booking_id, booking.price as booking_price, booking_ref.price as booking_ref_price, workspace.id AS workspace_id, workspace.title, image.link AS main_image, workspace.address, workspace.city, booking.user_id as coworker_id,"user".first_name AS coworker, "user".avatar, booking.start_date, booking.end_date, state.description 
        FROM booking
        JOIN workspace ON workspace.id = booking.workspace_id
        JOIN "user" ON "user".id = booking.user_id
        JOIN image ON image.workspace_id = workspace.id 
        JOIN state ON state.id = booking.state_id
        JOIN booking_ref ON booking_ref.id = booking.booking_ref_id
        WHERE workspace.user_id = $1 AND image.main_image = true
        `;

        const result = await client.query(queryString, [hostId]); 
        
        return result.rows;

    },

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async PostBookingRequest(bookingToInsert) {

        
        const values = [];
        let counter = 1;
        const queryParams = [];
        const columns = [];
        
        for ( const key in bookingToInsert){
            columns.push(key);
            queryParams.push(`$${counter}`);
            counter ++;

            values.push(bookingToInsert[key])
        }
        
        const queryString = `
        INSERT INTO booking (${columns.join(',')}, state_id) 
        VALUES ( ${queryParams.join(',')}, (SELECT id FROM state WHERE description = 'En attente')) RETURNING *`;

        const result = await client.query(queryString, [...values]); 
        return result.rows;

    },

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async UpdateBookingState(stateDescription,bookingId) {

        const queryString = `
        UPDATE booking SET state_id = 
            (SELECT state.id FROM state WHERE state.description = $1)
         WHERE booking.booking_ref_id = $2 RETURNING *;`;
        const result = await client.query(queryString, [stateDescription.state, bookingId]); 
        return result.rows;
        
    },

}