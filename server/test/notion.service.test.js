const notionService = require('../src/services/notion.service');

test('getRequirements exists', () => {
    expect(notionService.getRequirements).toBeDefined();
});
