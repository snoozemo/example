const path = require("path");
const express = require("express");
const compression = require("compression");
const morgan = require("morgan");
const { createRequestHandler } = require("@remix-run/express");

const BUILD_DIR = path.join(process.cwd(), "build");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const PUBLIC_BUILD_DIR = path.join(process.cwd(), "public/build");

const app = express();

app.use(compression());

app.disable("x-powered-by");
app.use(
  BUILD_DIR,
  express.static(PUBLIC_BUILD_DIR, { immutable: true, maxAge: "1y" })
);

app.use(express.static(PUBLIC_DIR, { maxAge: "1h" }));

app.use(morgan("tiny"));

app.all(
  "*",
  process.env.NODE_ENV === "development"
    ? (req, res, next) => {
        purgeRequireCache();

        return createRequestHandler({
          build: require(BUILD_DIR),
          mode: process.env.NODE_ENV,
        })(req, res, next);
      }
    : createRequestHandler({
        build: require(BUILD_DIR),
        mode: process.env.NODE_ENV,
      })
);
const port = process.env.PORT || 3200;

app.listen(port, () => {
  console.log(`Express server listening on http://127.0.0.1:${port}`);
});

function purgeRequireCache() {
  for (const key in require.cache) {
    if (key.startsWith(BUILD_DIR)) {
      delete require.cache[key];
    }
  }
}
