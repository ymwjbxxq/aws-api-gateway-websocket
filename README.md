# WebSocket APIs in Amazon API Gateway #

I was interested in building a real-time API, last time I did was years ago in .NET with SignalR.
AWS announced back in 2018 [websocket api](https://aws.amazon.com/blogs/compute/announcing-websocket-apis-in-amazon-api-gateway/), so it was time to build a POC to have fun

### Architecture ###

![picture](https://github.com/ymwjbxxq/aws-api-gateway-websocket/blob/master/websockets-arch.png)

We have three lambdas, essentially
* onConnect
* onDisconnect
* the action one

In this example, I called "add".

![picture](https://github.com/ymwjbxxq/aws-api-gateway-websocket/blob/master/api.png)

Each route must be associated with a lambda. For example, the $defeault route should be used as a catch-all if the $request.body.action does not match the route. 

### How do I get set up? ###

* Create 3 lambdas
* Install [wscat](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-how-to-call-websocket-api-wscat.html)
* Add DynamoDB permission to all three lambdas
* Add AmazonAPIGatewayInvokeFullAccess to the action lambda to let post back message to the user
* Add DynamoDB table called "poc-websocket" with Primary key "connectionId"

### Test time ###

From the command line, run the command
```javascript
wscat -c Your_WebSocket_URL
```

you should see:
```javascript
Connected (press CTRL+C to quit)
```

now send the payload:
```javascript
> {"action":"add", "data": "test"}
```

you should see a response:
```javascript
< Hello test
```
