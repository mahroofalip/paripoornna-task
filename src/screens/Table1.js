import { useEffect, useState } from "react";
import { CustomerService } from "../components/service/Service";
import DataTableDemo from "../components/table/Table";
//import { Button } from 'primereact/button';

function Table1() {
  let array = [ "name", "company", "status","email"];
  const [loading, setLoading] = useState(true);
  const customerService = new CustomerService();
  const [customers, setCustomers] = useState(null);
  
  useEffect(() => {
    customerService.getCustomersLarge().then((data) => {
       
      setCustomers(getCustomers(data));
      setLoading(false);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const getCustomers = (data) => {
    return [...(data || [])].map((d) => {
      d.date = new Date(d.date);
      return d;
    });
  };
  return (
    <div className="App">
      <DataTableDemo
        globalSearch={true}
        headers={array}
        data={customers}
        loading={loading}
        pagination={true}
        sorting={false}
        refreshButton={false}
        table={1}
      />
    </div>
  );
}

export default Table1;
