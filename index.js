const http = require("http");
const app = require("./app");
const server = http.createServer(app);

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;
console.log(`Server Trying running on port ${port}`);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
