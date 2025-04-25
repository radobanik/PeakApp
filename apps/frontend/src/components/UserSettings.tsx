import { useEffect, useState, useCallback } from 'react'
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

export default function UserSettings() {
  const [username, setUsername] = useState('')
  const [description, setDescription] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [weight, setWeight] = useState('')
  const [birthday, setBirthday] = useState<string>('')

  const [cityId, setCityId] = useState<string | null>(null)
  const [cityName, setCityName] = useState('')
  const [countryId, setCountryId] = useState<string | null>(null)
  const [countryName, setCountryName] = useState('')

  const [countryData, setCountryData] = useState<CountriesResponse>([])
  const [countriesComboItems, setCountriesComboItems] = useState<ComboboxItem[]>([])

  const [citiesData, setCitiesData] = useState<CountriesResponse>([])
  const [citiesComboItems, setCitiesComboItems] = useState<ComboboxItem[]>([])

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
      if (!countryId) return
      try {
        const response = await geoService.getCitiesByCountry(countryId)
        setCitiesData(response)
        setCitiesComboItems(response.map((city) => ({ value: city.name, label: city.name })))
      } catch {
        toast.error('Failed to fetch cities.')
      }
    }
    fetchCities()
  }, [countryId])

  const handleCityChange = useCallback(
    (value: unknown) => {
      const selectedCity = citiesData.find((city) => city.name === value)
      if (selectedCity) {
        setCityId(selectedCity.id)
        setCityName(selectedCity.name)
      } else {
        setCityId(null)
        setCityName('')
      }
    },
    [citiesData]
  )

  return (
    <div className="w-full mx-auto space-y-6 m-6 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Community Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:[grid-template-columns:auto_1fr] gap-12 items-start">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={diddyPfp} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <Button size="sm" variant="outline">
                Change Photo
              </Button>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="johndoe123"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="description">Community Description</Label>
                <Textarea
                  id="description"
                  placeholder="Tell others about your community involvement or interests..."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
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
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="last-name">Last Name</Label>
            <Input
              id="last-name"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="birthday">Birthday</Label>
            <DatePickerYearSelector
              className="w-full"
              selected={birthday ? new Date(birthday) : undefined}
              onSelect={(date) => {
                if (date) setBirthday(date.toISOString().split('T')[0])
              }}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="country">Country</Label>
            <SearchComboBox
              items={countriesComboItems}
              value={countryName}
              onChange={(value) => {
                const selected = countryData.find((c) => c.name === value)
                setCountryId(selected?.id || null)
                setCountryName(selected?.name || '')
                setCityName('')
              }}
              placeholder="Select a country"
              emptyMessage="No countries found"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="city">City</Label>
            <SearchComboBox
              className="w-full"
              items={citiesComboItems}
              value={cityName}
              onChange={handleCityChange}
              placeholder="Select a city"
              emptyMessage="No cities found"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="70"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          <div className="flex justify-end pt-3 mx-1">
            <Button size="sm" className="w-35">
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
