import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../../index.css";

import React, { useState, useEffect } from "react";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { useNavigate } from 'react-router-dom';
import "./DataTableDemo.css";
import { Button } from "primereact/button";

export default function DataTableDemo({
  globalSearch,
  headers,
  data,
  loading,
  pagination,
  sorting,
  refresh,
  refreshButton,
  isRefresh,
  table
}) {
    const navigate = useNavigate();
  const [selectedCustomers, setSelectedCustomers] = useState(null);
  const [filters, setFilters] = useState({});
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    setFilteredData(data)
  }, [isRefresh]);

  useEffect(() => {
    let obj = {};
    if (globalSearch) {
      obj.global = { value: null, matchMode: FilterMatchMode.CONTAINS };
    }
    setFilters(obj);
    setFilteredData(data);
  }, [globalSearch, headers, loading]);
 

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between align-items-center">
        <h5 className="m-0">Customers</h5>
        {globalSearch && (
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Keyword Search"
            />
          </span>
        )}
      </div>
    );
  };

  const header = renderHeader();

  const filterWithColom = (e) => {
   
    
    if (e.target.value) {
    
        let array = []

        function escapeRegExp(string) {
            if (string.length != 0) {
              return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            }
          }
          let escpd = escapeRegExp(e.target.value);
          
          
          var regex = new RegExp(escpd, "i");
         
        for (let i = 0; i < data.length; i++) {
            var element = data[i];
            //  element= element.toString();
            // console.log(regex,"regexregexregexregexregex");
            // console.log(element[e.target.name],"////////////////////////");
            // console.log(e.target.name,"ttttttttttttttttarget name");
            // console.log(element,"elemeeeeeeeeeeeent");
             if (e.target.name && element[e.target.name].match(regex)) {
               
                //  console.log(e.target.name,"naaaaaaaaaaaaaaaaaaaaame");
                //  console.log(e.target.value,"vaaaaaaaaaaaaaaaaaaaaalu");
                // console.log(element[e.target.name].match(regex));
                array.push(element)
                 
             }
             setFilteredData(array)
            
        }
        // console.log(result,"resultresultresult");
       }

       if (e.target.value==='') {
        setFilteredData(data)
       }
  };
 
 
//   useEffect(()=>{
   
//   },[name,key])


  return (
    <div className="datatable-doc-demo">
      <Button onClick={()=>{
        table === 2 ?  navigate("/"):navigate("/table2")
       
      }} style={{ marginBottom: "20px" }} align="right">
        Table - 2
      </Button>
      {refreshButton && (
        <Button
          style={{ marginBottom: "20px", marginLeft: "20px" }}
          align="right"
          onClick={()=>{
            setFilteredData(data)
          }}
        >
          Refresh
        </Button>
      )}
      <div className="card">
        {headers &&
          headers.map((el) => {
            return (
              <>
                <InputText
                  key={el}
                  placeholder={`filter with ${el}`}
                  style={{ marginRight: "20px" }}
                  onChange={filterWithColom}
                  name={el}
                //   value={name === el ? key : ""}
                />
              </>
            );
          })}
        <DataTable
          value={filteredData}
          paginator={pagination}
          className="p-datatable-customers"
          header={header}
          rows={10}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          rowsPerPageOptions={[10, 25, 50]}
          dataKey="id"
          rowHover
          selection={selectedCustomers}
          onSelectionChange={(e) => setSelectedCustomers(e.value)}
          filters={filters}
          filterDisplay="menu"
          loading={loading}
          responsiveLayout="scroll"
          emptyMessage="No customers found."
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        >
          {headers &&
            headers.map((el) => {
              return <Column   key={el} field={el} header={el} sortable={sorting} />;
            })}
        </DataTable>
      </div>
    </div>
  );
}
