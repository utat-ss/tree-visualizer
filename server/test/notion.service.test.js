const notion = require('@notionhq/client');
const notionService = require('../src/services/notion.service');
const NotionAPIMocks = require('./mock-notion-api');

let apiMocks;

beforeAll(() => {
    apiMocks = new NotionAPIMocks();
})

describe('exported functions', () => {
    test('getRequirements exists', () => {
        expect(notionService.getRequirements).toBeDefined();
    });
    test('newNotionClient exists and returns correct Notion client object', () => {
        expect(notionService.newNotionClient).toBeDefined();
        expect(notionService.newNotionClient()).resolves.toBeInstanceOf(notion.Client);
    });
});


describe('internal functions', () => {
    test('_getNotionDB gets data and paginates correctly', async () => {
        let client = new notion.Client();
        let db_query_mock = jest.fn().mockReturnValueOnce(apiMocks.requirements_db_1).mockReturnValueOnce(apiMocks.requirements_db_2).mockReturnValueOnce(apiMocks.requirements_db_3);
        jest.replaceProperty(client, 'databases', { query: db_query_mock });

        let results = await notionService._getNotionDB("", client)
        expect(results).toBeDefined();
        expect(results).toHaveLength(3);
        expect(results[0].id).toBe('e72e315f-4e40-4a70-81ef-f491d88b38f1');
        expect(results[1].id).toBe('e72e315f-4e40-4a70-81ef-f491d88b38f2');
        expect(results[2].id).toBe('e72e315f-4e40-4a70-81ef-f491d88b38f3');
    });
});
