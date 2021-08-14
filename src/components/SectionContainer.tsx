import React from 'react';
import { Section } from '../types';
import Chapter from './Chapter';

interface SectionContainerProps extends Section {
  rules: string[];
}

const SectionContainer: React.FC<SectionContainerProps> = ({
  name,
  chapters,
  rules,
}) => (
  <>
    <div>{name}</div>
    {chapters.map((chapter) => (
      <Chapter chapter={chapter} rules={rules} />
    ))}
  </>
);

export default SectionContainer;
