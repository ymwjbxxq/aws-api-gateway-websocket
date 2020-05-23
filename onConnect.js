const DynamoDB = require('aws-sdk/clients/dynamodb');

const dynamoDb = new DynamoDB.DocumentClient();

exports.handler = async (event) => {
    await dynamoDb
    .put({
      TableName: "poc-websocket",
      Item: {
        connectionId: event.requestContext.connectionId
      }
    })
    .promise();
    
    return { statusCode: 200, body: 'Connected.' };
};