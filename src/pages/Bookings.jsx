import BookingsTable from "../features/Bookings/BookingsTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <p>TEST</p>
      </Row>
      <Row>
        <BookingsTable />
      </Row>
    </>
  );
}

export default Bookings;
