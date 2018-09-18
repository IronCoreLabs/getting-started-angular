const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

// TODO: Print very informative messages if these are missing
const ironCoreConfig = require("./ironcore-config.json");
const privateKey = fs.readFileSync(path.join(__dirname, "./private.key"), "utf8");

/**
 * Create a Node server which is reponsible for generating and signing valid JWTs. Supports
 * cross origin requests since the port used is different than the port that create-react-app
 * uses to serve the app.
 */
http.createServer((req, res) => {
    const query = url.parse(req.url, true).query;
    //Only support a single endpoint for this server. In this example we're passing in the user ID of the
    //user to generate a JWT for. This pattern should NOT be used as the server should always have the context of
    //who the currently authenticated user is. Passing in the user ID to generate a JWT will make it trivial
    //for users to get a valid signed JWT for any user.
    if (req.url.indexOf("/generateJWT") === 0 && query.userID) {
        const token = jwt.sign(
            {
                pid: ironCoreConfig.projectId,
                sid: ironCoreConfig.segmentId,
                kid: ironCoreConfig.serviceKeyId,
            },
            privateKey,
            {
                algorithm: "ES256",
                expiresIn: "2m",
                subject: query.userID,
            }
        );
        //Allow CORS requests since this server is on a different port than the create-react-app webpack server
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Request-Method", "*");
        res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
        res.setHeader("Access-Control-Allow-Headers", "*");
        return res.end(token);
    }
    res.writeHead(404);
    res.end();
}).listen(3001);
