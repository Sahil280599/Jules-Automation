import { APIRequestContext, request } from '@playwright/test';

export class GraphQLClient {
    private context: APIRequestContext;
    private baseUrl: string;
    private headers: Record<string, string>;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.headers = {
            'Content-Type': 'application/json',
        };
    }

    async init() {
        this.context = await request.newContext({
            baseURL: this.baseUrl,
            extraHTTPHeaders: this.headers,
        });
    }

    async query(query: string, variables: any = {}, headers: any = {}) {
        try {
            const response = await this.context.post('', {
                headers: {
                    ...this.headers,
                    ...headers,
                },
                data: {
                    query,
                    variables,
                },
            });

            const responseData = await response.json();
            
            if (responseData.errors) {
                console.error('GraphQL Errors:', responseData.errors);
            }

            return {
                status: response.status(),
                data: responseData.data,
                errors: responseData.errors,
            };
        } catch (error) {
            console.error('GraphQL Request Error:', error);
            throw error;
        }
    }

    async mutation(mutation: string, variables: any = {}, headers: any = {}) {
        return this.query(mutation, variables, headers);
    }

    async setAuthToken(token: string) {
        this.headers['Authorization'] = `Bearer ${token}`;
        // Create a new context with updated headers
        await this.dispose();
        await this.init();
    }

    async dispose() {
        await this.context.dispose();
    }
} 