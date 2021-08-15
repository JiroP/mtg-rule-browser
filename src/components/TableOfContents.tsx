import React, { ReactElement } from 'react';

import SectionComponent from './SectionComponent';
import { RuleContents } from '../types';

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
        <SectionComponent
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
