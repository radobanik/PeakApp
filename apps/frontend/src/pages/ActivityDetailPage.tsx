import { deleteActivity, getActivityById } from '@/services/activityService'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import noBoulderPhoto from '@/assets/NoBoulderPhoto.jpg'
import BackButon from '@/components/BackButton'
import { capitalize } from '@/lib/utils'
import { format } from 'date-fns'
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
import { TIME_FORMAT, DATE_FORMAT } from '@/constants/formats'
import { perceivedDifficulty } from '@/types/utilsTypes'
import { ROUTE } from '@/constants/routes'
import { EntityOptionsDropdown } from '@/components/ui/custom/entity-option-dropdown'
import { AlertDialogDelete } from '@/components/ui/custom/alert-dialog-delete'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function ActivityDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const navigation = useNavigate()

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)

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

  useEffect(() => {
    if (isDeleted) {
      deleteMutation.mutate()
      setIsDeleted(false)
    }
  }, [isDeleted])

  return (
    <div className="flex flex-col gap-4">
      <AlertDialogDelete
        isOpen={isDeleteDialogOpen}
        setOpen={setIsDeleteDialogOpen}
        setDelete={setIsDeleted}
      />
      <div>
        <div className="flex flex-row justify-between p-4">
          <BackButon backRoute={ROUTE.ACTIVITIES} />
          <EntityOptionsDropdown setDelete={setIsDeleteDialogOpen} />
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

          <div className="flex flex-row justify-between p-4">
            <div>
              {activityQuery.isSuccess && (
                <p>{format(activityQuery.data?.climbedAt, DATE_FORMAT)}</p>
              )}
              {activityQuery.isSuccess && (
                <p>{format(activityQuery.data?.climbedAt, TIME_FORMAT)}</p>
              )}
            </div>
            <div className="flex flex-row gap-2 items-center">
              <label htmlFor="topped">Topped: </label>
              {activityQuery.isLoading && <Skeleton className="h-10 w-[5vw]" />}
              {activityQuery.isSuccess && (
                <Input type="checkbox" id="topped" disabled checked={activityQuery.data?.topped} />
              )}
            </div>
          </div>

          <div className="flex flex-row justify-between p-4 ">
            <div>
              <label htmlFor="">Perceived Difficulty</label>
              {activityQuery.isLoading && <Skeleton className="h-10 w-[40vw]" />}
              {activityQuery.isSuccess && (
                <Select defaultValue={activityQuery.data?.perceivedDifficulty}>
                  <SelectTrigger className="w-[40vw]">
                    <SelectValue placeholder="Select a Difficulty" />
                  </SelectTrigger>
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
              )}
            </div>
            <div className="flex flex-col items-center justify-end">
              <label htmlFor="attempts">Number of Attempts </label>
              {activityQuery.isLoading && <Skeleton className="h-10 w-[40vw]" />}
              {activityQuery.isSuccess && (
                <Input
                  type="number"
                  id="attempts"
                  disabled
                  className="w-[40vw]"
                  value={activityQuery.data?.numOfAttempts}
                />
              )}
            </div>
          </div>
          <div className="p-4">
            <label htmlFor="notes">Notes</label>
            {activityQuery.isLoading && <Skeleton className="h-[15vh] w-full" />}
            {activityQuery.isSuccess && (
              <Textarea
                disabled
                id="notes"
                placeholder="Write your Notes here..."
                className="resize-none h-[15vh] w-full"
                defaultValue={activityQuery.data.notes}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
