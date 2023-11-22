import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { TiDeleteOutline } from "react-icons/ti";

import NavAdmin from "../../components/NavAdmin/NavAdmin";
import Modal from "../../components/Modal/Modal";
import axios from "../../redux/api/axios";

import { oneProduct, updateProduct } from "../../redux/features/productSlice";
import { allCategory } from "../../redux/features/categorySlice";

import "./adminEditProduct.scss";

const AdminEditProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isStock, setIsStock] = useState(false);
  const [selectCategory, setSelectCategory] = useState("");
  const [oldImage, setOldImage] = useState("");
  const [image, setImage] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const { products, isLoading } = useSelector((state) => state.product);
  const { name } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(oneProduct(id));
    dispatch(allCategory());
  }, [id, dispatch]);

  useEffect(() => {
    if (!isLoading) {
      setTitle(products?.name || "");
      setDescription(products?.description || "");
      setPrice(products?.price || "");
      setIsStock(products?.in_stock || "");
      setOldImage(products?.image || "");
      setSelectCategory(products?.category?.name || "");
    }
  }, [
    dispatch,
    isLoading,
    products?.name,
    products?.description,
    products?.price,
    products?.in_stock,
    products?.image,
    products?.category?.name,
  ]);

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

  const handleDeleteImage = async (file) => {
    try {
      const name = file.split("").splice(1).join("");

      await axios.delete(`/file/${name}`);
      setOldImage(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let newImage;

      if (removeImage) {
        await handleDeleteImage(oldImage);
        newImage = null;
        setOldImage(null);
      }

      if (oldImage) {
        newImage = oldImage;
      }

      const updateData = {
        id,
        name: title,
        description,
        price: Number(price),
        in_stock: Boolean(isStock),
        category: selectCategory,
        image: newImage ? newImage : image,
      };

      dispatch(updateProduct(updateData));

      navigate("/admins/products");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();

    navigate("/admins/products");
  };

  const handleClickRemove = (value) => {
    setModalOpen(false);
    setRemoveImage(value);
  };

  return (
    <>
      <div className="admin-edit-product-page">
        <NavAdmin />
        <div className="admin-edit-product-page__form">
          edit
          <form className="admin-edit-product" encType="multipart/form-data">
            <input
              className="admin-edit-product__input"
              type="text"
              placeholder="Название"
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <textarea
              className="admin-edit-product__input"
              type="text"
              placeholder="Описание продукта"
              required
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <input
              className="admin-edit-product__input"
              type="number"
              placeholder="Цена"
              required
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
            <label htmlFor="input-instock">
              В наличии
              <input
                className="admin-edit-product__input"
                type="checkbox"
                id="input-instock"
                required
                checked={isStock}
                value={isStock}
                onChange={(event) => setIsStock(event.target.value)}
              />
            </label>
            <select
              className="admin-edit-product__input"
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
              className="admin-edit-product__input"
              name="image"
              type="file"
              accept=".jpeg, .jpg, .png, .webp"
              onChange={handleFile}
            />
            <div className="admin-edit-product__buttons">
              <button
                onClick={handleCancel}
                className="admin-edit-product__btn"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                type="submit"
                className="admin-edit-product__btn"
              >
                Save
              </button>
            </div>
          </form>
          <div className="admin-edit-product-page__image">
            {oldImage && !removeImage && (
              <>
                <img
                  src={`${process.env.REACT_APP_BASE_URL}/upload${oldImage}`}
                  alt={products?.name}
                  className="admin-edit-product-img"
                />
                <div className="admin-edit-product-icon">
                  <TiDeleteOutline onClick={() => setModalOpen(true)} />
                </div>
              </>
            )}
          </div>
          {modalOpen && (
            <Modal confirmedModal={handleClickRemove}>
              <span>Delete image???</span>
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminEditProduct;
