import { Briefcase, Code, Trophy, Gamepad2, GraduationCap, Award, Github, Wrench } from 'lucide-react';

const achievements = [
  { icon: Code, bold: 'Unreal Engine Specialist', muted: 'with extensive experience in Blueprint & C++' },
  { icon: Trophy, bold: '3D Level Designer', muted: 'crafting immersive game worlds and environments' },
  { icon: Briefcase, bold: 'Game Mechanic Engineer', muted: 'at Nova Labs, overseeing game mechanics implementation' },
  { icon: Gamepad2, bold: 'Lead Developer', muted: 'on multiple published mobile games' },
  { icon: GraduationCap, bold: 'Masters in Software Engineering', muted: 'currently pursuing at Universiti Teknologi Malaysia (UTM)' },
  { icon: GraduationCap, bold: 'B.Sc. in Computer Science', muted: 'from Pundra University with CGPA 3.67/4.0' },
  { icon: Award, bold: 'ICPC Asia Dhaka Regional', muted: 'participant and NCPC competitor' },
  { icon: Github, bold: 'GitHub Arctic Code Vault Contributor', muted: 'with 171 repositories and 152 stars' },
  { icon: Wrench, bold: 'Proficient', muted: 'in Unreal Engine 5, C++, Blueprint, Blender, and Git/GitHub' },
];

export function Journey() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-text-primary text-xl tracking-wide">A glimpse into my journey so far</h2>
          <div className="w-12 h-px bg-border mx-auto mt-3" />
        </div>

        <div className="space-y-4">
          {achievements.map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-accent">
                <item.icon className="w-5 h-5" />
              </div>
              <p className="text-left">
                <span className="text-text-primary font-medium">{item.bold}</span>
                {' '}
                <span className="text-text-muted">{item.muted}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
