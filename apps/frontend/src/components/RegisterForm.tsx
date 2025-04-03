import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import * as authService from '@/services/authService'
import * as geoService from '@/services/geoService'
import { navigateToPage } from '@/routing/navigator'
import LoginPage from '@/pages/LoginPage'
import { SearchComboBox, ComboboxItem } from '@/components/ui/custom/search-combo-box'
import { DatePickerYearSelector } from '@/components/ui/custom/date-picker-year-selection'
import { CountriesResponse } from '@/types/geoTypes'

type ErrorState = {
  email?: boolean
  password?: boolean
  confirmPassword?: boolean
  userName?: boolean
  firstName?: boolean
  lastName?: boolean
  weight?: boolean
  birthday?: boolean
  city?: boolean
  country?: boolean
}

export function RegisterForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [step, setStep] = useState<1 | 2 | 3>(1)

  // step 1
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  // step 2
  const [userName, setUsername] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')

  // step 3
  const [weight, setWeight] = useState<string>('')
  const [birthday, setBirthday] = useState<string>(new Date().toISOString().split('T')[0])
  const [cityName, setCityName] = useState<string>('')
  const [cityId, setCityId] = useState<string | null>(null)
  const [countryId, setCountryId] = useState<string | null>(null)
  const [countryName, setCountryName] = useState<string>('')

  // various
  const [countryData, setCountryData] = useState<CountriesResponse>([])
  const [citiesData, setCitiesData] = useState<CountriesResponse>([])

  const [countriesComboItems, setCountriesComboItems] = useState<ComboboxItem[]>([])
  const [citiesComboItems, setCitiesComboItems] = useState<ComboboxItem[]>([])

  const [errors, setErrors] = useState<ErrorState>({})
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await geoService.getCountries()
        setCountryData(response)
        setCountriesComboItems(
          response.map((country) => ({
            value: country.name,
            label: country.name,
          }))
        )
      } catch (error) {
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
        setCitiesComboItems(
          response.map((city) => ({
            value: city.name,
            label: city.name,
          }))
        )
      } catch (error) {
        toast.error('Failed to fetch cities.')
      }
    }
    fetchCities()
  }, [countryId])

  const handleNext = async () => {
    const newErrors: ErrorState = {}

    if (step === 1) {
      if (!email) newErrors.email = true
      if (!password) newErrors.password = true
      if (!confirmPassword) newErrors.confirmPassword = true

      if (password !== confirmPassword) {
        newErrors.confirmPassword = true
        toast.info('Passwords do not match.')
      }

      if (email) {
        const emailResponse = await authService.isEmailUnique({ email })
        if (!emailResponse.unique) {
          newErrors.email = true
          toast.info('Email already exists. Please use a different one.')
        }
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        return
      }

      setErrors({})
      setStep(2)
    } else if (step === 2) {
      if (!userName) newErrors.userName = true
      if (!firstName) newErrors.firstName = true
      if (!lastName) newErrors.lastName = true

      if (userName) {
        const userNameResponse = await authService.isUserNameUnique({ userName })
        if (!userNameResponse.unique) {
          newErrors.userName = true
          toast.info('Username already exists. Please use a different one.')
        }
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        return
      }

      setErrors({})
      setStep(3)
    }
  }

  const handleCityChange = useCallback(
    (value: any) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: ErrorState = {}
    if (!weight) newErrors.weight = true
    if (!birthday) newErrors.birthday = true
    if (!cityId) newErrors.city = true
    if (!countryId) newErrors.country = true

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      toast.info('Please complete all required fields.')
      return
    }

    try {
      await authService.register(
        {
          email,
          userName,
          password,
          firstName,
          lastName,
          birthday,
          weight: parseFloat(weight),
          cityId,
        },
        navigate
      )
      await authService.login({ email, password }, navigate)
    } catch (err: any) {
      toast.error(err.message || 'Unexpected error occurred during registration.')
    }
  }

  const handleNavigateToLogin = () => {
    navigateToPage(LoginPage, navigate)
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              {step === 1 && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      value={email}
                      className={cn(errors.email && 'border-red-500')}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      className={cn(errors.password && 'border-red-500')}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      className={cn(errors.confirmPassword && 'border-red-500')}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <Button type="button" onClick={handleNext} className="w-full">
                    Next
                  </Button>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="userName">Username</Label>
                    <Input
                      id="userName"
                      type="text"
                      placeholder="jdoe"
                      value={userName}
                      className={cn(errors.userName && 'border-red-500')}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      value={firstName}
                      className={cn(errors.firstName && 'border-red-500')}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      value={lastName}
                      className={cn(errors.lastName && 'border-red-500')}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <Button type="button" onClick={handleNext} className="w-full">
                    Next
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="text-sm mt-2"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                </>
              )}

              {step === 3 && (
                <>
                  <div className="grid gap-2">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <Label htmlFor="weight" className="pb-1.5">
                          Weight (kg)
                        </Label>
                        <Input
                          id="weight"
                          type="number"
                          value={weight}
                          min={0}
                          max={150}
                          className={cn(errors.weight && 'border-red-500')}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value)
                            if (value >= 0 && value <= 150) {
                              setWeight(e.target.value)
                            } else if (e.target.value === '') {
                              setWeight('')
                            }
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="birthday" className="pb-1.5">
                          Birthday
                        </Label>
                        <DatePickerYearSelector
                          selected={birthday ? new Date(birthday) : undefined}
                          onSelect={(date) => {
                            if (date) {
                              setBirthday(date.toISOString().split('T')[0])
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <Label htmlFor="country" className="pb-1.5">
                          Country
                        </Label>
                        <SearchComboBox
                          className="w-lg"
                          items={countriesComboItems}
                          value={countryName}
                          onChange={(value) => {
                            const selectedCountry = countryData.find(
                              (country) => country.name === value
                            )
                            if (selectedCountry) {
                              setCountryId(
                                countryData.find((country) => country.name === value)?.id || null
                              )
                              setCountryName(selectedCountry.name)
                            } else {
                              setCountryId(null)
                              setCountryName('')
                            }
                            setCityName('')
                          }}
                          placeholder="Select a country"
                          emptyMessage="No countries found"
                        />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="city" className="pb-1.5">
                          City
                        </Label>
                        <SearchComboBox
                          items={citiesComboItems}
                          value={cityName}
                          onChange={handleCityChange}
                          placeholder="Select a city"
                          emptyMessage="No cities found"
                        />
                      </div>
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    Sign up
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="text-sm mt-2"
                    onClick={() => setStep(2)}
                  >
                    Back
                  </Button>
                </>
              )}

              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">OR</span>
              </div>

              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full h-10 justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 mr-2"
                  >
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Sign up with Google
                </Button>

                <Button variant="outline" className="w-full h-10 justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-5 h-5 mr-1"
                  >
                    <g transform="translate(-2, 0)">
                      <path d="M6.731 0 2 9.125h2.788L6.73 5.497l1.93 3.628h2.766zm4.694 9.125-1.372 2.756L8.66 9.125H6.547L10.053 16l3.484-6.875z" />
                    </g>
                  </svg>
                  Sign up with Strava
                </Button>
              </div>

              <div className="text-center text-sm">
                Already have an account?{' '}
                <Button
                  type="button"
                  variant="link"
                  className="p-0 underline underline-offset-4"
                  onClick={handleNavigateToLogin}
                >
                  Login
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
