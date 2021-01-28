import { createProxyMiddleware } from "http-proxy-middleware";

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function initMiddleware(middleware) {
  return (request, response) =>
    new Promise((resolve, reject) => {
      middleware(request, response, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}

export { initMiddleware };

const apiProxy = initMiddleware(
  createProxyMiddleware({
    changeOrigin: true,
    logLevel: "debug",
    target: "https://random-data-api.com"
  })
);

// eslint-disable-next-line import/no-default-export
export default async function handler(request, response) {
  await apiProxy(request, response);
}
