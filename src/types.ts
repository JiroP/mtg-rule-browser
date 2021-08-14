export type RuleType = 'section' | 'chapter' | 'rule' | 'subRule';
export interface SubRule {
  title: string;
}
export interface Rule {
  title: string;
  subRules: { [key: string]: SubRule }
}
export interface Chapter {
  title: string;
  rules: { [key: string]: Rule }
}
export interface Section {
  title: string;
  chapters: { [key: string]: Chapter }
}
export interface RulesDict {
  [key: string]: Section;
}

export interface RuleContents {
  rulesArray: string[];
  rulesDict: RulesDict;
}
