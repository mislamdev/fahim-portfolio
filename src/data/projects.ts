export interface ProjectData {
  id: string;
  title: string;
  genre: string;
  role: string;
  type: 'personal' | 'professional';
  image: string;
  
  // Detail page content
  overview: {
    description: string[];
    engine: string;
    timeframe: string;
    team: string;
  };
  
  roleSkills: {
    description: string[];
    badges: string[];
  };
  
  screenshots: string[];
  
  sections: {
    title: string;
    id: string;
    content: string[];
    bullets?: string[];
    images?: string[];
    subsections?: {
      title: string;
      bullets?: string[];
      pillars?: { icon: string; title: string; subtitle: string }[];
    }[];
  }[];
  
  links?: {
    playStore?: string;
    github?: string;
  };
}

export const projects: ProjectData[] = [
  // Personal Projects
  {
    id: 'survivor-io',
    title: 'UE5 Survivor.io Clone',
    genre: 'Top-Down - Action Survival',
    role: 'Game Development',
    type: 'personal',
    image: '/projects/survivor-io.jpg',
    overview: {
      description: [
        'A top-down action survival game built in Unreal Engine 5, inspired by the popular Survivor.io mobile game.',
        'Features wave-based enemy spawning, power-up systems, and intense gameplay mechanics designed for maximum engagement.',
      ],
      engine: 'Unreal Engine 5',
      timeframe: '4 weeks',
      team: 'Solo Project',
    },
    roleSkills: {
      description: [
        'Full game development from concept to playable prototype',
        'C++ gameplay programming and Blueprint integration',
        'Enemy AI behavior and spawning systems',
        'Power-up and progression mechanics',
      ],
      badges: ['C++', 'Blueprints', 'AI Systems', 'Game Mechanics'],
    },
    screenshots: [
      '/projects/survivor-io.jpg',
    ],
    sections: [
      {
        title: 'Game Design',
        id: 'game-design',
        content: [
          'The core design focuses on delivering an engaging survival experience with escalating difficulty and satisfying progression loops.',
        ],
        subsections: [
          {
            title: 'Core Mechanics',
            bullets: [
              'Auto-attack system with upgradeable weapons',
              'Wave-based enemy spawning with increasing difficulty',
              'Experience orbs and leveling system',
              'Power-up selection between waves',
            ],
          },
          {
            title: 'Design Pillars',
            pillars: [
              { icon: '🎮', title: 'Accessibility', subtitle: 'Easy to play, hard to master' },
              { icon: '⚔️', title: 'Progression', subtitle: 'Constant power growth' },
              { icon: '🎯', title: 'Challenge', subtitle: 'Escalating difficulty' },
              { icon: '🏆', title: 'Reward', subtitle: 'Satisfying feedback' },
            ],
          },
        ],
      },
      {
        title: 'Technical Implementation',
        id: 'technical',
        content: [
          'Built using C++ for core systems with Blueprint visual scripting for rapid iteration on gameplay elements.',
        ],
        bullets: [
          'Object pooling for efficient enemy spawning',
          'Behavior trees for enemy AI',
          'Data-driven weapon and upgrade system',
          'Optimized for smooth performance',
        ],
      },
    ],
    links: {
      github: 'https://github.com/FahimKamal/UE5_Survivor_io',
    },
  },
  {
    id: 'dungeon-adventure',
    title: 'UE5 Dungeon Adventure',
    genre: 'Third Person - Arena Combat',
    role: 'Game Development',
    type: 'personal',
    image: '/projects/dungeon-adventure.jpg',
    overview: {
      description: [
        'A wave-based arena fighter game with challenging combat mechanics built in Unreal Engine 5.',
        'Features tight third-person combat, enemy variety, and progressive difficulty scaling.',
      ],
      engine: 'Unreal Engine 5',
      timeframe: '6 weeks',
      team: 'Solo Project',
    },
    roleSkills: {
      description: [
        'Combat system design and implementation',
        'Enemy AI with varied attack patterns',
        'Arena level design for optimal gameplay flow',
        'Animation integration and combat feel',
      ],
      badges: ['C++', 'Combat Design', 'AI', 'Level Design'],
    },
    screenshots: [
      '/projects/dungeon-adventure.jpg',
    ],
    sections: [
      {
        title: 'Combat Design',
        id: 'combat-design',
        content: [
          'The combat system emphasizes timing, positioning, and enemy pattern recognition.',
        ],
        bullets: [
          'Melee combo system with light and heavy attacks',
          'Dodge and parry mechanics for defense',
          'Enemy telegraph system for readable attacks',
          'Stagger and knockback for combat feedback',
        ],
      },
      {
        title: 'Wave System',
        id: 'wave-system',
        content: [
          'Progressive wave-based challenges that introduce new enemy types and combinations.',
        ],
        bullets: [
          'Escalating enemy count per wave',
          'New enemy types introduced at milestone waves',
          'Boss encounters at wave intervals',
          'Score and survival time tracking',
        ],
      },
    ],
    links: {
      github: 'https://github.com/FahimKamal/UE5_DungeonAdvanture',
    },
  },
  {
    id: 'hybrid-rpg',
    title: 'UE5 Hybrid RPG',
    genre: 'Third Person - Action RPG',
    role: 'Game Development',
    type: 'personal',
    image: '/projects/hybrid-rpg.jpg',
    overview: {
      description: [
        'An action RPG set in ancient China with hybrid gameplay mechanics combining exploration, combat, and narrative.',
        'Features immersive storytelling and exploration in a richly designed world.',
      ],
      engine: 'Unreal Engine 5',
      timeframe: '8 weeks',
      team: 'Solo Project',
    },
    roleSkills: {
      description: [
        'World building and environment design',
        'Quest and narrative system implementation',
        'Combat system with RPG elements',
        'Character progression and inventory systems',
      ],
      badges: ['C++', 'World Design', 'Narrative', 'RPG Systems'],
    },
    screenshots: [
      '/projects/hybrid-rpg.jpg',
    ],
    sections: [
      {
        title: 'World Design',
        id: 'world-design',
        content: [
          'The world is designed to evoke the atmosphere of ancient China with careful attention to architectural and environmental details.',
        ],
        bullets: [
          'Traditional Chinese architecture and landmarks',
          'Open world exploration with points of interest',
          'Environmental storytelling through world details',
          'Day-night cycle affecting gameplay',
        ],
      },
      {
        title: 'RPG Systems',
        id: 'rpg-systems',
        content: [
          'Deep character progression systems that allow players to customize their playstyle.',
        ],
        bullets: [
          'Skill tree with multiple paths',
          'Equipment and inventory management',
          'Quest journal and objective tracking',
          'Dialogue system with choices',
        ],
      },
    ],
    links: {
      github: 'https://github.com/FahimKamal/UE5_HybridRPG',
    },
  },
  
  // Professional Projects
  {
    id: 'falltastic',
    title: 'FallTastic',
    genre: 'Casual - 3D Puzzle',
    role: 'Lead Developer',
    type: 'professional',
    image: '/projects/falltastic.jpg',
    overview: {
      description: [
        'FallTastic is a casual 3D puzzle game where players guide falling objects to create satisfying chain reactions.',
        'As Lead Developer, I oversaw the entire game development process from concept to Play Store release.',
      ],
      engine: 'Unity',
      timeframe: '12 weeks',
      team: 'Nova Labs (4 members)',
    },
    roleSkills: {
      description: [
        'Led the project overseeing game design and mechanics',
        'Collaborated with team to define gameplay features and style',
        'Built and integrated the 3D game world',
        'Implemented dynamic building animations',
        'Conceptualized UI layout and guided implementation',
      ],
      badges: ['Lead Developer', 'Game Design', 'Unity', 'Team Management'],
    },
    screenshots: [
      '/projects/falltastic.jpg',
    ],
    sections: [
      {
        title: 'Game Design',
        id: 'game-design',
        content: [
          'The core gameplay loop focuses on satisfying physics-based interactions and strategic placement.',
        ],
        subsections: [
          {
            title: 'Core Features',
            bullets: [
              'Physics-based puzzle mechanics',
              'Progressive difficulty curve',
              'Satisfying visual and audio feedback',
              'Star-based scoring system',
            ],
          },
          {
            title: 'Design Pillars',
            pillars: [
              { icon: '🧩', title: 'Accessibility', subtitle: 'Easy to understand' },
              { icon: '✨', title: 'Satisfaction', subtitle: 'Rewarding feedback' },
              { icon: '📈', title: 'Progression', subtitle: 'Gradual challenge' },
              { icon: '🎨', title: 'Polish', subtitle: 'Visual appeal' },
            ],
          },
        ],
      },
      {
        title: 'Technical Development',
        id: 'technical',
        content: [
          'Built with Unity for optimal mobile performance and cross-platform compatibility.',
        ],
        bullets: [
          'Optimized physics calculations for mobile',
          'Dynamic building animation system',
          'Modular level design architecture',
          'Analytics integration for player insights',
        ],
      },
      {
        title: 'Leadership & Production',
        id: 'production',
        content: [
          'Managed a team of 4 including 3D designers, 2D artists, and developers.',
        ],
        bullets: [
          'Created Game Design Documents (GDD)',
          'Assigned tasks and monitored progress',
          'Ensured deadlines were met',
          'Handled Play Store publishing and updates',
        ],
      },
    ],
    links: {
      playStore: 'https://play.google.com/store/apps/details?id=com.novalabs.falltastic',
    },
  },
  {
    id: 'boat-blitz',
    title: 'Boat Blitz',
    genre: 'Casual - Infinite Runner',
    role: 'Game Engine Engineer',
    type: 'professional',
    image: '/projects/boat-blitz.jpg',
    overview: {
      description: [
        'Boat Blitz is an endless runner game featuring speedboat racing across infinite oceans with dynamic environments.',
        'I developed core systems including infinite terrain generation and day-night cycles.',
      ],
      engine: 'Unity',
      timeframe: '10 weeks',
      team: 'Nova Labs (3 members)',
    },
    roleSkills: {
      description: [
        'Developed infinite water and island generation system',
        'Implemented day-night cycle with lighting',
        'Designed and integrated all UI elements',
        'Optimized performance for mobile devices',
      ],
      badges: ['Unity', 'C#', 'Procedural Generation', 'UI/UX'],
    },
    screenshots: [
      '/projects/boat-blitz.jpg',
    ],
    sections: [
      {
        title: 'Procedural Generation',
        id: 'procedural',
        content: [
          'The infinite ocean system dynamically generates terrain to create an endless gameplay experience.',
        ],
        bullets: [
          'Chunk-based terrain generation',
          'Object pooling for performance',
          'Dynamic island placement algorithms',
          'Seamless loading with no stutters',
        ],
      },
      {
        title: 'Visual Systems',
        id: 'visual',
        content: [
          'Implemented atmospheric systems to enhance immersion and visual variety.',
        ],
        bullets: [
          'Real-time day-night cycle',
          'Dynamic lighting and shadows',
          'Water shader with reflections',
          'Weather effects integration',
        ],
      },
    ],
    links: {
      playStore: 'https://play.google.com/store/apps/details?id=com.novalabs.bb',
    },
  },
  {
    id: 'temple-of-masks',
    title: 'Temple of Masks',
    genre: 'Puzzle - Level Based',
    role: 'Level Designer (70 levels)',
    type: 'professional',
    image: '/projects/temple-of-masks.jpg',
    overview: {
      description: [
        'Temple of Masks is a puzzle game set in ancient Mayan temples where players solve increasingly complex challenges.',
        'I designed and developed 70 levels (levels 31-100) with progressive difficulty and cultural elements.',
      ],
      engine: 'Unity',
      timeframe: '16 weeks',
      team: 'Nova Labs (4 members)',
    },
    roleSkills: {
      description: [
        'Designed 70 unique puzzle levels',
        'Implemented progressive difficulty curve',
        'Added Mayan culture fact pop-ups',
        'Documented all C# classes and functions',
      ],
      badges: ['Level Design', 'Puzzle Design', 'Documentation', 'Cultural Research'],
    },
    screenshots: [
      '/projects/temple-of-masks.jpg',
    ],
    sections: [
      {
        title: 'Level Design',
        id: 'level-design',
        content: [
          'Each level was carefully crafted to introduce new mechanics and challenge player mastery.',
        ],
        subsections: [
          {
            title: 'Design Approach',
            bullets: [
              'Tutorial levels for new mechanics',
              'Gradual complexity increase',
              'Multiple solution paths where appropriate',
              'Hint system for stuck players',
            ],
          },
          {
            title: 'Design Pillars',
            pillars: [
              { icon: '🧠', title: 'Challenge', subtitle: 'Engaging puzzles' },
              { icon: '📚', title: 'Learning', subtitle: 'Teach mechanics' },
              { icon: '🎭', title: 'Theme', subtitle: 'Mayan culture' },
              { icon: '⭐', title: 'Satisfaction', subtitle: 'Rewarding solves' },
            ],
          },
        ],
      },
      {
        title: 'Cultural Integration',
        id: 'cultural',
        content: [
          'Proposed and implemented educational elements to enhance player immersion.',
        ],
        bullets: [
          'Mayan culture fact pop-ups between levels',
          'Thematically appropriate puzzle mechanics',
          'Visual elements inspired by Mayan art',
          'Soundtrack reflecting the setting',
        ],
      },
      {
        title: 'Documentation',
        id: 'documentation',
        content: [
          'Created comprehensive documentation for future developer reference.',
        ],
        bullets: [
          'Documented all C# classes and functions',
          'Level design guidelines document',
          'Puzzle mechanic specifications',
          'Difficulty curve analysis',
        ],
      },
    ],
    links: {
      playStore: 'https://play.google.com/store/apps/details?id=com.novalabs.tom',
    },
  },
];

export const getProjectById = (id: string): ProjectData | undefined => {
  return projects.find(p => p.id === id);
};

export const getProjectsByType = (type: 'personal' | 'professional'): ProjectData[] => {
  return projects.filter(p => p.type === type);
};
