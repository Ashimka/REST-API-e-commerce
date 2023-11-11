import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { allCategory } from "../../redux/features/categorySlice";
import { createProduct, allProducts } from "../../redux/features/productSlice";
import NavAdmin from "../../components/NavAdmin/NavAdmin";

import { IoMdAdd } from "react-icons/io";

import "./adminProducts.scss";
import axios from "../../redux/api/axios";

const AdminProducts = () => {
  const [isCreate, setIsCreate] = useState(false);
  const [isProducts, setIsProducts] = useState(true);

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
  }, [dispatch, isCreate, isProducts]);

  // console.log(products);

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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="admin-products-page">
        <NavAdmin />
        <div className="admin-products-page__list">
          AdminProducts
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

            {isCreate && (
              <div className="admin-products-create__form">
                <form
                  className="admin-create-product"
                  encType="multipart/form-data"
                  onSubmit={handleSubmit}
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
                  <button className="admin-create-product__btn">Save</button>
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
