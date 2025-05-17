import ScrollTable from '@/components/ScrollTable'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { NewSessionContext } from '../SessionCreate'
import ActivityTableEntry from '@/components/ActivityTableEntry'
import { createSession } from '@/services/sessionService'
import { SessionCreate } from '@/types/sessionTypes'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { ROUTE } from '@/constants/routes'
import MediaScroll from '@/components/MediaScroll'
import { PeakFile } from '@/types/fileTypes'

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  note: z.string().optional(),
})

export default function SessionCreateInputs() {
  const { setIsOpen, checkedEntriesIds, allEntries } = useContext(NewSessionContext)
  const [media, setMedia] = useState<PeakFile[]>([])

  const checkedEntries = allEntries.filter((entry) => checkedEntriesIds.includes(entry.id))
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const createMutation = useMutation({
    mutationFn: async (data: SessionCreate) => {
      return createSession(data)
    },
    onSuccess: (res) => {
      const sessionId = res.id
      toast.success('Session created successfully')
      queryClient.invalidateQueries({ queryKey: ['unassignedActivities'] })
      console.log(res)
      navigate(`${ROUTE.SESSIONS}/${sessionId}`)
    },
    onError: () => {},
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    const activityData: SessionCreate = {
      name: data.name ?? '',
      note: data.note ?? '',
      photos: media.map((file) => ({
        id: file.id,
      })),
      assignedActivities: checkedEntriesIds.map((id) => ({
        id: id,
      })),
    }
    createMutation.mutate(activityData)
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  return (
    <div className="flex flex-col gap-4 lg:items-center w-[80vh]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-4 p-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Write Session name here..."
                      className="text-2xl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your Notes here..."
                      className="resize-none h-[15vh] w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="p-4 h-[20vh] w-full">
              {/* TODO it overflows when adding more pictures, FIX*/}
              <MediaScroll {...{ media: media, setMedia: setMedia, editable: true }} />
            </div>

            <div className="flex flex-row justify-end p-4">
              <Button
                variant="secondary"
                onClick={() => {
                  setIsOpen(true)
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>

            <div style={{ pointerEvents: 'none' }}>
              <ScrollTable entries={checkedEntries} Component={ActivityTableEntry} backRoute={''} />
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
