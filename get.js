import dbCall from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context) {
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id,
    },
  };
  try {
    const result = await dbCall('get', params);
    if (result.Item) {
      return success(result.Item);
    } else {
      return failure({ status: false, message: 'Item not found' });
    }
  } catch (e) {
    console.error(e);
    return failure({ status: false });
  }
}
