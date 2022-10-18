const { truncate } = require('fs');
const client = require('../config/db');
const { ApiError } = require('../errors/apiErrors');

module.exports = {

async checkWorkspaces(userId, workspaceId) {

    const queryString = `SELECT id FROM workspace WHERE user_id = $1`;

    const result = await client.query(queryString, [userId]); 

    for (const element of result.rows) {
      if (workspaceId === element.id) {
        return true;
      }
    }

    return false;
  },

  async checkBooking(userId, bookingRefId) {
    const queryString = `
      SELECT booking.user_id as booking_user_id, workspace.user_id as workspace_user_id
      FROM booking_ref 
      JOIN booking ON booking.booking_ref_id = booking_ref.id
      JOIN workspace ON workspace.id = booking.workspace_id
      WHERE booking_ref_id = $1;`;

      const result = await client.query(queryString, [bookingRefId]);

      for (const element of result.rows) {
        if (userId === element.workspace_user_id || userId === element.booking_user_id) {
          return true;
        }
      }

      return false;
  },
}