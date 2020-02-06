import dbCall from '../../libs/dynamodb-lib';
import { success, failure } from '../../libs/response-lib';

export async function main(event, ) {
  const params = {
    TableName: process.env.tableName,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': event.requestContext.identity.cognitoIdentityId,
    },
  };

  try {
    const result = await dbCall('query', params);
    return success(result.Items);
  } catch (e) {
    console.error(e);
    return failure({ status: false });
  }
}
