export const BOOK_GENRES = [
  'Non-Fiction',
  'Fiction & Sci-Fi',
  'Business & Tech',
  'Self-Help & Growth',
  'Education & Guide',
  'Memoir & Biography',
  'Health & Wellness',
];

export const WRITING_TONES = [
  'Engaging & Informative',
  'Professional & Authoritative',
  'Conversational & Warm',
  'Inspiring & Motivational',
  'Academic & Analytical',
  'Storytelling & Vivid',
];

export const TARGET_AUDIENCES = [
  'General Readers',
  'Entrepreneurs & Founders',
  'Students & Learners',
  'Software Engineers & Tech Leaders',
  'Creative Writers & Artists',
  'Busy Professionals',
];

export const INITIAL_MOCK_BOOKS = [
  {
    _id: 'book-1',
    title: 'From Chaos to Clarity',
    subtitle: 'A Practical Guide to Organizing Your Mind and Work',
    author: 'Alex Doe',
    genre: 'Self-Help & Growth',
    targetAudience: 'Busy Professionals',
    tone: 'Engaging & Informative',
    description: 'Transform overwhelming mental clutter and chaotic schedules into streamlined systems for focused productivity and peace of mind.',
    coverColor: 'from-violet-500 via-purple-600 to-indigo-700',
    coverStyle: 'purple-art',
    status: 'Completed',
    pageCount: 247,
    wordCount: 14200,
    updatedAt: new Date().toISOString(),
    chapters: [
      {
        _id: 'ch-1',
        title: 'Chapter 1: The Architecture of Mental Clarity',
        description: 'Understanding how information overload paralyzes decision-making.',
        order: 1,
        wordCount: 1850,
        content: `## Chapter 1: The Architecture of Mental Clarity\n\nIn our hyper-connected world, clarity is the rarest superpower. Every day, the average professional encounters over 74 gigabytes of information—the equivalent of nine continuous DVDs.\n\n### The Noise Reduction Principle\n\nTo build sustained focus, you must first design deliberate filters for incoming data:\n\n1. **Ruthless Elimination**: Unsubscribe from noise and automate routine triage.\n2. **Time-Boxing Strategy**: Dedicate deep 90-minute blocks without notifications.\n3. **External Cognitive Offloading**: Keep an agile scratchpad for ideas so your working memory stays clear.\n\n> *"Clarity is not the absence of complexity; it is the mastery of focus."*\n\n### Designing Your Daily Clarity Routine\n\nBegin each morning with a 5-minute review of your single most impactful priority before looking at emails. When you control your mornings, you control your trajectory.\n`,
      },
      {
        _id: 'ch-2',
        title: 'Chapter 2: Designing Sustainable Daily Systems',
        description: 'Replacing willpower with frictionless habits and intuitive workflows.',
        order: 2,
        wordCount: 2100,
        content: `## Chapter 2: Designing Sustainable Daily Systems\n\nWillpower is a finite resource that depletes with every micro-decision. High performers do not rely on motivation; they design environments where doing the right thing is the path of least resistance.\n\n### The 3 Pillars of Frictionless Systems\n\n- **Trigger Alignment**: Pair new behaviors with established anchors.\n- **Feedback Loops**: Track small daily wins visually to compound momentum.\n- **Recovery Protocols**: Build reset rituals for high-stress periods.\n`,
      },
    ],
  },
  {
    _id: 'book-2',
    title: "The Introvert's Guide to Networking",
    subtitle: 'Connecting Authentically Without Burning Out',
    author: 'Alex Doe',
    genre: 'Self-Help & Growth',
    targetAudience: 'General Readers',
    tone: 'Conversational & Warm',
    description: 'Master the art of building meaningful professional connections on your own terms without exhausting your social battery.',
    coverColor: 'from-amber-400 via-orange-500 to-amber-600',
    coverStyle: 'warm-art',
    status: 'Completed',
    pageCount: 198,
    wordCount: 11500,
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    chapters: [
      {
        _id: 'ch-201',
        title: 'Chapter 1: Redefining Networking on Your Own Terms',
        description: 'Shifting from transactional schmoozing to genuine 1-on-1 curiosity.',
        order: 1,
        wordCount: 1500,
        content: `## Chapter 1: Redefining Networking on Your Own Terms\n\nTraditional networking events can feel artificial and exhausting. But meaningful networking is about deep, genuine listening—an area where introverts excel naturally.\n\n### The Power of High-Trust Micro-Conversations\n\nInstead of collecting dozens of superficial business cards, focus on finding three people whose work genuinely fascinates you. Ask thoughtful questions and follow up with tailored insights.\n`,
      },
    ],
  },
  {
    _id: 'book-3',
    title: 'Plant-Based ON A BUDGET',
    subtitle: 'Delicious, Nutritious Whole Food Meals for Everyday Living',
    author: 'Alex Doe',
    genre: 'Health & Wellness',
    targetAudience: 'General Readers',
    tone: 'Engaging & Informative',
    description: 'A comprehensive guide to eating vibrant, healthy plant-powered meals while cutting your grocery bills in half.',
    coverColor: 'from-emerald-500 to-teal-700',
    coverStyle: 'green-plant',
    status: 'Completed',
    pageCount: 180,
    wordCount: 9800,
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
    chapters: [
      {
        _id: 'ch-301',
        title: 'Chapter 1: Smart Pantry Foundations',
        description: 'Stocking your kitchen with nutrient-dense staples that last.',
        order: 1,
        wordCount: 1300,
        content: `## Chapter 1: Smart Pantry Foundations\n\nEating healthy plant-based meals does not require expensive specialty items. In fact, the world’s healthiest longevity diets rely on affordable staples: lentils, beans, oats, whole grains, and seasonal vegetables.\n`,
      },
    ],
  },
  {
    _id: 'book-4',
    title: 'THE ART OF DIGITAL MINIMALISM',
    subtitle: 'Reclaiming Attention and Intention in an Age of Screens',
    author: 'Alex Doe',
    genre: 'Self-Help & Growth',
    targetAudience: 'Busy Professionals',
    tone: 'Inspiring & Motivational',
    description: 'Break free from algorithmic addiction and reclaim quiet time for deep focus, creative expression, and authentic living.',
    coverColor: 'from-purple-900 via-indigo-950 to-purple-800',
    coverStyle: 'minimal-purple',
    status: 'In Progress',
    pageCount: 165,
    wordCount: 8400,
    updatedAt: new Date(Date.now() - 259200000).toISOString(),
    chapters: [
      {
        _id: 'ch-401',
        title: 'Chapter 1: The Attention Economy and You',
        description: 'How modern interfaces are engineered for slot-machine engagement.',
        order: 1,
        wordCount: 1400,
        content: `## Chapter 1: The Attention Economy and You\n\nYour attention is the most valuable commodity on Earth. Tech platforms employ thousands of behavioral engineers to keep your thumb scrolling. Reclaiming your focus requires conscious digital boundaries.\n`,
      },
    ],
  },
  {
    _id: 'book-5',
    title: 'BLUEPRINT PASSIVE INCOME',
    subtitle: 'Scalable Systems for Financial Independence and Online Assets',
    author: 'Alex Doe',
    genre: 'Business & Tech',
    targetAudience: 'Entrepreneurs & Founders',
    tone: 'Professional & Authoritative',
    description: 'Learn how to build digital products, SaaS micro-apps, and recurring content engines that generate sustainable revenue 24/7.',
    coverColor: 'from-blue-700 via-indigo-800 to-purple-900',
    coverStyle: 'blueprint-blue',
    status: 'In Progress',
    pageCount: 220,
    wordCount: 12100,
    updatedAt: new Date(Date.now() - 345600000).toISOString(),
    chapters: [
      {
        _id: 'ch-501',
        title: 'Chapter 1: The Leverage Quadrant',
        description: 'Code, media, capital, and labor—leveraging zero-marginal-cost replication.',
        order: 1,
        wordCount: 1600,
        content: `## Chapter 1: The Leverage Quadrant\n\nIn the digital age, leverage allows a solo creator to reach millions without traditional overhead. Digital products and automated codebases work for you while you sleep.\n`,
      },
    ],
  },
  {
    _id: 'book-6',
    title: 'The 5-Minute Morning Reset',
    subtitle: 'Daily Micro-Rituals to Ignite Energy and Calm',
    author: 'Alex Doe',
    genre: 'Health & Wellness',
    targetAudience: 'General Readers',
    tone: 'Engaging & Informative',
    description: 'Transform how you wake up with fast, science-backed breathing, hydration, and movement rituals that elevate your energy.',
    coverColor: 'from-slate-700 via-cyan-800 to-blue-900',
    coverStyle: 'ocean-calm',
    status: 'Completed',
    pageCount: 140,
    wordCount: 7600,
    updatedAt: new Date(Date.now() - 432000000).toISOString(),
    chapters: [
      {
        _id: 'ch-601',
        title: 'Chapter 1: The First 300 Seconds',
        description: 'Activating cortisol circadian balance with morning light and hydration.',
        order: 1,
        wordCount: 1100,
        content: `## Chapter 1: The First 300 Seconds\n\nHow you spend the first five minutes after opening your eyes sets your neurochemical tone for the entire day. Hydrate, seek natural sunlight, and breathe deeply before touching any device.\n`,
      },
    ],
  },
  {
    _id: 'book-7',
    title: '30 Day Productivity Challenge',
    subtitle: 'Actionable Daily Sprints for Elite Execution',
    author: 'Alex Doe',
    genre: 'Business & Tech',
    targetAudience: 'Software Engineers & Tech Leaders',
    tone: 'Inspiring & Motivational',
    description: 'A 30-day intensive program designed to eliminate procrastination and build unstoppable execution velocity.',
    coverColor: 'from-amber-500 via-orange-600 to-yellow-600',
    coverStyle: 'silhouette-sun',
    status: 'Completed',
    pageCount: 215,
    wordCount: 13400,
    updatedAt: new Date(Date.now() - 518400000).toISOString(),
    chapters: [
      {
        _id: 'ch-701',
        title: 'Day 1: Audit Your Time Leaks',
        description: 'Tracking every 30-minute block to uncover hidden productivity drains.',
        order: 1,
        wordCount: 1250,
        content: `## Day 1: Audit Your Time Leaks\n\nYou cannot optimize what you do not measure. Today, log every activity in 30-minute intervals to find where your energy is truly spent.\n`,
      },
    ],
  },
];

export const getStoredBooks = () => {
  try {
    const saved = localStorage.getItem('ai_books_list');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // fallback
  }
  localStorage.setItem('ai_books_list', JSON.stringify(INITIAL_MOCK_BOOKS));
  return INITIAL_MOCK_BOOKS;
};

export const saveStoredBook = (newBook) => {
  try {
    const current = getStoredBooks();
    const existingIndex = current.findIndex((b) => b._id === newBook._id);
    let updated;
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = { ...updated[existingIndex], ...newBook };
    } else {
      updated = [newBook, ...current];
    }
    localStorage.setItem('ai_books_list', JSON.stringify(updated));
    return updated;
  } catch {
    return [newBook];
  }
};

export const deleteStoredBook = (bookId) => {
  try {
    const current = getStoredBooks();
    const updated = current.filter((b) => b._id !== bookId);
    localStorage.setItem('ai_books_list', JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
};

export const getStoredBookById = (bookId) => {
  const books = getStoredBooks();
  return books.find((b) => b._id === bookId) || books[0];
};
