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

  console.log(lines[rulesStartIndex]);

  return [];
};

export default parseRulesToObject;
