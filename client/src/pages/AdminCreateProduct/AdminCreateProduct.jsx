import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { TiDeleteOutline } from "react-icons/ti";

import { allCategory } from "../../redux/features/categorySlice";
import {
  createProduct,
  uploadFile,
  removeFile,
} from "../../redux/features/productSlice";

import "./adminCreateProduct.scss";
import { useEffect } from "react";

const AdminCreateProduct = ({ setIsCreate, setIsProducts }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isStock, setIsStock] = useState(false);
  const [selectCategory, setSelectCategory] = useState("");
  const [image, setImage] = useState("");
  const [imageUpload, setImageUpload] = useState(false);

  const { name } = useSelector((state) => state.category);

  const fileUpload = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allCategory());

    if (imageUpload) {
      setImage(fileUpload?.imageUrl);
    }
  }, [dispatch, imageUpload, fileUpload?.imageUrl]);

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
    <div className="admin-products-create__form">
      <div className="admin-products-create__title">Create product</div>
      <form className="admin-create-product" encType="multipart/form-data">
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
          <button onClick={handleCancel} className="admin-create-product__btn">
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
  );
};

export default AdminCreateProduct;
