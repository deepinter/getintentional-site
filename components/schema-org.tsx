const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://intentional.ai/#organization",
  "name": "Intentional",
  "url": "https://intentional.ai",
  "description": "Intentional is your radar for what AI is saying about your brand — and your engine to change it. A bespoke intelligence system paired with high-level consultancy for communications leaders.",
  "knowsAbout": [
    "Answer Engine Optimization",
    "AI Brand Monitoring",
    "Narrative Intelligence",
    "Algorithmic Consensus Management",
    "Communications Strategy"
  ],
  "slogan": "Take control of your narrative. Get intentional with AI."
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://intentional.ai/#website",
  "name": "Intentional",
  "url": "https://intentional.ai",
  "publisher": { "@id": "https://intentional.ai/#organization" }
};

const service = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://intentional.ai/#service",
  "name": "Intentional AI Brand Intelligence",
  "provider": { "@id": "https://intentional.ai/#organization" },
  "serviceType": "Answer Engine Optimization",
  "description": "Intentional monitors the exact sources training AI answer engines — editorial sites, forums, and data streams shaping AI consensus about your brand. We translate approved messaging into machine-readable formats that Answer Engines trust, and show you the direct link between deployed narratives and shifts in AI-generated sentiment.",
  "audience": {
    "@type": "Audience",
    "audienceType": "Communications leaders, PR professionals, brand strategists"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Intentional Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "The Strategic Radar",
          "description": "Human-crafted intelligence briefings showing the intersection of what people are asking and what AI is answering about your brand."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "The Execution Engine",
          "description": "Translation of approved messaging into machine-readable formats that Answer Engines trust, with drafted counter-narratives and content recommendations."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "The Proof",
          "description": "Direct measurement of the link between deployed narratives and shifts in AI-generated sentiment about your brand."
        }
      }
    ]
  }
};

const howTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How Intentional Protects and Shapes Your Brand's AI Narrative",
  "description": "Intentional operates as a closed loop: monitor, execute, and measure — keeping your brand's narrative accurate across AI answer engines.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "The Strategic Radar — Know exactly where narratives are weak",
      "text": "We monitor the exact sources training Answer Engines — the editorial sites, forums, and data streams shaping AI consensus about your brand. Human-crafted intelligence briefings delivered in the cadence you prefer show you the intersection of what people are asking and what AI is answering."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "The Execution Engine — Change your leverage, not your workflow",
      "text": "We translate your approved messaging into machine-readable formats that Answer Engines trust and prioritize. Drafted counter-narratives and content recommendations — always with executive approval before deployment. Zero-error framing for high-stakes brands."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "The Proof — Stop relying on vanity metrics",
      "text": "We show you the direct link between deployed narratives and shifts in AI-generated sentiment about your brand. Actionable intelligence — not a dashboard you'll ignore. Track how your interventions move the algorithmic consensus in real time."
    }
  ]
};

const faqPage = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What exactly is Answer Engine Optimization (AEO)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AEO is the practice of optimizing your brand's digital footprint so AI models — like ChatGPT, Perplexity, and Gemini — accurately represent you when answering user questions. Unlike SEO, which targets search rankings, AEO ensures algorithmic consensus aligns with your approved narrative."
      }
    },
    {
      "@type": "Question",
      "name": "How is Intentional different from traditional PR monitoring?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Traditional PR tools track what's already been published. Intentional monitors the sources training AI models — before they become part of the algorithmic consensus. We detect narrative drift early and help you intervene proactively."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to change how my team works?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Intentional integrates into your existing workflow. You receive intelligence briefings (not dashboards), review drafted content, and approve deployment. Your team stays in command."
      }
    },
    {
      "@type": "Question",
      "name": "How quickly can we get started with Intentional?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For qualified clients, onboarding takes 2–3 weeks. We start with a deep-dive on your brand, train the system on your approved messaging, and begin monitoring immediately."
      }
    },
    {
      "@type": "Question",
      "name": "What kind of results can we expect from Answer Engine Optimization?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Clients typically see measurable improvement in AI-generated sentiment within 30–60 days of deploying optimized narratives. Exact timelines vary based on your brand's current digital footprint and the complexity of your sector."
      }
    },
    {
      "@type": "Question",
      "name": "Is Intentional only for crisis management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. While Intentional is highly effective during reputational threats, it's designed as a continuous intelligence system — not a reactive crisis tool. The goal is to secure algorithmic authority before issues arise."
      }
    }
  ]
};

const review = {
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": { "@id": "https://intentional.ai/#service" },
  "reviewBody": "We saw how AI was talking about us and needed to act. Intentional gives us the infrastructure to stay ahead of the narrative. Now when the machine speaks, it speaks our truth.",
  "author": {
    "@type": "Person",
    "jobTitle": "Head of Content",
    "worksFor": { "@type": "Organization", "name": "Global brand" }
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": 5,
    "bestRating": 5
  }
};

const webPage = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://intentional.ai/#webpage",
  "url": "https://intentional.ai",
  "name": "Intentional — Take control of your AI narrative",
  "isPartOf": { "@id": "https://intentional.ai/#website" },
  "about": { "@id": "https://intentional.ai/#organization" },
  "description": "Intentional is your radar for what AI is saying about your brand — and your engine to change it.",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", "h2", ".speakable"]
  }
};

const schemas = [organization, website, webPage, service, howTo, faqPage, review];

export default function SchemaOrg() {
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
