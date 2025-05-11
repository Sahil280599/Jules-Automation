import { test, expect } from '@playwright/test';
import { GraphQLClient } from '../utils/graphqlClient';
import { 
    LOGIN_MUTATION, 
    GET_USER_PROFILE, 
    GET_SUPPLIERS, 
    GET_CUSTOMERS 
} from './graphql-queries';
import loginData from '../test-data/login-data.json';

test.describe('Harold Waste API Tests', () => {
    let graphqlClient: GraphQLClient;
    let authToken: string;

    test.beforeAll(async () => {
        graphqlClient = new GraphQLClient('https://demo.api.julesai.com/graphql');
        await graphqlClient.init();
    });

    test.afterAll(async () => {
        await graphqlClient.dispose();
    });

    test('Successful login via API', async () => {
        const response = await graphqlClient.mutation(LOGIN_MUTATION, {
            email: loginData.validCredentials.email,
            password: loginData.validCredentials.password
        });

        expect(response.status).toBe(200);
        expect(response.data.login).toBeTruthy();
        expect(response.data.login.token).toBeTruthy();
        expect(response.data.login.user.email).toBe(loginData.validCredentials.email);

        // Store token for subsequent requests
        authToken = response.data.login.token;
        await graphqlClient.setAuthToken(authToken);
    });

    test('Failed login with invalid credentials', async () => {
        for (const invalidCred of loginData.invalidCredentials) {
            const response = await graphqlClient.mutation(LOGIN_MUTATION, {
                email: invalidCred.email,
                password: invalidCred.password
            });

            expect(response.status).toBe(200); // GraphQL typically returns 200 even for errors
            expect(response.errors).toBeTruthy();
            expect(response.errors[0].message).toContain(invalidCred.expectedError);
        }
    });

    test('Get user profile with valid token', async () => {
        const response = await graphqlClient.query(GET_USER_PROFILE);

        expect(response.status).toBe(200);
        expect(response.data.me).toBeTruthy();
        expect(response.data.me.email).toBe(loginData.validCredentials.email);
    });

    test('Get user profile without token', async () => {
        // Create a new client without auth token
        const unauthorizedClient = new GraphQLClient('https://demo.api.julesai.com/graphql');
        await unauthorizedClient.init();

        const response = await unauthorizedClient.query(GET_USER_PROFILE);

        expect(response.status).toBe(200); // GraphQL typically returns 200
        expect(response.errors).toBeTruthy();
        expect(response.errors[0].message).toContain('Unauthorized');

        await unauthorizedClient.dispose();
    });

    test('Get suppliers data', async () => {
        const response = await graphqlClient.query(GET_SUPPLIERS);

        expect(response.status).toBe(200);
        expect(response.data.suppliers).toBeTruthy();
        expect(Array.isArray(response.data.suppliers)).toBeTruthy();
    });

    test('Get customers data', async () => {
        const response = await graphqlClient.query(GET_CUSTOMERS);

        expect(response.status).toBe(200);
        expect(response.data.customers).toBeTruthy();
        expect(Array.isArray(response.data.customers)).toBeTruthy();
    });

    test('Handle malformed query', async () => {
        const malformedQuery = `
            query {
                invalidField
            }
        `;

        const response = await graphqlClient.query(malformedQuery);

        expect(response.status).toBe(200); // GraphQL typically returns 200
        expect(response.errors).toBeTruthy();
        expect(response.errors[0].message).toContain('Cannot query field');
    });
}); 