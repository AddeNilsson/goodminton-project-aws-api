import uuid from 'uuid';

import dbCall from '../../libs/dynamodb-lib';
import { success, failure } from '../../libs/response-lib';

export async function main(event, context, callback) {
  const data = JSON.parse(event.body); // i.e. req.body
  const { won, lost, wo, gamesTotal, ratio, username } = data;
  const params = {
    TableName: process.env.playerDataTableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      playerDataId: uuid.v1(),
      won,
      lost,
      wo,
      gamesTotal,
      ratio,
      username,
      touched: Date.now(),
    },
  };
  try {
    await dbCall('put', params);
    return success(params.Item);
  } catch (e) {
    console.log('error: ', e);
    return failure({ status: false });
  }
};
