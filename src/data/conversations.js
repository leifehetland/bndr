/**
 * Seeded threads. `from` is 'jr' or 'them'. `minutesAgo` is converted to a real
 * timestamp when the app state is built (and rebuilt on /reset), so the thread
 * always reads as "today" on set.
 *
 * Suitor #1 is the story-critical thread: JR checks it on arrival at Forkin' Road.
 */
export const seedThreads = {
  suitor1: [
    { from: 'them', text: 'Okay I have to say it, your dog in pic 3 is a 10/10', minutesAgo: 60 * 26 },
    { from: 'jr', text: 'Ha thank you, she knows it too. Unfortunately', minutesAgo: 60 * 26 - 4 },
    { from: 'them', text: 'So are we finally doing this dinner thing?', minutesAgo: 60 * 25 },
    { from: 'jr', text: 'We are! Have you been to Forkin\' Road?', minutesAgo: 60 * 25 - 6 },
    { from: 'them', text: 'Never, but I read every single review. Apparently the burrata is the move', minutesAgo: 60 * 25 - 9 },
    { from: 'jr', text: 'Someone did their homework', minutesAgo: 60 * 25 - 10 },
    { from: 'them', text: 'Tomorrow at 7?', minutesAgo: 60 * 24 - 30 },
    { from: 'jr', text: 'It\'s a date 🙂', minutesAgo: 60 * 24 - 32 },
    { from: 'them', text: 'Just grabbed a table by the window. See you soon!', minutesAgo: 14 },
    { from: 'jr', text: 'Walking in now', minutesAgo: 3 },
    { from: 'them', text: 'Window table, I\'ll wave 👋', minutesAgo: 1 },
  ],
  suitor2: [
    { from: 'them', text: 'Important question before we go any further', minutesAgo: 60 * 24 * 9 },
    { from: 'them', text: 'How do you feel about salmon balls', minutesAgo: 60 * 24 * 9 - 1 },
    { from: 'jr', text: 'I have... never thought about salmon balls', minutesAgo: 60 * 24 * 9 - 20 },
    { from: 'them', text: 'That changes this week. Trust me', minutesAgo: 60 * 24 * 9 - 22 },
  ],
  suitor3: [
    { from: 'jr', text: 'Thanks again for dinner last night!', minutesAgo: 60 * 24 * 5 },
    { from: 'them', text: 'Sorry I got a little emotional during dessert', minutesAgo: 60 * 24 * 5 - 30 },
    { from: 'them', text: 'And the appetizers. And the entree', minutesAgo: 60 * 24 * 5 - 31 },
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
