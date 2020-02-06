import uuid from 'uuid';

import dbCall from '../../libs/dynamodb-lib';
import { success, failure } from '../../libs/response-lib';

export async function main(event, context, callback) {
  const data = JSON.parse(event.body); // i.e. req.body

  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now(),
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
