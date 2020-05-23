const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    console.log(JSON.stringify(event));
    
    const currentConnection = await dynamoDb
        .get({
          TableName: "poc-websocket",
           Key: {
            connectionId: event.requestContext.connectionId
          }
        }).promise();
    
    if (currentConnection && currentConnection.Item) {
      const postData = "Hello "+ JSON.parse(event.body).data;
      const connectionId = currentConnection.Item.connectionId;
      
      const apigwManagementApi = new AWS.ApiGatewayManagementApi({
          apiVersion: '2018-11-29',
          endpoint: event.requestContext.domainName + '/' + event.requestContext.stage
      });
      try {
          await apigwManagementApi.postToConnection({ ConnectionId: connectionId, Data: postData }).promise();
      } catch (e) {
        if (e.statusCode === 410) {
          console.log(`Found stale connection, deleting ${connectionId}`);
          await dynamoDb
                  .delete({
                    TableName: "poc-websocket",
                    Key: {
                      connectionId: event.requestContext.connectionId
                    }
                  })
                  .promise();
        } else {
          throw e;
        }
      }
    }
    
    return { statusCode: 200, body: 'Data sent.' };
};
