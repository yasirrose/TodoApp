
import { rest } from 'msw'
import { fetch, Headers, Request, Response } from 'cross-fetch'





export const handlers = [

  
    rest.get('http://localhost:8000/api/token/verify/', (_, res, ctx) => {
      return res(ctx.status(200), ctx.json({
          "valid": true  
      }))

    }),

    rest.get('http://localhost:8000/todo/', (_, res, ctx) => {
      return res(ctx.status(200), ctx.json(
        []
      ))

    }),

]