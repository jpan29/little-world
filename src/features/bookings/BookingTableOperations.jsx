import Sorter from '../../ui/Sorter'
import Filter from '../../ui/Filter'
import TableOperations from '../../ui/TableOperations'

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: 'all', label: 'All' },
          { value: 'checked-out', label: 'Checked out' },
          { value: 'checked-in', label: 'Checked in' },
          { value: 'unconfirmed', label: 'Unconfirmed' },
        ]}
      />

      <Sorter
        options={[
          { value: 'startDate-desc', label: 'Date: Recent first' },
          { value: 'startDate-asc', label: 'Date: Earlier first' },
          {
            value: 'totalPrice-desc',
            label: 'Amount: High to Low',
          },
          { value: 'totalPrice-asc', label: 'Amount: Low to High' },
        ]}
      />
    </TableOperations>
  )
}

export default BookingTableOperations
