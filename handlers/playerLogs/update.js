import dbCall from '../../libs/dynamodb-lib';
import { success, failure } from '../../libs/response-lib';

export async function main(event, context) {
  const params = {
    TableName: process.env.logsTableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      logId: event.pathParameters.id
    },
    UpdateExpression: "SET reverted = :reverted, revertable = :revertable, touched = :touched",
    ExpressionAttributeValues: {
      ":reverted": 1,
      ":revertable": 0,
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
