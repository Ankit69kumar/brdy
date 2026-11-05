// ===================================================================
//  A LITTLE WORLD OF US — Your story, in one editable place.
//  Change anything here and it updates across the whole website.
//
//  PHOTOS — drop your photos into public/assets/photos/
//  Each slot is independent. Replace any one without affecting others.
//
//    Chapter 1 → photo1-1.jpg                              (1 photo)
//    Chapter 2 → photo2-1.jpg                              (1 photo)
//    Chapter 3 → photo3-1.jpg                              (1 photo)
//    Chapter 4 → photo4-1.jpg, photo4-2.jpg, photo4-3.jpg  (3 photos)
//    Chapter 5 → photo5-1.jpg                              (1 photo)
//    Chapter 6 → photo6-1.jpg .. photo6-6.jpg              (6 photos)
//    TOTAL = 13 photos
//
//  MUSIC — replace public/assets/music/music.mp3
// ===================================================================

export const STORY = {
  myName: 'Ankita Tiwari',
  babyName: 'Baby',

  firstMeetingDate: '04/04/2026',
  firstMeetingDisplay: '04 April 2026',

  musicSrc: '/assets/music/music.mp3',
};

export interface Chapter {
  id: number;
  title: string;
  date: string;
  photos: string[];
  caption: string;
  note: string;
  navLabel: string;
}

export const CHAPTERS: Chapter[] = [
  {
    id: 1,
    title: 'The Day My Favourite Story Began',
    date: '04 April 2026',
    photos: ['/assets/photos/photo1-1.jpg'],
    caption:
      'Baby, little did I know that one ordinary day would become the beginning of something so special.',
    note: '[Add your personal note here — the words only you would say about this day.]',
    navLabel: 'Take Me to Our Next Memory',
  },
  {
    id: 2,
    title: 'Little Moments, Big Feelings',
    date: '[Add date]',
    photos: ['/assets/photos/photo2-1.jpg'],
    caption: 'Some memories become special without us even realizing it.',
    note: '[Add your personal note here.]',
    navLabel: "Baby, There's More...",
  },
  {
    id: 3,
    title: 'Moments I Wish I Could Relive',
    date: '[Add date]',
    photos: ['/assets/photos/photo3-1.jpg'],
    caption: 'If I could pause time, I would save moments like these forever.',
    note: '[Add your personal note here.]',
    navLabel: "Let's Keep Our Story Going",
  },
  {
    id: 4,
    title: 'Two People, One Beautiful Story',
    date: '[Add date]',
    photos: [
      '/assets/photos/photo4-1.jpg',
      '/assets/photos/photo4-2.jpg',
      '/assets/photos/photo4-3.jpg',
    ],
    caption:
      'Every little memory with you has found a special place in my heart.',
    note: '[Add your personal note here.]',
    navLabel: 'One More Memory With You',
  },
  {
    id: 5,
    title: 'My Favourite Human',
    date: '[Add date]',
    photos: ['/assets/photos/photo5-1.jpg'],
    caption:
      'Among all the beautiful things life has given me, you are one of my favourites.',
    note: '[Add your personal note here.]',
    navLabel: 'Almost at the Surprise...',
  },
  {
    id: 6,
    title: 'Not The End, Just The Beginning',
    date: '[Add date]',
    photos: [
      '/assets/photos/photo6-1.jpg',
      '/assets/photos/photo6-2.jpg',
      '/assets/photos/photo6-3.jpg',
      '/assets/photos/photo6-4.jpg',
      '/assets/photos/photo6-5.jpg',
      '/assets/photos/photo6-6.jpg',
    ],
    caption:
      'Six little chapters, countless beautiful feelings, and so many memories still waiting to be made.',
    note: '[Add your personal note here.]',
    navLabel: 'Open Your Birthday Surprise',
  },
];

export const FINAL_LETTER = `My Dearest Baby,

Happy Birthday to the person who has become such a beautiful part of my life.

Sometimes I wish I could collect every little moment we've shared and keep them in one place forever.

From 4th April 2026, the day our story began, to every little memory that followed, you've become a special part of my world.

I made this little website to remind you of our beautiful moments and to show you how much they mean to me.

I hope this new year of your life brings you happiness, success, peace, and everything your heart wishes for.

Thank you for being my Baby.

No matter how many chapters we create, I hope our story always has another page waiting.

Happy Birthday once again, my favourite person.

Forever with love,
Ankita Tiwari`;
