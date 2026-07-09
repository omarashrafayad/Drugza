import { Card } from "@/components/ui/card";
import TransactionsTable from "./transactions";

const InventoryManagement = () => {
  return (
    <div>
      <Card>
        <TransactionsTable />
      </Card>
    </div>
  );
};

export default InventoryManagement;
