import './HardSkills.css';
import { Icon } from '../Icon';
import { AllSkills } from '../../models';

interface HardSkillsProps {
    skills: AllSkills;
}

type Category = 'frontend' | 'backend' | 'data' | 'devops' | 'devtools';

const categoryDisplayNames: Record<Category, string> = {
    frontend: 'Frontend',
    backend: 'Backend',
    data: 'Data Storage',
    devops: 'DevOps',
    devtools: 'DevTools'
};

const proficiencyDisplayNames: Record<string, string> = {
    expert: 'Expert',
    advanced: 'Advanced',
    intermediate: 'Intermediate',
    beginner: 'Beginner'
};

export default function HardSkills({ skills }: HardSkillsProps) {
    // Filter and group skills by category
    const categorizedSkills = skills.reduce((acc, [key, skill]) => {
        if (skill.type === 'hard' && skill.category && ['frontend', 'backend', 'data', 'devops', 'devtools'].includes(skill.category)) {
            const category = skill.category as Category;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push([key, skill]);
        }
        return acc;
    }, {} as Record<Category, AllSkills>);

    return (
        <div className="hard-skills-section fade-in-on-scroll">
            <h2 className="audiowide-regular section-title">Technical Skills</h2>
            <div className="hard-skills-grid">
                {(Object.keys(categoryDisplayNames) as Category[]).map((category) => {
                    const categorySkills = categorizedSkills[category];
                    if (!categorySkills || categorySkills.length === 0) return null;

                    return (
                        <div key={category} className="skill-category-card">
                            <h3 className="electrolize category-title">{categoryDisplayNames[category]}</h3>
                            <ul className="skills-list">
                                {categorySkills.map(([key, skill]) => (
                                    <li key={key} className="skill-item">
                                        <Icon
                                            width="32"
                                            height="32"
                                            link={skill.link!}
                                            name={skill.name}
                                        />
                                        <span className="skill-name">{skill.name}</span>
                                        <span className="skill-proficiency">
                                            {proficiencyDisplayNames[skill.proficiency || 'intermediate']}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
