import * as testData from '../data/user-data.json';

export class DataProvider {
    
    static getTestData(testName: keyof typeof testData) {
        return testData[testName];
    }
}