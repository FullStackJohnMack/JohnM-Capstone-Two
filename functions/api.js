const { GOOGLE_MAPS_API_KEY } = process.env;

exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: GOOGLE_MAPS_API_KEY
  };
};