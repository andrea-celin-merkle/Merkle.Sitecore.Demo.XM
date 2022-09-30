const {
  startRenderHostTunnel,
  startRenderingHostServer,
  getDefaultAppInvocationInfoResolver,
} = require('@sitecore-jss/sitecore-jss-rendering-host');
const path = require('path');
const express = require('express');

/* eslint-disable no-console */

let jssConfig;

try {
  // eslint-disable-next-line global-require
  jssConfig = require('../src/temp/config');
} catch (e) {
  console.error(
    'Unable to require JSS config. Ensure `jss setup` has been run, and the app has been started at least once after setup.'
  );
  console.error(e);
  process.exit(1);
}

// startRenderHostTunnel('localhost', { port: 5000 })
// .then((tunnelUrl) => {
// const buildArtifactsPath = path.resolve(__dirname, '../build');

try {
  startRenderingHostServer({
    hostname: jssConfig.renderingHost,
    port: jssConfig.renderingHostPort,
    appInvocationInfoResolver: getDefaultAppInvocationInfoResolver({
      appPathResolver: (requestJson) => {
        return path.resolve('./build-rendering-host/server.bundle');
      },
    }),
    hooks: {
      beforeServerStarted: (server) => {
        server.use(
          '/static',
          express.static(path.resolve(__dirname, '../build-rendering-host/static'), {
            fallthrough: false, // force 404 for unknown assets under /dist
          })
        );
      },
    },
  })
  // })
}
catch (err) {
  console.error(err);
}
