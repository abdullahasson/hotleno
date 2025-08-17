// src/app/[locale]/hotels/booking/page.tsx
'use client'
import Link from "next/link"
import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import LogoAr from "../../../../../../public/logo-ar.png"
import LogoEn from "../../../../../../public/logo-en.png"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)

// Payment Form Component
function PaymentForm({ total, onSuccess }: { total: number; onSuccess: () => void }) {
  const t = useTranslations('Hotel.BookingPage')
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [cardName, setCardName] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!stripe || !elements) {
      setError(t('stripeNotLoaded'))
      setLoading(false)
      return
    }

    const cardElement = elements.getElement(CardElement)
    if (!cardElement) {
      setError(t('cardElementNotFound'))
      setLoading(false)
      return
    }

    try {
      // Create payment method
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: cardName,
        },
      })

      if (stripeError) {
        setError(stripeError.message || t('paymentFailed'))
        setLoading(false)
        return
      }

      // Send to backend
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethodId: paymentMethod?.id,
          amount: total * 100,
          currency: 'usd',
        }),
      })

      const data = await response.json()

      if (data.error) {
        setError(data.error)
      } else if (data.requiresAction) {
        // Handle 3D Secure authentication
        const { error: confirmError } = await stripe.confirmCardPayment(data.clientSecret)
        if (confirmError) {
          setError(confirmError.message || t('paymentFailed'))
        } else {
          onSuccess()
        }
      } else {
        onSuccess()
      }
    } catch (err) { // Remove ": any" type annotation
      let errorMessage = t('paymentFailed');
      if (err instanceof Error) {
        errorMessage = err.message || errorMessage;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="cardName">{t('cardName')}</Label>
        <Input
          id="cardName"
          placeholder={t('fullNamePlaceholder')}
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          required
        />
      </div>

      <div>
        <Label>{t('cardDetails')}</Label>
        <div className="border rounded-md p-3">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <div className="mt-8 flex flex-col gap-3">
        <Button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-lg h-12"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t('processing')}
            </>
          ) : (
            t('completeBooking')
          )}
        </Button>
        <Button variant="outline" className="h-12" type="button">
          {t('saveForLater')}
        </Button>
      </div>
    </form>
  )
}

export default function Booking() {
  const lang = useLocale()
  const t = useTranslations('Hotel.BookingPage')
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const hotelInfo = {
    name: t('hotelName'),
    location: t('hotelLocation'),
    checkIn: t('checkInDate'),
    checkOut: t('checkOutDate'),
    nights: 5,
    roomType: t('roomType'),
    guests: 2,
    price: 1200,
    taxes: 180,
    total: 1380
  }

  const handlePaymentSuccess = () => {
    setPaymentSuccess(true)
  }

  return (
    <div className={`container mx-auto max-w-6xl px-4 py-8 ${lang === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <Link href={`/${lang}/`} className="logo flex items-center gap-2 text-2xl font-extrabold text-darker transition-all duration-400">
          <Image
            src={lang === 'ar' ? LogoAr : LogoEn}
            alt="Hotel Logo"
            className="w-32"
            priority
          />
        </Link>
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <Button variant="outline">{t('helpCenter')}</Button>
          <Button variant="outline">+971 4 123 4567</Button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mb-12">
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center mr-4">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-white font-bold">1</span>
            </div>
            <span className="mt-2 text-sm font-medium">{t('step1')}</span>
          </div>
          <div className="h-1 w-20 bg-blue-500"></div>
          <div className="flex flex-col items-center mx-4">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-white font-bold">2</span>
            </div>
            <span className="mt-2 text-sm font-medium">{t('step2')}</span>
          </div>
          <div className="h-1 w-20 bg-gray-300"></div>
          <div className="flex flex-col items-center ml-4">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500 font-bold">3</span>
            </div>
            <span className="mt-2 text-sm text-gray-500">{t('step3')}</span>
          </div>
        </div>
      </div>

      {paymentSuccess ? (
        <div className="text-center py-20">
          <div className="bg-green-100 text-green-700 p-8 rounded-lg max-w-2xl mx-auto">
            <svg className="w-16 h-16 mx-auto mb-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <h2 className="text-2xl font-bold mb-4">{t('paymentSuccessTitle')}</h2>
            <p className="mb-6">{t('paymentSuccessMessage')}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href={`/${lang}/account/bookings`}>
                <Button className="bg-blue-500 hover:bg-blue-600 w-full sm:w-auto">
                  {t('viewBooking')}
                </Button>
              </Link>
              <Link href={`/${lang}/`}>
                <Button variant="outline" className="w-full sm:w-auto">
                  {t('backToHome')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Booking Summary */}
          <div className="flex flex-col rounded-xl p-6 bg-white shadow-lg w-full lg:w-2/3">
            <h2 className="text-2xl font-bold mb-6">{t('bookingDetails')}</h2>

            <div className="flex flex-col sm:flex-row mb-8 gap-4">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full sm:w-32 h-32" />
              <div className="sm:ml-6">
                <h3 className="text-xl font-bold">{hotelInfo.name}</h3>
                <p className="text-gray-600 mb-2">{hotelInfo.location}</p>
                <div className="flex gap-2 flex-wrap">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{t('amenity1')}</span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{t('amenity2')}</span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{t('amenity3')}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('dates')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-gray-500">{t('checkIn')}</p>
                      <p className="font-medium">{hotelInfo.checkIn}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{t('checkOut')}</p>
                      <p className="font-medium">{hotelInfo.checkOut}</p>
                    </div>
                  </div>
                  <p className="mt-2 text-sm">{hotelInfo.nights} {t('nights')}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('roomDetails')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">{hotelInfo.roomType}</p>
                  <p className="mt-2 text-sm">{t('guests')}: {hotelInfo.guests} {t('adults')}</p>
                </CardContent>
              </Card>
            </div>

            <h3 className="text-xl font-bold mb-4">{t('guestInfo')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <Label htmlFor="fullName">{t('fullName')}</Label>
                <Input id="fullName" placeholder={t('fullNamePlaceholder')} required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder={t('emailPlaceholder')} required />
              </div>
              <div>
                <Label htmlFor="phone">{t('phone')}</Label>
                <Input id="phone" placeholder={t('phonePlaceholder')} required />
              </div>
              <div>
                <Label htmlFor="country">{t('country')}</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder={t('selectCountry')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="uae">{t('uae')}</SelectItem>
                    <SelectItem value="sa">{t('saudi')}</SelectItem>
                    <SelectItem value="qa">{t('qatar')}</SelectItem>
                    <SelectItem value="om">{t('oman')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mb-6">
              <Label htmlFor="specialRequests">{t('specialRequests')}</Label>
              <Input
                id="specialRequests"
                placeholder={t('requestsPlaceholder')}
              />
            </div>
          </div>

          {/* Payment Section */}
          <div className="flex flex-col rounded-xl p-6 bg-white shadow-lg w-full lg:w-1/3">
            <h2 className="text-2xl font-bold mb-6">{t('paymentSummary')}</h2>

            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span>{t('roomPrice', { nights: hotelInfo.nights })}</span>
                <span>${hotelInfo.price}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>{t('taxes')}</span>
                <span>${hotelInfo.taxes}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
                <span>{t('total')}</span>
                <span className="text-blue-500">${hotelInfo.total}</span>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-4">{t('paymentMethod')}</h3>
            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="mb-6"
            >
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card">{t('creditCard')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal">PayPal</Label>
              </div>
            </RadioGroup>

            {paymentMethod === "card" ? (
              <Elements stripe={stripePromise}>
                <PaymentForm
                  total={hotelInfo.total}
                  onSuccess={handlePaymentSuccess}
                />
              </Elements>
            ) : (
              <div className="text-center py-4">
                <p className="mb-6">{t('paypalRedirect')}</p>
                <Button className="bg-blue-500 hover:bg-blue-600 h-12 w-full">
                  {t('continueToPaypal')}
                </Button>
              </div>
            )}

            <div className="mt-6 text-sm text-gray-500">
              <p>{t('termsNote')}</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-12 pt-8 border-t text-center text-gray-600">
        <p>{t('copyright')}</p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4">
          <Link href="#" className="hover:text-blue-500">{t('terms')}</Link>
          <Link href="#" className="hover:text-blue-500">{t('privacy')}</Link>
          <Link href="#" className="hover:text-blue-500">{t('faq')}</Link>
          <Link href="#" className="hover:text-blue-500">{t('contact')}</Link>
        </div>
      </div>
    </div>
  )
}