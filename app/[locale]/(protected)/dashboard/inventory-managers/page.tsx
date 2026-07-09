import { Card } from "@/components/ui/card";
import TransactionsTable from "./transactions";

const InventoryMangers = () => {
  return (
    <div>
      <Card>
        <TransactionsTable />
      </Card>
    </div>
  );
};

export default InventoryMangers;
