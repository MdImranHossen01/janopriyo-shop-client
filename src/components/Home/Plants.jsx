import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Link } from 'react-router'

const Plants = () => {
  const { data: plants, isLoading, isError, error } = useQuery({
    queryKey: ['plants'],
    queryFn: () =>
      axios.get(`${import.meta.env.VITE_API_URL}/plants`).then(res => res.data),
  })

  if (isLoading) return <p>Loading plants...</p>
  if (isError) return <p>Error loading plants: {error.message}</p>

  return (
    <div className="plants-list grid grid-cols-1 md:grid-cols-3 gap-6">
      {plants.map((plant) => (
        <Link to={`/plant/${plant._id}`} key={plant._id}>
          <div className="plant-card border p-4 rounded shadow hover:shadow-lg transition">
            <img
              src={plant.image}
              alt={plant.name}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="text-xl font-semibold mt-2">{plant.name}</h3>
            <p className="text-gray-600">{plant.category}</p>
            <p className="text-gray-800 font-bold">${plant.price}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Plants
