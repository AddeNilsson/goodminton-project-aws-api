import uuid from 'uuid';
import dbCall from '../../libs/dynamodb-lib';
import { success, failure } from '../../libs/response-lib';

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.logsTableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      logId: uuid.v1(),
      ...data,
      touched: Date.now(),
    },
  };
  try {
    await dbCall('put', params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
};
