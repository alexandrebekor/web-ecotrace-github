import { app } from "./server";

app.get('/', (request, response) => {
  return response.status(200).send({
    message: 'hello'
  })
})

app.listen({
  host: "0.0.0.0",
  port: 3333
}).then(() => console.log(`Started in PORT: ${3333}`))