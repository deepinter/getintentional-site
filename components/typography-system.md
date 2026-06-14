# Typography System

## Scale Overview
Base unit: `1rem = 16px`
System: `rem` (relative to HTML root)

---

## Standardized Font Sizes

### Display/Hero
| Element | Mobile | Desktop | Rem | Pixels |
|---------|--------|---------|-----|--------|
| **H1** (hero title) | clamp(3.08rem, 6.6vw, 4.62rem) | responsive | - | 49-74px |

### Section Headings
| Element | Mobile | Desktop | Rem | Pixels |
|---------|--------|---------|-----|--------|
| **H2** (sections) | text-4xl | text-5xl | 2.25 / 3 | 36 / 48px |

### Component/Card Headings
| Element | Size | Rem | Pixels |
|---------|------|-----|--------|
| **H3** (boxes, cards) | text-xl | 1.25 | 20px |

### Body Text
| Element | Size | Rem | Pixels | Usage |
|---------|------|-----|--------|-------|
| **Large intro** | text-base md:text-lg | 1 / 1.125 | 16 / 18px | Featured paragraphs |
| **Regular** | text-base | 1 | 16px | Default paragraph text |
| **Small** | text-sm | 0.875 | 14px | Supplementary text |
| **Tiny** | text-xs | 0.75 | 12px | Captions, credits, labels |

### Accent/Emphasis
| Element | Size | Rem | Pixels | Usage |
|---------|------|-----|--------|-------|
| **Sequential numbers** | text-6xl | 3.75 | 60px | 01, 02, 03 badges |
| **Emphasis text** | text-3xl md:text-4xl | 1.875 / 2.25 | 30 / 36px | "You are." emphasis |
| **Blockquotes** | text-lg | 1.125 | 18px | Testimonials |

### Buttons
| Element | Size | Rem | Pixels |
|---------|------|-----|--------|
| **CTA Button text** | text-sm | 0.875 | 14px |

---

## Tailwind Scale Reference
- `text-xs` = 0.75rem (12px)
- `text-sm` = 0.875rem (14px)
- `text-base` = 1rem (16px)
- `text-lg` = 1.125rem (18px)
- `text-xl` = 1.25rem (20px)
- `text-2xl` = 1.5rem (24px)
- `text-3xl` = 1.875rem (30px)
- `text-4xl` = 2.25rem (36px)
- `text-5xl` = 3rem (48px)
- `text-6xl` = 3.75rem (60px)

---

## Implementation Guidelines

1. **Always use Tailwind scale** - Don't create custom `text-[15px]` or `text-[11px]` sizes
2. **Responsive pairs** - Use `text-base md:text-lg` pattern for content that scales
3. **Font weights** - Display uses `font-[500]` (medium), body uses `font-normal`
4. **Line heights** - Display has `line-height: 1.15`, body uses default (1.5)
5. **Letter spacing** - Headings use `tracking-[-0.025em]` for tighter spacing

---

## Color & Style Combinations

| Element | Font | Size | Weight | Color | Example |
|---------|------|------|--------|-------|---------|
| H1 Hero | Display | clamp(3.08rem, 6.6vw, 4.62rem) | 500 | dark/white | "Take control..." |
| H2 Sections | Display | text-4xl md:text-5xl | 500 | dark | "What comms leaders..." |
| H3 Cards | Sans | text-xl | 600 | dark | "Influence over..." |
| Body | Sans | text-base | 400 | gray-500 | Regular paragraphs |
| Blockquote | Display | text-lg | 500 | white | Testimonials |
| Button | Sans | text-sm | 500 | white on orange | CTAs |
