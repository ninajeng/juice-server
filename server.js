const PORT = 3033;

const jsonServer = require('json-server');
const auth = require('json-server-auth');

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.db = router.db;

server.use(auth);
server.use(router);

router.render = (req, res) => {
  res.json({
    success: res.statusCode >= 400 ? false : true,
    message: res.locals.data,
  });
};

server.listen(PORT, () => {
  console.log(`json-server-auth is running at http://localhost:${PORT} ~`);
});