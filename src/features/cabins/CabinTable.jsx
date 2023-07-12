import { useSearchParams } from 'react-router-dom'

import Menus from '../../ui/Menus'
import Spinner from '../../ui/Spinner'
import Table from '../../ui/Table'
import CabinRow from './CabinRow'
import { useCabins } from './useCabins'

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `

export default function CabinTable() {
  const { isLoading, cabins } = useCabins()
  const [searchParams] = useSearchParams()
  if (isLoading) return <Spinner />

  //filter
  const filterValue = searchParams.get('discount') || 'all'
  let filteredCabins
  if (filterValue === 'all') filteredCabins = cabins
  if (filterValue === 'with-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0)
  if (filterValue === 'no-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0)

  //sorter
  const sortBy = searchParams.get('sortBy') || 'name-asc'

  const [field, order] = sortBy.split('-')
  const modifier = order === 'asc' ? 1 : -1
  let sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  )

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          //render prop pattern
          data={sortedCabins}
          render={(cabin) => (
            <CabinRow cabin={cabin} key={cabin.id} />
          )}></Table.Body>
      </Table>
    </Menus>
  )
}
