import React, { Fragment, useEffect } from "react";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {getAdminProduct} from '../slices/products';
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";
// import { Button } from "@material-ui/core";
import MetaData from "../components/layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { deleteProduct } from "../slices/products";
// import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductList = () => {
  const dispatch = useDispatch();

//   const alert = useAlert();

  const { error, products } = useSelector((state) => state.products);
  console.log(products);

  // const { error: deleteError, isDeleted } = useSelector(
  //   (state) => state.status
  // );

  const deleteProductHandler = (id) => {
    console.log(id)
    dispatch(deleteProduct(id));
    window.location.reload();

  };

  useEffect(() => {

    dispatch(getAdminProduct());
  }, [dispatch,]);


  const rows = [];

  products.products &&
    products.products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });
    console.log('row',rows);

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.stock}</TableCell>
                    <TableCell>{row.price}</TableCell>
                    <TableCell>
                      <Link to={`/admin/product/${row.id}`}>
                        <EditIcon />
                      </Link>
                      <Button onClick={() => deleteProductHandler(row.id)}>
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;