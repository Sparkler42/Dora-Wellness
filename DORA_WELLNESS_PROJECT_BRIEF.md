# DORA Wellness Project Brief

## Project: Spark Wellness App

### Overview

Spark is a wellness application built with React and TypeScript that helps users track and nurture their personal growth through an engaging, nature-themed visual experience. The app uses the metaphor of a growing tree — where consistent wellness habits cause the tree to flourish with animated flowers and sparks — to motivate sustained engagement.

### Vision

To create a holistic wellness companion that transforms daily health habits into a visible, living journey of growth. Spark meets users where they are and gently encourages progress across multiple dimensions of well-being.

### DORA Metrics Alignment

This project applies DORA (DevOps Research and Assessment) principles to wellness delivery:

| DORA Metric | Wellness Analogy | Implementation |
|---|---|---|
| **Deployment Frequency** | Habit consistency | Track how frequently users complete wellness activities |
| **Lead Time for Changes** | Time to new habit adoption | Measure how quickly users integrate new wellness practices |
| **Change Failure Rate** | Missed goals / setbacks | Monitor streak breaks and provide recovery support |
| **Time to Restore Service** | Bounce-back resilience | Track how quickly users return to routines after disruptions |

### Core Features

#### 1. Growth Visualization (Implemented)
- Animated SVG growing tree that reflects user progress
- Twinkling spark/flower nodes representing completed milestones
- Smooth staggered animations for organic, living feel
- Nature-inspired color palette (earth tones, soft greens)

#### 2. Wellness Dimensions (Planned)
Five pillars of wellness tracked through the app:

| Dimension | Icon | Description |
|---|---|---|
| **Mental** | Brain | Mindfulness, meditation, journaling |
| **Physical** | Heart | Exercise, movement, body care |
| **Energy** | Zap | Sleep quality, nutrition, vitality |
| **Progress** | BarChart | Goal tracking, streaks, trends |
| **Focus** | Target | Daily intentions, priority setting |

#### 3. Dashboard & Insights (Planned)
- Daily wellness score aggregated across dimensions
- Trend charts showing progress over time (ArrowUpRight)
- Actionable nudges via ChevronRight navigation prompts
- Weekly and monthly summaries

#### 4. Habit Tracking (Planned)
- Customizable daily check-ins per wellness dimension
- Streak tracking with visual tree growth rewards
- Gentle reminders without guilt-inducing patterns
- Flexible scheduling (daily, weekly, custom cadence)

### Technical Architecture

| Layer | Technology | Purpose |
|---|---|---|
| **UI Framework** | React (TypeScript) | Component-based interface |
| **Styling** | Tailwind CSS | Utility-first responsive design |
| **Icons** | Lucide React | Consistent, accessible iconography |
| **Animations** | SVG + CSS | Lightweight, performant visuals |
| **State** | React hooks (`useState`) | Local component state management |

### Current State

- **GrowingTree component**: Fully implemented animated SVG with ground, trunk, branches, and spark/flower nodes
- **SparkApp component**: Stub exported as default — ready for dashboard and feature integration
- **Project scaffolding**: Single-file prototype; needs build tooling, routing, and project structure

### Roadmap

#### Phase 1: Foundation
- [ ] Set up project build tooling (Vite + TypeScript)
- [ ] Establish component directory structure
- [ ] Add routing (React Router)
- [ ] Implement base layout and navigation

#### Phase 2: Core Experience
- [ ] Build wellness dimension check-in UI
- [ ] Implement local state management for habit data
- [ ] Connect tree growth animation to actual user progress
- [ ] Create daily dashboard view

#### Phase 3: Insights & Engagement
- [ ] Add progress charts and trend visualization
- [ ] Implement streak tracking and notifications
- [ ] Build weekly/monthly summary views
- [ ] Add personalization and goal setting

#### Phase 4: Polish & Scale
- [ ] Persist data (local storage or backend API)
- [ ] Add onboarding flow
- [ ] Accessibility audit and improvements
- [ ] Performance optimization for animations

### Design Principles

1. **Gentle encouragement over guilt** — The app celebrates progress, never punishes setbacks
2. **Organic metaphor** — Growth is non-linear; the tree visual reinforces patience
3. **Low friction** — Check-ins should take under 30 seconds
4. **Privacy first** — Wellness data stays with the user unless they choose otherwise
5. **Accessible** — Designed for all users regardless of ability

### Success Metrics

- Daily active engagement rate > 60%
- Average check-in completion time < 30 seconds
- 7-day habit streak retention > 40%
- User-reported wellness improvement after 30 days

### Repository

- **Source**: `spark-wellness-app-updated.tsx`
- **Branch**: `claude/dora-wellness-brief-i4U4r`
- **Author**: Sparkler42
