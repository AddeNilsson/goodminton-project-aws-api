import dbCall from '../../libs/dynamodb-lib';
import { success, failure } from '../../libs/response-lib';

const initialPlayerData = {
  won: 0, lost: 0, wo: 0, gamesTotal: 0, winRatio: 0,
};

export async function main(event, context, callback) {
  const data = JSON.parse(event.body); // i.e. req.body
  const { nickname } = data;

  const authProvider = event.requestContext.identity.cognitoAuthenticationProvider;
  const parts = authProvider.split(':');
  // const userPoolIdParts = parts[parts.length - 3].split('/');
  // const userPoolId = userPoolIdParts[userPoolIdParts.length - 1];
  const userPoolUserId = parts[parts.length - 1];


  const params = {
    TableName: process.env.playerDataTableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      playerDataId: userPoolUserId,
      nickname,
      ...initialPlayerData,
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
