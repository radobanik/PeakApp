import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createFile, deleteFile, getFile } from '@/services/fileService'
import { PeakFile } from '@/types/fileTypes'
import { useState, FormEvent, ChangeEvent } from 'react'
import NoBoulderPhoto from '@/assets/NoBoulderPhoto.jpg'

export default function SubmitPage() {
  const [file, setFile] = useState<File | undefined>()
  const [id, setId] = useState<string>('')
  const [getDetailFile, setGetDetailFile] = useState<PeakFile | undefined>(undefined)
  const [afterCreateFile, setAfterCreateFile] = useState<PeakFile | undefined>(undefined)
  const [deleteId, setDeleteId] = useState<string>('')

  const submitPhoto = async (event: FormEvent<HTMLFormElement>) => {
    if (!event) return
    event.preventDefault()

    if (!file) return
    setAfterCreateFile(await createFile(file))
  }

  const getDetail = async (event: FormEvent<HTMLFormElement>) => {
    if (!event) return
    event.preventDefault()

    if (!id) return
    setGetDetailFile(await getFile(id))
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleIdName = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value)
  }

  const handleFileDelete = async (e: FormEvent<HTMLFormElement>) => {
    if (!e) return
    e.preventDefault()

    if (!deleteId) return
    await deleteFile(deleteId)
  }

  const handleDeleteIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDeleteId(e.target.value)
  }

  return (
    <div className="flex  w-full justify-around space-x-5 items-center">
      <form onSubmit={submitPhoto} className="flex flex-col items-center justify-center w-full">
        <Input onChange={handleFileChange} type="file" accept="*" />
        <img src={afterCreateFile?.url ?? NoBoulderPhoto} alt="Detail" />
        <Button type="submit">Submit</Button>
      </form>
      <form onSubmit={getDetail} className="flex flex-col items-center justify-center w-full">
        <Input value={id} onChange={handleIdName} type="text" placeholder="Get ID" />
        <img src={getDetailFile?.url ?? NoBoulderPhoto} alt="Detail" />
        <Button type="submit">Find</Button>
      </form>
      <form
        onSubmit={handleFileDelete}
        className="flex flex-col items-center justify-center w-full"
      >
        <Input
          value={deleteId}
          onChange={handleDeleteIdChange}
          type="text"
          placeholder="Delete ID"
        />
        <Button type="submit">Delete</Button>
      </form>
    </div>
  )
}
