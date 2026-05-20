# Growth Horizon Design Notes

## Visual Direction

Growth Horizon uses a calm editorial style: light surfaces, muted green accents, restrained contrast, and simple image-led article cards. The design should feel reflective and student-centered, not like a generic SaaS template.

## Typography

- Display text uses a serif stack for an editorial tone.
- Body text uses a system sans-serif stack for readability and low maintenance.
- Paragraph width is constrained on article pages to support comfortable reading.

## Color System

- The primary palette uses tinted neutrals with one green accent.
- OKLCH colors are used in the main design tokens for consistent lightness and chroma.
- Fallback colors are included for older browsers that do not support OKLCH.
- Purple/blue AI-style gradients, neon glows, and pure black/white surfaces are avoided.

## Layout Principles

- The homepage uses an asymmetric editorial grid instead of a uniform card wall.
- Article pages prioritize reading comfort, clear headings, and predictable back navigation.
- Cards are used only where they group a post, featured story, or contributor.
- Mobile layouts collapse to a single-column flow with stable spacing.

## Interaction Principles

- Interactions are lightweight and purposeful.
- Buttons, links, filters, cards, and navigation have visible hover, active, and focus states.
- Motion uses transform and opacity where possible.
- The article reading progress indicator supports orientation in longer posts.

## Accessibility Notes

- Pages include semantic landmarks and a skip link.
- Active navigation uses `aria-current`.
- The post count uses `aria-live` during filtering.
- Images have descriptive alt text.
- Reduced-motion preferences are respected.
