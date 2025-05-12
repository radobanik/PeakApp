import BackButon from '@/components/BackButton'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteSession, getSessionById, updateSession } from '@/services/sessionService'
import { useNavigate, useParams } from 'react-router-dom'
import { Textarea } from '@/components/ui/textarea'
import ScrollTable from '@/components/ScrollTable'
import ActivityTableEntry from '@/components/ActivityTableEntry'
import noBoulderPhoto from '@/assets/NoBoulderPhoto.jpg'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { ScrollBar } from '@/components/ui/scroll-area'
import { ROUTE } from '@/constants/routes'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { AlertDialogDelete } from '@/components/ui/custom/alert-dialog-delete'
import { EntityOptionsDropdown } from '@/components/ui/custom/entity-option-dropdown'
import { z } from 'zod'
import { SessionUpdate } from '@/types/sessionTypes'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  note: z.string().optional(),
})

export default function SessionDetailPage() {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const navigation = useNavigate()

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  if (!id) {
    throw new Error('Activity ID is required')
  }

  const placeholders = [
    {
      id: 1,
      image: noBoulderPhoto,
    },
    {
      id: 2,
      image: noBoulderPhoto,
    },
    {
      id: 3,
      image: noBoulderPhoto,
    },
    {
      id: 4,
      image: noBoulderPhoto,
    },
  ]

  const sessionQuery = useQuery({
    queryKey: [id],
    queryFn: async () => getSessionById(id),
    select: (data) => ({
      id: data.id,
      createdAt: data.createdAt,
      name: data.name,
      note: data.note,
      assignedActivities: data.assignedActivities.map((activity) => ({
        id: activity.id,
        climbedAt: activity.climbedAt,
        routeName: activity.route.name,
        routeGrade: activity.route.grade.name,
        routeType: activity.route.climbingStructureType,
        perceivedDifficulty: activity.perceivedDifficulty,
        numOfAttempts: activity.numOfAttempts,
        topped: activity.topped,
        notes: activity.notes,
      })),
      createdBy: data.createdBy,
    }),
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    const activityData: SessionUpdate = {
      name: data.name ?? '',
      note: data.note ?? '',
      photos: [],
    }
    UpdateMutation.mutate(activityData)
    setIsEdit(false)
  }
  const UpdateMutation = useMutation({
    mutationFn: async (data: SessionUpdate) => {
      updateSession(id, data)
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: [id] })
      toast.success('Session updated successfully')
    },
    onError: () => {},
  })

  const deleteMutation = useMutation({
    mutationFn: async () => {
      return deleteSession(id)
    },
    onSuccess: () => {
      navigation(ROUTE.ACTIVITIES)
      queryClient.invalidateQueries({ queryKey: ['sessions'] })
      queryClient.removeQueries({ queryKey: [id] })
      toast.success('Session deleted successfully')
      {
        /* TODO: Investigate attempted retrieve of recently deleted Session (even after these invalidations) */
      }
    },
    onError: () => {
      {
        /* TODO: Add more informative erorrs based on status code */
      }
      toast.error('Error deleting Session')
    },
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: sessionQuery.data?.name,
      note: sessionQuery.data?.note,
    },
  })

  useEffect(() => {
    if (isDeleted) {
      deleteMutation.mutate()
      setIsDeleted(false)
    }
  }, [isDeleted])

  useEffect(() => {
    if (sessionQuery.isSuccess && !isEdit) {
      form.reset({
        name: sessionQuery.data?.name,
        note: sessionQuery.data?.note,
      })
    }
  }, [sessionQuery.isSuccess])

  return (
    <div className="flex flex-col gap-4">
      <AlertDialogDelete
        isOpen={isDeleteDialogOpen}
        setOpen={setIsDeleteDialogOpen}
        setDelete={setIsDeleted}
      />
      <div>
        <div className="flex flex-row justify-between p-4">
          <BackButon backRoute={ROUTE.SESSIONS} />
          <EntityOptionsDropdown setDelete={setIsDeleteDialogOpen} setIsEdit={setIsEdit} />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col gap-4 p-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    {isEdit && <FormLabel>Name</FormLabel>}
                    <FormControl>
                      <Input
                        readOnly={!isEdit}
                        placeholder="Write your Notes here..."
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

              <ScrollArea className="h-[20vh] w-full rounded-md border overflow-scroll">
                <div className="flex w-max space-x-4 p-4">
                  {placeholders.map((placeholder) => (
                    <div key={placeholder.id} className="rounded-md shrink-0">
                      <img
                        src={placeholder.image}
                        className="max-h-[15vh] max-w-[15vh] rounded-md"
                        alt="Route"
                      />
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="h-2" />
              </ScrollArea>

              {sessionQuery.isSuccess && (
                <ScrollTable
                  entries={sessionQuery.data?.assignedActivities}
                  Component={ActivityTableEntry}
                />
              )}
            </div>
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
          </form>
        </Form>
      </div>
    </div>
  )
}
