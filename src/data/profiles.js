/**
 * All profiles shown in Bndr.
 *
 * PHOTOS: local files in public/ are cleared for use (friends who OK'd their
 * likeness). Anything using ph() is a randomuser.me DEV PLACEHOLDER: low-res,
 * unclear releases, needs internet. Replace before filming.
 */
const ph = (n) => `https://randomuser.me/api/portraits/men/${n}.jpg`

// The phone owner. Every screen is JR's account.
export const currentUser = {
  id: 'jr',
  name: 'JR',
}

// Already matched before the scene starts (these have message threads).
// TODO: confirm Suitor names with production; script only says SUITOR #1-#6.
export const matchedProfiles = [
  {
    id: 'suitor1',
    role: 'SUITOR #1',
    name: 'Ryan',
    age: 32,
    job: 'Management Consultant',
    distance: '2 miles away',
    bio: 'Spreadsheets by day, sourdough by night. Looking for someone to split appetizers and opinions with.',
    photo: ph(32), // MUST be the Suitor #1 actor before shooting
  },
  {
    id: 'suitor2',
    role: 'SUITOR #2',
    name: 'Marcus',
    age: 31,
    job: 'Food Blogger',
    distance: '5 miles away',
    bio: 'I will absolutely judge a restaurant by its seafood appetizers. Ask me about my top 10 brunch spots.',
    photo: ph(45),
  },
  {
    id: 'suitor3',
    role: 'SUITOR #3',
    name: 'Theo',
    age: 30,
    job: 'Grief Counselor',
    distance: '3 miles away',
    bio: 'Emotionally available (maybe too available). Cries at commercials, owns it.',
    photo: ph(22),
  },
]

// The swipe deck. matchesBack: true triggers the match overlay on a right swipe.
export const deckProfiles = [
  // First four: real friends who OK'd their likeness (public/1-4).
  { id: 'p1', name: 'Derek', age: 29, job: 'Physical Therapist', distance: '1 mile away', bio: 'Will fix your posture whether you ask or not. Dog dad to a very dramatic corgi.', photo: '/2.jpeg', matchesBack: true },
  { id: 'p3', name: 'Kevin', age: 35, job: 'Sales Director', distance: '7 miles away', bio: 'Work hard, brunch harder. Looking for my plus-one to every wedding this summer.', photo: '/1.jpeg', matchesBack: false },
  { id: 'p6', name: 'Luis', age: 34, job: 'Chef', distance: '3 miles away', bio: 'I will cook for you on the second date. The first date is for seeing if you salt your food before tasting it.', photo: '/3.jpg', matchesBack: true },
  { id: 'p4', name: 'Sam', age: 28, job: 'Bartender', distance: '1 mile away', bio: 'I make a mean old fashioned and an even meaner playlist. Come say hi on a Tuesday.', photo: '/4.jpg', matchesBack: true },
  { id: 'p2', name: 'Andre', age: 33, job: 'Architect', distance: '4 miles away', bio: 'I have strong opinions about chairs. Weekend hiker, weeknight overthinker.', photo: ph(52), matchesBack: false },
  { id: 'p5', name: 'Jordan', age: 31, job: 'Software Engineer', distance: '9 miles away', bio: 'Yes I can fix your printer. No I will not. Into board games, bad movies, good tacos.', photo: ph(15), matchesBack: false },
  { id: 'p7', name: 'Ben', age: 30, job: 'High School Teacher', distance: '6 miles away', bio: 'Teaching history so it does not repeat itself. Trivia night captain, undefeated (mostly).', photo: ph(86), matchesBack: false },
  { id: 'p8', name: 'Chris', age: 32, job: 'Real Estate Agent', distance: '2 miles away', bio: 'Let me show you around. Literally, it is my job. Gym, golf, and the occasional karaoke solo.', photo: ph(27), matchesBack: true },
]

export const allProfiles = [...matchedProfiles, ...deckProfiles]
export const getProfile = (id) => allProfiles.find((p) => p.id === id)
