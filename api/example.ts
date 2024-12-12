import { ErrorResponse, ResponseObjectMap } from 'openapi-typescript-helpers';
import { ClientOptions } from 'openapi-fetch';
import { create } from '@/api/api';
import { operations } from '@/api/api.openapi';

const clientOptions: ClientOptions = {
  baseUrl: 'http://localhost:8080',
};

const client = create(clientOptions);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FetchRequestBody<T extends Record<string | number, any>> = T

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FetchResponse<T extends Record<string | number, any>> = {
  data?: T;
  error?: ErrorResponse<ResponseObjectMap<T>>;
  response: Response;
}

type IssueBillResponse = FetchResponse<NonNullable<operations['issue']['responses']>['200']['content']['application/json']>;
type IssueBillRequestBody = FetchRequestBody<NonNullable<operations['issue']['requestBody']>['content']['application/json']>;

const issueBill = async (body: IssueBillRequestBody) : Promise<IssueBillResponse> => {
  const { data, error, response } = await client.POST('/bill/issue', { body });
  return {data, error, response };
}

// -----------------------------

issueBill({
    type: 1,
    country_of_issuing: 'Sweden',
    city_of_issuing: 'Stockholm',
    issue_date: new Date().toISOString(),
    city_of_payment: 'Stockholm',
    country_of_payment: 'Sweden',
    payer: 'Johanna Smith',
    language: 'en'
  })
  .then(({ response}) => {
    console.log(response);
  })
  .catch((error: unknown) => {
    console.error(error);
  });
