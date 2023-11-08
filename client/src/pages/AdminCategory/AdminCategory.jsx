import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FaRegEdit } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";

import NavAdmin from "../../components/NavAdmin/NavAdmin";
import {
  createCategory,
  updateCategory,
  allCategory,
  deleteCategory,
} from "../../redux/features/categorySlice";

import "./adminCategory.scss";
const AdminCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [editCategoryName, setEditCategoryName] = useState("");
  const [isDeleted, setIsDeteled] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  const { name } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!categoryName) {
      dispatch(allCategory());
    }
  }, [dispatch, categoryName]);

  useEffect(() => {
    if (isEdited) {
      setCategoryName(editCategoryName.name);
    }
  }, [isEdited, editCategoryName]);

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      if (!categoryName) {
        return;
      }
      const data = new FormData();

      data.append("name", categoryName);

      dispatch(createCategory(data));
      setCategoryName("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (cat) => {
    setIsEdited(true);
    setEditCategoryName(cat);
  };

  const handleUpdateCategory = (event) => {
    event.preventDefault();

    const data = {
      id: editCategoryName.id,
      name: categoryName,
    };

    dispatch(updateCategory(data));
    setCategoryName("");
    setIsEdited(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
    setIsDeteled(true);
  };

  useEffect(() => {
    if (isDeleted) {
      dispatch(allCategory());
      setIsDeteled(false);
    }
  }, [isDeleted, dispatch]);

  const handleNameInput = (event) => setCategoryName(event.target.value);

  return (
    <>
      <div className="admin-page-category">
        <NavAdmin />
        <div className="admin-page-category__list">
          <form className="admin-category">
            <label htmlFor="cat">
              Category:
              <input
                className="admin-category__input"
                type="text"
                id="cat"
                placeholder="add category"
                value={categoryName}
                onChange={handleNameInput}
              />
            </label>
            {isEdited ? (
              <button
                className="admin-category__btn"
                type="submit"
                onClick={handleUpdateCategory}
              >
                Ok
              </button>
            ) : (
              <button
                className="admin-category__btn"
                type="submit"
                onClick={handleSubmit}
              >
                Add
              </button>
            )}
          </form>
          <ul className="admin-category__list">
            {name?.map((cat) => (
              <li className="admin-category__item" key={cat.id}>
                {cat.name}
                <FaRegEdit
                  className="category-icon-edit"
                  onClick={() => handleEdit(cat)}
                />

                <TiDeleteOutline
                  className="category-icon-delete"
                  onClick={() => handleDelete(cat.id)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminCategory;
