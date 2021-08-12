type Rule = {
  id: string;
  text: string;
};

type Chapter = {
  rules: Rule[];
  name: string;
};

type Section = {
  chapters: Chapter[];
  name: string;
};

const parseRulesToObject = (data: string): Section[] => {
  console.log(data);

  // Split to array and filter empty elements
  const lines = data.split('\r\n').filter((ele) => ele);

  const rulesStartIndex = lines.findIndex((line) => line === 'Credits') + 1;
  const glossaryStartIndex = lines.slice(rulesStartIndex).findIndex((line) => line === 'Glossary');

  const rules = lines.slice(rulesStartIndex, rulesStartIndex + glossaryStartIndex);

  console.log(rules);

  return [];
};

export default parseRulesToObject;
