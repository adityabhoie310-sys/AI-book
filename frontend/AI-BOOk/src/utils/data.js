export const BOOK_GENRES = [
  'Non-Fiction',
  'Fiction & Sci-Fi',
  'Business & Tech',
  'Self-Help & Growth',
  'Education & Guide',
  'Memoir & Biography',
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
    _id: 'book-101',
    title: 'The AI Revolution: Engineering the Future',
    subtitle: 'From Neural Networks to Autonomous Agents',
    genre: 'Business & Tech',
    targetAudience: 'Software Engineers & Tech Leaders',
    tone: 'Engaging & Informative',
    description: 'A comprehensive playbook detailing how modern artificial intelligence, large language models, and agentic workflows are redesigning technology.',
    coverColor: 'from-blue-600 to-indigo-700',
    status: 'In Progress',
    wordCount: 4850,
    updatedAt: new Date().toISOString(),
    chapters: [
      {
        _id: 'ch-1',
        title: 'Chapter 1: The New Frontier of Generative AI',
        description: 'Tracing the evolution of transformer architectures and foundation models.',
        order: 1,
        wordCount: 1450,
        content: `## Chapter 1: The New Frontier of Generative AI

The rapid evolution of Large Language Models (LLMs) has fundamentally transformed our relationship with software development and problem solving. No longer are computers merely passive execution engines—they are active collaborators.

### Key Milestones in AI Infrastructure

1. **Transformer Models**: Introductions of attention mechanisms that revolutionized sequential processing.
2. **Reinforcement Learning from Human Feedback (RLHF)**: Aligning model outputs with human intent and safety.
3. **Agentic Workflows**: Shifting from single-turn chat prompts to multi-agent goal orchestration.

> *"The best way to predict the future of AI is to build intelligent systems that work side-by-side with humans."*

### Practical Implications for Tech Leaders

For tech leaders, the challenge is no longer whether to adopt AI, but how to integrate intelligent agents into existing codebases securely and scalable.
`,
      },
      {
        _id: 'ch-2',
        title: 'Chapter 2: Designing Multi-Agent Architectures',
        description: 'Best practices for memory management, tool execution, and guardrails in autonomous AI networks.',
        order: 2,
        wordCount: 1800,
        content: `## Chapter 2: Designing Multi-Agent Architectures

When designing production-grade autonomous agent systems, decomposing complex domain tasks into specialized roles yields superior reliability compared to single monolithic prompts.

### core Components of an Agentic System

- **Planner**: Deconstructs high-level objectives into sequential execution trees.
- **Executor**: Executes external tool calls, database operations, or shell scripts.
- **Evaluator**: Verifies output quality against unit tests or heuristic criteria.

#### Case Study: Automated Code Refactoring
By assigning separate subagents to code analysis, test generation, and pull request review, teams achieve 4x faster iteration cycles.
`,
      },
      {
        _id: 'ch-3',
        title: 'Chapter 3: Fine-Tuning vs. Retrieval-Augmented Generation (RAG)',
        description: 'Evaluating when to train custom domain weights versus retrieving context dynamically.',
        order: 3,
        wordCount: 1600,
        content: `## Chapter 3: Fine-Tuning vs. Retrieval-Augmented Generation (RAG)

Architects face a pivotal choice when connecting proprietary enterprise data with AI models: should you fine-tune model parameters or rely on dynamic RAG pipelines?

### Comparison Matrix

- **RAG**: Best for rapidly changing knowledge bases, zero model training latency, and clear attribution source links.
- **Fine-Tuning**: Ideal for teaching novel reasoning styles, specialized token formats, or strict domain jargon.
`,
      },
    ],
  },
  {
    _id: 'book-102',
    title: 'Zero-to-One Founder: Building Products Users Love',
    subtitle: 'Practical Guide for Early Stage Entrepreneurs',
    genre: 'Business & Tech',
    targetAudience: 'Entrepreneurs & Founders',
    tone: 'Inspiring & Motivational',
    description: 'Essential strategies for validating startup ideas, building minimal viable products, and reaching product-market fit.',
    coverColor: 'from-amber-500 to-orange-600',
    status: 'Draft',
    wordCount: 2200,
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    chapters: [
      {
        _id: 'ch-201',
        title: 'Chapter 1: Unlocking High-Value Problems',
        description: 'Identifying painful customer problems worth solving.',
        order: 1,
        wordCount: 1200,
        content: `## Chapter 1: Unlocking High-Value Problems

Great products start with deep empathy for customer frustration. Too many founders begin with a solution in search of a problem.

### The 3 Rules of Problem Validation

1. **Urgency**: Is this problem actively burning time or money today?
2. **Frequency**: Does the target user experience this issue daily or weekly?
3. **Willingness to Pay**: Are customers already attempting workarounds?
`,
      },
    ],
  },
];
