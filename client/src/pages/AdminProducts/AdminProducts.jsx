import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { FaRegEdit } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";

import { allCategory } from "../../redux/features/categorySlice";
import {
  createProduct,
  allProducts,
  deleteProduct,
} from "../../redux/features/productSlice";
import NavAdmin from "../../components/NavAdmin/NavAdmin";

import { IoMdAdd } from "react-icons/io";

import "./adminProducts.scss";
import axios from "../../redux/api/axios";

const AdminProducts = () => {
  const [isCreate, setIsCreate] = useState(false);
  const [isProducts, setIsProducts] = useState(true);
  const [isDeleted, setIsDeteled] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isStock, setIsStock] = useState(false);
  const [selectCategory, setSelectCategory] = useState("");
  const [image, setImage] = useState("");

  const { name } = useSelector((state) => state.category);
  const products = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isCreate) {
      dispatch(allCategory());
    }

    if (isProducts) {
      dispatch(allProducts());
    }

    if (isDeleted) {
      dispatch(allProducts());
      setIsDeteled(false);
    }
  }, [dispatch, isCreate, isProducts, isDeleted]);

  const handleCreate = () => {
    setIsCreate(true);
    setIsProducts(false);
  };

  const handleFile = async (event) => {
    try {
      const fileDada = new FormData();
      fileDada.append("image", event.target.files[0]);

      const { data } = await axios.post("/upload", fileDada);

      setImage(data.url);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();

    setIsCreate(false);
    setIsProducts(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    setIsDeteled(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      const data = new FormData();

      data.append("name", title);
      data.append("description", description);
      data.append("price", Number(price));
      data.append("in_stock", Boolean(isStock));
      data.append("category", selectCategory);
      data.append("image", image);

      dispatch(createProduct(data));

      setTitle("");
      setDescription("");
      setPrice("");
      setIsStock("");
      setSelectCategory("");

      setIsCreate(false);
      setIsProducts(true);
    } catch (error) {
      console.log(error);
    }
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
                  {products?.name?.products.map((item) => (
                    <li key={item.id} className="admin-products__list">
                      <img
                        src={`${process.env.REACT_APP_BASE_URL}/upload${item.image}`}
                        alt={item.name}
                        className="admin-products__img"
                      />
                      <div className="admin-products__title">{item.name}</div>
                      <div className="admin-products__setting">
                        <FaRegEdit className="admin-products-icon-edit" />
                        <TiDeleteOutline
                          onClick={() => handleDelete(item.id)}
                          className="admin-products-icon-delete"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {isCreate && (
              <div className="admin-products-create__form">
                <div className="admin-products-create__title">
                  Create product
                </div>
                <form
                  className="admin-create-product"
                  encType="multipart/form-data"
                >
                  <input
                    className="admin-create-product__input"
                    type="text"
                    placeholder="Название"
                    required
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                  <textarea
                    className="admin-create-product__input"
                    type="text"
                    placeholder="Описание продукта"
                    required
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                  <input
                    className="admin-create-product__input"
                    type="number"
                    placeholder="Цена"
                    required
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                  />
                  <label htmlFor="input-instock">
                    В наличии
                    <input
                      className="admin-create-product__input"
                      type="checkbox"
                      id="input-instock"
                      required
                      value={isStock}
                      onChange={(event) => setIsStock(event.target.value)}
                    />
                  </label>
                  <select
                    className="admin-create-product__input"
                    required
                    id="cat"
                    value={selectCategory}
                    onChange={(event) => setSelectCategory(event.target.value)}
                  >
                    <option disabled={true} value="">
                      Категория
                    </option>
                    {name &&
                      name.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                  </select>
                  <input
                    className="admin-create-product__input"
                    required
                    name="image"
                    type="file"
                    accept=".jpeg, .jpg, .png, .webp"
                    onChange={handleFile}
                  />
                  <div className="admin-create-product__buttons">
                    <button
                      onClick={handleCancel}
                      className="admin-create-product__btn"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      type="submit"
                      className="admin-create-product__btn"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProducts;
