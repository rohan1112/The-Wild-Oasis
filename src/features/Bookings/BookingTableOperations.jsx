import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

export default function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "checked-in", label: "Checked In" },
          { value: "checked-out", label: "Checked Out" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />

      <SortBy
        options={[
          { value: "start_date-asc", label: "Sort by date (Recent First)" },
          { value: "start_date-desc", label: "Sort by date (Earlier First)" },
          { value: "total_price-asc", label: "Sort by Amount (Low-High)" },
          { value: "total_price-desc", label: "Sort by Amount (High-Low)" },
        ]}
      />
    </TableOperations>
  );
}
