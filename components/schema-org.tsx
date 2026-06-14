const siteUrl = "https://getintentional.ai";

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  "name": "Intentional",
  "url": siteUrl,
  "description": "Intentional is an AI-powered platform and service for communications leaders. We monitor what AI says about your organisation, surface where the narrative breaks down, and give you the strategy and content to change it.",
  "knowsAbout": [
    "Answer Engine Optimization",
    "AI Narrative Monitoring",
    "Generative Engine Optimization",
    "Communications Strategy",
    "AI Brand Intelligence"
  ],
  "slogan": "Take control of your narrative. Get intentional with AI."
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  "name": "Intentional",
  "url": siteUrl,
  "publisher": { "@id": `${siteUrl}/#organization` }
};

const service = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${siteUrl}/#service`,
  "name": "Intentional AI Narrative Intelligence",
  "provider": { "@id": `${siteUrl}/#organization` },
  "serviceType": "AI Narrative Monitoring and Communications Strategy",
  "description": "Intentional monitors all major AI platforms — ChatGPT, Perplexity, Google AI Overviews, Claude, Gemini, and others — exploring your organisation the way a real audience would ask. When it detects a gap or opportunity, it drafts a response built on your institutional knowledge. You approve everything before it's published.",
  "audience": {
    "@type": "Audience",
    "audienceType": "Communications leaders, PR directors, brand strategists at purposeful organisations"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Intentional Platform",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Look through AI's eyes",
          "description": "A live view of how AI currently represents your organisation across all major platforms — and where the gaps are."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Speak in your voice",
          "description": "When Intentional surfaces a problem or opportunity, it drafts a response built on your institutional knowledge. Your approval before anything is published."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Listen for what matters",
          "description": "Track how AI's view of your organisation shifts as new content is published. Short email alerts when something needs your attention."
        }
      }
    ]
  }
};

const howTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How Intentional Works",
  "description": "Intentional operates as a continuous intelligence loop: monitor what AI says about you, draft a response built on your institutional knowledge, approve and publish, track the shift.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Look through AI's eyes",
      "text": "Intentional monitors all major AI platforms from multiple angles, the way a real audience would ask. You get a live view of where you stand and where the gaps are."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Speak in your voice",
      "text": "When a gap or opportunity is detected, Intentional drafts a structured response built on your institutional knowledge. You shape it, approve it, and decide what gets published."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Listen for what matters",
      "text": "Intentional tracks how AI's view of your organisation shifts as new content is published. You get a short email alert when something needs your attention."
    }
  ]
};

const faqPage = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Intentional?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Intentional is a dedicated AI-powered platform and service for comms leaders. The platform monitors what AI says about your organisation, responds with content built on your institutional knowledge, and tracks how your narrative shifts. You are supported by our team of strategic communications specialists, combining technology with comms expertise to keep your voice accurate and visible in an AI-first world."
      }
    },
    {
      "@type": "Question",
      "name": "Can ChatGPT do this instead?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ChatGPT will tell you what AI knows about your organisation right now. That's useful — once. Intentional is a different thing entirely: a continuous intelligence loop that monitors your narrative, surfaces what's shifting, and gives you the strategic response to act on it. Backed by communications expertise, it changes how your team works — moving from gut feel to insight-driven decisions. Less guessing. More impact."
      }
    },
    {
      "@type": "Question",
      "name": "Why do I need this?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI answer engines are already where many of your audiences go first. They don't direct people to your content — they answer instead of it. Most communications strategies haven't caught up. The organisations that establish their AI presence now, before narratives solidify, will be significantly harder to displace."
      }
    },
    {
      "@type": "Question",
      "name": "Is this the same as AEO/GEO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AEO (Answer Engine Optimisation) and GEO (Generative Engine Optimisation) are the emerging disciplines for ensuring AI represents your organisation accurately. Intentional operates at this layer — but brings a strategic communications layer on top. It doesn't just optimise once; it monitors continuously, responds with content built on your institutional knowledge, and helps your team stay ahead of the narrative."
      }
    },
    {
      "@type": "Question",
      "name": "How does it work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Intentional monitors all major AI platforms — ChatGPT, Perplexity, Google AI Overviews, and Claude — exploring your topic from multiple angles, the way a real audience would ask. When it detects a gap or opportunity, it drafts a structured response built on your institutional knowledge. You approve everything before it's published."
      }
    },
    {
      "@type": "Question",
      "name": "What's it like to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most people experience Intentional as a short email — what's shifted in your narrative, and what's already been drafted in response. From there, you go to the platform to review the full draft. A built-in AI chat helps you shape it further if you need to. When you're happy, you approve. It's published for AI to absorb. And your team has the intelligence to work from."
      }
    },
    {
      "@type": "Question",
      "name": "Does it replace my team's skills?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Most communications teams aren't currently doing continuous AI monitoring, competitor narrative tracking, or systematic content-to-AI feedback loops — so there's no role to replace. Intentional fills that gap and hands the output to your team. The judgement, the approval, the voice stay with you."
      }
    },
    {
      "@type": "Question",
      "name": "What do we have control over?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Everything that matters. Monitoring and drafting is automated — but strategy and approval are always yours. When Intentional surfaces a problem or opportunity, it brings you a draft. You shape it, approve it, and decide what gets published. Nothing goes out without your sign-off."
      }
    },
    {
      "@type": "Question",
      "name": "Who owns the content?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You do — entirely. Your institutional knowledge stays yours, the content produced is yours, and nothing is used to train AI models or shared outside your engagement."
      }
    },
    {
      "@type": "Question",
      "name": "What results should I expect?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In the short term, a live view of how AI currently represents you, where the gaps are, and what competitors are saying. Over time, measurable narrative shift: AI positioning your organisation more accurately, in your voice. We track this from day one, so the change is visible, not assumed."
      }
    },
    {
      "@type": "Question",
      "name": "Who do you work with?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Purposeful organisations with something meaningful to communicate — typically mid-to-large organisations where reputation and narrative are strategically important. We work with a small number of clients at a time, which means every engagement gets our full attention."
      }
    },
    {
      "@type": "Question",
      "name": "How do we get started?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "With a conversation. We start by understanding your organisation — your audiences, your approved messaging, and what AI currently knows about you. From that we build your institutional memory — the knowledge base everything runs on. Most clients are fully operational within a month."
      }
    }
  ]
};

const review = {
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": { "@id": `${siteUrl}/#service` },
  "reviewBody": "Intentional is a great tool — not just to influence AI, but because it shows how our content shapes our audience's opinions. That's changed how we work.",
  "author": {
    "@type": "Person",
    "jobTitle": "Head of Communications",
    "worksFor": { "@type": "Organization", "name": "International organisation" }
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
  "@id": `${siteUrl}/#webpage`,
  "url": siteUrl,
  "name": "Intentional — Take control of your AI narrative",
  "isPartOf": { "@id": `${siteUrl}/#website` },
  "about": { "@id": `${siteUrl}/#organization` },
  "description": "Intentional is built for communications leaders who want AI working on their strategy — not just their content.",
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
