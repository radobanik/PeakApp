import { useForm, Controller } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { SearchComboBox, ComboboxItem } from '@/components/ui/custom/search-combo-box'
import { DatePickerYearSelector } from '@/components/ui/custom/date-picker-year-selection'
import diddyPfp from '@/assets/diddy.webp'
import * as geoService from '@/services/geoService'
import { CountriesResponse } from '@/types/geoTypes'
import { toast } from 'sonner'

type FormValues = {
  username: string
  description: string
  firstName: string
  lastName: string
  weight: string
  birthday: string
  country: string
  city: string
}

export default function UserSettings() {
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
      weight: '',
      birthday: '',
      country: '',
      city: '',
    },
  })

  const [countryData, setCountryData] = useState<CountriesResponse>([])
  const [countriesComboItems, setCountriesComboItems] = useState<ComboboxItem[]>([])
  const [citiesData, setCitiesData] = useState<CountriesResponse>([])
  const [citiesComboItems, setCitiesComboItems] = useState<ComboboxItem[]>([])

  const selectedCountry = watch('country')

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
    async function fetchCities() {
      const country = countryData.find((c) => c.name === selectedCountry)
      if (!country) return

      try {
        const response = await geoService.getCitiesByCountry(country.id)
        setCitiesData(response)
        setCitiesComboItems(response.map((city) => ({ value: city.name, label: city.name })))
      } catch {
        toast.error('Failed to fetch cities.')
      }
    }

    fetchCities()
    setValue('city', '') // Reset city on country change
  }, [selectedCountry, countryData, setValue])

  const onSubmit = (data: FormValues) => {
    console.log('Form Submitted:', data)
    toast.success('Profile updated successfully!')
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
                <AvatarImage src={diddyPfp} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <Button size="sm" className="w-50" variant="outline">
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
                  placeholder="If her age is on the clock, she is ready for the ..."
                  //   placeholder="Tell others about your community involvement or interests..."
                  rows={4}
                  {...register('description', { required: true })}
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
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="first-name">First Name</Label>
            <Input
              id="first-name"
              placeholder="White"
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
              placeholder="Diddy"
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
                required: true,
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
