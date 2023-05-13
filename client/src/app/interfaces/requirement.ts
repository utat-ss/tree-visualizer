export interface Requirement {
    id: string;
    'created-by': string;
    'parent-id': string;
    'last-edited': Date;
    qualifier: string;
    collection: Array<string>;
    'test-plans': Array<string>;
    system: string;
    rationale: string;
    trades: Array<string>;
    'last-edited-by': string;
    stakeholder: Array<string>;
    mission: string;
    description: string;
    title: string;
    url: URL;
}
