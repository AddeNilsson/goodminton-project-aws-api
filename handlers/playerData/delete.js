import dbCall from '../../libs/dynamodb-lib';
import { success, failure } from '../../libs/response-lib';

export async function main(event, context) {
  const params = {
    TableName: process.env.playerDataTableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      playerDataId: event.pathParameters.id
    },
  };

  try {
    await dbCall('delete', params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
