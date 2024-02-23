import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import BookingRow from "./BookingRow";
import useGetBookings from "./useGetBookings";

export default function BookingsTable() {
  const { bookings, isLoading, count } = useGetBookings();

  if (isLoading) return <Spinner />;
  if (!bookings.length) return <Empty resourceName={"booking"} />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guests</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
        </Table.Header>
        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow booking={booking} key={booking.id} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}
