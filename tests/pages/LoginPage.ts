import { Page } from '@playwright/test';

export class LoginPage {
    private page: Page;

    // Selectors
    private emailInput = "//input[@name='email']";
    private passwordInput = "//input[@name='password']";
    private loginButton = "//button[@type='submit']//span[@class='MuiButton-label']";
    private profileButton = "div[data-test-id='header-menu'] div:nth-child(2) div:nth-child(1)";
    private updatePasswordButton = "//div[normalize-space()='Update password']";
    private logoutButton = "//div[normalize-space()='Log out']";

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToLoginPage() {
        try {
            // Navigate to the page
            await this.page.goto('https://demo.haroldwaste.com/', {
                waitUntil: 'domcontentloaded',
                timeout: 60000
            });

            // Wait for the email input to be visible instead of waiting for networkidle
            await this.page.waitForSelector(this.emailInput, {
                state: 'visible',
                timeout: 30000
            });
        } catch (error) {
            console.error('Error navigating to login page:', error);
            throw error;
        }
    }

    async login(email: string, password: string) {
        try {
            // Wait for email input to be visible
            await this.page.waitForSelector(this.emailInput, { 
                state: 'visible',
                timeout: 30000 
            });
            await this.page.fill(this.emailInput, email);
            
            // Wait for password input to be visible
            await this.page.waitForSelector(this.passwordInput, { 
                state: 'visible',
                timeout: 30000 
            });
            await this.page.fill(this.passwordInput, password);
            
            // Wait for login button to be visible and clickable
            await this.page.waitForSelector(this.loginButton, { 
                state: 'visible',
                timeout: 30000 
            });
            await this.page.click(this.loginButton);
            
            // Wait for navigation after login
            await this.page.waitForLoadState('domcontentloaded', { timeout: 30000 });
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    }

    async logout() {
        try {
            await this.page.click(this.profileButton);
            await this.page.click(this.logoutButton);
        } catch (error) {
            console.error('Error during logout:', error);
            throw error;
        }
    }

    async isLoggedIn() {
        try {
            // Wait for profile button with a timeout
            await this.page.waitForSelector(this.profileButton, { 
                timeout: 30000,
                state: 'visible'
            });
            const isVisible = await this.page.isVisible(this.profileButton);
            console.log('Profile button visibility:', isVisible);
            return isVisible;
        } catch (error) {
            console.log('Error checking login status:', error);
            return false;
        }
    }

    // New methods for error handling
    async waitForErrorPopup() {
        try {
            // Wait for any error message to appear
            await this.page.waitForSelector('div[role="alert"], .MuiAlert-root, .MuiSnackbar-root', { 
                timeout: 5000 
            });
        } catch (error) {
            console.log('No error popup found:', error);
        }
    }

    async getErrorMessage() {
        // Try different possible error message selectors
        const errorSelectors = [
            'div[role="alert"]',
            '.MuiAlert-message',
            '.MuiSnackbarContent-message',
            'div[class*="error"]',
            'div[class*="alert"]'
        ];

        for (const selector of errorSelectors) {
            const errorElement = await this.page.$(selector);
            if (errorElement) {
                return await errorElement.textContent();
            }
        }
        return null;
    }

    async isErrorPopupVisible() {
        const errorSelectors = [
            'div[role="alert"]',
            '.MuiAlert-root',
            '.MuiSnackbar-root'
        ];

        for (const selector of errorSelectors) {
            if (await this.page.isVisible(selector)) {
                return true;
            }
        }
        return false;
    }

    // New method to check if we're on the login page
    async isOnLoginPage() {
        try {
            return await this.page.isVisible(this.emailInput, { timeout: 5000 });
        } catch (error) {
            console.log('Error checking if on login page:', error);
            return false;
        }
    }
} 