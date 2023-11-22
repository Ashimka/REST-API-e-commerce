import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FaRegEdit } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";

import { allCategory } from "../../redux/features/categorySlice";
import {
  createProduct,
  allProducts,
  deleteProduct,
  uploadFile,
  removeFile,
} from "../../redux/features/productSlice";

import NavAdmin from "../../components/NavAdmin/NavAdmin";

import { IoMdAdd } from "react-icons/io";

import "./adminProducts.scss";

const AdminProducts = () => {
  const [isCreate, setIsCreate] = useState(false);
  const [isProducts, setIsProducts] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isStock, setIsStock] = useState(false);
  const [selectCategory, setSelectCategory] = useState("");
  const [image, setImage] = useState("");
  const [imageUpload, setImageUpload] = useState(false);

  const { name } = useSelector((state) => state.category);
  const { products } = useSelector((state) => state.product);
  const fileUpload = useSelector((state) => state.product);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isCreate) {
      dispatch(allCategory());
    }

    if (isProducts) {
      dispatch(allProducts());
    }

    if (isDeleted) {
      dispatch(allProducts());
      setIsDeleted(false);
    }

    if (imageUpload) {
      setImage(fileUpload?.imageUrl);
    }
  }, [
    dispatch,
    isCreate,
    isProducts,
    isDeleted,
    imageUpload,
    fileUpload?.imageUrl,
  ]);

  const handleCreate = () => {
    setIsCreate(true);
    setIsProducts(false);
  };

  const handleFile = (event) => {
    try {
      const fileDada = new FormData();
      fileDada.append("image", event.target.files[0]);

      dispatch(uploadFile(fileDada));
      setImageUpload(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();

    setIsCreate(false);
    setIsProducts(true);

    if (image) {
      hendleRemoveImage(image);
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    setIsDeleted(true);

    const file = products?.products;

    const img = file
      .find((elem) => elem.id === id)
      .image.split("")
      .splice(1)
      .join("");

    hendleRemoveImage(img);
  };

  const hendleRemoveImage = (img) => {
    dispatch(removeFile(img));

    setImage(null);
    setImageUpload(false);
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
      setImage(null);

      setIsCreate(false);
      setIsProducts(true);
      setImageUpload(false);
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
                {image && (
                  <>
                    <div className="admin-products-create__out-image">
                      <img
                        src={`${process.env.REACT_APP_BASE_URL}/upload${image}`}
                        alt={title}
                        className="admin-products-image"
                      />
                      <TiDeleteOutline
                        onClick={() => hendleRemoveImage(image)}
                        className="icon-delete"
                      />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProducts;
