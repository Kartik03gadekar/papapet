"use client";
import React, { useEffect, useState, Fragment } from "react";
import { Dialog, Transition, Menu } from "@headlessui/react";
import { FunnelIcon, XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../ProductCard";
import { getFood } from "@/store/Action/others";

// Helper for unique values
const getUnique = (arr, key) => {
  return Array.from(new Set(arr.map((item) => item[key]))).filter(Boolean);
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AccessoiresProduct = () => {
  const { load, food, imgLink } = useSelector((state) => state.others);
  const dispatch = useDispatch();

  // Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // For price slider
  const prices = food?.map((item) =>
    item.discountprice && item.discountprice < item.price
      ? item.discountprice
      : item.price
  ) || [];
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 10000;

  // Get unique categories and brands
  const categories = getUnique(food || [], "categories");
  const brands = getUnique(food || [], "brand");

  useEffect(() => {
    dispatch(getFood());
  }, [dispatch]);

  // Reset price slider when food changes
  useEffect(() => {
    setSelectedPrice(maxPrice);
  }, [maxPrice]);

  // Filtering logic
  const filteredProducts = (food || []).filter((item) => {
    // Search
    const matchesSearch =
      !searchTerm ||
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand?.toLowerCase().includes(searchTerm.toLowerCase());

    // Category
    const matchesCategory =
      selectedCategory === "All" ||
      (item.categories && item.categories === selectedCategory);

    // Brand
    const matchesBrand =
      selectedBrand === "All" ||
      (item.brand && item.brand === selectedBrand);

    // Price
    const price =
      item.discountprice && item.discountprice < item.price
        ? item.discountprice
        : item.price;
    const matchesPrice = price <= selectedPrice;

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
  });

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedBrand("All");
    setSelectedPrice(maxPrice);
  };

  // Handlers for mobile sidebar
  const handleMobileCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setMobileFiltersOpen(false);
  };

  // Main product grid
  const productList = (
    <div className="w-full grid grid-cols-4 px-10 gap-8 max-md:grid-cols-2 max-md:w-full max-md:rounded-xl max-md:gap-4 max-md:px-4">
      {filteredProducts.length === 0 ? (
        <div className="col-span-4 text-center text-gray-500 py-10">
          No products found.
        </div>
      ) : (
        filteredProducts.map((i, index) => (
          <ProductCard key={index} i={i} imgLink={imgLink} />
        ))
      )}
    </div>
  );

  return (
    <div className="w-full min-h-screen">
      <main className="mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <h1 className="text-center pt-10 md:pt-20 text-xl md:text-2xl lg:text-3xl font-bold capitalize">
          Explore all our Accessories
        </h1>
        {/* Header and controls */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-gray-200 pt-20 pb-4 md:pt-24 md:pb-6">
          <h1
            className="text-2xl md:text-3xl lg:text-4xl head font-bold tracking-tight text-gray-900"
            style={{
              lineHeight: "1.1",
              letterSpacing: "-0.01em",
              wordBreak: "break-word",
            }}
          >
            Accessories
          </h1>
          <div className="flex flex-col gap-2 w-full sm:w-auto sm:flex-row sm:items-center sm:justify-end">
            {/* Search Bar */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center border border-gray-300 rounded-md px-2 py-1 bg-white w-full sm:w-auto"
              style={{ minWidth: 0, maxWidth: 320 }}
            >
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="outline-none border-none bg-transparent text-sm flex-1 min-w-0"
                aria-label="Search products"
                style={{
                  padding: "0.25rem 0",
                  fontSize: "1rem",
                  lineHeight: "1.5",
                }}
              />
              <button
                type="submit"
                className="ml-2 text-gray-500 hover:text-gray-700"
                aria-label="Search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                  />
                </svg>
              </button>
            </form>
            {/* Sort Dropdown (optional, can be implemented if needed) */}
            {/* Mobile filter button */}
            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="flex items-center justify-center -m-2 ml-0 sm:ml-4 p-2 text-gray-400 hover:text-gray-500 lg:hidden transition-colors"
                aria-label="Open filters"
              >
                <FunnelIcon className="size-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile filter dialog */}
        <Transition show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4 pt-20 md:pt-40">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-4 px-4">
                    <ul className="space-y-2 text-base font-medium">
                      <li key="all">
                        <button
                          type="button"
                          onClick={() => handleMobileCategoryClick("All")}
                          className={classNames(
                            "text-left w-full px-2 py-2 rounded transition-colors",
                            selectedCategory === "All"
                              ? "text-[#c9a74d] bg-gray-100 font-semibold"
                              : "text-gray-700 hover:bg-gray-50"
                          )}
                          style={{
                            fontSize: "1rem",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          All Categories
                        </button>
                      </li>
                      {categories.map((cat) => (
                        <li key={cat}>
                          <button
                            type="button"
                            onClick={() => handleMobileCategoryClick(cat)}
                            className={classNames(
                              "text-left w-full px-2 py-2 rounded transition-colors",
                              selectedCategory === cat
                                ? "text-[#c9a74d] bg-gray-100 font-semibold"
                                : "text-gray-700 hover:bg-gray-50"
                            )}
                            style={{
                              fontSize: "1rem",
                              letterSpacing: "-0.01em",
                            }}
                          >
                            {cat}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Brand and Price filters for mobile */}
                  <div className="mt-6 px-4">
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">
                        Brand
                      </label>
                      <select
                        className="border rounded px-2 py-1 w-full"
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                      >
                        <option value="All">All</option>
                        {brands.map((brand) => (
                          <option key={brand} value={brand}>
                            {brand}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">
                        Max Price (₹{selectedPrice})
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">
                          ₹{minPrice}
                        </span>
                        <input
                          type="range"
                          min={minPrice}
                          max={maxPrice}
                          value={selectedPrice}
                          onChange={(e) =>
                            setSelectedPrice(Number(e.target.value))
                          }
                          className="flex-1 accent-[#c9a74d]"
                          step={1}
                        />
                        <span className="text-xs text-gray-500">
                          ₹{maxPrice}
                        </span>
                      </div>
                    </div>
                    <button
                      className="w-full mt-2 px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                      onClick={() => {
                        resetFilters();
                        setMobileFiltersOpen(false);
                      }}
                    >
                      Reset Filters
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>

        {/* Main content grid with sidebar for desktop */}
        <section
          aria-labelledby="products-heading"
          className="pt-4 md:pt-6 pb-16 md:pb-24 w-full max-w-full"
        >
          <div className="grid grid-cols-1 gap-x-0 md:gap-x-8 gap-y-8 md:gap-y-10 lg:grid-cols-6 w-full">
            {/* Desktop sidebar */}
            <aside className="hidden lg:block sticky top-24 self-start h-fit min-w-[220px] max-w-[250px] col-span-1">
              <h3 className="sr-only">Categories</h3>
              <ul className="space-y-2 border-r-2 border-gray-200 pb-6 text-base font-medium">
                <li key="all">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory("All")}
                    className={classNames(
                      "text-left w-full px-2 py-2 rounded transition-colors",
                      selectedCategory === "All"
                        ? "text-[#c9a74d] bg-gray-100 font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                    style={{
                      fontSize: "1rem",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    All Categories
                  </button>
                </li>
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={classNames(
                        "text-left w-full px-2 py-2 rounded transition-colors",
                        selectedCategory === cat
                          ? "text-[#c9a74d] bg-gray-100 font-semibold"
                          : "text-gray-700 hover:bg-gray-50"
                      )}
                      style={{
                        fontSize: "1rem",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
              {/* Brand and Price filters */}
              <div className="mt-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Brand
                  </label>
                  <select
                    className="border rounded px-2 py-1 w-full"
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                  >
                    <option value="All">All</option>
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Max Price (₹{selectedPrice})
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">₹{minPrice}</span>
                    <input
                      type="range"
                      min={minPrice}
                      max={maxPrice}
                      value={selectedPrice}
                      onChange={(e) => setSelectedPrice(Number(e.target.value))}
                      className="flex-1 accent-[#c9a74d]"
                      step={1}
                    />
                    <span className="text-xs text-gray-500">₹{maxPrice}</span>
                  </div>
                </div>
                <button
                  className="w-full mt-2 px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                  onClick={resetFilters}
                >
                  Reset Filters
                </button>
              </div>
            </aside>
            {/* Product list */}
            <div className="overflow-y-auto pr-0 md:pr-2 w-full min-h-[400px] lg:col-span-5">
              {productList}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AccessoiresProduct;
