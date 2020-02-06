import dbCall from '../../libs/dynamodb-lib';
import { success, failure } from '../../libs/response-lib';
import calcWinRatio from '../../libs/calc-lib';

export async function main(event, context) {
  const data = JSON.parse(event.body);

  const { won, lost, wo, gamesTotal } = data;
  const ratio = calcWinRatio({ won, gamesTotal });

  const params = {
    TableName: process.env.playerDataTableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      playerDataId: event.pathParameters.id
    },
    UpdateExpression: "SET won = :won, lost = :lost, wo = :wo, gamesTotal = :gamesTotal, ratio = :ratio",
    ExpressionAttributeValues: {
      ":won": won,
      ":lost": lost,
      ":wo": wo,
      ":gamesTotal": gamesTotal,
      ":ratio": ratio,
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    const result = await dbCall('update', params);
    return success(result);
  } catch (e) {
    console.error('#############', e);
    return failure({ status: false });
  }
}
