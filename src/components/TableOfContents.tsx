import React, { ReactElement } from 'react';
import { RuleContents } from '../types';
import SectionContainer from './SectionContainer';

const TableOfContents: React.FC<RuleContents> = ({
  tableOfContentsData,
  rulesData,
}): ReactElement | null => {
  if (!tableOfContentsData.length) {
    return null;
  }

  return (
    <>
      {tableOfContentsData.map(({ name, chapters }) => (
        <SectionContainer
          key={`Section-${name}`}
          name={name}
          chapters={chapters}
          rules={rulesData}
        />
      ))}
    </>
  );
};

export default TableOfContents;
