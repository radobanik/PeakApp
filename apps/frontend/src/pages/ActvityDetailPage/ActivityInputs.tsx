import { deleteActivity, updateActivity } from '@/services/activityService'
import { ActivityUpdate } from '@/types/activityTypes'
import { perceivedDifficulty } from '@/types/utilsTypes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext, useEffect } from 'react'
import { z } from 'zod'
import { ActivityDetailContext } from '../ActivityDetailPage'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { ROUTE } from '@/constants/routes'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { DatePicker } from '@/components/ui/custom/date-picker'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

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

export function ActivityInputs() {
  const { activityId, activityQuery, isEdit, setIsEdit, isDelete, setIsDelete } =
    useContext(ActivityDetailContext)
  const queryClient = useQueryClient()
  const location = useLocation()
  const navigation = useNavigate()

  const UpdateMutation = useMutation({
    mutationFn: async (data: ActivityUpdate) => {
      updateActivity(activityId, data)
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['activity', activityId] })
      toast.success('Activity updated successfully')
    },
    onError: () => {},
  })

  const deleteMutation = useMutation({
    mutationFn: async () => {
      return deleteActivity(activityId)
    },
    onSuccess: () => {
      navigation(location.state?.from || ROUTE.ACTIVITIES)
      queryClient.invalidateQueries({ queryKey: ['activities'] })
      queryClient.removeQueries({ queryKey: ['activity', activityId] })
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      climbedAt: activityQuery.data?.climbedAt ?? new Date(),
      topped: activityQuery.data?.topped ?? false,
      perceivedDifficulty:
        activityQuery.data?.perceivedDifficulty ?? (null as unknown as perceivedDifficulty),
      numberOfAttempts: activityQuery.data?.numOfAttempts ?? 0,
      notes: activityQuery.data?.notes ?? '',
    },
  })

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

  useEffect(() => {
    if (isDelete) {
      deleteMutation.mutate()
      setIsDelete(false)
    }
  }, [isDelete])

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-10 py-4">
          <div className="flex flex-row justify-between ">
            <div className="flex flex-row gap-2 items-start">
              {/* Climbed at */}
              {activityQuery.isLoading && <Skeleton className="h-10 w-[5vw]" />}
              {activityQuery.isSuccess && (
                <FormField
                  control={form.control}
                  name="climbedAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Climbed at</FormLabel>
                      <FormControl>
                        <DatePicker disabled={!isEdit} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            <div className="flex flex-row gap-2 items-start">
              {/* Topped */}
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

          <div className="flex flex-row justify-between ">
            <div>
              {/* Perceived Difficulty */}
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
              {/* Number of Attempts */}
              {activityQuery.isLoading && <Skeleton className="h-10 w-[40vw]" />}
              {activityQuery.isSuccess && (
                <FormField
                  control={form.control}
                  name="numberOfAttempts"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Attempts</FormLabel>
                      <FormControl>
                        <Input type="number" disabled={!isEdit} className="w-[40vw]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          </div>
          <div className="">
            {/* Notes */}
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
          {/* Delete and Edit buttons */}
          {isEdit && (
            <div className="flex flex-row justify-end">
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
  )
}
