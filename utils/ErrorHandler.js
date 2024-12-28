export class ErrorHandler {
    static handleError(testName, error) {
        console.error(`${testName} failed:`, error);
        return `${testName} failed: ${error.message}`;
    }
}