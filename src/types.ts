export interface Section {
  chapters: string[];
  name: string;
}

export interface RuleContents {
  tableOfContentsData: Section[];
  rulesData: string[];
}
