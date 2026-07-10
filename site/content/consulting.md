---
title: "Consulting"
url: "/consulting"
summary: "Production AI consulting — architecture audits, evaluation frameworks, performance sprints, and fractional AI infrastructure leadership."
description: "Zuo Wang takes on consulting engagements for production AI systems: RAG and agent architecture audits, evaluation setups, latency and cost reduction, and fractional AI infrastructure leadership."
ShowToc: false
ShowBreadCrumbs: false
---

I take on a small number of consulting engagements on production AI systems — the same work I do every day at Samaya AI, where I build the RAG and agent infrastructure behind research teams at Morgan Stanley, BlackRock, Citi, and Point72.

If your AI product works in the demo but struggles in production — reliability, latency, cost, or all three — that is the problem I solve.

## Services

### AI architecture audit

<div class="service-meta"><span class="engagement">Fixed fee</span><span class="price">$6,000</span></div>

A review of your RAG or agent system end to end: architecture, data pipeline, retrieval, orchestration, and serving. I identify reliability, latency, security, and cost problems, then deliver a prioritized implementation roadmap your team can execute immediately.

### Production AI evaluation setup

<div class="service-meta"><span class="engagement">Fixed fee</span><span class="price">$20,000</span></div>

I build the evaluation backbone for an existing AI product: a test dataset that reflects real usage, an automated eval framework, observability, and a regression process — so every model, prompt, or retrieval change is measured before it ships.

### AI performance sprint

<div class="service-meta"><span class="engagement">2–4 week engagement</span><span class="price">$25,000</span></div>

A focused sprint to reduce inference latency and cost. At Samaya I cut time-to-first-token by 90% (100s → 10s) while scaling from 10 to 10,000 daily active users; I apply the same playbook to your stack.

### Fractional AI infrastructure lead

<div class="service-meta"><span class="engagement">Monthly retainer</span><span class="price">$20,000 / month</span></div>

Ongoing advisory for startups: several hours per week on architecture decisions, hiring, and production readiness — staff-level AI infrastructure experience in your corner without the full-time hire.

## Working together

Email a short note about your system and what's hurting. I'll reply within two business days with an honest read on whether I can help — and if I'm not the right fit, I'll say so.

<div class="consulting-cta">
<a href="mailto:amangoworks@gmail.com?subject=Consulting%20inquiry" class="cta-btn">amangoworks@gmail.com</a>
</div>

<style>
/* Consulting: plain, document-style, matching the resume page. Inherits
   PaperMod theme variables so light/dark both work. */

.post-content h2 {
  margin: 2.25rem 0 1rem;
  padding-bottom: 0.35rem;
  border-bottom: 1px solid var(--border);
  font-size: 1.45rem;
}
.post-content h3 { margin: 1.75rem 0 0.25rem; font-size: 1.15rem; }

.service-meta {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.2rem 1rem;
  margin: 0 0 0.5rem;
  color: var(--secondary);
  font-size: 0.92rem;
}
.service-meta .engagement { font-style: italic; }
.service-meta .price { font-weight: 600; color: var(--primary); }

.consulting-cta { text-align: center; margin: 1.5rem 0; }
.cta-btn {
  display: inline-block;
  color: var(--primary);
  border: 1px solid var(--primary);
  border-radius: 4px;
  padding: 10px 22px;
  font-size: 0.95rem;
  text-decoration: none;
  transition: background 0.2s ease, color 0.2s ease;
}
.cta-btn:hover { background: var(--primary); color: var(--theme) !important; }

@media (max-width: 768px) {
  .service-meta { flex-direction: column; }
}
</style>
