import { useSearchParams } from 'react-router-dom'
import Select from './Select'

export default function Sorter({ options }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const sortBy = searchParams.get('sortBy') || ''

  const handleChange = (e) => {
    searchParams.set('sortBy', e.target.value)
    setSearchParams(searchParams)
  }
  return <Select options={options} value={sortBy} onChange={handleChange} />
}
