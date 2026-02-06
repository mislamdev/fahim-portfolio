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
  video?: string;
}

export const projects: ProjectData[] = [
  // Personal Projects
  {
    id: 'spellcaster',
    title: 'Spellcaster',
    genre: 'Top-Down - Action Survival',
    role: 'Solo Developer',
    type: 'personal',
    image: '/projects/spellcaster/Spellcaster-ss-1.png',
    overview: {
      description: [
        'A fast-paced top-down action survival game built with Unreal Engine 5 using Blueprints.',
        'Play as a sorcerer\'s apprentice battling waves of hostile slimes with upgradeable spells.',
      ],
      engine: 'Unreal Engine 5',
      timeframe: '4 weeks',
      team: 'Solo Project',
    },
    roleSkills: {
      description: [
        'Full game development using Blueprints visual scripting',
        'Implemented auto-casting combat system with multiple spell types',
        'Created enemy AI behavior for different slime types',
        'Designed progression system with XP drops and level-up upgrades',
      ],
      badges: ['Unreal Engine 5', 'Blueprints', 'Action Survival', 'Game Design'],
    },
    screenshots: [
      '/projects/spellcaster/Spellcaster-ss-1.png',
      '/projects/spellcaster/Spellcaster-ss-2.png',
      '/projects/spellcaster/Spellcaster-ss-3.png',
      '/projects/spellcaster/Spellcaster-ss-4.png',
      '/projects/spellcaster/Spellcaster-ss-5.png',
    ],
    sections: [
      {
        title: 'Game Mechanics',
        id: 'mechanics',
        content: [
          'The core loop involves surviving waves of enemies while collecting experience to upgrade your arsenal.',
        ],
        subsections: [
          {
            title: 'Spell System',
            bullets: [
              'Firebolt: Default auto-aimed projectile',
              'Ice Spear: Circling defensive projectiles that launch outwards',
              'Magic Orbs: Orbiting damage zone',
              'Wind Gale: Random area-of-effect blasts',
            ],
          },
          {
            title: 'Progression',
            bullets: [
              'XP Coins: Copper (5), Silver (15), Gold (50)',
              '5 Upgrade levels for each spell',
              'Health pickups for sustainability',
              'Escalating difficulty with stronger enemy types',
            ],
          },
        ],
      },
      {
        title: 'Technical Implementation',
        id: 'technical',
        content: [
          'Built entirely using Unreal Engine Blueprints to demonstrate visual scripting capabilities.',
        ],
        bullets: [
          'Modular spell system for easy expansion',
          'Wave management system handling spawn rates and enemy types',
          'Optimized projectile pooling',
          'Custom UI for health, XP, and upgrades',
        ],
      },
    ],
    links: {
      github: 'https://github.com/FahimKamal/UE5_Survivor_io',
    },
    video: '/projects/spellcaster/spellcaster.mp4',
  },
  {
    id: 'arena-gauntlet',
    title: 'Arena Gauntlet',
    genre: '2D Top-Down - Wave Survival',
    role: 'Solo Developer',
    type: 'personal',
    image: '/projects/arena-gauntlet/Arena Gauntlet-ss-1.png',
    overview: {
      description: [
        'A fast-paced top-down 2D wave-based arena fighter developed using Unreal Engine 5 and PaperZD.',
        'Features responsive 8-directional movement, melee & ranged combat, and escalating enemy waves.',
      ],
      engine: 'Unreal Engine 5 (PaperZD)',
      timeframe: '6 weeks',
      team: 'Solo Project',
    },
    roleSkills: {
      description: [
        'Mastered 2D workflow in Unreal Engine using PaperZD plugin',
        'Implemented data-driven wave spawning system',
        'Created responsive combat mechanics with knockback and invincibility frames',
        'Designed component-based architecture for modular gameplay systems',
      ],
      badges: ['Unreal Engine 5', 'PaperZD', '2D Game Dev', 'Blueprint Scripting'],
    },
    screenshots: [
      '/projects/arena-gauntlet/Arena Gauntlet-ss-1.png',
      '/projects/arena-gauntlet/Arena Gauntlet-ss-2.png',
      '/projects/arena-gauntlet/Arena Gauntlet-ss-3.png',
      '/projects/arena-gauntlet/Arena Gauntlet-ss-4.png',
    ],
    sections: [
      {
        title: 'Gameplay Systems',
        id: 'gameplay',
        content: [
          'The game focuses on tight controls and reactive combat within a confined arena.',
        ],
        subsections: [
          {
            title: 'Combat Mechanics',
            bullets: [
              'Melee (Sword): High damage, close range',
              'Ranged (Bow): Unlockable ability, safe distance attacks',
              'Feedback: Damage flashes, screen shake, and knockback',
              'Survival: Health pickups and wave management',
            ],
          },
          {
            title: 'Enemy AI',
            bullets: [
              'Skeleton: Basic melee unit',
              'Boar: Fast charging enemy',
              'Pathfinding: Navigation around arena obstacles',
              'State Machine: Idle, Chase, Attack behaviors',
            ],
          },
        ],
      },
      {
        title: 'Technical Implementation',
        id: 'technical',
        content: [
          'Built entirely with Blueprints, leveraging the PaperZD plugin for robust 2D animation handling.',
        ],
        bullets: [
          'Data-driven wave composition using Structs',
          'Centralized Spawning Manager for game flow',
          'Modular Blueprint Components (Health, Hitbox, Movement)',
          'Complete UI integration (HUD, Menus, Win/Loss states)',
        ],
      },
    ],
    links: {
      github: 'https://github.com/FahimKamal/UE5_DungeonAdvanture',
    },
    video: '/projects/arena-gauntlet/arena-gauntlet.mp4',
  },
  {
    id: 'pixel-pilgrim',
    title: 'Pixel Pilgrim',
    genre: 'Hybrid RPG - 2D Characters in 3D World',
    role: 'Solo Developer',
    type: 'personal',
    image: '/projects/pixel-pilgrim/Pixel Pilgrim-ss-1.png',
    overview: {
      description: [
        'A unique Hybrid RPG prototype that blends 2D pixel art characters with lush 3D environments set in ancient China.',
        'Built in Unreal Engine 5 using PaperZD, featuring data-driven dialogue and immersive storytelling.',
      ],
      engine: 'Unreal Engine 5 (PaperZD)',
      timeframe: '8 weeks',
      team: 'Solo Project',
    },
    roleSkills: {
      description: [
        'Implemented hybrid 2D/3D rendering pipeline using PaperZD',
        'Created data-driven dialogue system with DataTable integration',
        'Developed object occlusion system for top-down camera visibility',
        'Programmed NPC AI behaviors including follower mechanics',
      ],
      badges: ['Unreal Engine 5', 'PaperZD', 'Hybrid Rendering', 'System Design'],
    },
    screenshots: [
      '/projects/pixel-pilgrim/Pixel Pilgrim-ss-1.png',
      '/projects/pixel-pilgrim/Pixel Pilgrim-ss-2.png',
      '/projects/pixel-pilgrim/Pixel Pilgrim-ss-3.png',
      '/projects/pixel-pilgrim/Pixel Pilgrim-ss-4.png',
      '/projects/pixel-pilgrim/Pixel Pilgrim-ss-5.png',
    ],
    sections: [
      {
        title: 'Hybrid Tech Art',
        id: 'tech-art',
        content: [
          'The project\'s core identity lies in the seamless integration of 2D sprites within a fully lit 3D world.',
        ],
        subsections: [
          {
            title: 'Visual Implementation',
            bullets: [
              'PaperZD for robust 2D character animation state machines',
              '3D Lumen lighting interacting with 2D billboards',
              'Custom occlusion materials to hide blocking geometry',
              'Cinematic camera sequences for storytelling',
            ],
          },
        ],
      },
      {
        title: 'Gameplay Systems',
        id: 'systems',
        content: [
          'Focuses on narrative interactions and world exploration powered by flexible backend systems.',
        ],
        bullets: [
          'Data-driven Dialogue System using DataTables',
          'Quest state tracking and event triggers',
          'NPC Follower AI logic',
          'Interactive object system',
        ],
      },
    ],
    links: {
      github: 'https://github.com/FahimKamal/UE5_HybridRPG',
    },
    video: '/projects/pixel-pilgrim/pixel-pilgrim.mp4',
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
    video: '/projects/falltastic.mp4',
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
    video: '/projects/boat-blitz.mp4',
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
    video: '/projects/temple-of-masks.mp4',
  },
];

export const getProjectById = (id: string): ProjectData | undefined => {
  return projects.find(p => p.id === id);
};

export const getProjectsByType = (type: 'personal' | 'professional'): ProjectData[] => {
  return projects.filter(p => p.type === type);
};
