# SPARK APP — Claude Code Project Brief
## Project Overview
Spark is a comprehensive wellness application created by David Moll and Caroline Dunham, based in Ukiah, California (590 S. Dora Street, 95482). The business operates under the LLC "Attention Alchemists" with a consumer-facing brand called "Spark" (also known as "Dora Yoga" for class-specific contexts).
David and Caroline are partners in both life and business. Together they bring over three decades of combined experience in bodywork, yoga, somatic awareness, functional movement, and consciousness exploration. This app is the digital extension of their in-person teaching practice.
A React prototype has already been built and is included as `dora-wellness-app.jsx`. It contains all core features in a single file and needs to be refactored into a proper project structure.
---
## Founders & Their Expertise
### David Moll
- Practicing and teaching bodywork since 1990 (35+ years)
- Trained at Heartwood Institute in bodywork and yoga
- Specialties: Neuromuscular Therapy, Pilates, fascia work, functional movement
- Developed "The Art of Attention" — a signature interoceptive training methodology
- Has been exploring consciousness and attention practices since the late 1970s
- Teaching philosophy: "The space between where you are and where you want to be is within reach at this moment"
- Session rate: $150/hour for private bodywork or movement sessions
- Currently teaches: Core Strength & Stability, Barefoot Playground, Active Stretching workshops
- Author of autobiographical work "The Cosmic Signature"
- Developing a parenting manual focused on teen communication and metabolic awareness
### Caroline Dunham
- Licensed Massage Therapist, Thai Massage Practitioner, published poet
- B.S. Chemical Engineering, Cornell University 2012
- Ran a yoga studio for 10 years; operations manager at yoga/wellness center in Atlanta 2013-2021
- Taught physical education (Yoga) at Agnes Scott College 2014-2024
- Co-led 200-hour yoga teacher trainings and 500-hour training modules
- Created two seasons of "Yoga Basics" TV segment for Atlanta Interfaith Broadcasting
- 3000+ hours of additional training and workshops
- Specializes in: yoga, somatic-informed movement, therapeutic bodywork, embodied philosophy
- Teaching philosophy: alignment, activation, self-awareness, exploration, empowerment
- Currently teaches: Gentle Hatha (evenings), Hatha Flow (Sunday mornings), Candlelight Yoga (restorative)
---
## Core Philosophy (Use throughout the app and AI agent)
These are direct quotes and principles from David and Caroline that should inform every aspect of the app:
### On Attention
- "Attention is at the heart of our lives. Everything we do requires a stimulus and response."
- "Body-based attention transcends all stratospheres of human existence."
- "The art of attention" — teaching people to develop refined interoceptive and proprioceptive awareness
- Distinction between nerve sensation (electric, zingy) vs. muscle/fascia stretch (broad, warm) is fundamental
### On Movement
- "Movement is life. Move for your life."
- "Your world is your gym."
- Active stretching is the integration of interested attention and engagement of physical tissues
- Functional movement requires flexibility, strength, and agility working in harmony: the elasticity to lengthen, the stability to control, and the responsiveness to adapt
- "Going beyond the linear way of moving body, encouraging you to deeply pay attention to the quality of movement"
### On Healing & Pleasure
- "Putting your attention on expanding what feels good is the starting place toward healing"
- "The only failure of life is death. Everything else in between is subjective interpretation"
- "When we follow the trail of inquiry with interest in the process, we are rewarded with the blessing of imagination"
### On Self-Practice
- "Every moment is an opportunity to practice"
- "Embodiment is the weaving of attention and full-sensory participation"
- Self-care is responsive, not formulaic — help users sense what they actually need
- "You are already doing it right" — their foundational belief
### On Device/Phone Habits
- When you notice the urge for your phone, pause and fully feel the underlying metabolic state
- Ask: "What does this body-mind actually need right now?"
- Usually the need is movement, connection, creative expression, or rest — none of which the phone provides
- The phone often serves as a numbing agent
### On Imagination
- "Imagination as consciousness technology"
- Recognizing creative imagination not as fantasy but as a tool for accessing potential realities
- "Paradigm fluidity" — developing capacity to consciously shift between different explanatory frameworks
---
## App Features — Complete Specification
### 1. Intake / Onboarding System (10 screens)
A beautiful, step-by-step onboarding flow that personalizes the entire app experience. Progress bar at top, one question per screen, back/forward navigation.
**Questions:**
1. Name (text input)
2. Age range: 18–29, 30–39, 40–49, 50–59, 60+
3. Movement experience: Brand new, Some yoga/stretching, Regular mover, Advanced
4. Goals (multi-select): Reduce pain/tension, Build strength, Improve flexibility, Mental clarity, Stress relief, Better sleep, Self-discovery, Fun & play, Body connection
5. Body focus areas (multi-select): Feet & ankles, Hips & pelvis, Lower back, Core, Shoulders, Neck & jaw, Whole body, Nothing specific
6. Mind practice interests (multi-select): Meditation, Attention training, Sensory awareness, Memory & cognition, Self-reflection, Imagination
7. Time available: 5–10 min, 15–20 min, 30–45 min, 60+ min
8. Time of day: Early morning, Mid-morning, Afternoon, Evening, Varies
9. Notification preference: Very gently, Balanced, Actively, On my own
10. Device wellness opt-in: Yes/Maybe later/No thanks
**All intake data feeds into:**
- Personalized "For You" practice recommendations on home screen
- AI Wellness Agent context
- Default notification settings
- Device wellness feature toggle
### 2. Exercise System — 16 Fully Built Practices
Every practice has: title, subtitle, duration, color, icon, description, and an array of timed steps with detailed instructions. The prototype JSX file contains all 16 practices fully written out.
**BODY practices (6):**
**Gentle Hatha** (30 min, 10 steps) — Evening grounding yoga flow. Steps: Grounding Breath, Cat-Cow Awareness, Downward Dog Exploration, Low Lunge Right/Left, Standing Forward Fold, Warrior II, Triangle, Seated Twist, Savasana.
**Active Stretching** (25 min, 10 steps) — David's signature Fundamentals series. Steps: Attention Activation, Ankle & Toe Mapping, Calf Engagement, Hamstring Mapping, Hip Spiral Dynamics, Spinal Articulation, Shoulder Activation, Fascial Lines, Full Body Integration, Closing Awareness.
**Core Strength** (35 min, 11 steps) — Pilates/yoga-based core work. Steps: Pelvic Floor Activation, Dead Bug, Bird Dog, Modified Hundred, Side Plank Hip Lift, Hollow Body Hold, Single Leg Bridge, Anti-Rotation Press, Spiral Crunch, Plank to Down Dog, Supine Integration.
**Barefoot Playground** (30 min, 10 steps) — Primal movement exploration. Steps: Foot Awakening, Bear Crawl, Crab Walk, Deep Squat, Spiral Lunge, Floor Crawling, Balance Play, Hip Flow, Shoulder Freedom, Free Movement.
**Somatic Release** (20 min, 8 steps) — Caroline's candlelight restorative. Steps: Settling In, Jaw & Face Release, Neck Self-Massage, Shoulder Melting, Pandiculation, Hip Rocking, Foot Massage, Full Body Scan.
**Mindful Nourishment** (10 min, 5 steps) — Conscious eating practice. Steps: Pre-Meal Pause, First Bite Awareness, Metabolic Observation, Satiety Sensing, Gratitude.
**MIND practices (5):**
**Body Scan Meditation** (15 min, 7 steps) — Full-body awareness. Steps: Arrival, Feet & Legs, Pelvis & Belly, Chest & Heart, Shoulders/Arms/Hands, Neck/Face/Skull, Whole Body Integration.
**Art of Attention** (12 min, 7 steps) — David's signature interoceptive training. Steps: External Attention, Internal Shift, Narrowing, Widening, Following, Dual Attention, Resting.
**Sensory Observation** (10 min, 5 steps) — Object exploration. Steps: Object Selection, Texture Exploration, Weight Sensing, Temperature & Life, Integration.
**Memory Garden** (8 min, 4 steps) — Cognitive flexibility. Steps: Sensory Recall, Spatial Walk, Perspective Shift, Future Memory.
**Self-Practice Check-in** (10 min, 5 steps) — Art of self-practice. Steps: The Pause, Need Sensing, Nervous System Check, Self-Care Response, Intention Setting.
**PLAY practices (5):**
**Imagination Lab** (15 min, 6 steps) — Creative visualization. Steps: Blank Canvas, Color Breathing, Shape Shifting, Future Self, Creative Download, Return.
**Pleasure Mapping** (12 min, 5 steps) — Amplify what feels good. Steps: Pleasure Inventory, Amplification, Pleasure Movement, Sensory Pleasure, Pleasure Map.
**Playful Movement** (20 min, 6 steps) — Exploratory flow. Steps: Shake It Out, Dance, Floor Play, Mirror Game, Animal Flow, Stillness After Play.
**Creative Expression** (15 min, 5 steps) — Embodied art. Steps: Gesture Drawing, Sound Exploration, Movement Poem, Texture Creation, Integration Story.
**Sensory Feast** (10 min, 5 steps) — Full-spectrum awareness. Steps: Sight, Sound, Touch, Smell & Taste, Synesthetic Integration.
### 3. Exercise Runner
Full-screen guided experience with:
- Per-step countdown timer with circular progress ring
- Step name, parent exercise title, detailed instruction text
- Pause/Play, Previous Step, Next Step/Skip controls
- Overall progress bar showing position within the full exercise
- Auto-advance to next step when timer completes
- Completion screen with encouragement message and "Complete & Return" button
- Completion marks exercise as done, updates streak, logs to history
### 4. AI Wellness Agent (Paywalled — Embody Deep tier)
Conversational AI powered by the Anthropic API (claude-sonnet-4-20250514). Lives in a "Guide" tab.
**System prompt includes:**
- Complete Spark philosophy (all quotes and principles above)
- User's full intake profile (name, age, experience, goals, focus areas, mind interests, time, preferences)
- Practice metrics (current tier, streak, sessions completed today, total sessions, recent exercise history)
- Device wellness data (screen time, pickups, patterns)
- Available exercise list for making specific recommendations
**Behavior:**
- Warm, embodied, direct — speaks as a thoughtful wellness practitioner
- Gives personalized recommendations based on goals, experience, and practice history
- Suggests specific exercises from the library when relevant
- References David and Caroline's teachings naturally
- 2-4 paragraphs max per response
- If someone needs professional help, gently suggests consultation
**Paywall:** Users on Free or Flow tier see a locked screen with description and upgrade prompt. Deep and Private tiers get full access.
**Welcome message:** "Hi [name], I'm your Spark guide. I can see your practice history and goals. Ask me about exercises, your progress, body questions, or what to practice next."
### 5. Paywall / Tier Structure
**Embody Free** (Free) — Color: sage green
- Daily intention & body scan meditation
- 3 guided sessions per week
- Basic awareness exercises
- Community forum access
- Weekly tip from David & Caroline
**Embody Flow** ($14/mo) — Color: ocean blue — MOST POPULAR tag
- Everything in Free
- Full practice library (all 16 exercises)
- Active Stretching fundamentals course
- Imagination & pleasure practices
- Personalized daily suggestions
- Device awareness insights
- Monthly live Q&A with David & Caroline
**Embody Deep** ($29/mo) — Color: gold
- Everything in Flow
- AI Wellness Agent — 24/7 personalized guidance
- Art of Self-Practice weekend modules
- Advanced interoceptive training
- Nutrition & lifestyle integration
- Quarterly live workshop access
- Practice journal & analytics
**Embody Private** ($150/session) — Color: plum
- Everything in Deep
- 1-on-1 sessions with David or Caroline
- Personalized movement assessment
- Custom bodywork guidance
- In-person sessions at Ukiah studio
- Direct messaging with practitioners
- Custom practice programming
**Locking behavior:**
- Free: Body practices + meditation + self-check-in unlocked. Play/imagination, advanced mind practices, AI agent locked.
- Flow: All practices unlocked. AI agent locked.
- Deep: Everything unlocked.
- Private: Everything + direct access.
### 6. Notification Preferences
Per-category controls with 4 levels: Off, Gentle, Moderate, Persistent
**Categories:**
- Morning Intention — Start your day with presence
- Movement Reminders — Gentle nudges to move
- Breath Awareness — Micro-moments of attention
- Evening Wind-down — Release and restore
- Device Wellness — Screen time insights
- Community Updates — New content & events
Pre-populated based on intake answer. Visual slider/segmented control for each.
### 7. Device Wellness Dashboard
Opt-in feature (set during intake). Shows:
- Screen time today (with comparison to average)
- Phone pickups (with weekly trend)
- Longest unbroken session (with suggestion for movement breaks)
- First pickup time (with suggestion for morning practice before screen)
- Personalized suggestion: "You picked up your phone 6 times between 2-4 PM. That window would be great for a 10-minute Active Stretching break."
Philosophy: "When you notice the urge for your phone, pause and feel the underlying state. Ask: What does my body-mind actually need?" — David's attention practice.
### 8. Pleasure Journal
Text entry area in the Play tab. Prompt: "Putting attention on expanding what feels good is the starting place toward healing. What brought you pleasure today?"
Saving an entry counts toward streak and logs to practice history.
### 9. Profile & Stats
- User avatar (initial-based), name, streak, tier display
- Stats: streak days, sessions today, total sessions
- Quick links: Notification preferences, Device wellness, Upgrade plan, Retake intake
- About section with Spark description and "You are already doing it right" quote
### 10. Personalized "For You" Recommendations
Algorithm based on intake data:
- Pain/tension goals → Somatic Release
- Strength goals + Core focus → Core Strength
- Flexibility goals → Active Stretching
- Mental clarity + Attention interest → Art of Attention
- Stress/sleep goals → Body Scan Meditation
- Fun/play goals → Playful Movement
- Self-discovery + Imagination interest → Imagination Lab
- Body connection → Sensory Observation
- Self-reflection interest → Self-Practice Check-in
- Feet/ankles focus → Barefoot Playground
- Hips/pelvis focus → Gentle Hatha
- Always include Yoga and Nutrition as defaults
### 11. Daily Intentions
Rotating quotes from David and Caroline displayed on the home hero:
1. "Your body speaks to you constantly. Today, listen." — David
2. "Small shifts in awareness create profound changes." — Caroline
3. "Movement is life. Move for your life." — Spark
4. "The space between where you are and where you want to be is within reach." — David
5. "Every moment is an opportunity to practice." — Caroline & David
6. "Follow the trail of inquiry with interest in the process." — David
7. "Embodiment is the weaving of attention and full-sensory participation." — David
---
## Design System
### Aesthetic Direction
Organic, warm, refined. Think high-end wellness retreat meets thoughtful editorial. NOT generic wellness app pastels. NOT tech-bro minimalism. Earthy, alive, grounded.
### Color Palette
- Background: #F7F3EE (warm paper)
- Background warm: #EDE7DF
- Background deep: #2C2825 (dark sections)
- Card: #FFFFFF
- Accent/Gold: #B8860B (primary action color)
- Accent soft: #D4A843
- Sage: #8B9A7B (body/yoga)
- Sage soft: #A8B89A
- Clay: #C4957A (stretching/sensation)
- Ocean: #6B8A9E (mind/meditation)
- Plum: #8B6E8A (play/imagination)
- Text: #2C2825
- Text mid: #5C564F
- Text light: #8A8279
- Text on dark: #F0ECE6
### Typography
- Display/Headings: DM Serif Display
- Body/UI: DM Sans (weights: 300, 400, 500, 600, 700)
- Never use generic fonts (Inter, Roboto, Arial)
### Radius & Shadow
- Cards: 16px radius
- Buttons: 14px radius
- Modals: 24px top corners
- Tags/badges: 20px radius
- Shadow: 0 2px 20px rgba(44,40,37,0.06)
- Elevated shadow: 0 8px 32px rgba(44,40,37,0.10)
### UI Patterns
- Bottom sheet modals (slide up from bottom, 24px rounded top corners)
- Bottom tab bar with frosted glass effect (backdrop-filter: blur)
- Soft animated background orbs in hero/dark sections
- Progress rings for timers
- Staggered card entrance animations
- Green stripe on completed practice cards
- Lock icon on paywalled content
- "Most Popular" badge on Flow tier
### Mobile-First
- Max width: 430px, centered
- Safe area padding for bottom nav
- Touch-friendly tap targets (min 48px)
- No hover-dependent interactions
---
## Technical Architecture (for Claude Code)
### Recommended Stack
- **Framework:** React with Vite (or Next.js if you want SSR)
- **Styling:** Tailwind CSS with custom design tokens, or CSS modules
- **State Management:** React Context + useReducer for global state (user profile, tier, completed exercises, streak)
- **Database:** Supabase or Firebase for user data persistence
- **Auth:** Supabase Auth or Firebase Auth
- **AI Agent:** Anthropic API (claude-sonnet-4-20250514) — API key must be handled server-side
- **Payments:** Stripe for subscription tiers
- **Notifications:** Firebase Cloud Messaging or OneSignal
- **Deployment:** Vercel or Netlify
### Suggested File Structure
```
src/
├── components/
│   ├── ui/           # Button, Modal, Card, ProgressRing, Icon, etc.
│   ├── intake/       # IntakeFlow, IntakeQuestion
│   ├── exercises/    # ExerciseCard, ExerciseDetail, ExerciseRunner
│   ├── chat/         # ChatInterface, ChatMessage, ChatInput
│   ├── home/         # HomeHero, RecommendedPractices, QuickActions
│   └── profile/      # ProfileStats, NotificationSettings, DeviceWellness
├── data/
│   ├── exercises.js        # All 16 exercise definitions with steps
│   ├── intake-questions.js # Intake flow configuration
│   ├── tiers.js           # Paywall tier definitions
│   ├── intentions.js      # Daily quotes
│   └── notifications.js   # Notification category definitions
├── context/
│   ├── UserContext.js     # Profile, tier, preferences
│   ├── PracticeContext.js # Completed sessions, streak, history
│   └── ChatContext.js     # AI chat messages
├── hooks/
│   ├── useTimer.js        # Exercise timer logic
│   ├── useRecommendations.js  # Personalization algorithm
│   └── useDeviceMetrics.js    # Device observation integration
├── api/
│   ├── chat.js           # Server-side Anthropic API calls
│   └── stripe.js         # Payment processing
├── pages/ (or routes/)
│   ├── Intake.jsx
│   ├── Home.jsx
│   ├── Practice.jsx
│   ├── Mind.jsx
│   ├── Play.jsx
│   ├── Chat.jsx
│   └── Profile.jsx
├── styles/
│   └── tokens.js         # Design tokens (colors, spacing, typography)
└── utils/
    ├── formatTime.js
    └── metricsBuilder.js  # Builds user metrics string for AI agent
```
### Key Technical Considerations
**AI Agent Security:**
The Anthropic API key MUST NOT be in the client. Create a server-side endpoint (API route in Next.js, or Supabase Edge Function, or separate Express server) that:
1. Receives the user's message + session history
2. Builds the system prompt with user metrics
3. Calls the Anthropic API
4. Returns the response
**Device Wellness:**
For a real implementation, you'd need either:
- iOS Screen Time API (limited, requires user to share)
- Android Digital Wellbeing API
- A companion widget or accessibility service
- Or, for MVP, manual check-in where users self-report or the app tracks its own usage patterns
**Payments:**
Stripe Subscriptions for monthly tiers (Flow at $14/mo, Deep at $29/mo). Private sessions can use Stripe Payment Links or a booking system integration.
**Data Model:**
```
users:
  id, name, email, age_range, experience, goals[], body_areas[],
  mind_interests[], time_available, time_of_day, notification_prefs{},
  device_wellness_opted_in, tier, created_at
practice_sessions:
  id, user_id, exercise_id, completed_at, duration_seconds,
  steps_completed, notes
streaks:
  user_id, current_streak, longest_streak, last_practice_date
journal_entries:
  id, user_id, content, created_at
chat_history:
  id, user_id, role, content, created_at
```
---
## Prototype File
The file `dora-wellness-app.jsx` is a single-file React component that contains:
- All 16 exercises with complete step-by-step instructions
- Working intake flow (10 questions)
- Exercise runner with timer, pause/play, skip controls
- AI chat interface (calls Anthropic API directly — needs server-side refactor)
- Paywall with tier selection
- Notification settings UI
- Device wellness dashboard
- Profile with stats
- Personalized recommendations
- Pleasure journal
- Daily intentions
- All icons as inline SVG
- Complete design token system
This file is the starting point. Refactor it into the component structure above.
---
## Business Context
- Location: 590 S. Dora Street, Ukiah, CA 95482
- LLC: Attention Alchemists
- Consumer brand: Spark / Dora Yoga
- Website: embodyyournow.com (existing)
- Current class locations: Ukiah studio, previously at Atma Yoga in Orinda and Forma Gym
- Classes: Gentle Hatha, Core Strength & Stability, Barefoot Playground, Candlelight Yoga, Hatha Flow, Active Stretching workshops
- Also launching: "Attention Alchemists" vlog series on YouTube covering body, mind, philosophy, health, travel
- Target demographic: 30-65 year olds interested in functional movement, body awareness, mindful living. Both experienced yogis/movers and curious beginners.
---
## Priority Order for Development
1. **Project scaffolding** — Vite + React, file structure, design tokens, routing
2. **Intake flow** — First user experience, must be polished
3. **Exercise data + cards** — Import all 16 practices, build card and detail views
4. **Exercise runner** — Timer, step progression, completion tracking
5. **Home screen** — Hero, recommendations, quick actions
6. **Tab navigation** — All 6 tabs working (Home, Practice, Mind, Play, Guide, You)
7. **State persistence** — Supabase or Firebase for user data
8. **AI agent** — Server-side API route, chat interface, paywall gate
9. **Payments** — Stripe subscriptions
10. **Notifications** — Push notification infrastructure
11. **Device wellness** — Real device metric integration (or MVP self-report)
12. **Polish** — Animations, transitions, edge cases, accessibility
