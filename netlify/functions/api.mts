import type { Context, Config } from "@netlify/functions";
import serverless from "serverless-http";
import app from "../../src/app.js";

// Ensure environment variables are loaded (Netlify injects them automatically)
// This import ensures the env config is initialized
import "../../src/config/env.js";

// Create serverless handler from Express app
const serverlessHandler = serverless(app);

interface ServerlessResponse {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
  isBase64Encoded?: boolean;
}

export default async function handler(req: Request, context: Context) {
  try {
    // Convert Netlify Request to Node.js-compatible format for serverless-http
    const url = new URL(req.url);
    
    // Convert headers to lowercase keys (AWS Lambda format)
    const headers: Record<string, string> = {};
    req.headers.forEach((value, key) => {
      headers[key.toLowerCase()] = value;
    });
    
    // Debug logging
    console.log('Request path:', url.pathname);
    console.log('Request method:', req.method);
    console.log('Authorization header:', headers['authorization'] ? 'Present' : 'Missing');
    console.log('Environment check - BEARER_TOKENS:', process.env.BEARER_TOKENS ? 'Set' : 'Not set');
    
    const event = {
      httpMethod: req.method,
      path: url.pathname,
      queryStringParameters: Object.fromEntries(url.searchParams),
      headers: headers,
      body: req.method !== "GET" && req.method !== "HEAD" ? await req.text() : null,
      isBase64Encoded: false,
    };

    const lambdaContext = {
      callbackWaitsForEmptyEventLoop: false,
      functionName: "api",
      functionVersion: "$LATEST",
      invokedFunctionArn: "",
      memoryLimitInMB: "1024",
      awsRequestId: context.requestId || Math.random().toString(36),
      logGroupName: "",
      logStreamName: "",
      getRemainingTimeInMillis: () => 30000,
      done: () => {},
      fail: () => {},
      succeed: () => {},
    };

    // Call the serverless handler
    const result = await serverlessHandler(event, lambdaContext) as ServerlessResponse;

    // Convert response back to Netlify format
    return new Response(result.body, {
      status: result.statusCode,
      headers: result.headers,
    });

  } catch (error) {
    console.error("API Error:", error);
    
    return new Response(JSON.stringify({ 
      error: "Internal Server Error",
      message: error instanceof Error ? error.message : "Unknown error"
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}

export const config: Config = {
  path: "/api/*",
};