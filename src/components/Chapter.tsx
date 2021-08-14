import React, { ReactElement, useState } from 'react';
import getChapterRules from '../utils/getChapterRules';
import Rules from './Rules';

interface ChapterProps {
  chapter: string;
  rules: string[];
}

const Chapter: React.FC<ChapterProps> = ({ chapter, rules }): ReactElement => {
  const [rulesVisible, setRulesVisible] = useState(false);

  const handleClick = (): void => {
    setRulesVisible((prev) => !prev);
  };

  return (
    <>
      <div
        style={{ marginLeft: '10px' }}
        onClick={handleClick}
        onKeyDown={handleClick}
        role="button"
        tabIndex={0}
      >
        {chapter}
      </div>
      {
        rulesVisible && <Rules rules={getChapterRules(chapter, rules)} />
        // && getChapterRules(chapter, rules).map((rule) => (
        //   <div key={`rule-${rule}`} style={{ marginLeft: '20px' }}>
        //     {rule}
        //   </div>
        // ))
      }
    </>
  );
};

export default Chapter;
