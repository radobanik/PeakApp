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

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  longitude: z.number().min(-180).max(180),
  latitude: z.number().min(-90).max(90),
})

interface CreateClimbingObjectDialogProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function CreateClimbingObjectDialog({ isOpen, setIsOpen }: CreateClimbingObjectDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      longitude: 0,
      latitude: 0,
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Climbing Object</DialogTitle>
        </DialogHeader>
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
            <FormField
              control={form.control}
              name="longitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Longitude</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
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
              name="latitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Latitude</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Create
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
