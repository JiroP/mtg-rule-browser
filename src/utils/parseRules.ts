type Section = {
  chapters: string[];
  name: string;
};

type RuleContents = {
  tableOfContentsData: Section[],
  rulesData: string[]
}

const parseRulesToObject = (data: string): RuleContents => {
  // console.log(data);

  // Split to array and filter empty elements
  const lines = data.split('\r\n').filter((ele) => ele);

  const rulesStartIndex = lines.findIndex((line) => line === 'Credits') + 1;
  const glossaryStartIndex = lines
    .slice(rulesStartIndex)
    .findIndex((line) => line === 'Glossary');

  const rulesData = lines.slice(
    rulesStartIndex,
    rulesStartIndex + glossaryStartIndex,
  );

  const sectionFilter = (rule: string): boolean => (
    new RegExp('^[0-9]. ').test(rule)
  );
  const chaptersFilter = (rule: string): boolean => (
    new RegExp('^[0-9][0-9][0-9]. ').test(rule)
  );

  const sections = rulesData.filter((sectionFilter));
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
