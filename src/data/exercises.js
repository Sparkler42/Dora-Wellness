import { T } from "../styles/tokens";

// Audio support — all paths are relative to public/audio/
//
// Exercise-level audio (single track for entire exercise):
//   audio: "gentle-hatha1.mp3"      →  public/audio/gentle-hatha1.mp3
//
// Step-level audio (per-step clips):
//   steps: [{ n: "...", d: 180, t: "...", audio: "yoga/grounding-breath.mp3" }]

export const EX = {
  yoga: {
    id: "yoga", cat: "body", title: "Gentle Hatha", sub: "Evening grounding flow", dur: 1800, color: T.sg, icon: "lotus",
    audio: "gentle-hatha1.mp3",
    desc: "Release tension through gentle somatic movement and yoga postures. Mindful alignment cues guide you into your body's most natural motions.",
    steps: [
      { n: "Grounding Breath", d: 180, t: "Stand or sit comfortably. Close your eyes. Feel your weight settle into whatever supports you. Breathe naturally and notice where breath moves \u2014 ribs, belly, back. Don\u2019t change it, just observe.", audio: "gentle-hatha-1.mp3" },
      { n: "Cat-Cow Awareness", d: 180, t: "Hands and knees. Inhale: belly drops, chest opens. Exhale: round through your spine. Move slowly \u2014 notice where movement initiates. Is it your pelvis? Mid-back? Follow the wave through your entire spine.", audio: "gentle-hatha-2.mp3" },
      { n: "Downward Dog Exploration", d: 180, t: "Press into downward dog. Bend one knee, then the other. Feel the difference between calf stretch and arm engagement. Is the sensation nerve, fascia, or muscle? There\u2019s no wrong answer \u2014 just notice the quality." },
      { n: "Low Lunge \u2014 Right", d: 150, t: "Right foot forward, back knee down. Don\u2019t push \u2014 invite length. Feel your left hip flexor. Where does sensation begin and end? Breathe into the edges." },
      { n: "Low Lunge \u2014 Left", d: 150, t: "Switch sides. Left foot forward. Does this side feel different? More open? More restricted? Your body isn\u2019t symmetrical \u2014 honor the uniqueness of each side." },
      { n: "Standing Forward Fold", d: 120, t: "Stand and fold forward. Bend knees generously. Head heavy. Grab opposite elbows and sway gently. Feel gravity assist you rather than forcing depth." },
      { n: "Warrior II Flow", d: 180, t: "Step wide, right foot out, bend right knee. Open arms. Feel the dynamic engagement \u2014 legs pressing into earth, torso floating between two opposing reaches." },
      { n: "Triangle Pose", d: 150, t: "Straighten front leg. Reach forward, tilt \u2014 right hand down, left hand up. Feel the length along your entire left side body. Where\u2019s the most alive sensation?" },
      { n: "Seated Twist", d: 180, t: "Seated. Left leg extended, right foot crosses over. Twist gently right. Each inhale: grow tall. Each exhale: explore deeper. The twist reveals itself through breath." },
      { n: "Savasana", d: 300, t: "Lie on your back. Let everything go. Scan from toes upward \u2014 notice what feels different. Let breath be natural. There\u2019s nothing to do and nowhere to be. Rest in awareness." },
    ],
  },
  stretch: {
    id: "stretch", cat: "body", title: "Active Stretching", sub: "Fundamentals series", dur: 1500, color: T.cl, icon: "muscle",
    desc: "Integrate interested attention with physical engagement. Discover the difference between nerve, fascia, and muscle sensation. David\u2019s signature method.",
    steps: [
      { n: "Attention Activation", d: 120, t: "Stand hip-width. Eyes closed. Feel four corners of each foot. Shift weight forward, back, left, right. Find center. Active stretching begins with attention, not force." },
      { n: "Ankle & Toe Mapping", d: 120, t: "Lift one foot. Circle ankle slowly both directions. Spread toes wide, curl them. Feel connective tissue awakening. These small structures hold your entire movement foundation." },
      { n: "Calf Engagement", d: 150, t: "Stand on a step edge. Heels drop below. Slowly rise onto toes. Pause at top \u2014 feel the engagement. Lower slowly. You\u2019re activating tissue you\u2019re lengthening. That\u2019s the key." },
      { n: "Hamstring Mapping", d: 180, t: "One foot on low surface, both legs straight. Hinge from hips. STOP at first edge of sensation. Is this muscle stretch or nerve pull? Nerves feel electric. Muscles feel broad and warm." },
      { n: "Hip Spiral Dynamics", d: 180, t: "Stand on left foot. Right knee to hip height. Circle knee outward, opening hip. Reverse. Your hip isn\u2019t a simple hinge \u2014 it spirals. Follow the spiral with your attention." },
      { n: "Spinal Articulation", d: 150, t: "From standing, roll down one vertebra at a time. Feel each segment differentiating. Where do you move easily? Where does spine move as a block? Those blocked areas want attention, not force." },
      { n: "Shoulder Activation", d: 150, t: "Arms overhead. Externally rotate \u2014 thumbs outward. Feel how this changes shoulder girdle engagement. Arms to shoulder height, internally rotate. Feel the difference." },
      { n: "Fascial Lines \u2014 Arms", d: 120, t: "Extend one arm. Spread fingers wide. Flex wrist back. Feel the fascial line from fingertips through palm, forearm, to shoulder. One continuous web responding to your attention." },
      { n: "Full Body Integration", d: 150, t: "Arms at sides. Simultaneously root through feet AND reach through crown. Feel two-directional pull. Your connective tissue transmits force along these lines." },
      { n: "Closing Awareness", d: 120, t: "Stand still. Eyes closed. How does your body feel compared to start? Where\u2019s more space, warmth, aliveness? You haven\u2019t just moved \u2014 you\u2019ve paid attention. That changes everything." },
    ],
  },
  strength: {
    id: "strength", cat: "body", title: "Core Strength", sub: "Stability & balance", dur: 2100, color: T.oc, icon: "muscle",
    desc: "Pilates and yoga-based movements for full-body connective tissue activation. Engage your core through spiral dynamics and functional patterns.",
    steps: [
      { n: "Pelvic Floor Activation", d: 120, t: "On your back, knees bent. Feel the triangle between hip bones and pubic bone. Gently engage pelvic floor. This is your deep core foundation. Hold lightly, breathe normally." },
      { n: "Dead Bug", d: 180, t: "Arms to ceiling, knees 90\u00b0. Extend right arm overhead and left leg long, hovering. Return. Switch. Keep lower back pressed to floor. If it lifts, you\u2019ve gone too far." },
      { n: "Bird Dog", d: 180, t: "Hands and knees. Extend right arm and left leg simultaneously. Hold. Feel the anti-rotation demand \u2014 your body wants to twist, deep stabilizers prevent it. Switch sides." },
      { n: "Modified Hundred", d: 180, t: "Curl head and shoulders up. Legs to tabletop. Pump arms vigorously \u2014 inhale 5 pumps, exhale 5. Keep lower back grounded. It\u2019s about maintaining core engagement while breathing dynamically." },
      { n: "Side Plank Hip Lift", d: 150, t: "Right forearm, stack feet. Lift hips. Lower an inch and lift. Feel oblique engagement \u2014 lateral core that stabilizes every step. 8 lifts each side." },
      { n: "Hollow Body Hold", d: 120, t: "On back. Press lower back to floor. Lift legs and shoulders slightly. Arms by ears. Hold. Bend knees if needed. Lower back stays DOWN." },
      { n: "Single Leg Bridge", d: 180, t: "Feet flat. Extend one leg to ceiling. Press through grounded foot, lift hips. Feel glute, hamstring, and deep hip stabilizers working together. Switch legs." },
      { n: "Anti-Rotation Press", d: 150, t: "Standing, hands clasped at chest. Press arms straight out. Slowly move arms right, center, left. Your core resists rotation. This protects your spine in daily life." },
      { n: "Spiral Crunch", d: 150, t: "On back, knees bent. Curl up reaching right hand to left knee, rotating ribcage. Switch sides. The oblique angles reflect how your body actually moves \u2014 diagonally, spirally." },
      { n: "Plank to Down Dog", d: 150, t: "Plank position. Press back to downward dog. Return. Feel how core transfers force between upper and lower body. Your whole structure works as one integrated system." },
      { n: "Supine Integration", d: 180, t: "Lie on back. Release everything. Notice which muscles still fire, which let go. Your core just supported every movement. Feel the warmth and aliveness in your center." },
    ],
  },
  barefoot: {
    id: "barefoot", cat: "body", title: "Barefoot Playground", sub: "Primal movement", dur: 1800, color: T.acS, icon: "sparkle",
    desc: "Open and strengthen from feet to shoulders. Move beyond linear patterns into spiral dynamic movements.",
    steps: [
      { n: "Foot Awakening", d: 120, t: "Barefoot. Rock forward to toes, back to heels. Side to side. Try lifting just your big toe while keeping others down. Then reverse. Your feet are the foundation \u2014 wake them up." },
      { n: "Bear Crawl", d: 150, t: "Hands and feet on floor, knees hovering an inch. Crawl forward: opposite hand and foot together. Keep hips low and level. Entire body connected as one system." },
      { n: "Crab Walk", d: 150, t: "Sit, hands behind you, feet flat. Lift hips. Walk forward, backward, sideways. Shoulder stabilizers, glutes, and wrists working together in a childhood pattern." },
      { n: "Deep Squat", d: 180, t: "Sink into deep squat \u2014 heels down if possible. Hold and breathe. Shift weight side to side. This position is your birthright \u2014 every body is designed for this." },
      { n: "Spiral Lunge", d: 180, t: "Step into lunge. Rotate torso toward front knee. One arm up, one down. Feel the spiral line from back foot through hip, across torso, to reaching hand. Switch sides." },
      { n: "Floor Crawling", d: 180, t: "Try crawling like a lizard \u2014 flat, moving from spine. Then army crawl. Then cross-lateral bear crawl. Each pattern activates different neurological pathways." },
      { n: "Balance Play", d: 150, t: "One foot. Close eyes. Feel micro-adjustments in ankle, hip, core. Slowly bend standing leg. How low while maintaining balance? This is proprioception in action." },
      { n: "Hip Flow", d: 180, t: "Wide stance. Let hips circle, figure-eight, undulate. Don\u2019t think \u2014 let your body find what feels good. Your hips store more potential for freedom than any other joint." },
      { n: "Shoulder Freedom", d: 150, t: "Circle arms in large sweeps. Swim through air. Move shoulders independently \u2014 shrugs, rolls, protraction, retraction. Incredible range when freed from habit." },
      { n: "Free Movement", d: 180, t: "No rules. Combine everything \u2014 crawling, squatting, spiraling, balancing, flowing. This is your playground. The point isn\u2019t perfection \u2014 it\u2019s the quality of your attention." },
    ],
  },
  somatic: {
    id: "somatic", cat: "body", title: "Somatic Release", sub: "Candlelight practice", dur: 1200, color: T.pl, icon: "lotus",
    desc: "Self-massage and gentle somatic movement to release tension and refine body awareness. Caroline\u2019s signature restorative practice.",
    steps: [
      { n: "Settling In", d: 120, t: "Comfortable position \u2014 lying down is ideal. Light a candle if you have one. Three slow breaths, each exhale twice as long as inhale. Give your nervous system permission to downshift." },
      { n: "Jaw & Face Release", d: 120, t: "Fingertips on jaw muscles. Small circles. Let jaw drop open. Massage temples, ridge above eyes, behind ears. Let your face go slack. We hold enormous tension here." },
      { n: "Neck Self-Massage", d: 120, t: "Gently squeeze muscles at back of neck. Tilt head slowly each side. Where you find tenderness, pause and breathe. One hand on chest, other on back of neck. Feel warmth. Hold." },
      { n: "Shoulder Melting", d: 150, t: "Roll to side. Imagine a ball under shoulder blade. Breathe into pressure. Micro-movements find the spots that release. Don\u2019t push through sharp pain. Find the edge where discomfort becomes relief." },
      { n: "Pandiculation", d: 120, t: "Reach arms overhead and STRETCH like waking up. Tighten arms, then slowly, consciously release. Feel the difference between contracted and released tissue. Repeat 3 times." },
      { n: "Hip Rocking", d: 150, t: "On back, knees bent. Knees fall gently side to side like a windshield wiper. Smaller and smaller until almost imperceptible. Feel how lower back responds \u2014 fascia, small muscles, sacrum." },
      { n: "Foot Massage", d: 120, t: "Massage sole of one foot with thumbs. Press into arch, roll ball of foot, squeeze each toe. More nerve endings per square inch than almost anywhere. A conversation with your nervous system." },
      { n: "Full Body Scan", d: 180, t: "Lie still. From toes, scan upward. At each area, consciously release. Toes, ankles, calves, knees, thighs, hips, belly, chest, shoulders, arms, hands, neck, face, scalp. Each exhale, let go more." },
    ],
  },
  nutrition: {
    id: "nutrition", cat: "body", title: "Mindful Nourishment", sub: "Conscious eating", dur: 600, color: T.sg, icon: "food",
    desc: "Bring full sensory attention to your relationship with food. Explore taste, texture, and the metabolic response of eating with presence.",
    steps: [
      { n: "Pre-Meal Pause", d: 90, t: "Before eating, stop. Look at your food. Notice colors, textures. Take a breath. Ask your body: what am I actually hungry for? Nourishment? Comfort? Energy? All valid \u2014 just notice." },
      { n: "First Bite Awareness", d: 90, t: "First bite slowly. Let it rest on your tongue. Notice initial flavors. Chew 10-15 times. How do flavors change? What textures emerge? This single bite contains more information than you usually notice." },
      { n: "Metabolic Observation", d: 120, t: "Continue eating. Pause every few bites. Hand on belly. Notice subtle digestion \u2014 warmth, expansion, satisfaction. Your body gives real-time feedback about what and how much it needs." },
      { n: "Satiety Sensing", d: 90, t: "Halfway through, pause. Rate fullness 1-10. Notice: mind might want to continue even when body is satisfied. This isn\u2019t restriction \u2014 it\u2019s hearing what your body communicates." },
      { n: "Gratitude", d: 90, t: "End of meal. Sit a moment. Notice energy shift. Feel nourishment entering your system. Express gratitude \u2014 to the food, to your body\u2019s ability to transform what you eat into life energy." },
    ],
  },
  meditation: {
    id: "meditation", cat: "mind", title: "Body Scan Meditation", sub: "Full-body awareness", dur: 900, color: T.oc, icon: "brain",
    desc: "A guided journey through your body\u2019s landscape. Develop present-moment awareness through multiple sensory channels.",
    steps: [
      { n: "Arrival", d: 90, t: "Find comfort. Close eyes. Three breaths \u2014 each slower, deeper. You\u2019re not going anywhere. You\u2019re arriving here, in this body, in this moment." },
      { n: "Feet & Legs", d: 120, t: "Attention to feet. Feel temperature, contact with surface. Notice tingling, warmth, numbness. Move awareness up \u2014 ankles, calves, knees, thighs. Just witnessing." },
      { n: "Pelvis & Belly", d: 120, t: "Feel your pelvis \u2014 the bowl of bone holding your center of gravity. Notice belly rising and falling. This area holds digestion, emotion, creative energy. Don\u2019t analyze, just feel." },
      { n: "Chest & Heart", d: 120, t: "Ribcage expanding, contracting. Can you feel your heartbeat? This is interoception \u2014 sensing your internal landscape. Each heartbeat is life energy moving through you." },
      { n: "Shoulders, Arms, Hands", d: 120, t: "Are shoulders lifted? Softened? Notice without correcting. Move down through arms to fingertips. Feel the subtle pulse \u2014 your circulatory system, alive and working." },
      { n: "Neck, Face, Skull", d: 120, t: "Weight of head being supported. Soften jaw. Relax tongue from roof of mouth. Space behind eyes. Forehead smooth. Even scalp holds tension \u2014 feel it releasing." },
      { n: "Whole Body", d: 120, t: "Expand awareness to entire body at once. One unified field of sensation. Warm and cool. Dense and spacious. Moving and still. You are a living landscape of awareness." },
    ],
  },
  attention: {
    id: "attention", cat: "mind", title: "Art of Attention", sub: "Interoceptive training", dur: 720, color: T.ac, icon: "eye",
    desc: "David\u2019s signature practice. Cultivate refined awareness that transforms your relationship with your body.",
    steps: [
      { n: "External Attention", d: 90, t: "Eyes open softly. Without moving head, notice everything in peripheral vision. Colors, shapes, movement. Listen \u2014 farthest sound? Nearest? You\u2019re a receiving station for incredible information." },
      { n: "Internal Shift", d: 90, t: "Close eyes. Shift attention inward. Feel heartbeat. Air entering nostrils \u2014 cool? Warm? Saliva in mouth. Clothes on skin. Your internal world is just as rich as external." },
      { n: "Narrowing", d: 90, t: "Focus attention to a coin-sized area on your right palm. Maximum detail \u2014 temperature, texture, pulse, weight. Narrow further \u2014 just center of palm. This is precision attention." },
      { n: "Widening", d: 90, t: "Expand: palm to whole hand. Arm. Whole right side. Entire body. Space around body. Attention zooms like a lens \u2014 narrow to a point or wide to encompass everything. You control this." },
      { n: "Following", d: 90, t: "Let attention move freely like a spotlight. It\u2019s naturally drawn to areas of intensity \u2014 tension, warmth, discomfort, pleasure. Don\u2019t direct it. Follow it. Where does your body want to be noticed?" },
      { n: "Dual Attention", d: 90, t: "Advanced: feel left hand AND right foot simultaneously. Hold both. This is what master bodyworkers use \u2014 sensing two points at once. Add a third: your breath. Expanded attention." },
      { n: "Resting", d: 90, t: "Let go of all direction. Let attention settle wherever it naturally wants. Don\u2019t control anything. Non-doing \u2014 allowing awareness to simply be. Where attention becomes effortless, healing happens." },
    ],
  },
  sensory: {
    id: "sensory", cat: "mind", title: "Sensory Observation", sub: "Mindful object exploration", dur: 600, color: T.cl, icon: "sparkle",
    desc: "Explore texture, weight, and temperature through hands and core. Practice sensing weight through torso awareness.",
    steps: [
      { n: "Object Selection", d: 60, t: "Pick up any object near you \u2014 cup, stone, book, fabric. Hold it. Close your eyes. Let your hands do the seeing." },
      { n: "Texture Exploration", d: 120, t: "Run fingertips slowly over every surface. Smooth, rough, ridged, soft, cool, warm. Notice micro-textures you\u2019ve never felt. Your fingertips have more touch receptors than almost any part of your body." },
      { n: "Weight Sensing", d: 120, t: "Hold object in open palm. Feel weight pressing into hand. Now bring to chest and hold there. Can you feel weight through your torso? Advanced interoception \u2014 sensing subtle weight through core body." },
      { n: "Temperature & Life", d: 120, t: "Notice temperature. Cup object in both hands. After 30 seconds, feel how your warmth changed it. You constantly exchange energy with everything you touch. Attention makes this conscious." },
      { n: "Integration", d: 120, t: "Open eyes. Look at object as if first time. You now know it beyond seeing. You have a felt relationship. Bringing full sensory attention to ordinary objects transforms ordinary life into continuous discovery." },
    ],
  },
  memory: {
    id: "memory", cat: "mind", title: "Memory Garden", sub: "Cognitive flexibility", dur: 480, color: T.sg, icon: "brain",
    desc: "Exercises in paradigm fluidity \u2014 consciously shifting between frameworks. Strengthen recall through embodied association.",
    steps: [
      { n: "Sensory Recall", d: 90, t: "Think of a meal you deeply enjoyed. Don\u2019t just remember the concept \u2014 recall taste, smell, temperature, texture, sounds around you. The more senses engaged, the more vivid the memory. Memory lives in the body." },
      { n: "Spatial Walk", d: 90, t: "In your mind, walk through a place you know well \u2014 childhood home, favorite trail. Room to room, turn by turn. Notice details: color of a door, feel of a bannister. Your spatial memory is extraordinarily powerful." },
      { n: "Perspective Shift", d: 120, t: "Think of a recent interaction. Replay from the other person\u2019s perspective. What were they seeing, feeling? Now view from above, as compassionate observer. This is cognitive flexibility \u2014 inhabiting multiple viewpoints." },
      { n: "Future Memory", d: 90, t: "Imagine a moment one year from now where you feel deeply well. Where are you? What does air smell like? Who\u2019s there? What does your body feel like? Make it vivid. Your brain doesn\u2019t fully distinguish vivid imagination from experience." },
    ],
  },
  selfaware: {
    id: "selfaware", cat: "mind", title: "Self-Practice Check-in", sub: "Art of self-practice", dur: 600, color: T.pl, icon: "heart",
    desc: "What does your body-mind actually need right now? Develop an intimate, responsive relationship with your own needs.",
    steps: [
      { n: "The Pause", d: 90, t: "Stop. Three breaths. Each exhale, shoulders drop. This pause is the most powerful self-care practice. Everything else follows from willingness to stop and check in." },
      { n: "Need Sensing", d: 120, t: "Ask your body: What do you need? Don\u2019t think the answer \u2014 feel for it. Movement? Rest? Food? Water? Connection? Solitude? Trust the first response that arises in sensation, not thought." },
      { n: "Nervous System Check", d: 120, t: "Notice baseline state. Activated \u2014 heart racing, shallow breath, restless? Low \u2014 foggy, heavy, unmotivated? Balanced \u2014 alert but calm? Name what you notice without judgment." },
      { n: "Self-Care Response", d: 120, t: "Based on what you sensed: if you need activation, try 10 jumping jacks or cold water on face. If calming, slow exhales or hand on heart. If balanced, appreciate it. Self-care is responsive, not formulaic." },
      { n: "Intention Setting", d: 90, t: "Set one small intention for the next hour. Not a goal \u2014 an intention. \u2018I will notice my breath three times.\u2019 \u2018I will eat with attention.\u2019 Small, embodied intentions create lasting change." },
    ],
  },
  imagine: {
    id: "imagine", cat: "play", title: "Imagination Lab", sub: "Everyday experiments", dur: 900, color: T.pl, icon: "sparkle",
    desc: "Simple imagination experiments using things already around you. No special equipment \u2014 just a pen, paper, a cup, and your willingness to see differently.",
    steps: [
      { n: "Free Doodle", d: 150, t: "Grab a pen and any scrap of paper. Set the pen on the page and let it move with no goal. No image in mind \u2014 just motion. Loops, scratches, pressure, release. When you stop, look at what appeared. Your hand knows things your thinking mind doesn\u2019t." },
      { n: "Animate the Still", d: 150, t: "Look at any image near you \u2014 a photo on the wall, a book cover, a pattern on a mug. Study it for thirty seconds. Now close your eyes and replay it in your mind \u2014 but let it move. Figures walk, colors shift, shapes breathe. What story does the still image want to tell when freed?" },
      { n: "Object Origin Story", d: 120, t: "Pick up the nearest small object \u2014 a pen, a spoon, your keys. Hold it and invent its secret history. Where was it made? Who touched it before you? Give it a name, a personality, a small adventure. Imagination turns the ordinary into the extraordinary." },
      { n: "Sound Painting", d: 120, t: "Close your eyes and listen to whatever sounds surround you. Now imagine each sound as a color or shape appearing in darkness. A hum might be a slow blue wave. A click, a bright orange dot. Let your ears paint a picture you\u2019ve never seen before." },
      { n: "Room Remix", d: 120, t: "Look around the room you\u2019re in. Now close your eyes and reimagine it \u2014 change the walls to glass, fill it with water, shrink it to the size of a shoebox, or expand it into a forest. Walk through your remixed space. What did you change first? That reveals what your imagination is hungry for." },
      { n: "Letter to an Object", d: 120, t: "Look at your cup, your shoe, or the chair you\u2019re sitting on. In your mind, write it a one-sentence thank-you letter. \u2018Dear mug, thanks for being warm every morning.\u2019 Silly? Yes. But gratitude plus imagination rewires how you see the ordinary world around you." },
    ],
  },
  pleasure: {
    id: "pleasure", cat: "play", title: "Pleasure Mapping", sub: "Amplify what feels good", dur: 720, color: T.cl, icon: "heart",
    desc: "Putting attention on expanding what feels good. Your starting place toward healing and embodied joy.",
    steps: [
      { n: "Pleasure Inventory", d: 120, t: "Scan body for anything that feels good. Even slightly good. Warmth of hands. Softness of clothing. Being supported by your chair. We\u2019re experts at finding discomfort. Train the opposite skill." },
      { n: "Amplification", d: 120, t: "Pick the most pleasant sensation. Focus all attention on it. Breathe into it. Does it expand? Change? Deepen? When you give attention to pleasure, it grows. Building a foundation of wellbeing." },
      { n: "Pleasure Movement", d: 120, t: "Move in a way that feels good. Not what you should do \u2014 what brings pleasure. Stretch, sway, roll, reach. Let body lead. Pleasure-led movement often accesses exactly what your body needs." },
      { n: "Sensory Pleasure", d: 120, t: "Touch something with a texture you love. Listen for a delightful sound. Look at something beautiful. Your senses are pleasure instruments. Today, play them consciously." },
      { n: "Pleasure Map", d: 120, t: "Create a body map of your pleasure points \u2014 places that respond most to pleasant sensation. Scalp massage? Arch of foot? Warmth on lower back? Your pleasure map is a self-care toolkit uniquely yours." },
    ],
  },
  playful: {
    id: "playful", cat: "play", title: "Playful Movement", sub: "Exploratory flow", dur: 1200, color: T.oc, icon: "sparkle",
    desc: "Fun, playful, and grounded to your core. Move with curiosity, exploring patterns you\u2019ve never tried.",
    steps: [
      { n: "Shake It Out", d: 120, t: "Stand and shake your whole body. Hands, arms, shoulders, hips, legs, head. Shake like a dog after a bath. Make sounds. This isn\u2019t elegant and that\u2019s the point. Shake until you\u2019re laughing." },
      { n: "Dance", d: 180, t: "Turn on music \u2014 real or imagined. Dance. Move parts you normally don\u2019t. Lead with elbows. Dance with just hips. Let fingers lead you across the room. If you\u2019re thinking too much, you\u2019re not dancing enough." },
      { n: "Floor Play", d: 180, t: "Get on the floor. Roll around. Find new ways to sit, lie, twist. How many positions in 3 minutes? Children spend hours on the floor \u2014 it\u2019s where your body finds its most creative vocabulary." },
      { n: "Mirror Game", d: 120, t: "Stand facing a mirror (real or imagined). Move one hand slowly. Other hand mirrors it. Now one leads with 2-second delay. Challenges coordination, creates beautiful flowing movement." },
      { n: "Animal Flow", d: 180, t: "Move like a cat. Then monkey. Then octopus. Then something that doesn\u2019t exist \u2014 invent an animal. Each pattern teaches your body something about its own potential. What feels most freeing?" },
      { n: "Stillness After Play", d: 120, t: "Lie down. Completely still. Feel aliveness buzzing through body after play. Dynamic movement followed by deep stillness \u2014 one of the most powerful ways to reset your nervous system." },
    ],
  },
  creative: {
    id: "creative", cat: "play", title: "Creative Expression", sub: "Embodied art", dur: 900, color: T.sg, icon: "sparkle",
    desc: "Creative expression as embodied awareness. Let your body lead the creative process.",
    steps: [
      { n: "Gesture Drawing", d: 180, t: "Grab any writing tool. Close eyes. Let hand move on its own. Don\u2019t draw anything \u2014 let shapes emerge. Open eyes after 2 minutes. Look at what your body created without mind\u2019s direction." },
      { n: "Sound Exploration", d: 120, t: "Make sounds. Not words \u2014 sounds. Hum, click, whistle, growl, sing vowels. Feel where each resonates in body. Low sounds vibrate in chest. High sounds tingle in sinuses. Your body is a musical instrument." },
      { n: "Movement Poem", d: 180, t: "Think of a word that captures how you feel. Express that word with your entire body \u2014 not mime, but pure movement quality. \u2018Heavy\u2019 might be slow sinking. \u2018Electric\u2019 might be quick jagged reaching." },
      { n: "Texture Creation", d: 120, t: "Gather or imagine three different textures. Arrange them. This is art. Art doesn\u2019t require skill \u2014 it requires attention. Choosing and arranging with awareness IS creative expression." },
      { n: "Integration Story", d: 180, t: "Tell a one-minute story about your day as an epic adventure. Exaggerate. Add drama. Make yourself the hero. The stories we tell about our lives shape how we experience them." },
    ],
  },
  sensual: {
    id: "sensual", cat: "play", title: "Sensory Feast", sub: "Full-spectrum awareness", dur: 600, color: T.ac, icon: "eye",
    desc: "Awaken all five senses simultaneously. A celebration of being alive in a body that perceives beauty.",
    steps: [
      { n: "Sight \u2014 Fresh Eyes", d: 120, t: "Look around as if you\u2019ve never seen it before. Notice light quality, shadows, colors you usually ignore. Find three beautiful things you haven\u2019t appreciated today. Beauty is everywhere when attention is present." },
      { n: "Sound \u2014 Deep Listening", d: 120, t: "Close eyes. Count distinct sounds. Start obvious, go deeper. Hum of electricity. Your breathing. Subtle body sounds. Layer upon layer of sound surrounds you always." },
      { n: "Touch \u2014 Full Body", d: 120, t: "Feel air on skin. Pressure of gravity. Texture of clothing. Run hands over arms. Temperature differences across body. You\u2019re constantly touched by the world \u2014 bring awareness to it." },
      { n: "Smell & Taste", d: 90, t: "Breathe deeply through nose. What do you smell? Even \u2018nothing\u2019 has a quality. If food is nearby, taste with complete attention. These chemical senses connect you directly to environment." },
      { n: "Synesthetic Integration", d: 90, t: "Hold all five senses in awareness simultaneously. You\u2019re a full-spectrum sensing being. Usually at 10% capacity. Right now, 100%. This is what it feels like to be fully alive." },
    ],
  },
};
