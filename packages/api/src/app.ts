import { env } from "./lib/env";
import { app } from "./server";

app.get('/', (request, response) => {
  return response.status(200).send({
    message: 'hello'
  })
})

app.listen({
  host: env.HOST,
  port: env.PORT
}).then(() => {
  console.log(`Started in PORT: ${env.PORT}`)
})