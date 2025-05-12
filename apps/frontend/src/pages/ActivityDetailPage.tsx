import { deleteActivity, getActivityById, updateActivity } from '@/services/activityService'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import noBoulderPhoto from '@/assets/NoBoulderPhoto.jpg'
import BackButon from '@/components/BackButton'
import { capitalize } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Skeleton } from '@/components/ui/skeleton'
import { perceivedDifficulty } from '@/types/utilsTypes'
import { ROUTE } from '@/constants/routes'
import { EntityOptionsDropdown } from '@/components/ui/custom/entity-option-dropdown'
import { AlertDialogDelete } from '@/components/ui/custom/alert-dialog-delete'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'
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
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DateTimePicker24h } from '@/components/ui/custom/date-time-picker'
import { ActivityUpdate } from '@/types/activityTypes'

const formSchema = z.object({
  climbedAt: z.coerce.date(),
  topped: z.boolean().optional(),
  perceivedDifficulty: z.nativeEnum(perceivedDifficulty),
  numberOfAttempts: z.coerce
    .number()
    .min(1, 'Invalid attempts amount')
    .max(100, 'Invalid attempts amount'),
  notes: z.string().optional(),
})

export default function ActivityDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const navigation = useNavigate()

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  if (!id) {
    throw new Error('Activity ID is required')
  }

  const activityQuery = useQuery({
    queryKey: [id],
    queryFn: async () => getActivityById(id),
    select: (data) => ({
      id: data.id,
      climbedAt: data.climbedAt,
      routeName: data.route.name,
      routeGrade: data.route.grade.name,
      routeType: data.route.climbingStructureType,
      perceivedDifficulty: data.perceivedDifficulty,
      numOfAttempts: data.numOfAttempts,
      topped: data.topped,
      notes: data.notes,
    }),
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    const activityData: ActivityUpdate = {
      climbedAt: data.climbedAt,
      topped: data.topped ?? false,
      perceivedDifficulty: data.perceivedDifficulty,
      numOfAttempts: data.numberOfAttempts,
      notes: data.notes ?? '',
    }
    UpdateMutation.mutate(activityData)
    setIsEdit(false)
  }

  const UpdateMutation = useMutation({
    mutationFn: async (data: ActivityUpdate) => {
      updateActivity(id, data)
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: [id] })
      toast.success('Activity updated successfully')
    },
    onError: () => {},
  })

  const deleteMutation = useMutation({
    mutationFn: async () => {
      return deleteActivity(id)
    },
    onSuccess: () => {
      navigation(ROUTE.ACTIVITIES)
      queryClient.invalidateQueries({ queryKey: ['activities'] })
      queryClient.removeQueries({ queryKey: [id] })
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      climbedAt: activityQuery.data?.climbedAt,
      topped: activityQuery.data?.topped,
      perceivedDifficulty: activityQuery.data?.perceivedDifficulty,
      numberOfAttempts: activityQuery.data?.numOfAttempts,
      notes: activityQuery.data?.notes,
    },
  })

  useEffect(() => {
    if (isDelete) {
      deleteMutation.mutate()
      setIsDelete(false)
    }
  }, [isDelete])

  useEffect(() => {
    if (activityQuery.isSuccess && !isEdit) {
      form.reset({
        climbedAt: activityQuery.data?.climbedAt,
        topped: activityQuery.data?.topped,
        perceivedDifficulty: activityQuery.data?.perceivedDifficulty,
        numberOfAttempts: activityQuery.data?.numOfAttempts,
        notes: activityQuery.data?.notes,
      })
    }
  }, [activityQuery.isSuccess])

  return (
    <div className="flex flex-col gap-4">
      <AlertDialogDelete
        isOpen={isDeleteDialogOpen}
        setOpen={setIsDeleteDialogOpen}
        setDelete={setIsDelete}
      />
      <div>
        <div className="flex flex-row justify-between p-4">
          <BackButon backRoute={ROUTE.ACTIVITIES} />
          <EntityOptionsDropdown setDelete={setIsDeleteDialogOpen} setIsEdit={setIsEdit} />
        </div>
        <div className="flex flex-col gap-4 p-1">
          <div className="relative mx-auto w-fit">
            <img
              src={noBoulderPhoto}
              className="block rounded-md max-h-[30vh] max-w-[100vw] object-contain"
              alt="Route"
            />
            <div className="absolute bottom-1 left-1 text-2xl">
              {activityQuery.isLoading && <div>Loading...</div>}
              {activityQuery.isError && <div>Error: {activityQuery.error.message}</div>}
              <p>{activityQuery.data?.routeName}</p>
            </div>
            <div className="absolute bottom-1 right-1 flex flex-col justify-between items-center">
              <p>{activityQuery.data?.routeGrade.toUpperCase()}</p>
              <p>{capitalize(activityQuery.data?.routeType)}</p>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-row justify-between p-4">
                <div className="flex flex-row gap-2 items-center">
                  {activityQuery.isLoading && <Skeleton className="h-10 w-[5vw]" />}
                  {activityQuery.isSuccess && (
                    <FormField
                      control={form.control}
                      name="climbedAt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Climbed at</FormLabel>
                          <FormControl>
                            <DateTimePicker24h disabled={!isEdit} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
                <div className="flex flex-row gap-2 items-center">
                  {activityQuery.isLoading && <Skeleton className="h-10 w-[5vw]" />}
                  {activityQuery.isSuccess && (
                    <FormField
                      control={form.control}
                      name="topped"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Topped</FormLabel>
                          <FormControl>
                            <Checkbox
                              disabled={!isEdit}
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>

              <div className="flex flex-row justify-between p-4 ">
                <div>
                  {activityQuery.isLoading && <Skeleton className="h-10 w-[40vw]" />}
                  {activityQuery.isSuccess && form.getValues().perceivedDifficulty && (
                    <FormField
                      control={form.control}
                      name="perceivedDifficulty"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Perceived Difficulty</FormLabel>
                          <Select disabled={!isEdit} onValueChange={field.onChange} {...field}>
                            <FormControl>
                              <SelectTrigger className="w-[40vw]">
                                <SelectValue placeholder="Select a Difficulty" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Difficulty</SelectLabel>
                                {Object.values(perceivedDifficulty).map((level) => (
                                  <SelectItem key={level} value={level}>
                                    {level
                                      .replace('_', ' ')
                                      .toLowerCase()
                                      .replace(/^\w/, (c) => c.toUpperCase())}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
                <div className="flex flex-col items-center justify-end">
                  {activityQuery.isLoading && <Skeleton className="h-10 w-[40vw]" />}
                  {activityQuery.isSuccess && (
                    <FormField
                      control={form.control}
                      name="numberOfAttempts"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Attempts</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              disabled={!isEdit}
                              className="w-[40vw]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>
              <div className="p-4">
                {activityQuery.isLoading && <Skeleton className="h-[15vh] w-full" />}
                {activityQuery.isSuccess && (
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            disabled={!isEdit}
                            placeholder="Write your Notes here..."
                            className="resize-none h-[15vh] w-full"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
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
    </div>
  )
}
