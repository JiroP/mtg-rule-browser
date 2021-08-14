/* eslint-disable no-useless-escape */
import { RuleContents, Section } from '../types';

type RuleType = 'section' | 'chapter' | 'rule' | 'subRule';
interface SubRule {
  title: string;
}
interface Rule {
  title: string;
  subRules: { [key: string]: SubRule }
}
interface Chapter {
  title: string;
  rules: { [key: string]: Rule }
}
interface SectionTemp {
  title: string;
  chapters: { [key: string]: Chapter }
}
interface RulesObject {
  [key: string]: SectionTemp;
}

const parseRulesToObject = (data: string): RuleContents => {
  // Groups paragraphs between empty lines or empty line with space
  const lines = data.replace(/\r\n/g, '\n')
    .split(/\n{2,}|\n \n/g);

  const rulesStartIndex = lines.findIndex((line) => line === 'Credits') + 1;
  const glossaryStartIndex = lines
    .slice(rulesStartIndex)
    .findIndex((line) => line === 'Glossary');

  const rulesData = lines.slice(
    rulesStartIndex,
    rulesStartIndex + glossaryStartIndex,
  );

  console.log(rulesData);

  const rulesObject: RulesObject = {};

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

        rulesObject[sKey] = { title, chapters: {} };
        break;
      }
      case 'chapter': {
        const sKey = getSectionKey(title);
        const cKey = getChapterKey(title);

        rulesObject[sKey]
          .chapters[cKey] = {
            title, rules: {},
          };
        break;
      }
      case 'rule': {
        const sKey = getSectionKey(title);
        const cKey = getChapterKey(title);
        const rKey = getRuleKey(title);

        rulesObject[sKey]
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

        rulesObject[sKey]
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

  rulesData.forEach((rule) => {
    const type = getLineType(rule);
    insertRuleToRulesObject(rule, type);
  });

  console.log(rulesObject);

  // Sections always start with number followed by a . and space
  const sectionFilter = (rule: string): boolean => (
    new RegExp('^\\d. ').test(rule)
  );
  // Chapters start with 3 numbers followed by a . and space
  const chaptersFilter = (rule: string): boolean => (
    new RegExp('^\\d{3}. ').test(rule)
  );

  const sections = rulesData.filter(sectionFilter);
  const chapters = rulesData.filter(chaptersFilter);

  const getSectionChapters = (section: string): string[] => {
    const sectionChapters = chapters.filter((chapter) => (
      chapter.startsWith(section[0])
    ));
    return sectionChapters;
  };

  const tableOfContentsData = sections.reduce<Section[]>(
    (acc, section) => [...acc,
      {
        name: section,
        chapters: getSectionChapters(section),
      }],
    [],
  );

  return { tableOfContentsData, rulesData };
};

export default parseRulesToObject;
