export interface Requirement {
    id: string;
    'created-by': string;
    parent: Array<string>;
    'last-edited': Date;
    qualifier: string;
    collection: string;
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
