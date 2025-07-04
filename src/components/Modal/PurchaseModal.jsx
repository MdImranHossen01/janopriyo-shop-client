import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import useAuth from '../../hooks/useAuth'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import CheckoutForm from '../Form/CheckoutForm'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

// Load Stripe key only once
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY)

const PurchaseModal = ({ closeModal, isOpen, plant, fetchPlant }) => {
  const { user } = useAuth()

  const {
    name,
    category,
    quantity,
    price: rawPrice,
    _id,
    seller,
    image,
  } = plant || {}

  // Ensure price is a number
  const price = parseFloat(rawPrice) || 0

  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [totalPrice, setTotalPrice] = useState(price)

  const [orderData, setOrderData] = useState({
    seller,
    plantId: _id,
    quantity: 1,
    price: price,
    plantName: name,
    plantCategory: category,
    plantImage: image,
  })

  useEffect(() => {
    if (user) {
      setOrderData(prev => ({
        ...prev,
        customer: {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
        },
      }))
    }
  }, [user])

  const handleQuantity = value => {
    const totalQuantity = parseInt(value)
    if (totalQuantity > quantity) {
      return toast.error('You cannot purchase more.')
    }

    const calculatedPrice = totalQuantity * price
    setSelectedQuantity(totalQuantity)
    setTotalPrice(calculatedPrice)

    setOrderData(prev => ({
      ...prev,
      price: calculatedPrice,
      quantity: totalQuantity,
    }))
  }

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl">
            <DialogTitle
              as="h3"
              className="text-lg font-medium text-center leading-6 text-gray-900"
            >
              Review Info Before Purchase
            </DialogTitle>

            <div className="mt-2 text-sm text-gray-500">
              <p>Plant: {name}</p>
              <p>Category: {category}</p>
              <p>Customer: {user?.displayName}</p>
              <p>Price Per Unit: ${price.toFixed(2)}</p>
              <p>Available Quantity: {quantity}</p>
            </div>

            <hr className="mt-2" />

            <p className="mt-2">Order Info:</p>
            <div className="mt-2">
              <input
                value={selectedQuantity}
                onChange={e => handleQuantity(e.target.value)}
                type="number"
                min={1}
                className="border px-3 py-1 w-full"
              />
            </div>

            <div className="mt-2 text-sm text-gray-500">
              <p>Selected Quantity: {selectedQuantity}</p>
              <p>Total Price: ${totalPrice.toFixed(2)}</p>
            </div>

            {/* Stripe Elements Wrapper */}
            <Elements stripe={stripePromise}>
              <CheckoutForm
                totalPrice={totalPrice}
                closeModal={closeModal}
                orderData={orderData}
                fetchPlant={fetchPlant}
              />
            </Elements>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default PurchaseModal
