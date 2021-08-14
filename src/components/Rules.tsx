import React from 'react';

const Rules: React.FC<{ rules: string[] }> = ({ rules }) => {
  const rulesWithSubRules = rules.reduce<
    { rule: string; subRules: string[] }[]
  >(
    (acc, rule) => [
      ...acc,
      {
        rule,
        subRules: rules.filter(
          (r) => r.startsWith(rule.slice(0, 5)) && r !== rule,
        ),
      },
    ],
    [],
  );

  console.log(rulesWithSubRules);

  return <div>hei</div>;
};

export default Rules;
