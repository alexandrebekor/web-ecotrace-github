import { FastifyReply, FastifyRequest } from "fastify";

export const signUp = async (request: FastifyRequest, response: FastifyReply) => {
  return response.status(200).send({
    message: 'Sign Up'
  })
}