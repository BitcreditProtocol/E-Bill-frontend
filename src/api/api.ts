import createClient from 'openapi-fetch'
import type { paths } from './api.openapi'

const create = createClient<paths>;

const client = create({
  baseUrl: 'http://localhost:8080',
});

export {
  client,
  create
}
