
For now you have to manually transform the postman collection to openapi.

See: https://www.postman.com/postman/405e0480-49cf-463b-8052-6c0d05a8e8f3/request/l9w7uk2/generate-an-openapi-schema

- Go to the above url and generate an openapi yml file.
- Replace the `api.openapi.yml` file in the `./api/` folder.
- Run `npm run openapi:generate` to generate the `api.openapi.d.ts` file in `./src/api/`.

Note: Libraries like `postman-to-openapi` are not working correctly (last tested on 2024-12-12).
