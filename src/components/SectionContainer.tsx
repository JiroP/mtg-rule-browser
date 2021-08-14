import React from 'react';
import { Section } from '../types';
import ChapterContainer from './ChapterContainer';

const SectionContainer: React.FC<Section> = ({
  chapters,
  title,
}) => (
  <>
    <div>{title}</div>
    {Object.values(chapters).map((chapter) => (
      <ChapterContainer rules={chapter.rules} title={chapter.title} />
    ))}
  </>
);

export default SectionContainer;
