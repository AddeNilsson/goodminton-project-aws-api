import dbCall from '../../libs/dynamodb-lib';
import { success, failure } from '../../libs/response-lib';

export async function main(event, context) {
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    },
  };

  try {
    const result = await dbCall('delete', params);
    console.log(result);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
