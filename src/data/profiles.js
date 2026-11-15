/**
 * All profiles shown in Bndr: exactly these 5, all local photos in public/
 * cleared for use (friends who OK'd their likeness). The app needs no internet.
 *
 * Max (public/1.jpeg) is Suitor #1: JR checks his thread on arrival at
 * Forkin' Road. TODO: confirm the character name with production.
 */

// The phone owner. Every screen is JR's account.
export const currentUser = {
  id: 'jr',
  name: 'JR',
}

// The swipe deck: always these 5, in this order.
// matchesBack: true shows the match screen on a right swipe.
export const deckProfiles = [
  { id: 'p9', role: 'SUITOR #1', name: 'Max', age: 30, job: 'Photographer', distance: '2 miles away', bio: 'Golden hour chaser. I will take your profile pics for free if you laugh at my jokes.', photo: '/1.jpeg', matchesBack: true },
  { id: 'p1', name: 'Derek', age: 29, job: 'Physical Therapist', distance: '1 mile away', bio: 'Will fix your posture whether you ask or not. Dog dad to a very dramatic corgi.', photo: '/2.jpeg', matchesBack: true },
  { id: 'p3', name: 'Kevin', age: 35, job: 'Sales Director', distance: '7 miles away', bio: 'Work hard, brunch harder. Looking for my plus-one to every wedding this summer.', photo: '/5.jpeg', matchesBack: false },
  { id: 'p6', name: 'Luis', age: 34, job: 'Chef', distance: '3 miles away', bio: 'I will cook for you on the second date. The first date is for seeing if you salt your food before tasting it.', photo: '/3.jpg', matchesBack: true },
  { id: 'p4', name: 'Sam', age: 28, job: 'Bartender', distance: '1 mile away', bio: 'I make a mean old fashioned and an even meaner playlist. Come say hi on a Tuesday.', photo: '/4.jpg', matchesBack: true },
]

export const allProfiles = deckProfiles
export const getProfile = (id) => allProfiles.find((p) => p.id === id)
