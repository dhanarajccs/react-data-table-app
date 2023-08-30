import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const Product = () => {
  const columns = [
    {
      name: "S.No",
      selector: (row) => row.id,
    },
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Category",
      selector: (row) => row.category,
    },
    {
      name: "Price",
      selector: (row) => row.price,
    },
    {
      name: "Image",
      selector: (row) => <img src={row.image} height={70} width={80} />,
    },
    {
      name: "Action",
      cell: (row) => <button 
        className="btn btn-danger"
        onClick={() => handleDelete(row.id)}
      >
        Delete
      </button>
    }    
  ];

  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState([]);

  const getProduct = async () => {
    try {
      const req = await fetch("https://fakestoreapi.com/products");
      const res = await req.json();
      setData(res);
      setFilter(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    const result = data.filter((item) => {
      return item.title.toLowerCase().match(search.toLocaleLowerCase());
    });
    setFilter(result);
  }, [search]);
  
  const handleDelete = (val) => { 
    const newData = data.filter((item) => item.id!==val);
    setFilter(newData);
  };

  const tableHeaderStyle = {
    headCells: {
      style: {
        fontWeight: 'bold',
        fontSize: '18px',
        color: 'blue',
        backgroundColor: '#ccc',
      }
    }
  }

  return ( 
    <div>
      <h4>Product List</h4>
      <DataTable 
        customStyles={tableHeaderStyle}
        columns={columns}
        data={filter}
        pagination
        selectableRows
        fixedHeader
        selectableRowsHighlight
        highlightOnHover
        actions={
          <button className="btn btn-success">Export Pdf</button>
        }      
        subHeader
         subHeaderComponent= {
          <input 
            type="text" 
            className="rounded-3"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}            
          />
         }
        subHeaderAlign="center"
      />
    </div>
  );
};

export default Product;
