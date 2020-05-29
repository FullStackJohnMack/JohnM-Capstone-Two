const { GOOGLE_MAPS_API_KEY } = process.env;

// exports.handler = async (event, context) => {
//   return GOOGLE_MAPS_API_KEY
// };

exports.handler = async (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: GOOGLE_MAPS_API_KEY
  })
};