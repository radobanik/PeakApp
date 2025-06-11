import { useForm, Controller } from 'react-hook-form'
import { ChangeEvent, memo, useCallback, useEffect, useRef, useState } from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { SearchComboBox, ComboboxItem } from '@/components/ui/custom/search-combo-box'
import { DatePickerYearSelector } from '@/components/ui/custom/date-picker-year-selection'
import NoUserPhoto from '@/assets//NoUserPhoto.png'
import { CitiesResponse, CountriesResponse } from '@/types/geoTypes'
import * as geoService from '@/services/geoService'
import * as userService from '@/services/userService'
import * as fileService from '@/services/fileService'
import { PeakFile } from '@/types/fileTypes'
import { toast } from 'sonner'
import { AchievementListing } from '@/components/AchievementListing'
import { UserDetailResponse } from '@/types/userTypes'
import { useMatch, useParams } from 'react-router-dom'
import { ROUTE } from '@/constants/routes'
import { useQueryClient } from '@tanstack/react-query'

type FormValues = {
  username: string
  description: string
  firstName: string
  lastName: string
  weight: string | null
  height: string | null
  birthday: string
  country: string
  city: string
}

const UserSettingsPage = () => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      username: '',
      description: '',
      firstName: '',
      lastName: '',
      weight: null,
      height: null,
      birthday: '',
      country: '',
      city: '',
    },
  })

  const [countryData, setCountryData] = useState<CountriesResponse>([])
  const [countriesComboItems, setCountriesComboItems] = useState<ComboboxItem[]>([])
  const [citiesData, setCitiesData] = useState<CitiesResponse>([])
  const [citiesComboItems, setCitiesComboItems] = useState<ComboboxItem[]>([])
  const [uploadedAvatar, setUploadedAvatar] = useState<PeakFile | null>(null)
  const [profilePicturePreview, setProfilePicturePreview] = useState<string | undefined>()
  const [profilePictureChecked, setProfilePictureChecked] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState<UserDetailResponse | null>(null)

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const selectedCountry = watch('country')

  const queryClient = useQueryClient()

  const routeMatch = useMatch(ROUTE.ALL_USERS_DETAIL)
  const { id } = useParams()
  const getUser = useCallback(async () => {
    if (routeMatch) {
      return userService.getUser(id!)
    }
    return userService.getLoggedInUser()
  }, [routeMatch, id])

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await geoService.getCountries()
        setCountryData(response)
        setCountriesComboItems(
          response.map((country) => ({ value: country.name, label: country.name }))
        )
      } catch {
        toast.error('Failed to fetch countries.')
      }
    }
    fetchCountries()
  }, [])

  useEffect(() => {
    async function fetchUserData() {
      try {
        const user = await getUser()

        setLoggedInUser(user)
        setValue('username', user.userName)
        setValue('description', user.description)
        setValue('firstName', user.firstName)
        setValue('lastName', user.lastName)
        setValue('weight', user.weight?.toString() || '')
        setValue('height', user.height?.toString() || '')
        setValue(
          'birthday',
          user.birthday ? new Date(user.birthday).toISOString().split('T')[0] : ''
        )
        setValue('country', user.city?.country?.name || '')
        setValue('city', user.city?.name || '')

        if (user.profilePictureId) {
          try {
            const profilePicture = await fileService.getFile(user.profilePictureId)
            setUploadedAvatar(profilePicture)
            setProfilePicturePreview(profilePicture.url)
          } catch (error) {
            console.error('Failed to fetch profile picture:', error)
            setProfilePicturePreview(NoUserPhoto)
          }
        } else {
          setProfilePicturePreview(NoUserPhoto)
        }
      } catch {
        toast.error('Failed to load user data.')
      } finally {
        setProfilePictureChecked(true)
      }
    }

    fetchUserData()
  }, [setValue, id])

  useEffect(() => {
    async function fetchCities() {
      const country = countryData.find((c) => c.name === selectedCountry)
      if (!country) return

      try {
        const response = await geoService.getCitiesByCountry(country.id)
        setCitiesData(response)
        setCitiesComboItems(response.map((city) => ({ value: city.name, label: city.name })))

        const currentCity = watch('city')
        if (currentCity && response.some((city) => city.name === currentCity)) {
          setValue('city', currentCity)
        } else {
          setValue('city', '')
        }
      } catch {
        toast.error('Failed to fetch cities.')
      }
    }

    fetchCities()
  }, [selectedCountry, countryData, setValue])

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      try {
        const uploadedFile = await fileService.createFile(file)
        setUploadedAvatar(uploadedFile)
        setProfilePicturePreview(uploadedFile.url)
        toast.success('Profile picture uploaded successfully!')
      } catch {
        toast.error('Failed to upload profile picture.')
      }
    }
  }

  const onSubmit = async (data: FormValues) => {
    try {
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        userName: data.username,
        description: data.description,
        birthday: new Date(data.birthday),
        height: data.height === '' ? null : Number(data.height),
        weight: data.weight === '' ? null : Number(data.weight),
        cityId: citiesData.find((city) => city.name === data.city)?.id,
        profilePictureId: uploadedAvatar?.id ?? null,
      }
      if (routeMatch) {
        await userService.updateUser(id!, payload)
      } else {
        await userService.updateLoggedInUser(payload)
      }

      toast.success('Profile updated successfully!')
      queryClient.invalidateQueries({ queryKey: ['profilePicture'] })
    } catch {
      toast.error('Failed to update profile.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto space-y-6 m-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Community Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:[grid-template-columns:auto_1fr] gap-6 items-start">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-45 w-45">
                {profilePictureChecked && <AvatarImage src={profilePicturePreview} />}
              </Avatar>
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                size="sm"
                className="w-50"
                variant="outline"
                type="button"
                onClick={() => fileInputRef.current?.click()}
              >
                Change Photo
              </Button>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="lubelover"
                  {...register('username', { required: true, minLength: 3 })}
                />
                {errors.username && (
                  <span className="text-sm text-red-500">
                    Username is required (min 3 characters).
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="description">Community Description</Label>
                <Textarea
                  id="description"
                  className="min-h-[80px] sm:min-h-[132px]"
                  placeholder="Tell others about your community involvement or interests..."
                  rows={4}
                  {...register('description', { required: false })}
                />
                {errors.description && (
                  <span className="text-sm text-red-500">Description is required.</span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <AchievementListing userId={loggedInUser?.id} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="first-name">First Name</Label>
            <Input
              id="first-name"
              placeholder="Walter"
              {...register('firstName', { required: true })}
            />
            {errors.firstName && (
              <span className="text-sm text-red-500">First name is required.</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="last-name">Last Name</Label>
            <Input
              id="last-name"
              placeholder="White"
              {...register('lastName', { required: true })}
            />
            {errors.lastName && (
              <span className="text-sm text-red-500">Last name is required.</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="birthday">Birthday</Label>
            <Controller
              control={control}
              name="birthday"
              rules={{ required: true }}
              render={({ field }) => (
                <DatePickerYearSelector
                  className="w-full"
                  selected={field.value ? new Date(field.value) : undefined}
                  onSelect={(date) => field.onChange(date?.toISOString().split('T')[0] ?? '')}
                />
              )}
            />
            {errors.birthday && <span className="text-sm text-red-500">Birthday is required.</span>}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="country">Country</Label>
            <Controller
              control={control}
              name="country"
              rules={{ required: true }}
              render={({ field }) => (
                <SearchComboBox
                  items={countriesComboItems}
                  value={field.value}
                  onChange={(val) => field.onChange(val)}
                  placeholder="Select a country"
                  emptyMessage="No countries found"
                />
              )}
            />
            {errors.country && <span className="text-sm text-red-500">Country is required.</span>}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="city">City</Label>
            <Controller
              control={control}
              name="city"
              rules={{ required: true }}
              render={({ field }) => (
                <SearchComboBox
                  items={citiesComboItems}
                  value={field.value}
                  onChange={(val) => field.onChange(val)}
                  placeholder="Select a city"
                  emptyMessage="No cities found"
                />
              )}
            />
            {errors.city && <span className="text-sm text-red-500">City is required.</span>}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="70"
              {...register('weight', {
                required: false,
                min: 1,
                max: 200,
                validate: (val) => !isNaN(Number(val)),
              })}
            />
            {errors.weight && (
              <span className="text-sm text-red-500">
                Enter a valid weight between 1 and 200 kg.
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              placeholder="170"
              {...register('height', {
                required: false,
                min: 50,
                max: 250,
                validate: (val) => !isNaN(Number(val)),
              })}
            />
            {errors.height && (
              <span className="text-sm text-red-500">
                Enter a valid height between 50 and 250 cm.
              </span>
            )}
          </div>

          <div className="flex justify-end pt-3 mx-1">
            <Button type="submit" size="sm" className="w-35">
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}

export default memo(UserSettingsPage)
