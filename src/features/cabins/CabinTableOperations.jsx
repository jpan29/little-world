import TableOperations from '../../ui/TableOperations'
import Filter from '../../ui/Filter'
import Sorter from '../../ui/Sorter'
export default function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: 'all', label: 'All' },
          { value: 'with-discount', label: 'With discount' },
          { value: 'no-discount', label: 'No discount' },
        ]}
      />
      <Sorter
        options={[
          { value: 'name-asc', label: 'Cabin name: A to Z' },
          { value: 'name-desc', label: 'Cabin name: Z to A' },
          { value: 'regularPrice-asc', label: 'Price: Low to High' },
          { value: 'regularPrice-desc', label: 'Price: High to Low' },
          { value: 'maxCapacity-asc', label: 'Capacity: Low to High' },
          { value: 'maxCapacity-desc', label: 'Capacity: High to Low' },
        ]}></Sorter>
    </TableOperations>
  )
}
