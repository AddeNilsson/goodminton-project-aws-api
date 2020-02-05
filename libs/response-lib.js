export const success = data => getResponse(200, data);
export const failure = data => getResponse(500, data);

const getResponse = (statusCode, data) => ({
  statusCode,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Acces-Control-Allow-Credentials": true,
  },
  body: JSON.stringify(data),
});
