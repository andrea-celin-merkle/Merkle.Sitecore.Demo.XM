const {
  startRenderHostTunnel,
  startRenderingHostServer,
  getDefaultAppInvocationInfoResolver,
} = require('@sitecore-jss/sitecore-jss-rendering-host');
const path = require('path');
const express = require('express');

/* eslint-disable no-console */

startRenderHostTunnel('localhost', { port: 5000 })
  .then((tunnelUrl) => {
    // const buildArtifactsPath = path.resolve(__dirname, '../build');
    startRenderingHostServer({
      port: 5000,
      appInvocationInfoResolver: getDefaultAppInvocationInfoResolver({
        appPathResolver: (requestJson) => {
          return path.resolve('./build/server.bundle');
        },
      }),
      hooks: {
        beforeServerStarted: (server) => {
          server.use(
            '/static',
            express.static(path.resolve(__dirname, '../build/static'), {
              fallthrough: false, // force 404 for unknown assets under /dist
            })
          );
        },
      },
    });
  })
  .catch((err) => {
    console.error(err);
  });
