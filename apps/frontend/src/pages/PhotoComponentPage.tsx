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
      name: 'Boulder 5',
      createdBy: user,
      url: 'https://peak-app-08009d6d-c572-4e8f-b6b3-d08c70470cd6.s3.eu-central-1.amazonaws.com/welcome%20to%20Niggachain%20AI%20Layer%202.mp4?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDGV1LWNlbnRyYWwtMSJHMEUCIQCw%2BAM4Ag21Z8txUmKFxA6g3F8FE28LuUEcmg%2Fy2E8e7wIgYNH%2FTPiywwWjvHqqYnQiqA34ZrIBXCYqxf4QYJImcHcqtQMITRAAGgw5ODcyMjc3MTIxOTgiDEK5Tv%2Bb2X5BsLK%2BSCqSA%2BLwQm%2FXScn1Uw0pUQdfrbvLFeHlM1rTZaqUsjLAGuuQ4quqw8zRuGKfIwbfnNxoftxhCHndG5rHMQl1vX2TOer7RoOc3sc4YylhDfIvrNREVXJyYODTwaVb7ap1QGiqQdFvSB626gRYIgUmfgC0%2FRErOVGu4DENEN8VTkcYYGbAcl%2Bdq%2BjHdHv%2BMLjBEMDaYGqOxbSbXdHHksly7M%2B1UG9LMnharxgnfNt6z9Azd5uIDCUX0a9Ek1BtDfO24Y%2FA5uHk1mP%2BRqIxY%2BLibC%2B6FlzlFxSdFYpWTMuf90Ealkl8dJ6ZzpG%2F8wReNRyfVX3l0NJIDD97zG4TB8C%2FOd3plLLL0yeBrrUbdeNCAiGZxRuveGge977cPuzAHr5qLkdx4Nnhv5Ct6wpLHoaWPgZ5iC07dQ44vCa50bOQd7hH1NhnaLEkvdoR9NacOV%2BvtFSJxPrYwHNEQbn58RU3gq7LbK59OLAmPa83yGuoh0IXGFobAG8iIG%2B1QS%2FyavmGJDF014rd7Lsj1cahOpZJBP%2FDpVSwQzDY95zBBjreAuvIg55VFrhNushe10CM0SobP7%2FMkAM0Th%2BCxmbHGZpZ%2FilD06mBc9f0RfraO73MHJCSkReDNkG3Bd1OjVTuh0oG7eH%2F9qZbgYObW1LF5GbR5XNA6q4wIZ4urnJXEA%2FTSQTYVXY%2Bvkyp3FRx7AFQmG%2BzPXIZmCREm%2FosZyQR37nAjWu4onAAS9ApBQGH50OBYq%2BC2%2B7QVJPeTSIr93%2B3HBaD2qttewBCiZ5abFTyf2RX8vJf8%2B5gEadmcCRwuONpbwodDsc6csHYmAFX2egK9NBjBoiyQrob1esepivoEhMYgvqMQLTMzmocQqza3WGFQ4NO%2FTgxTuV93mQLyUrUFodDH9JSoTXkUcJ8kufnXz7CCvBpSk9zImRiHD9bNS6HUt3uLfEff5TjqJn5wnJcodTZSGHLJoCtYaGceIfzAwcaCaxECPnHgU%2FhsjyiG7oOMRQe2GkXqDv8Z2KaD5Zv&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA6LW23NLDAHR2PNA6%2F20250516%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20250516T201303Z&X-Amz-Expires=21600&X-Amz-SignedHeaders=host&X-Amz-Signature=411301fb894b8137e97454d68e285da554e6370d697eafa2a5f57d0076472cf4',
      contentType: 'video/mp4',
    },
  ])

  return (
    <>
      <div className="p-4 h-80">
        <PhotoScroll {...{ media: files, setMedia: setFiles, editable: false }}> </PhotoScroll>
      </div>
      <div className="p-4 h-120">
        <PhotoScroll {...{ media: files, setMedia: setFiles, editable: true }}> </PhotoScroll>
      </div>
    </>
  )
}
