'use client';

import { createCategory, createSubCategory, getCategory, getSubCategory } from '@/services/user';
import { useAuthStore } from '@/store/authStore';
import { FormEvent, useEffect, useState } from 'react';

interface CategoryType {
  id: string;
  name: string;
}

interface SubCategoryType {
  id: string;
  category: string;
  name: string;
}

const Category = () => {
  const { auth } = useAuthStore();

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategoryType[]>([]);

  const [categoryName, setCategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');

  const [categoryLoading, setCategoryLoading] = useState(false);
  const [subCategoryLoading, setSubCategoryLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const [categoryMessage, setCategoryMessage] = useState('');
  const [categoryError, setCategoryError] = useState('');

  const [subCategoryMessage, setSubCategoryMessage] = useState('');
  const [subCategoryError, setSubCategoryError] = useState('');

  // ==========================================
  // GET CATEGORIES
  // ==========================================

  const fetchCategories = async () => {
    if (!auth?.access) return;

    try {
      setFetching(true);

      const res = await getCategory(auth.access);

      if (Array.isArray(res?.data)) {
        setCategories(res.data);
      }
    } catch (error) {
      console.error('Failed to fetch categories', error);
    } finally {
      setFetching(false);
    }
  };

  // ==========================================
  // GET SUBCATEGORIES
  // ==========================================

  const fetchSubCategories = async () => {
    if (!auth?.access) return;

    try {
      const res = await getSubCategory(auth.access);

      if (Array.isArray(res?.data)) {
        setSubCategories(res.data);
      }
    } catch (error) {
      console.error('Failed to fetch subcategories', error);
    }
  };

  // ==========================================
  // INITIAL API CALLS
  // ==========================================

  useEffect(() => {
    if (!auth?.access) return;

    fetchCategories();
    fetchSubCategories();
  }, [auth?.access]);

  // ==========================================
  // CREATE CATEGORY
  // ==========================================

  const handleCreateCategory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!auth?.access) {
      setCategoryError('Authentication required.');
      return;
    }

    if (!categoryName.trim()) {
      setCategoryError('Category name is required.');
      return;
    }

    try {
      setCategoryLoading(true);
      setCategoryError('');
      setCategoryMessage('');

      await createCategory(auth.access, {
        name: categoryName.trim(),
      });

      setCategoryMessage('Category created successfully.');

      setCategoryName('');

      await fetchCategories();
    } catch (error: any) {
      console.error('Failed to create category', error);

      setCategoryError(
        error?.response?.data?.message || error?.message || 'Failed to create category.'
      );
    } finally {
      setCategoryLoading(false);
    }
  };

  // ==========================================
  // CREATE SUBCATEGORY
  // ==========================================

  const handleCreateSubCategory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!auth?.access) {
      setSubCategoryError('Authentication required.');
      return;
    }

    if (!selectedCategory) {
      setSubCategoryError('Please select a category.');
      return;
    }

    if (!subCategoryName.trim()) {
      setSubCategoryError('Subcategory name is required.');
      return;
    }

    try {
      setSubCategoryLoading(true);
      setSubCategoryError('');
      setSubCategoryMessage('');

      await createSubCategory(auth.access, {
        category: selectedCategory,
        name: subCategoryName.trim(),
      });

      setSubCategoryMessage('Subcategory created successfully.');

      setSubCategoryName('');

      // Refresh subcategories
      await fetchSubCategories();
    } catch (error: any) {
      console.error('Failed to create subcategory', error);

      setSubCategoryError(
        error?.response?.data?.message || error?.message || 'Failed to create subcategory.'
      );
    } finally {
      setSubCategoryLoading(false);
    }
  };

  // ==========================================
  // FILTER SUBCATEGORIES
  // ==========================================

  const selectedSubCategories = subCategories.filter(
    (subCategory) => subCategory.category === selectedCategory
  );

  return (
    <div className="max-w-xl space-y-6 p-6">
      {/* ======================================
          CREATE CATEGORY
      ======================================= */}

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-1 text-xl font-semibold">Create Diagnostic Category</h2>

        <p className="mb-6 text-sm text-gray-500">Add a new diagnostic category.</p>

        <form onSubmit={handleCreateCategory} className="space-y-4">
          <div>
            <label htmlFor="categoryName" className="mb-2 block text-sm font-medium">
              Category Name
            </label>

            <input
              id="categoryName"
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="e.g. Blood"
              disabled={categoryLoading}
              className="w-full rounded-md border px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

          {categoryError && <p className="text-sm text-red-500">{categoryError}</p>}

          {categoryMessage && <p className="text-sm text-green-600">{categoryMessage}</p>}

          <button
            type="submit"
            disabled={categoryLoading}
            className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {categoryLoading ? 'Creating...' : 'Create Category'}
          </button>
        </form>
      </div>

      {/* ======================================
          CREATE SUBCATEGORY
      ======================================= */}

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-1 text-xl font-semibold">Create Diagnostic Subcategory</h2>

        <p className="mb-6 text-sm text-gray-500">Select a category and add a subcategory.</p>

        <form onSubmit={handleCreateSubCategory} className="space-y-4">
          {/* Category */}
          <div>
            <label htmlFor="category" className="mb-2 block text-sm font-medium">
              Category
            </label>

            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSubCategoryMessage('');
                setSubCategoryError('');
              }}
              disabled={subCategoryLoading}
              className="w-full rounded-md border bg-white px-3 py-2 outline-none focus:border-blue-500"
            >
              <option value="">Select Category</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory Name */}
          <div>
            <label htmlFor="subCategoryName" className="mb-2 block text-sm font-medium">
              Subcategory Name
            </label>

            <input
              id="subCategoryName"
              type="text"
              value={subCategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
              placeholder="e.g. CBC"
              disabled={subCategoryLoading}
              className="w-full rounded-md border px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

          {subCategoryError && <p className="text-sm text-red-500">{subCategoryError}</p>}

          {subCategoryMessage && <p className="text-sm text-green-600">{subCategoryMessage}</p>}

          <button
            type="submit"
            disabled={subCategoryLoading}
            className="rounded-md bg-green-600 px-5 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
          >
            {subCategoryLoading ? 'Creating...' : 'Create Subcategory'}
          </button>
        </form>
      </div>

      {/* ======================================
          SUBCATEGORY LIST
      ======================================= */}

      {selectedCategory && (
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Subcategories</h2>

          {selectedSubCategories.length === 0 ? (
            <p className="text-sm text-gray-500">No subcategories found for this category.</p>
          ) : (
            <div className="space-y-2">
              {selectedSubCategories.map((subCategory) => (
                <div key={subCategory.id} className="rounded-md border p-3">
                  {subCategory.name}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ======================================
          CATEGORY LIST
      ======================================= */}

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">Categories</h2>

        {fetching ? (
          <p className="text-sm text-gray-500">Loading categories...</p>
        ) : categories.length === 0 ? (
          <p className="text-sm text-gray-500">No categories found.</p>
        ) : (
          <div className="space-y-2">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between rounded-md border p-3"
              >
                <span>{category.name}</span>

                <span className="text-xs text-gray-400">{category.id}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
