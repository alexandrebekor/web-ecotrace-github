import { users } from "./http/routes/users.route";
import { env } from "./lib/env";
import { app } from "./server";

app.listen({
  host: env.HOST,
  port: env.PORT
}).then(() => {
  console.log(`Started in PORT: ${env.PORT}`)
})