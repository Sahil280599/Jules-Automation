export const LOGIN_MUTATION = `
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                id
                email
                name
            }
        }
    }
`;

export const GET_USER_PROFILE = `
    query GetUserProfile {
        me {
            id
            email
            name
            role
        }
    }
`;

export const GET_SUPPLIERS = `
    query GetSuppliers {
        suppliers {
            id
            name
            email
            phone
        }
    }
`;

export const GET_CUSTOMERS = `
    query GetCustomers {
        customers {
            id
            name
            email
            phone
        }
    }
`; 