/* Skills სექცია */
import React from 'react';
import SectionCard from '../ui/SectionCard';
import SkillBar from '../ui/SkillBar';
import { skills, skillDetails } from '../../data/portfolioData';

export default function Skills() {
  return (
    <SectionCard id="skills" title="უნარები და ტექნოლოგიები">
      <ul className="skills-list" style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {skills.map(skill => (
          <SkillBar key={skill.id} {...skill} />
        ))}
      </ul>

      <details>
        <summary>დამატებითი დეტალები სასწავლო პროგრამის შესახებ</summary>
        <ul>
          {skillDetails.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </details>
    </SectionCard>
  );
}

