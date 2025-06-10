import { createActivity } from '@/services/activityService'
import { perceivedDifficulty } from '@/types/utilsTypes'
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
import { ActivityCreateContext } from '@/App'
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { ActivityCreate } from '@/types/activityTypes'
import { NewActivityContext } from '../ActivityCreatePage'

const formSchema = z.object({
  climbedAt: z.coerce.date(),
  topped: z.boolean(),
  perceivedDifficulty: z.nativeEnum(perceivedDifficulty, {
    errorMap: (_issue, _ctx) => {
      return { message: 'Please select a difficulty.' }
    },
  }),
  numberOfAttempts: z.coerce
    .number()
    .min(1, 'Invalid attempts amount')
    .max(100, 'Invalid attempts amount'),
  notes: z.string(),
})

export function ActivityInputs() {
  const { routeId } = useContext(ActivityCreateContext)
  const { setIsOpen } = useContext(NewActivityContext)

  const activityData = {
    climbedAt: new Date(),
    topped: false,
    perceivedDifficulty: null as unknown as perceivedDifficulty,
    numOfAttempts: 0,
    notes: '',
  }
  const navigation = useNavigate()

  const createMutation = useMutation({
    mutationFn: async (activity: ActivityCreate) => {
      return createActivity(activity)
    },
    onSuccess: (res) => {
      const newActivityId = res.id
      navigation(ROUTE.ACTIVITIES + `/${newActivityId}`)

      toast.success('Activity created successfully')
    },
    onError: () => {
      toast.error('Error creating Activity')
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    const activityData: ActivityCreate = {
      climbedAt: data.climbedAt,
      reviewStars: 0,
      reviewText: '',
      numOfAttempts: data.numberOfAttempts,
      perceivedDifficulty: data.perceivedDifficulty,
      notes: data.notes,
      topped: data.topped,
      route: {
        id: routeId ?? '',
      },
    }

    createMutation.mutate(activityData)
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      climbedAt: activityData.climbedAt,
      topped: activityData.topped,
      perceivedDifficulty: activityData.perceivedDifficulty,
      numberOfAttempts: activityData.numOfAttempts,
      notes: activityData.notes,
    },
  })

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-10 py-4">
          <div className="flex flex-row justify-between ">
            <div className="flex flex-row gap-2 items-start">
              {/* Climbed at */}
              <FormField
                control={form.control}
                name="climbedAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Climbed at</FormLabel>
                    <FormControl>
                      <DatePicker {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row gap-2 items-start">
              {/* Topped */}
              <FormField
                control={form.control}
                name="topped"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topped</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        test-id="activity-topped"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-row justify-between ">
            <div>
              {/* Perceived Difficulty */}
              <FormField
                control={form.control}
                name="perceivedDifficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Perceived Difficulty</FormLabel>
                    <Select onValueChange={field.onChange} {...field}>
                      <FormControl>
                        <SelectTrigger className="w-[40vw]" test-id="difficulty-select">
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
            </div>
            <div className="flex flex-col items-center justify-end">
              {/* Number of Attempts */}
              <FormField
                control={form.control}
                name="numberOfAttempts"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Attempts</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="w-[40vw]"
                        test-id="activity-attempts"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="">
            {/* Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      test-id="activity-notes-input"
                      placeholder="Write your Notes here..."
                      className="resize-none h-[15vh] w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Cancel and Save buttons */}
          <div className="flex flex-row justify-end gap-2">
            <Button type="button" variant="destructive" onClick={() => setIsOpen(true)}>
              Cancel
            </Button>
            <Button type="submit" test-id="activity-submit-button">
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
