# Harold Waste Automation Test Suite

This project contains automated tests for the Harold Waste application, including both UI and API testing using Playwright.

## 🚀 Features

- **UI Automation**
  - Login/Logout flows
  - Navigation testing
  - Data validation
  - Cross-browser testing support

- **API Testing**
  - GraphQL API testing
  - Authentication flows
  - Data consistency checks
  - Error handling scenarios

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd julesai-playwright-automation
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## 🏃‍♂️ Running Tests

### Run All Tests
```bash
npx playwright test
```

### Run UI Tests Only
```bash
npx playwright test --project=ui-tests
```

### Run API Tests Only
```bash
npx playwright test --project=api-tests
```

### Run Tests in Debug Mode
```bash
npx playwright test --debug
```

### Run Tests with UI Mode
```bash
npx playwright test --ui
```

## 📁 Project Structure

```
├── tests/
│   ├── api/                    # API test files
│   │   ├── harold-waste-api.spec.ts
│   │   └── graphql-queries.ts
│   ├── pages/                  # Page Object Models
│   │   ├── LoginPage.ts
│   │   └── NavigationPage.ts
│   ├── utils/                  # Utility functions
│   │   └── graphqlClient.ts
│   ├── test-data/             # Test data files
│   │   └── login-data.json
│   └── harold-waste.spec.ts   # UI test files
├── playwright.config.ts       # Playwright configuration
└── package.json
```

## 🔧 Configuration

The project uses Playwright's configuration file (`playwright.config.ts`) with the following settings:

- Timeouts:
  - Global test timeout: 60 seconds
  - Expect assertions timeout: 30 seconds
  - Action timeout: 30 seconds
  - Navigation timeout: 60 seconds

- Reporting:
  - HTML reports
  - List reporter
  - Screenshots on failure
  - Video recording on failure

## 📊 Test Reports

After running tests, view the HTML report:
```bash
npx playwright show-report
```

## 🔐 Test Data

Test data is stored in JSON format under `tests/test-data/`:
- `login-data.json`: Contains valid and invalid login credentials

## 🧪 Test Scenarios

### UI Tests
1. Login Scenarios
   - Valid login
   - Invalid login
   - Logout flow

2. Navigation Tests
   - Dashboard navigation
   - Menu interactions
   - Page transitions

### API Tests
1. Authentication
   - Login API
   - Token validation
   - Unauthorized access

2. Data Retrieval
   - User profile
   - Suppliers data
   - Customers data

3. Error Handling
   - Invalid queries
   - Authentication errors
   - Data validation

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Playwright team for the amazing testing framework
- Harold Waste team for providing the test environment 