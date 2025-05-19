import { RouteDetailWithComments } from '@/components/RouteDetailWithReviews'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useRouteQuery } from '@/services/queryHooks'
import { useState, useEffect } from 'react'
import { API } from '@/constants/api'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { api } from '@/services'
import { ClimbingStructureType } from '@/types/routeTypes'
import { createFile, getFile } from '@/services/fileService'
import { PeakFile } from '@/types/fileTypes'
import { GradeDetail } from '@/types/gradeTypes'
import { ROUTE } from '@/constants/routes'

const editRouteSchema = z.object({
  name: z.string().min(1, 'Name must not be empty'),
  description: z.string().min(1, 'Description must not be empty'),
  latitude: z
    .number()
    .min(-90, 'Latitude must be between -90 and 90')
    .max(90, 'Latitude must be between -90 and 90'),
  longitude: z
    .number()
    .min(-180, 'Longitude must be between -180 and 180')
    .max(180, 'Longitude must be between -180 and 180'),
  grade: z.object({
    id: z.string().min(1, 'Grade must be selected'),
  }),
  climbingStructureType: z.nativeEnum(ClimbingStructureType, {
    errorMap: () => ({ message: 'Climbing structure type must be selected' }),
  }),
})

type EditRouteForm = z.infer<typeof editRouteSchema>

export default function RouteDetailPage() {
  const { routeId } = useParams<{ routeId: string }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const isCreateMode = routeId === 'new'
  const climbingObjectId = searchParams.get('climbingObjectId')
  const [isEditMode, setIsEditMode] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isImageUploading, setIsImageUploading] = useState(false)
  const [newImage, setNewImage] = useState<PeakFile | null>(null)
  const [currentImage, setCurrentImage] = useState<PeakFile | null>(null)
  const [grades, setGrades] = useState<GradeDetail[]>([])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditRouteForm>({
    resolver: zodResolver(editRouteSchema),
  })

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await api.get(API.GRADE.LIST())
        setGrades(response.data)
      } catch {
        toast.error('Failed to load grades')
      }
    }
    fetchGrades()
  }, [])

  useEffect(() => {
    if (isCreateMode) {
      setIsEditMode(true)
      reset({
        name: '',
        description: '',
        latitude: 0,
        longitude: 0,
        grade: { id: '' },
        climbingStructureType: '' as ClimbingStructureType,
      })
    }
  }, [isCreateMode, reset])

  const routeDetail = isCreateMode ? null : useRouteQuery(routeId!)

  const handleEditToggle = () => {
    if (!routeDetail?.data) return

    if (!isEditMode) {
      reset({
        name: routeDetail.data.name,
        description: routeDetail.data.description,
        latitude: routeDetail.data.latitude,
        longitude: routeDetail.data.longitude,
        grade: { id: routeDetail.data.grade.id },
        climbingStructureType: routeDetail.data.climbingStructureType,
      })

      if (routeDetail.data.image?.id) {
        getFile(routeDetail.data.image.id)
          .then((file) => setCurrentImage(file))
          .catch(() => toast.error('Failed to load current image'))
      }
    }
    setIsEditMode(!isEditMode)
  }

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsImageUploading(true)
    try {
      const uploadedFile = await createFile(file)
      setNewImage(uploadedFile)
      toast.success('Image uploaded successfully')
    } catch {
      toast.error('Failed to upload image')
    } finally {
      setIsImageUploading(false)
    }
  }

  const onSubmit = async (data: EditRouteForm) => {
    setIsSubmitting(true)
    try {
      const routeData = {
        name: data.name,
        description: data.description,
        latitude: data.latitude,
        longitude: data.longitude,
        grade: {
          id: data.grade.id,
        },
        climbingStructureType: data.climbingStructureType,
        image: newImage ? { id: newImage.id } : null,
        additionalImages: [],
        overlay: [],
        ...(isCreateMode && { climbingObject: { id: climbingObjectId! } }),
      }

      const response = await api[isCreateMode ? 'post' : 'put'](
        isCreateMode ? API.ROUTE.CREATE : `${API.ROUTE.BY_ID}${routeId}`,
        routeData
      )

      if (!response.status.toString().startsWith('2')) throw new Error('Failed to save route')

      toast.success(`Route ${isCreateMode ? 'created' : 'updated'} successfully`)
      if (isCreateMode) {
        navigate(`${ROUTE.ROUTE}/${response.data.id}`)
      } else {
        setIsEditMode(false)
        routeDetail?.refetch()
      }
    } catch (error) {
      toast.error(`Failed to ${isCreateMode ? 'create' : 'update'} route`)
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isCreateMode) {
    if (routeDetail?.isLoading)
      return (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
        </div>
      )

    if (routeDetail?.isError || !routeDetail?.data)
      return <div className="text-center">Failed to load route data</div>
  }

  return (
    <div>
      <div className="flex justify-end p-4">
        {!isCreateMode && (
          <button
            onClick={handleEditToggle}
            className="px-4 py-2 bg-blue-500 text-white rounded"
            disabled={isSubmitting}
          >
            {isEditMode ? 'Cancel' : 'Edit'}
          </button>
        )}
        {isEditMode && (
          <button
            onClick={handleSubmit(onSubmit)}
            className="ml-2 px-4 py-2 bg-green-500 text-white rounded"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        )}
      </div>

      {isEditMode ? (
        <form onSubmit={handleSubmit(onSubmit)} className="p-4">
          <div className="mb-4">
            <input
              {...register('name')}
              type="text"
              className="block w-full p-2 border rounded"
              placeholder="Name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div className="mb-4">
            <textarea
              {...register('description')}
              className="block w-full p-2 border rounded"
              placeholder="Description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div className="flex gap-2">
            <div className="w-full">
              <input
                {...register('latitude', { valueAsNumber: true })}
                type="number"
                step="any"
                className="block w-full p-2 border rounded"
                placeholder="Latitude"
              />
              {errors.latitude && (
                <p className="text-red-500 text-sm mt-1">{errors.latitude.message}</p>
              )}
            </div>
            <div className="w-full">
              <input
                {...register('longitude', { valueAsNumber: true })}
                type="number"
                step="any"
                className="block w-full p-2 border rounded"
                placeholder="Longitude"
              />
              {errors.longitude && (
                <p className="text-red-500 text-sm mt-1">{errors.longitude.message}</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Main Image</label>
            <div className="space-y-4">
              {currentImage && (
                <div className="flex items-center gap-2">
                  <img
                    src={currentImage.url}
                    alt="Current image"
                    className="h-20 w-20 object-cover rounded border border-gray-200"
                  />
                  <span className="text-sm text-gray-500">Current image</span>
                </div>
              )}

              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={isImageUploading}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
                {isImageUploading && <span>Uploading...</span>}
              </div>

              {newImage && (
                <div className="flex items-center gap-2">
                  <img
                    src={newImage.url}
                    alt="New image preview"
                    className="h-20 w-20 object-cover rounded border border-gray-200"
                  />
                  <span className="text-sm text-gray-500">New image</span>
                </div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Grade</label>
            <select
              {...register('grade.id')}
              className="block w-full p-2 border rounded"
              defaultValue={routeDetail?.data?.grade.id}
              required
            >
              <option value="" disabled>
                Select grade
              </option>
              {grades.map((grade) => (
                <option key={grade.id} value={grade.id}>
                  {grade.name}
                </option>
              ))}
            </select>
            {errors.grade?.id && (
              <p className="text-red-500 text-sm mt-1">{errors.grade.id.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Climbing Structure Type
            </label>
            <select
              {...register('climbingStructureType')}
              className="block w-full p-2 border rounded"
              defaultValue={routeDetail?.data?.climbingStructureType}
              required
            >
              <option value="" disabled>
                Select type
              </option>
              {Object.values(ClimbingStructureType).map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0) + type.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
            {errors.climbingStructureType && (
              <p className="text-red-500 text-sm mt-1">{errors.climbingStructureType.message}</p>
            )}
          </div>
        </form>
      ) : (
        routeDetail?.data && <RouteDetailWithComments routeData={routeDetail.data} />
      )}
    </div>
  )
}
