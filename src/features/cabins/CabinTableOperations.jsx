import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

export default function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "with-discount", label: "With Discount" },
          { value: "no-discount", label: "No Discount" },
        ]}
      ></Filter>
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "regular_price-asc", label: "Sort by price (low-high) " },
          { value: "regular_price-desc", label: "Sort by price (high-low) " },
          { value: "max_capacity-asc", label: "Sort by capacity (low-high) " },
          { value: "max_capacity-desc", label: "Sort by capacity (high-low) " },
        ]}
      />
    </TableOperations>
  );
}
