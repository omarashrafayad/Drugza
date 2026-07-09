import { Card } from "@/components/ui/card";
import TransactionsTable from "./transactions";

const OrderList = () => {
  return (
    <div>
      <Card>
        <TransactionsTable />
      </Card>
    </div>
  );
};

export default OrderList;
