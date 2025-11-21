import './SoftSkills.css';
import { AllSkills } from '../../models';

interface SoftSkillsProps {
    skills: AllSkills;
}

export default function SoftSkills({ skills }: SoftSkillsProps) {
    // Filter soft skills
    const softSkills = skills.filter(([_, skill]) => skill.type === 'soft');

    return (
        <div className="soft-skills-section fade-in-on-scroll">
            <h2 className="audiowide-regular section-title">Soft Skills</h2>
            <div className="soft-skills-grid">
                {softSkills.map(([key, skill]) => (
                    <div key={key} className="soft-skill-card">
                        <span className="skill-emoji">{skill.icon}</span>
                        <p className="skill-name offside-regular">{skill.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
