require("dotenv").config();
const axios = require("axios");

module.exports = {
  async findLocation(address, zipCode, city) {

    const params = {
      access_key: process.env.API_LOCATION_ACCESS_KEY,
      query: `${address} ${zipCode} ${city}`
    }
  
    const response = await axios.get("http://api.positionstack.com/v1/forward", {params});

    const coordinates = {
      latitude: response.data.data[0].latitude,
      longitude: response.data.data[0].longitude
    };

    return coordinates;
  }
}