import React, { ReactElement } from 'react';
import { RuleContents } from '../types';
import SectionContainer from './SectionContainer';

const TableOfContents: React.FC<RuleContents> = ({
  rulesArray,
  rulesDict,
}): ReactElement | null => {
  if (!rulesArray.length) {
    return null;
  }

  return (
    <>
      {Object.values(rulesDict).map(({ title, chapters }) => (
        <SectionContainer
          key={`Section-${title}`}
          title={title}
          chapters={chapters}
        />
      ))}
    </>
  );
};

export default TableOfContents;
