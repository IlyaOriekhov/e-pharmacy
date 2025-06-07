import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { getSearchProducts } from "../../../redux/pharmacy/operations";
import { setCurrentPage } from "../../../redux/pharmacy/slice";
import styles from "./Filter.module.css";
import sprite from "../../../assets/icons/sprite.svg";

const customStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderRadius: "60px",
    border: state.isFocused & "1px solid #59B17A",
    height: "46px",
    background: "#fff",
    fontSize: "12px",
    boxShadow: state.isFocused ? "0 0 0 1px #59B17A" : "none",
    "&:hover": {
      borderColor: "#59B17A",
    },
  }),
  valueContainer: (baseStyles) => ({
    ...baseStyles,
    paddingLeft: "18px",
  }),
  placeholder: (baseStyles) => ({
    ...baseStyles,
    color: "rgba(29, 30, 33, 0.40)",
  }),
  singleValue: (baseStyles) => ({
    ...baseStyles,
    color: "#1D1E21",
    fontWeight: "400",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  indicatorsContainer: (baseStyles) => ({
    ...baseStyles,
    paddingRight: "18px",
  }),
  dropdownIndicator: (baseStyles, state) => ({
    ...baseStyles,
    padding: "0",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 0.3s ease",
    "&:hover": {
      color: "#3f945f",
    },
  }),
  menu: (baseStyles) => ({
    ...baseStyles,
    borderRadius: "20px",
    border: "1px solid rgba(29, 30, 33, 0.10)",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
    overflow: "hidden",
  }),
  menuList: (baseStyles) => ({
    ...baseStyles,
    padding: "0",
    borderRadius: "20px",
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: state.isSelected
      ? "#59B17A"
      : state.isFocused
      ? "rgba(89, 177, 122, 0.1)"
      : "#fff",
    color: state.isSelected ? "#fff" : "#1D1E21",
    fontSize: "12px",
    fontWeight: state.isSelected ? "500" : "400",
    padding: "12px 18px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: state.isSelected ? "#3f945f" : "rgba(89, 177, 122, 0.1)",
    },
  }),
};

const options = [
  { value: "", label: "All" },
  { value: "Dental Care", label: "Dental Care" },
  { value: "Hand", label: "Hand" },
  { value: "Head", label: "Head" },
  { value: "Heart", label: "Heart" },
  { value: "Leg", label: "Leg" },
  { value: "Medicine", label: "Medicine" },
  { value: "Skin Care", label: "Skin Care" },
];

const Filter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const categoryFromUrl = searchParams.get("category") || "";
  const nameFromUrl =
    searchParams.get("name") || searchParams.get("search") || "";
  const pageFromUrl = parseInt(searchParams.get("page")) || 1;

  const [selectedCategory, setSelectedCategory] = useState(() => {
    return options.find((opt) => opt.value === categoryFromUrl) || options[0];
  });
  const [searchedName, setSearchedName] = useState(nameFromUrl);

  const isDesktop = useMediaQuery({ query: "(min-width: 1440px)" });

  const updateURL = (newCategory, newName, newPage = 1) => {
    const params = new URLSearchParams();

    if (newCategory && newCategory !== "") {
      params.set("category", newCategory);
    }
    if (newName && newName !== "") {
      params.set("name", newName);
    }
    params.set("page", newPage.toString());

    const queryString = params.toString();
    navigate(`?${queryString}`, { replace: false });
  };

  useEffect(() => {
    dispatch(setCurrentPage(pageFromUrl));

    dispatch(
      getSearchProducts({
        category: categoryFromUrl,
        name: nameFromUrl,
        page: pageFromUrl,
        limit: isDesktop ? 12 : 9,
      })
    );
  }, [dispatch, categoryFromUrl, nameFromUrl, pageFromUrl, isDesktop]);

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
    updateURL(selectedOption.value, searchedName, 1);
    dispatch(setCurrentPage(1));
  };

  const handleSearchInputChange = (e) => {
    setSearchedName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateURL(selectedCategory.value, searchedName, 1);
    dispatch(setCurrentPage(1));
  };

  const handleReset = () => {
    setSelectedCategory(options[0]);
    setSearchedName("");
    navigate("/medicine?page=1", { replace: false });
    dispatch(setCurrentPage(1));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Select
        options={options}
        placeholder="Product category"
        styles={customStyles}
        onChange={handleCategoryChange}
        value={selectedCategory}
        className={styles.customSelect}
      />
      <label className={styles.label}>
        <input
          type="text"
          placeholder="Search medicine"
          onChange={handleSearchInputChange}
          value={searchedName}
          className="input"
        />
        <svg className={styles.searchIcon}>
          <use href={`${sprite}#search`} />
        </svg>
      </label>
      <div className={styles.buttonGroup}>
        <button type="submit" className={`btn-primary ${styles.submitBtn}`}>
          <svg className={styles.filterIcon}>
            <use href={`${sprite}#filter`} />
          </svg>
          Filter
        </button>
        <button
          type="button"
          onClick={handleReset}
          className={`btn-secondary ${styles.resetBtn}`}
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default Filter;
