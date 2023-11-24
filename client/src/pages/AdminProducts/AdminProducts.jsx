import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FaRegEdit } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";

import {
  allProducts,
  deleteProduct,
  removeFile,
} from "../../redux/features/productSlice";

import NavAdmin from "../../components/NavAdmin/NavAdmin";

import { IoMdAdd } from "react-icons/io";

import "./adminProducts.scss";
import AdminCreateProduct from "../AdminCreateProduct/AdminCreateProduct";
import Modal from "../../components/Modal/Modal";
import { useCallback } from "react";

const AdminProducts = () => {
  const [isCreate, setIsCreate] = useState(false);
  const [isProducts, setIsProducts] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);

  const [removeConfirmProduct, setRemoveConfirmProduct] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [productId, setProductId] = useState("");

  const { products } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isProducts) {
      dispatch(allProducts());
    }

    if (isDeleted) {
      dispatch(allProducts());
      setIsDeleted(false);
    }
  }, [dispatch, isCreate, isProducts, isDeleted]);

  const handleCreate = () => {
    setIsCreate(true);
    setIsProducts(false);
  };

  const handleDelete = useCallback(
    (id) => {
      dispatch(deleteProduct(id));
      setIsDeleted(true);

      const file = products?.products;

      if (file) {
        const img = file
          .find((elem) => elem.id === id)
          ?.image.split("")
          .splice(1)
          .join("");
        dispatch(removeFile(img));
      }
    },
    [dispatch, products?.products]
  );

  useEffect(() => {
    if (removeConfirmProduct) {
      handleDelete(productId);
      setRemoveConfirmProduct(false);
    }
  }, [removeConfirmProduct, handleDelete, productId]);

  const removeProduct = (id) => {
    setModalOpen(true);
    setProductId(id);
  };

  const handleClickRemove = (value) => {
    setModalOpen(false);
    setRemoveConfirmProduct(value);
  };

  return (
    <>
      <div className="admin-products-page">
        <NavAdmin />
        <div className="admin-products-page__list">
          <div className="admin-products-create">
            {!isCreate && (
              <div
                className="admin-products-create__btn"
                onClick={handleCreate}
              >
                <IoMdAdd />
                CREATE
              </div>
            )}

            {isProducts && (
              <>
                <div className="admin-products-create__title">
                  Products list
                </div>
                <ul className="admin-products">
                  {products?.products?.map((item) => (
                    <li key={item.id} className="admin-products__list">
                      <img
                        src={`${process.env.REACT_APP_BASE_URL}/upload${item.image}`}
                        alt={item.name}
                        className="admin-products__img"
                      />
                      <div className="admin-products__title">{item.name}</div>
                      <div className="admin-products__setting">
                        <FaRegEdit
                          className="admin-products-icon-edit"
                          onClick={() =>
                            navigate(`/admins/products/${item.id}`)
                          }
                        />
                        <TiDeleteOutline
                          onClick={() => removeProduct(item.id)}
                          className="admin-products-icon-delete"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
                {modalOpen && (
                  <Modal confirmedModal={handleClickRemove}>
                    <span>Delete product???</span>
                  </Modal>
                )}
              </>
            )}

            {isCreate && (
              <AdminCreateProduct
                setIsCreate={setIsCreate}
                setIsProducts={setIsProducts}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProducts;
