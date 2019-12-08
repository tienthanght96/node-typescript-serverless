import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  Context,
} from 'aws-lambda';
import 'source-map-support/register';

export const hello: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  _context: Context
) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message:
          'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };
};

export const cron: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  _context: Context
) => {
  const now = new Date();
  const message = `Hello day from ${now}`;

  return {
    statusCode: 200,
    body: JSON.stringify({
      event,
      message,
    }),
  };
};
