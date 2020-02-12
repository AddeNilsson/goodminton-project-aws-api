import dbCall from '../../libs/dynamodb-lib';
import { success, failure } from '../../libs/response-lib';

export async function main(event, ) {
  const params = {
    TableName: process.env.playerDataTableName,
    // FilterExpression: 'gamesTotal >= :minGamesTotal',
    // ExpressionAttributeValues: {
    //   ':minGamesTotal': 1,
    // },
  };

  try {
    const result = await dbCall('scan', params);
    return success(result.Items);
  } catch (e) {
    console.error(e);
    return failure({ status: false });
  }
}
