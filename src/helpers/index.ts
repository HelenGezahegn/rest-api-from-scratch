import crypto from "crypto";

const SECRET = "HELEN_REST_API";

const random = () => crypto.randomBytes(128).toString("base64");
const authentication = (salt: String, password: String) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest();
};

export { random, authentication };
