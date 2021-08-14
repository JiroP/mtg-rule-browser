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
      {Object.entries(rulesDict).map(([id, { title, chapters }]) => (
        <SectionContainer
          key={`Section-${title}`}
          id={id}
          title={title}
          chapters={chapters}
        />
      ))}
    </>
  );
};

export default TableOfContents;
