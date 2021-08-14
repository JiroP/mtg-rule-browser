/* eslint-disable no-useless-escape */
import { RuleContents, RulesDict, RuleType } from '../types';

const parseRulesToObject = (data: string): RuleContents => {
  const rulesDict: RulesDict = {};

  const isSection = (line: string): boolean => (
    new RegExp('^\\d[.] ').test(line)
  );

  const isChapter = (line: string): boolean => (
    new RegExp('^\\d{3}[.] ').test(line)
  );

  const isRule = (line: string): boolean => (
    new RegExp('^\\d{3}[.]\\d{1,3}[.] ').test(line)
  );

  const getLineType = (line: string): RuleType => {
    if (isSection(line)) return 'section';
    if (isChapter(line)) return 'chapter';
    if (isRule(line)) return 'rule';
    return 'subRule';
  };

  const insertRuleToRulesObject = (title: string, type: RuleType): void => {
    const ruleDigits = (line: string): number => (
      line.slice(4, 7).replace(/\D/g, '').length
    );

    const getSectionKey = (line: string): string => line[0];

    const getChapterKey = (line: string): string => line.slice(1, 3);

    const getRuleKey = (line: string): string => {
      const digits = ruleDigits(line);

      return line.slice(4, 4 + digits);
    };

    const getSubRuleKey = (line: string): string => {
      const digits = ruleDigits(line);

      return line[4 + digits];
    };

    switch (type) {
      case 'section': {
        const sKey = getSectionKey(title);

        rulesDict[sKey] = { title, chapters: {} };
        break;
      }
      case 'chapter': {
        const sKey = getSectionKey(title);
        const cKey = getChapterKey(title);

        rulesDict[sKey]
          .chapters[cKey] = {
            title, rules: {},
          };
        break;
      }
      case 'rule': {
        const sKey = getSectionKey(title);
        const cKey = getChapterKey(title);
        const rKey = getRuleKey(title);

        rulesDict[sKey]
          .chapters[cKey]
          .rules[rKey] = {
            title,
            subRules: {},
          };
        break;
      }
      case 'subRule': {
        const sKey = getSectionKey(title);
        const cKey = getChapterKey(title);
        const rKey = getRuleKey(title);
        const sRKey = getSubRuleKey(title);

        rulesDict[sKey]
          .chapters[cKey]
          .rules[rKey]
          .subRules[sRKey] = {
            title,
          };
        break;
      }
      default:
        break;
    }
  };

  // Groups paragraphs between empty lines or empty line with space
  const lines = data.replace(/\r\n/g, '\n')
    .split(/\n{2,}|\n \n/g);

  const rulesStartIndex = lines.findIndex((line) => line === 'Credits') + 1;
  const glossaryStartIndex = lines
    .slice(rulesStartIndex)
    .findIndex((line) => line === 'Glossary');

  const rulesArray = lines.slice(
    rulesStartIndex,
    rulesStartIndex + glossaryStartIndex,
  );

  rulesArray.forEach((rule) => {
    const type = getLineType(rule);
    insertRuleToRulesObject(rule, type);
  });

  return { rulesDict, rulesArray };
};

export default parseRulesToObject;
