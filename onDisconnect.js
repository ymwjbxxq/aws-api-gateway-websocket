const DynamoDB = require('aws-sdk/clients/dynamodb');

const dynamoDb = new DynamoDB.DocumentClient();

exports.handler = async (event) => {
    await dynamoDb
    .delete({
      TableName: "poc-websocket",
      Key: {
        connectionId: event.requestContext.connectionId
      }
    })
    .promise();
    
    return { statusCode: 200, body: 'Disconnected.' };
};
