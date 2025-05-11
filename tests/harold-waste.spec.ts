import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { NavigationPage } from './pages/NavigationPage';
import loginData from './test-data/login-data.json';

test.describe('Harold Waste Application Tests', () => {
    let loginPage: LoginPage;
    let navigationPage: NavigationPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        navigationPage = new NavigationPage(page);
        await loginPage.navigateToLoginPage();
        
        // Verify we're on the login page
        expect(await loginPage.isOnLoginPage()).toBeTruthy();
    });

    test('Successful login with valid credentials', async ({ page }) => {
        // Take screenshot before login
        await page.screenshot({ path: 'before-login.png' });
        
        await loginPage.login(
            loginData.validCredentials.email,
            loginData.validCredentials.password
        );
        
        // Take screenshot after login attempt
        await page.screenshot({ path: 'after-login.png' });
        
        // Add a small delay to allow for any animations or state changes
        await page.waitForTimeout(2000);
        
        const isLoggedIn = await loginPage.isLoggedIn();
        console.log('Login status:', isLoggedIn);
        
        // If login failed, take a screenshot of the current state
        if (!isLoggedIn) {
            await page.screenshot({ path: 'login-failed.png' });
        }
        
        expect(isLoggedIn).toBeTruthy();
    });

    test('Failed login with invalid credentials', async ({ page }) => {
        for (const invalidCred of loginData.invalidCredentials) {
            await loginPage.login(invalidCred.email, invalidCred.password);
            
            // Wait for error popup to appear
            await loginPage.waitForErrorPopup();
            
            // Verify error popup is visible
            expect(await loginPage.isErrorPopupVisible()).toBeTruthy();
            
            // Get and verify error message
            const errorMessage = await loginPage.getErrorMessage();
            expect(errorMessage).toContain(invalidCred.expectedError);
            
            // Take screenshot of the error
            await page.screenshot({ path: `error-${invalidCred.email}.png` });
        }
    });

    test('Navigation to different sections after login', async ({ page }) => {
        // Login first
        await loginPage.login(
            loginData.validCredentials.email,
            loginData.validCredentials.password
        );

        // Verify login was successful before proceeding
        expect(await loginPage.isLoggedIn()).toBeTruthy();

        // Test navigation to different sections
        await navigationPage.navigateToSuppliersAndSites();
        await expect(page).toHaveURL(/.*suppliers/);

        await navigationPage.navigateToPurchasesTrading();
        await expect(page).toHaveURL(/.*purchases/);

        await navigationPage.navigateToSales();
        await expect(page).toHaveURL(/.*sales/);

        await navigationPage.navigateToInventory();
        await expect(page).toHaveURL(/.*inventory/);
    });

    test('Complete login and logout flow', async ({ page }) => {
        // Login
        await loginPage.login(
            loginData.validCredentials.email,
            loginData.validCredentials.password
        );
        expect(await loginPage.isLoggedIn()).toBeTruthy();

        // Logout
        await loginPage.logout();
        expect(await loginPage.isLoggedIn()).toBeFalsy();
    });
}); 