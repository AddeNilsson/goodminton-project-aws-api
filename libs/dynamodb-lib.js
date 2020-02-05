import AWS from 'aws-sdk';

const call = (action, params) => {
  const db = new AWS.DynamoDB.DocumentClient();
  return db[action](params).promise();
};

export default call;
