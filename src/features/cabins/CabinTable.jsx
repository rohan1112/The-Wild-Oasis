import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import useGetCabins from "./useGetCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

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
// `;

function CabinTable() {
  const { isLoading, cabins } = useGetCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  const filteredValue = searchParams.get("discount") || "all";
  const sortValue = searchParams.get("sortBy") || "startDate-asc";

  //1)Fitering
  let filteredCabin;
  if (filteredValue === "all") filteredCabin = cabins;

  if (filteredValue === "with-discount") {
    filteredCabin = cabins.filter((cabinItem) => cabinItem.discount > 0);
  }

  if (filteredValue === "no-discount") {
    filteredCabin = cabins.filter((cabinItem) => cabinItem.discount === 0);
  }

  /*
  2) Sorting 
  field->Database column name
  order->desc or asc 4
  */

  const [field, order] = sortValue.split("-");
  const modifier = order === "desc" ? -1 : 1;

  const sortedCabin = filteredCabin.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

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
          data={sortedCabin}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
