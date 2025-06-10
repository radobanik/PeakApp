import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { api } from '@/services/index'
import { API } from '@/constants/api'
import { useState } from 'react'
import { MapPositionPicker } from '../map/MapPositionPicker'
import { PeakFileDetail } from 'backend/src/model/peakFile'
import { createFile } from '@/services/fileService'

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  longitude: z.number().min(-180).max(180),
  latitude: z.number().min(-90).max(90),
  image: z.object({ id: z.string().uuid() }).nullable(),
})

interface CreateClimbingObjectDialogProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function CreateClimbingObjectDialog({ isOpen, setIsOpen }: CreateClimbingObjectDialogProps) {
  const [isPickingLocation, setIsPickingLocation] = useState(false)
  const [currentImage, setCurrentImage] = useState<PeakFileDetail | null>(null)
  const [isImageUploading, setIsImageUploading] = useState(false)

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsImageUploading(true)
    try {
      const uploadedFile = await createFile(file)
      setCurrentImage(uploadedFile)
      form.setValue('image', uploadedFile.id == null ? null : { id: uploadedFile.id })
      toast.success('Image uploaded successfully')
    } catch {
      toast.error('Failed to upload image')
    } finally {
      setIsImageUploading(false)
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      longitude: 0,
      latitude: 0,
      image: null,
    },
  })

  const createMutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const response = await api.post(API.CLIMBING_OBJECT.CREATE, data)
      return response.data
    },
    onSuccess: () => {
      toast.success('Climbing object created successfully')
      setIsOpen(false)
      form.reset()
    },
    onError: () => toast.error('Failed to create climbing object'),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    createMutation.mutate(values)
  }

  const handlePositionPicked = (lat: number, lng: number) => {
    form.setValue('latitude', lat)
    form.setValue('longitude', lng)
    setIsPickingLocation(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Climbing Object</DialogTitle>
        </DialogHeader>
        {isPickingLocation ? (
          <MapPositionPicker
            onPositionPicked={handlePositionPicked}
            onCancel={() => setIsPickingLocation(false)}
            initialPosition={[form.getValues('latitude'), form.getValues('longitude')]}
          />
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <FormLabel>Image</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={isImageUploading}
                />
                {isImageUploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
                {currentImage && (
                  <img
                    src={currentImage.url}
                    alt="Preview"
                    className="mt-2 max-h-48 rounded border object-contain"
                  />
                )}
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="latitude"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Latitude</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="any"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="longitude"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Longitude</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="any"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsPickingLocation(true)}
                >
                  Pick on Map
                </Button>
              </div>

              <Button type="submit" className="w-full">
                Create
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  )
}
