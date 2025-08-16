export type Question =
  | { id: string; type: "text"; prompt: string }
  | { id: string; type: "single"; prompt: string; options: string[] }
  | { id: string; type: "multiple"; prompt: string; options: string[] }

// Advanced track (Expert/Pro)
export function getAdvancedQuestions(): Question[] {
  return [
    {
      id: "adv-1",
      type: "text",
      prompt: "What programming language do you primarily use for backend development, and why do you prefer it?",
    },
    {
      id: "adv-2",
      type: "text",
      prompt: "How do you approach designing scalable and secure APIs (e.g., REST, GraphQL)?",
    },
    {
      id: "adv-3",
      type: "multiple",
      prompt: "What database technologies do you work with? (Select all that apply)",
      options: ["PostgreSQL", "MySQL", "MongoDB", "SQLite", "Redis", "DynamoDB", "Cassandra", "Other"],
    },
    {
      id: "adv-3b",
      type: "text",
      prompt: "How do you decide which database to use for a project?",
    },
    {
      id: "adv-4",
      type: "multiple",
      prompt: "How do you handle performance optimization for backend systems? (Select all that apply)",
      options: [
        "Caching strategies (Redis, Memcached)",
        "Database indexing and query optimization",
        "Asynchronous processing and job queues",
        "Code profiling and bottleneck identification",
        "Load balancing and horizontal scaling",
        "CDN implementation",
        "Other approaches",
      ],
    },
    {
      id: "adv-5",
      type: "multiple",
      prompt:
        "What challenges do you face when integrating third-party services or microservices? (Select all that apply)",
      options: [
        "Authentication and authorization complexities",
        "Rate limiting and API quotas",
        "Versioning and backward compatibility",
        "Inconsistent or poor documentation",
        "Network reliability and latency issues",
        "Data consistency across services",
        "Monitoring and debugging distributed systems",
        "Other challenges",
      ],
    },
    {
      id: "adv-6",
      type: "multiple",
      prompt: "How do you stay updated on frameworks and tools? (Select all that apply)",
      options: [
        "Official documentation and release notes",
        "Tech blogs and newsletters",
        "Developer conferences and meetups",
        "Social media and developer communities",
        "Online courses and certifications",
        "Podcasts and video content",
        "Open source contributions",
        "Experimentation with side projects",
      ],
    },
    {
      id: "adv-7",
      type: "multiple",
      prompt: "What strategies do you use to ensure data security and compliance? (Select all that apply)",
      options: [
        "Encryption in transit and at rest",
        "Role-based access controls (RBAC)",
        "Comprehensive audit logging",
        "Regular security audits and penetration testing",
        "Secure development lifecycle (SSDL)",
        "Compliance frameworks (SOC 2, GDPR, HIPAA)",
        "Multi-factor authentication",
        "Other security measures",
      ],
    },
    {
      id: "adv-8",
      type: "text",
      prompt: "How do you approach debugging complex server-side issues?",
    },
  ]
}

// Beginner/Intermediate track
export function getBeginnerQuestions(): Question[] {
  return [
    {
      id: "beg-1",
      type: "text",
      prompt: "How did you first get interested in tech or programming?",
    },
    {
      id: "beg-2",
      type: "multiple",
      prompt: "Which programming languages or tools have you used so far? (Select all that apply)",
      options: [
        "HTML/CSS",
        "JavaScript",
        "TypeScript",
        "Python",
        "Java",
        "C/C++",
        "React",
        "Node.js",
        "Git/GitHub",
        "Other",
      ],
    },
    {
      id: "beg-3",
      type: "single",
      prompt: "How confident do you feel in your current coding skills?",
      options: [
        "Not confident at all",
        "Slightly confident",
        "Moderately confident",
        "Very confident",
        "Extremely confident",
      ],
    },
    {
      id: "beg-4",
      type: "text",
      prompt: "What types of projects have you worked on? Describe a few that you're proud of.",
    },
    {
      id: "beg-5",
      type: "multiple",
      prompt: "How do you usually learn new tech skills? (Select all that apply)",
      options: [
        "YouTube tutorials",
        "Books and PDFs",
        "Trial and error",
        "Online courses (Udemy, Coursera, etc.)",
        "School/University",
        "Mentorship",
        "Documentation",
        "Coding bootcamps",
      ],
    },
    {
      id: "beg-6",
      type: "multiple",
      prompt: "Which areas of tech are you most interested in? (Select all that apply)",
      options: [
        "Frontend Development",
        "Backend Development",
        "Mobile Development",
        "Data Science/ML",
        "DevOps/Cloud",
        "Cybersecurity",
        "UI/UX Design",
        "Game Development",
        "full stack Development",
        "Other",
      ],
    },
    {
      id: "beg-7",
      type: "text",
      prompt: "What's your biggest challenge when learning or building something new?",
    },
    {
      id: "beg-8",
      type: "single",
      prompt: "Do you collaborate with others or mostly work solo?",
      options: [
        "Always work solo",
        "Mostly solo with occasional collaboration",
        "Balance of solo and team work",
        "Mostly collaborate with others",
        "Always work in teams",
      ],
    },
    {
      id: "beg-9",
      type: "text",
      prompt: "What would help you grow faster in tech? What resources or support do you need?",
    },
    {
      id: "beg-10",
      type: "text",
      prompt: "Where do you see yourself in 5 years, tech-wise? What are your goals and aspirations?",
    },
{
  id: "beg-11",
  type: "multiple",
  prompt: "What development tools have you used? (Select all that apply)",
  options: [
    "VS Code",
    "GitHub",
    "Stack Overflow",
    "ChatGPT/AI tools",
    "Figma", 
    "Postman",
    "Chrome DevTools", 
    "Other"
  ],
},
{
  id: "beg-12",
  type: "text",
  prompt: "If you could build any app or website, what would it be and why?",
},
  ]
}
