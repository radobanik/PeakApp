import { memo, useEffect } from 'react'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'
import Review from './Review'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createReview, updateReview } from '@/services/reviewService'
import { toast } from 'sonner'
import { useReviewsQuery, useUserReviewQuery } from '@/services/queryHooks'
import { Rating } from '@smastrom/react-rating'

const reviewSchema = z.object({
  text: z.string().max(500, 'Review text must be at most 500 characters long.'),
  stars: z.number().min(1, 'Minimum is 1 star').max(5),
})

interface RouteReviewsProps {
  showCurrentUserReview: boolean
  routeId: string
}

const RouteReviews = ({ routeId, showCurrentUserReview }: RouteReviewsProps) => {
  const queryClient = useQueryClient()

  const reviews = useReviewsQuery(routeId).data?.items
  const userReview = useUserReviewQuery(routeId).data

  const createMutation = useMutation({
    mutationFn: async (data: { text: string; stars: number }) => {
      return createReview(routeId, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userReview', routeId] })
      toast.success('Review created successfully')
    },
    onError: () => toast.error('Error creating review'),
  })

  const updateMutation = useMutation({
    mutationFn: async (data: { text: string; stars: number }) => {
      return updateReview(routeId, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userReview', routeId] })
      toast.success('Review updated successfully')
    },
    onError: () => toast.error('Error updating review'),
  })

  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      text: userReview?.text ?? '',
      stars: userReview?.stars ?? 0,
    },
  })

  // Update form when userReview changes
  useEffect(() => {
    if (userReview) {
      form.reset({
        text: userReview.text,
        stars: userReview.stars,
      })
    }
  }, [userReview, form])

  const onSubmit = (data: z.infer<typeof reviewSchema>) => {
    const reviewData = {
      text: data.text,
      stars: data.stars,
    }
    if (userReview) {
      updateMutation.mutate(reviewData)
    } else {
      createMutation.mutate(reviewData)
    }
  }

  // const renderGradeOpinionSelect = () => (
  //   <Select
  //     onValueChange={(value) => {
  //       // Handle change
  //     }}
  //     defaultValue="5.10a"
  //   >
  //     <SelectTrigger className="w-full">
  //       <SelectValue placeholder="Select grade" />
  //     </SelectTrigger>
  //     <SelectContent>
  //       <SelectItem value="5.10a">5.10a</SelectItem>
  //       <SelectItem value="5.10b">5.10b</SelectItem>
  //     </SelectContent>
  //   </Select>
  // )

  const renderCurrentUserReview = () => {
    if (!showCurrentUserReview) return null

    return (
      <div className="flex flex-col w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-2">
              <h1 className="text-xl font-semibold mt-4">Your review of this route</h1>
              <div className="flex  justify-between">
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
                <Button // TODO: add icon
                  className=""
                  type="submit"
                >
                  Submit
                </Button>
              </div>

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

            <div className="flex justify-between items-center w-full mt-3"></div>
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
