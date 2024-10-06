# React and CORS

This repository show cases some ways to avoid CORS errors if your React App get's data from an external URL (which is not under your control). If the external URL is under your control use the Access-Control-Allow-Origin (https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin) at this URL (as it has to be provided by the "external" server, not your React app).

## Content of this Repository

This repository consists of two little parts - a frontend React App (build with vite and the "avoid CORS errors" makes use of it's abbility to proxy calls) and the backend server (a simple NodeJs/express server).

### nodejs/express server

It provides four routes (where basically only two are needed for this showcase):
- /cors/roles ... Gives a list of roles (the data from the "API") using the Access-Control-Allow-Origin in it's simplest form (\*).
- /roles ... Gives the same list of roles - but doesn't have any CORS header. This endpoint simulates an external server, which is not under your control.

### React App

The React App supports the following routes:
/roles - gets the routes from the servers /roles route. Therefore it uses the vite proxy feature, which is configured in **vite.config.js**:

```
  server: {
    proxy: {
      '/proxy': {
        target: 'http://localhost:3456',
        changeOrigin: true,
        rewrite: (path) => path.replace(/\/proxy\//, ''),
      },
    },
  },
```

/proxy is the path which will be used by the proxy server.
target: is the real destination.
rewrite: a arrow function to manipulate the path before using it to send it to the target server. In our case we remove /proxy/ from the path (so a request to http://localhost:5173/proxy/roles gets proxied to http://localhost:3456/roles).

And this proxy is invoked in the loader of the RoleList component (which serves the /roles route defined in App.jsx).

```
export async function loader({ request }) {
  const url = request.url.toLowerCase().replace('http://localhost:5173/', '');
  let fullUrl;
  if (url.indexOf('/cors/') >= 0) {
    fullUrl = `http://localhost:3456/${url}`; // setup for CORS, remove the /cors from the request
  } else {
    fullUrl = `http://localhost:5173/proxy/${url}`; // setup for the proxied request (add /proxy/, which is removed by the rewrite function in the vite.config.js)
  }

  const response = await axios.get(fullUrl);
  return response;
}
```

## Test it yourself

1. start the backend server: `node.js app.js`
2. start the frontend server: `npm run dev`
