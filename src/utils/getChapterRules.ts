const getChapterRules = (chapter: string, rulesData: string[]): string[] => {
  const chapterKey = chapter.slice(0, 3);

  return rulesData.filter((rule) => rule.startsWith(chapterKey)).slice(1);
};

export default getChapterRules;
