export interface ResponseArgs {
  statusCode?: number;
  body?: any;
  headers?: {
    [name: string]: string;
  };
}

export interface ResponseErrorArgs {
  statusCode: number;
  headers?: {
    [key: string]: string;
  };
  body?: any;
}

export const defaultResponseArgs: ResponseArgs = {
  statusCode: 200,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
  },
};

export const defaultResponseErrorArgs: ResponseErrorArgs = {
  statusCode: 500,
  headers: { 'content-type': 'application/json' },
  body: {
    message: 'Internal server error',
  },
};
export class Response {
  statusCode: number;
  body?: string;
  headers: {
    [name: string]: string;
  };

  constructor(args: ResponseArgs = defaultResponseArgs) {
    this.statusCode = args.statusCode
      ? args.statusCode
      : (defaultResponseArgs.statusCode as number);
    this.headers = {
      ...defaultResponseArgs.headers,
      ...(args.headers ? args.headers : {}),
    };

    if (args.body) {
      this.body = JSON.stringify(args.body, null, 2);
    }
  }
}

export class ResponseError {
  statusCode: number;
  headers: {
    [key: string]: string;
  };
  body?: any;

  constructor(args: ResponseErrorArgs = defaultResponseErrorArgs) {
    this.statusCode = args.statusCode
      ? args.statusCode
      : (defaultResponseErrorArgs.statusCode as number);
    this.headers = {
      ...defaultResponseErrorArgs.headers,
      ...(args.headers ? args.headers : {}),
    };

    if (args.body) {
      this.body = JSON.stringify(args.body, null, 2);
    }
  }
}
