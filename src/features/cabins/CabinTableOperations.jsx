import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

export default function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={["all", "with discount", "no discount"]}
      ></Filter>
    </TableOperations>
  );
}
