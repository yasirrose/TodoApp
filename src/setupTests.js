import { setupServer } from 'msw/node';
import { handlers } from './mocks/handlers';
import fetch from 'node-fetch';



const server = setupServer(...handlers)


global.fetch = fetch


beforeAll(() => {
  server.listen()
})


afterEach(() => {
  server.resetHandlers()
})


afterAll(() => {
  server.close()
})
