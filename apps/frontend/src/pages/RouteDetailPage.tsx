import { RouteDetailBaseProps } from '@/components/RouteDetailBase'
import { ClimbingStructureType } from '@/types/routeTypes'
import { RouteAndReviews, RouteDetailWithComments } from '@/components/RouteDetailWithReviews'

const routeProps: RouteDetailBaseProps = {
  id: '571fa7c0-2825-4e40-ae29-88f2e62cb16d',
  name: 'The Gauntlet',
  description:
    'A wall climb with a tough mid-crux lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  grade: {
    name: '7b+',
    color: '#8B0000',
  },
  climbingStructureType: ClimbingStructureType.TRAVERSE,
  rating: 4.3,
}

const routeAndReviews: RouteAndReviews = {
  ...routeProps,
  image: {
    id: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
    createdAt: new Date('2025-03-31T19:51:15.038Z'),
    name: 'route_image.jpg',
    contentType: 'image/jpeg',
    createdBy: {
      id: '9bc29d7d-4c79-4b9f-8e5a-8e33e7f9c971',
      userName: 'janedoe',
      firstName: 'Jane',
      lastName: 'Doe',
    },
    path: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Balanced_Rock.jpg/1280px-Balanced_Rock.jpg',
  },
  reviews: [
    {
      id: '1',
      createdAt: new Date('2025-04-05T19:51:15.038Z'),
      user: {
        id: '1',
        userName: 'joe',
        firstName: 'Joe',
        lastName: 'Doe',
        photo: null,
      },
      rating: 4.5,
      comment:
        'Great route! Challenging and fun. Highly recommend it. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      id: '2',
      createdAt: new Date('2025-04-01T19:51:15.038Z'),
      user: {
        id: '1',
        userName: 'bill',
        firstName: 'Bill',
        lastName: 'Gates',
        photo: null,
      },
      rating: 2.5,
      comment: 'Vzdyt to bylo naprosto ez xd',
    },
    {
      id: '3',
      createdAt: new Date('2025-04-06T01:51:15.038Z'),
      user: {
        id: '1',
        userName: 'speed',
        firstName: 'Darren',
        lastName: 'Watkins',
        photo: null,
      },
      rating: 2.5,
      comment: 'I show meat',
    },
  ],
}

export default function RouteDetailPage() {
  return (
    <div>
      <RouteDetailWithComments {...routeAndReviews} />
    </div>
  )
}
