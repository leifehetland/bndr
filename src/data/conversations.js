/**
 * Seeded threads. `from` is 'jr' or 'them'. `minutesAgo` is converted to a real
 * timestamp when the app state is built (and rebuilt on /reset), so the thread
 * always reads as "today" on set.
 *
 * Max (Suitor #1) is the story-critical thread: JR checks it on arrival at Forkin' Road.
 */
export const seedThreads = {
  // Max (1.jpeg, Suitor #1): newest thread, always on top, unread.
  p9: [
    { from: 'them', text: 'Okay I have to say it, your dog in pic 3 is a 10/10', minutesAgo: 60 * 26 },
    { from: 'jr', text: 'Ha thank you, she knows it too. Unfortunately', minutesAgo: 60 * 26 - 4 },
    { from: 'them', text: 'So are we finally doing this dinner thing?', minutesAgo: 60 * 25 },
    { from: 'jr', text: 'We are! Have you been to Forkin\' Road?', minutesAgo: 60 * 25 - 6 },
    { from: 'them', text: 'Never, but I read every single review. Apparently the burrata is the move', minutesAgo: 60 * 25 - 9 },
    { from: 'jr', text: 'Someone did their homework', minutesAgo: 60 * 25 - 10 },
    { from: 'them', text: 'Tomorrow at 7?', minutesAgo: 60 * 24 - 30 },
    { from: 'jr', text: 'It\'s a date 🙂', minutesAgo: 60 * 24 - 32 },
    { from: 'them', text: 'Just grabbed a table by the window', minutesAgo: 14 },
    { from: 'jr', text: 'Walking in now', minutesAgo: 3 },
    { from: 'them', text: 'So excited to see you!', minutesAgo: 1 },
  ],
  // Derek (2.jpeg)
  p1: [
    { from: 'them', text: 'Quick posture check: are you slouching right now', minutesAgo: 60 * 5 },
    { from: 'jr', text: '...I am now sitting up very straight', minutesAgo: 60 * 5 - 3 },
    { from: 'them', text: 'Proud of you 😂', minutesAgo: 60 * 5 - 4 },
  ],
  // Luis (3.jpg)
  p6: [
    { from: 'jr', text: 'Okay chef, settle this. Pineapple on pizza?', minutesAgo: 60 * 28 },
    { from: 'them', text: 'I will not be answering that without a lawyer present', minutesAgo: 60 * 27 },
    { from: 'jr', text: 'Ha that\'s a yes', minutesAgo: 60 * 27 - 5 },
  ],
  // Sam (4.jpg)
  p4: [
    { from: 'them', text: 'Hey! How\'s your weekend going?', minutesAgo: 60 * 24 * 2 },
    { from: 'jr', text: 'Pretty good! Just got back from a run. You?', minutesAgo: 60 * 24 * 2 - 15 },
    { from: 'them', text: 'Working a double but the playlist is elite tonight', minutesAgo: 60 * 24 * 2 - 20 },
  ],
  // Kevin (5.jpeg)
  p3: [
    { from: 'them', text: 'Random question but do you own a suit', minutesAgo: 60 * 24 * 4 },
    { from: 'jr', text: 'Do I need to?', minutesAgo: 60 * 24 * 4 - 10 },
    { from: 'them', text: 'I have 6 weddings this summer. No pressure', minutesAgo: 60 * 24 * 4 - 12 },
  ],
}

// Opener sent automatically by a new match from the swipe deck.
export const newMatchOpeners = [
  'Well hello there 👋',
  'Okay your profile made me laugh, that is rare',
  'Hi! How\'s your weekend going?',
  'I have a feeling we\'d get along',
]

// Canned small-talk replies when JR types something. Cycles in order.
export const smallTalkReplies = [
  'Haha I love that',
  'Okay wait, tell me more',
  'Same honestly',
  'So what do you do for fun?',
  'That\'s a very good answer',
  'Ha, you\'re funny',
  'Are you more of a brunch person or a late night tacos person?',
  'Noted 😄',
]
