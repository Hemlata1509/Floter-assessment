import type { Offering, HeroSlide, QueryType } from "../types";

export const NAV_LINKS = ["About", "Contact", "Questions"] as const;

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "01",
    title: "We build the products people actually finish checkout on.",
    copy: "Contour Studio partners with fintech, food-tech and hospitality teams to plan, design and ship the parts of a product that convert.",
  },
  {
    id: "02",
    title: "Split payments, shipped in the Caribbean.",
    copy: "From a single checkout flow to a five-app ecosystem, we design the plumbing customers never see and love anyway.",
  },
  {
    id: "03",
    title: "Small team. Senior work. No hand-offs.",
    copy: "The person who plans your product is the same person who ships it. That's the whole studio.",
  },
];

export const OFFERINGS: Offering[] = [
  {
    id: "plan",
    label: "Plan",
    index: "01",
    headline: "We map the product before a single pixel exists.",
    primaryText:
      "Every engagement starts with a working session on scope, users and the metric that actually matters. You leave with a plan, not a mood board.",
    secondaryText:
      "Typical outputs: a prioritised roadmap, a technical feasibility read, and a fixed-scope proposal — usually inside a week.",
    bullets: ["Discovery & stakeholder interviews", "Technical feasibility review", "Fixed-scope roadmap"],
  },
  {
    id: "design",
    label: "Design",
    index: "02",
    headline: "Interfaces that carry your brand's argument, not just its logo.",
    primaryText:
      "We design in the browser, not just in Figma, so what you approve is what ships — spacing, motion and all.",
    secondaryText:
      "We test flows with real copy and real edge cases before a single line of production code is written.",
    bullets: ["Design systems & component libraries", "Prototyping with real content", "Accessibility built in, not bolted on"],
  },
  {
    id: "implement",
    label: "Implement",
    index: "03",
    headline: "Production code from the people who designed it.",
    primaryText:
      "No relay race between a design team and a dev team. The engineers who build your product were in the planning room on day one.",
    secondaryText:
      "React, TypeScript, and infrastructure that's boring on purpose — so your team can maintain it long after we're gone.",
    bullets: ["React / TypeScript delivery", "CI, testing & handover docs", "Post-launch support window"],
  },
];

export const QUERY_TYPES: QueryType[] = ["General enquiry", "New project", "Partnership", "Support"];
