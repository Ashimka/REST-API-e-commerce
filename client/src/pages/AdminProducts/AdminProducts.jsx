import React, { useEffect, useState } from "react";

import { allCategory } from "../../redux/features/categorySlice";
import NavAdmin from "../../components/NavAdmin/NavAdmin";

import { IoMdAdd } from "react-icons/io";

import "./adminProducts.scss";
import { useSelector, useDispatch } from "react-redux";

const AdminProducts = () => {
  const [isCreate, setIsCreate] = useState(false);

  const { name } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isCreate) {
      dispatch(allCategory());
    }
  }, [dispatch, isCreate]);

  console.log(name);
  console.log(isCreate);
  return (
    <>
      <div className="admin-products-page">
        <NavAdmin />
        <div className="admin-products-page__list">
          AdminProducts
          <div className="admin-products-create">
            <div
              className="admin-products-create__btn"
              onClick={() => setIsCreate(true)}
            >
              <IoMdAdd />
              CREATE
            </div>

            {isCreate && (
              <div className="admin-products-create__form">
                <form className="admin-create-product">
                  <input
                    className="admin-create-product__input"
                    type="text"
                    placeholder="Название"
                    // value={""}
                    // onChange={null}
                  />
                  <textarea
                    className="admin-create-product__input"
                    type="text"
                    placeholder="Описание продукта"
                    // value={""}
                    // onChange={null}
                  />
                  <input
                    className="admin-create-product__input"
                    type="number"
                    placeholder="Цена"
                    // value={""}
                    // onChange={null}
                  />
                  <input
                    className="admin-create-product__input"
                    type="text"
                    placeholder="В наличии"
                    // value={""}
                    // onChange={null}
                  />
                  <select
                    className="admin-create-product__input"
                    name="category"
                    id=""
                  >
                    <option value="Category">Категория</option>
                    {name &&
                      name.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                  </select>
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

// name,
// description,
// image,
// price,
// in_stock,
// category,
