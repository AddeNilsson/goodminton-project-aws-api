import dbCall from '../../libs/dynamodb-lib';
import { success, failure } from '../../libs/response-lib';
import calcWinRatio from '../../libs/calc-lib';

export async function main(event, context) {
  const data = JSON.parse(event.body);

  const { won, lost, wo, gamesTotal } = data;
  const winRatio = calcWinRatio({ won, gamesTotal });

  const params = {
    TableName: process.env.playerDataTableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      playerDataId: event.pathParameters.id
    },
    UpdateExpression: "SET won = :won, lost = :lost, wo = :wo, gamesTotal = :gamesTotal, winRatio = :winRatio, touched = :touched",
    ExpressionAttributeValues: {
      ":won": won,
      ":lost": lost,
      ":wo": wo,
      ":gamesTotal": gamesTotal,
      ":winRatio": winRatio,
      ":touched": Date.now(),
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    const result = await dbCall('update', params);
    return success(result.Attributes);
  } catch (e) {
    return failure({ status: false });
  }
}
