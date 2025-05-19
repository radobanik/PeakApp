import { FC, useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogOverlay,
  DialogTitle,
} from '@/components/ui/dialog'
import noBoulderPhoto from '@/assets/NoBoulderPhoto.jpg'
import { AchievementDetailWithIconMetadata, AchievementType } from '@/types/achievementTypes'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { createFile } from '@/services/fileService'
import { PeakFileDetail } from 'backend/src/model/peakFile'

type AchievementEditDialogProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  achievement: AchievementDetailWithIconMetadata | null
  closeAndExecute: (achievement: AchievementDetailWithIconMetadata, isCreate: boolean) => void
}

export const AchievementEditDialog: FC<AchievementEditDialogProps> = ({
  isOpen,
  onOpenChange,
  achievement,
  closeAndExecute,
}) => {
  const isCreate = achievement === null
  const achievementTypes = Object.values(AchievementType)

  // --- Form State ---
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [minimumValue, setMinimumValue] = useState<number>(0)
  const [type, setType] = useState<AchievementType>(achievementTypes[0])
  const [currentFile, setCurrentFile] = useState<PeakFileDetail | null>(null)

  useEffect(() => {
    if (achievement) {
      setName(achievement.name)
      setDescription(achievement.description)
      setMinimumValue(achievement.minimumValue)
      setType(achievement.type)
      setCurrentFile(achievement.icon)
    } else {
      setName('')
      setDescription('')
      setMinimumValue(0)
      setType(achievementTypes[0])
      setCurrentFile(null)
    }
  }, [achievement])

  // --- Handlers ---
  const handleMinimumValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    if (!isNaN(value)) {
      setMinimumValue(value)
    } else if (e.target.value === '') {
      setMinimumValue(0)
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      const peakFile: PeakFileDetail = await createFile(file)
      setCurrentFile(peakFile)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Prevent default form submission

    const saveData: AchievementDetailWithIconMetadata = {
      id: '',
      name,
      description,
      minimumValue,
      type,
      icon: currentFile,
    }

    if (!isCreate && achievement) {
      saveData.id = achievement.id
    }

    try {
      closeAndExecute(saveData, isCreate)
    } catch (error) {
      console.error('Error saving achievement:', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogOverlay />
      <DialogContent className="overflow-hidden flex flex-col max-h-[90vh]">
        <DialogTitle>{isCreate ? 'Create new achievement' : 'Edit achievement'}</DialogTitle>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4 overflow-y-auto pr-4">
          {/* Name Input */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              required // Basic validation
            />
          </div>

          {/* Description Textarea */}
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
              required // Basic validation
            />
          </div>

          {/* Minimum Value Input */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="minimumValue" className="text-right">
              Minimum Value
            </Label>
            <Input
              id="minimumValue"
              type="number" // Use number type for numeric input
              value={minimumValue}
              onChange={handleMinimumValueChange}
              className="col-span-3"
              required // Basic validation
              min="0" // Minimum value constraint
            />
          </div>

          {/* Type Select */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Select value={type} onValueChange={(value: AchievementType) => setType(value)}>
              <SelectTrigger id="type" className="col-span-3">
                <SelectValue placeholder="Select achievement type" />
              </SelectTrigger>
              <SelectContent>
                {achievementTypes.map((typeKey) => (
                  <SelectItem key={typeKey} value={AchievementType[typeKey]}>
                    {typeKey}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Icon Upload */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="icon" className="text-right">
              Icon
            </Label>
            <div className="col-span-3 flex flex-col gap-2">
              {/* Display current icon if exists and no new file selected */}
              <img
                src={currentFile ? currentFile.url : noBoulderPhoto}
                alt="Current Achievement Icon"
                className="w-16 h-16 object-cover rounded-md"
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  e.currentTarget.src = noBoulderPhoto
                }}
              />
              <Input
                id="icon"
                type="file"
                accept="image/*" // Accept only image files
                onChange={handleFileChange}
              />
            </div>
          </div>
        </form>

        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSubmit}
            // disabled={isLoading}
          >
            {isCreate ? 'Create' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
