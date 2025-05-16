import PhotoScroll from '@/components/PhotoScroll'
import { PeakFile } from '@/types/fileTypes'
import { useState } from 'react'

export default function PhotoComponentPage() {
  const user = {
    id: '1234',
    userName: 'test',
    firstName: 'Test',
    lastName: 'Test',
  }

  const [files, setFiles] = useState<PeakFile[]>([
    {
      id: '1',
      createdAt: new Date(),
      name: 'Boulder 1',
      createdBy: user,
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Balanced_Rock.jpg/1280px-Balanced_Rock.jpg',
      contentType: 'image/jpeg',
    },
    {
      id: '2',
      createdAt: new Date(),
      name: 'Boulder 2',
      createdBy: user,
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Boulder_along_the_chief_hike_in_Stawamus_Chief_Provincial_Park%2C_BC_%28DSCF7553%29.jpg/1280px-Boulder_along_the_chief_hike_in_Stawamus_Chief_Provincial_Park%2C_BC_%28DSCF7553%29.jpg',
      contentType: 'image/jpeg',
    },
    {
      id: '3',
      createdAt: new Date(),
      name: 'Boulder 3',
      createdBy: user,
      url: 'https://www.k2zilina.sk/wp-content/uploads/2019/10/anatomic-boulder-star-18.jpg',
      contentType: 'image/jpeg',
    },
    {
      id: '4',
      createdAt: new Date(),
      name: 'Boulder 4',
      createdBy: user,
      url: 'https://t4.ftcdn.net/jpg/06/54/34/69/240_F_654346956_hPCSK8LOoftYvMcKstwk503VOTRbbKzl.jpg',
      contentType: 'image/jpeg',
    },
    {
      id: '6',
      createdAt: new Date(),
      name: 'CO TI JEBE JA MAM TRAKTOR',
      createdBy: user,
      url: 'https://cache01.mojevideo.sk/securevideos69/213790.mp4?md5=Fq9aethNPb7O6Tq1a1aoUw&expires=1747448700',
      contentType: 'video/mp4',
    },
  ])

  return (
    <>
      <div className="p-4 h-80">
        <PhotoScroll {...{ media: files, setMedia: setFiles, editable: true }}> </PhotoScroll>
      </div>
    </>
  )
}
