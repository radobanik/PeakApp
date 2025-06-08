import { memo, useEffect, useState } from 'react'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'
import Review from './Review'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createReview, updateReview } from '@/services/reviewService'
import { toast } from 'sonner'
import { useReviewsQuery, useUserReviewQuery } from '@/services/queryHooks'
import { Rating } from '@smastrom/react-rating'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { GradeDetail } from '@/types/gradeTypes'
import { getAllGrades } from '@/services/gradeService'

const reviewSchema = z.object({
  text: z.string().max(500, 'Review text must be at most 500 characters long.'),
  stars: z.number().min(1, 'Minimum is 1 star').max(5),
  gradeRating: z.string(),
})

interface RouteReviewsProps {
  showCurrentUserReview: boolean
  routeId: string
}

const RouteReviews = ({ routeId, showCurrentUserReview }: RouteReviewsProps) => {
  const [grades, setGrades] = useState<GradeDetail[]>([])
  const queryClient = useQueryClient()

  const reviews = useReviewsQuery(routeId).data?.items
  const userReview = useUserReviewQuery(routeId).data

  useEffect(() => {
    const fetchGrades = async () => {
      const gradesData = await getAllGrades()
      setGrades(gradesData)
    }

    fetchGrades()
  }, [])

  const createMutation = useMutation({
    mutationFn: async (data: { text: string; stars: number; gradeRating: { id: string } }) => {
      return createReview(routeId, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userReview', routeId] })
      queryClient.invalidateQueries({ queryKey: ['route', routeId] })
      toast.success('Review created successfully')
    },
    onError: () => toast.error('Error creating review'),
  })

  const updateMutation = useMutation({
    mutationFn: async (data: { text: string; stars: number; gradeRating: { id: string } }) => {
      return updateReview(routeId, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userReview', routeId] })
      queryClient.invalidateQueries({ queryKey: ['route', routeId] })
      toast.success('Review updated successfully')
    },
    onError: () => toast.error('Error updating review'),
  })

  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      text: userReview?.text ?? '',
      stars: userReview?.stars ?? 0,
      gradeRating: userReview?.gradeRating?.id ?? '',
    },
  })

  // Update form when userReview changes
  useEffect(() => {
    if (userReview) {
      form.reset({
        text: userReview.text,
        stars: userReview.stars,
        gradeRating: userReview.gradeRating?.id,
      })
    }
  }, [userReview, form])

  const onSubmit = (data: z.infer<typeof reviewSchema>) => {
    const reviewData = {
      text: data.text,
      stars: data.stars,
      gradeRating: {
        id: data.gradeRating,
      },
    }
    if (userReview) {
      updateMutation.mutate(reviewData)
    } else {
      createMutation.mutate(reviewData)
    }
  }

  const renderCurrentUserReview = () => {
    if (!showCurrentUserReview) return null

    return (
      <div className="flex flex-col w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-2">
              <h1 className="text-xl font-semibold mt-4">Your review of this route</h1>
              <div>
                <FormField
                  control={form.control}
                  name="stars"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Rating
                          style={{ maxWidth: 140 }}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="pt-4">
                  <FormField
                    control={form.control}
                    name="gradeRating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Grade opinion</FormLabel>
                        <Select onValueChange={field.onChange} {...field}>
                          <FormControl>
                            <SelectTrigger className="w-[40vw]">
                              <SelectValue placeholder="Select a Difficulty" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-48">
                            <SelectGroup>
                              <SelectLabel>Opinion on grade</SelectLabel>
                              {Object.values(grades).map((grade) => (
                                <SelectItem key={grade.id} value={grade.id}>
                                  {grade.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="pb-2">
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea placeholder="Write your review here..." rows={2} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button // TODO: add icon
              className=""
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-2xl font-semibold">Reviews</h1>
      {reviews ? (
        reviews.map((routeReview) => <Review key={routeReview.createdBy.id} {...routeReview} />)
      ) : (
        <p>No reviews yet</p>
      )}
      {renderCurrentUserReview()}
    </div>
  )
}

export default memo(RouteReviews)
