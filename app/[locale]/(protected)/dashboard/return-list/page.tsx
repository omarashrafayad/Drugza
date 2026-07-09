import { Card } from "@/components/ui/card";
import TransactionsTable from "./transactions";

const ReturnList = () => {
  return (
    <div>
      <Card>
        <TransactionsTable />
      </Card>
    </div>
  );
};

export default ReturnList;
