import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { getSearchProducts } from "../../../redux/pharmacy/operations";
import { selectCurrentPage } from "../../../redux/pharmacy/selectors";
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

const Filter = ({ totalPages }) => {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const [selectedCategory, setSelectedCategory] = useState(options[0]);
  const [searchedName, setSearchedName] = useState("");

  const isDesktop = useMediaQuery({ query: "(min-width: 1440px)" });

  useEffect(() => {
    dispatch(
      getSearchProducts({
        category: selectedCategory.value,
        name: searchedName,
        page: currentPage,
        limit: isDesktop ? 12 : 9,
      })
    );
  }, [
    dispatch,
    selectedCategory,
    searchedName,
    currentPage,
    isDesktop,
    totalPages,
  ]);

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
    dispatch(
      getSearchProducts({
        category: selectedOption.value,
        name: searchedName,
        page: 1,
        limit: isDesktop ? 12 : 9,
      })
    );
  };

  const handleSearchInputChange = (e) => {
    setSearchedName(e.target.value);
    dispatch(
      getSearchProducts({
        category: selectedCategory.value,
        name: e.target.value,
        page: 1,
        limit: isDesktop ? 12 : 9,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      getSearchProducts({
        category: selectedCategory.value,
        name: searchedName,
        page: 1,
        limit: isDesktop ? 12 : 9,
      })
    );
  };

  const handleReset = () => {
    setSelectedCategory(options[0]);
    setSearchedName("");
    dispatch(
      getSearchProducts({
        category: "",
        name: "",
        page: 1,
        limit: isDesktop ? 12 : 9,
      })
    );
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
