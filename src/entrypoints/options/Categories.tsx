import React, { useEffect, useState } from "react";
import {
  getCategories,
  addCategory,
  removeCategory,
  type ICategory,
  type ISchedule,
  DaysOfTheWeek,
} from "../background";
import { v4 as uuid } from "uuid";

const CategoryManager: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [newCategorySchedule, setNewCategorySchedule] = useState<ISchedule>({
    days: [],
    startTime: "",
    endTime: "",
  });
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [newDomain, setNewDomain] = useState<string>("");

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    };

    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      alert("Category name is required.");
      return;
    }

    const newCategory: ICategory = {
      name: newCategoryName,
      schedule: newCategorySchedule,
      id: uuid(),
    };

    await addCategory(newCategory);
    const updatedCategories = await getCategories();
    setCategories(updatedCategories);
    setNewCategoryName("");
    setNewCategorySchedule({ days: [], startTime: "", endTime: "" });
  };

  const handleRemoveCategory = async (categoryName: string) => {
    await removeCategory(categoryName);
    const updatedCategories = await getCategories();
    setCategories(updatedCategories);
  };

  const handleAddDomainToCategory = async () => {
    if (!selectedCategory) {
      alert("Please select a category.");
      return;
    }
    if (!newDomain.trim()) {
      alert("Domain name is required.");
      return;
    }

    // await addSiteToCategory(newDomain, selectedCategory);
    const updatedCategories = await getCategories();
    setCategories(updatedCategories);
    setNewDomain("");
  };

  //   const handleRemoveDomainFromCategory = async (
  //     domain: string,
  //     categoryName: string
  //   ) => {
  //     // await removeSiteFromCategory(domain, categoryName);
  //     const updatedCategories = await getCategories();
  //     setCategories(updatedCategories);
  //   };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Category Manager</h1>

      {/* Add Category */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Add New Category</h2>
        <input
          type="text"
          placeholder="Category Name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            width: "300px",
            marginRight: "10px",
          }}
        />
        <input
          type="time"
          value={newCategorySchedule.startTime}
          onChange={(e) =>
            setNewCategorySchedule({
              ...newCategorySchedule,
              startTime: e.target.value,
            })
          }
          style={{
            padding: "10px",
            fontSize: "16px",
            marginRight: "10px",
          }}
        />
        <input
          type="time"
          value={newCategorySchedule.endTime}
          onChange={(e) =>
            setNewCategorySchedule({
              ...newCategorySchedule,
              endTime: e.target.value,
            })
          }
          style={{
            padding: "10px",
            fontSize: "16px",
            marginRight: "10px",
          }}
        />
        <select
          multiple
          value={newCategorySchedule.days}
          onChange={(e) =>
            setNewCategorySchedule({
              ...newCategorySchedule,
              days: Array.from(
                e.target.selectedOptions,
                (opt) => opt.value as typeof DaysOfTheWeek.Monday
              ),
            })
          }
          style={{
            padding: "10px",
            fontSize: "16px",
            marginRight: "10px",
          }}
        >
          {Object.keys(DaysOfTheWeek).map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddCategory}
          style={{
            padding: "10px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add Category
        </button>
      </div>

      {/* List Categories */}
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.name} style={{ marginBottom: "20px" }}>
            <strong>{category.name}</strong>
            {category.schedule && (
              <p>
                Active on: {category.schedule.days.join(", ")} from{" "}
                {category.schedule.startTime} to {category.schedule.endTime}
              </p>
            )}
            <ul>
              {/* {category.domains.map((domain) => (
                <li key={domain}>
                  {domain}
                  <button
                    onClick={() =>
                      handleRemoveDomainFromCategory(domain, category.name)
                    }
                    style={{
                      marginLeft: "10px",
                      padding: "5px",
                      backgroundColor: "#dc3545",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </li>
              ))} */}
            </ul>
            <button
              onClick={() => handleRemoveCategory(category.id)}
              style={{
                marginTop: "10px",
                padding: "5px 10px",
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Delete Category
            </button>
          </li>
        ))}
      </ul>

      {/* Add Domain to Category */}
      <div style={{ marginTop: "20px" }}>
        <h2>Add Domain to Category</h2>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            marginRight: "10px",
          }}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Domain (e.g., google.com)"
          value={newDomain}
          onChange={(e) => setNewDomain(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            width: "300px",
            marginRight: "10px",
          }}
        />
        <button
          onClick={handleAddDomainToCategory}
          style={{
            padding: "10px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add Domain
        </button>
      </div>
    </div>
  );
};

export default CategoryManager;
