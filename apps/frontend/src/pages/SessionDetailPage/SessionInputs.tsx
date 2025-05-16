import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext, useEffect } from 'react'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { ROUTE } from '@/constants/routes'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { Button } from '@/components/ui/button'
import { SessionDetailContext } from '../SessionDetailPage'
import { deleteSession, updateSession } from '@/services/sessionService'
import { SessionUpdate } from '@/types/sessionTypes'
import ScrollTable from '@/components/ScrollTable'
import ActivityTableEntry from '@/components/ActivityTableEntry'

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  note: z.string().optional(),
})

export function SessionInputs() {
  const { sessionId, sessionQuery, isEdit, setIsEdit, isDelete, setIsDelete, setCurrentView } =
    useContext(SessionDetailContext)
  const queryClient = useQueryClient()
  const navigation = useNavigate()

  const updateMutation = useMutation({
    mutationFn: async (data: SessionUpdate) => {
      updateSession(sessionId, data)
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: [sessionId] })
      toast.success('Activity updated successfully')
    },
    onError: () => {},
  })

  const deleteMutation = useMutation({
    mutationFn: async () => {
      return deleteSession(sessionId)
    },
    onSuccess: () => {
      navigation(ROUTE.SESSIONS)
      queryClient.invalidateQueries({ queryKey: ['activities'] })
      queryClient.removeQueries({ queryKey: [sessionId] })
      toast.success('Activity deleted successfully')
      {
        /* TODO: Investigate attempted retrieve of recently deleted Activity (even after these invalidations) */
      }
    },
    onError: () => {
      {
        /* TODO: Add more informative erorrs based on status code */
      }
      toast.error('Error deleting Activity')
    },
  })
  function onSubmit(data: z.infer<typeof formSchema>) {
    const activityData: SessionUpdate = {
      name: data.name ?? '',
      note: data.note ?? '',
      photos: [],
    }
    updateMutation.mutate(activityData)
    setIsEdit(false)
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: sessionQuery.data?.name,
      note: sessionQuery.data?.note,
    },
  })

  useEffect(() => {
    if (isDelete) {
      deleteMutation.mutate()
      setIsDelete(false)
    }
  }, [isDelete])

  useEffect(() => {
    if (sessionQuery.isSuccess && !isEdit) {
      form.reset({
        name: sessionQuery.data?.name,
        note: sessionQuery.data?.note,
      })
    }
  }, [sessionQuery.isSuccess])

  return (
    <div className="flex flex-col gap-4 lg:items-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-4 p-4  ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  {isEdit && <FormLabel>Name</FormLabel>}
                  <FormControl>
                    <Input
                      readOnly={!isEdit}
                      placeholder="Write Session name here..."
                      defaultValue={sessionQuery.data?.name}
                      className="text-2xl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {sessionQuery.isSuccess && (
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={!isEdit}
                        placeholder="Write your Notes here..."
                        className="resize-none h-[15vh] w-full"
                        defaultValue={sessionQuery.data.note}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {isEdit && (
              <div className="flex flex-row justify-end p-4">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setIsEdit(false)
                    form.reset()
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            )}
            <div className="flex flex-row justify-end gap-4">
              <Button disabled={isEdit} onClick={() => setCurrentView('activities')}>
                Change Activities
              </Button>
            </div>
            {sessionQuery.isSuccess && (
              <ScrollTable
                entries={sessionQuery.data?.assignedActivities}
                Component={ActivityTableEntry}
                backRoute={`${ROUTE.SESSIONS}/${sessionId}`}
              />
            )}
          </div>
        </form>
      </Form>
    </div>
  )
}
