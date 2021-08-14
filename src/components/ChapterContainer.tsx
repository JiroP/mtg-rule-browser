import React, { ReactElement, useState } from 'react';
import { Chapter } from '../types';
import RulesContainer from './RulesContainer';

const ChapterContainer: React.FC<Chapter> = ({ rules, title }): ReactElement => {
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
        {title}
      </div>
      {
        rulesVisible && <RulesContainer rules={Object.values(rules)} />
      }
    </>
  );
};

export default ChapterContainer;
