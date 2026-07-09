import { Card } from "@/components/ui/card"
import TransactionsTable from "./transactions";

const PharmacyList = () => {
  return (
    <div>
      <Card>
        <TransactionsTable />
      </Card>
    </div>
  );
}

export default PharmacyList