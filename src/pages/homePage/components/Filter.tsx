import { useState, useEffect } from "react";
import { getCategories } from "../../../api/category";
import { Category } from "../../../models/category";

import "./Filter.css";

interface FilterProps {
  setSelectedCategory: (category: Category | null) => void;
}

export const Filter = ({ setSelectedCategory }: FilterProps) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getCategories();
      console.log(categoriesData);
      if (categoriesData != null && categoriesData.length > 0) {
        setCategories(categoriesData);
        console.log(categories);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="Filter">
      {categories.map((category) => (
        <button
          className="button"
          onClick={() => setSelectedCategory(category)}
          key={category.id}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};
