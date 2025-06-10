import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogOverlay,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'

import DefaultAchievementIcon from '@/assets/achievement.png'
import {
  AchievementType,
  AchievementDetailWithIconMetadata,
  achievementTypeValues,
} from '@/types/achievementTypes'
import { createFile } from '@/services/fileService'
import { PeakFileDetail } from 'backend/src/model/peakFile'
import { Label } from '@radix-ui/react-label'

const achievementSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters long.' }),
  description: z.string().min(5, { message: 'Description must be at least 5 characters long.' }),
  minimumValue: z.coerce.number().min(0, { message: 'Minimum value must be 0 or greater.' }),
  type: z.nativeEnum(AchievementType),
})

type AchievementFormData = z.infer<typeof achievementSchema>

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
  const [currentFile, setCurrentFile] = useState<PeakFileDetail | null>(null)

  const form = useForm<AchievementFormData>({
    resolver: zodResolver(achievementSchema),
    defaultValues: {
      name: '',
      description: '',
      minimumValue: 0,
      type: achievementTypes[0],
    },
  })

  useEffect(() => {
    if (achievement) {
      form.reset(achievement)
      setCurrentFile(achievement.icon)
    } else {
      form.reset({
        name: '',
        description: '',
        minimumValue: 0,
        type: achievementTypes[0],
      })
      setCurrentFile(null)
    }
  }, [achievement, form])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      const peakFile: PeakFileDetail = await createFile(file)
      setCurrentFile(peakFile)
    }
  }

  const onSubmit = (data: AchievementFormData) => {
    const saveData: AchievementDetailWithIconMetadata = {
      id: isCreate ? '' : achievement!.id,
      ...data,
      icon: currentFile,
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

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 py-4 overflow-y-auto pr-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-left">Name</FormLabel>
                  <FormControl className="col-span-3">
                    <Input {...field} />
                  </FormControl>
                  <FormMessage className="col-start-2 col-span-3" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-start gap-4">
                  <FormLabel className="text-left">Description</FormLabel>
                  <FormControl className="col-span-3">
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage className="col-start-2 col-span-3" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="minimumValue"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-left">Minimum Value</FormLabel>
                  <FormControl className="col-span-3">
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage className="col-start-2 col-span-3" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-left">Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl className="col-span-3">
                      <SelectTrigger>
                        <SelectValue placeholder="Select achievement type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {achievementTypes.map((typeKey) => (
                        <SelectItem key={typeKey} value={typeKey}>
                          {achievementTypeValues(typeKey)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="col-start-2 col-span-3" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-left">Icon</Label>
              <div className="col-span-3 flex flex-col gap-2">
                <img
                  src={currentFile ? currentFile.url : DefaultAchievementIcon}
                  alt="Current Achievement Icon"
                  className="w-16 h-16 object-cover rounded-full"
                  onError={(e) => {
                    e.currentTarget.src = DefaultAchievementIcon
                  }}
                />
                <Input id="icon-upload" type="file" accept="image/*" onChange={handleFileChange} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">{isCreate ? 'Create' : 'Save Changes'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
