"use client";
import React, { useEffect, useState, Fragment } from "react";
import { Dialog, Transition, Menu } from "@headlessui/react";
import {
  FunnelIcon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
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
  const prices =
    food?.map((item) =>
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
      selectedBrand === "All" || (item.brand && item.brand === selectedBrand);

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
      <main className="mx-auto px-2 sm:px-4 md:px-6 lg:px-8 pt-20">
        <h1
          className="text-4xl md:text-5xl head font-bold tracking-tight text-gray-900 text-center"
          style={{
            lineHeight: "1.1",
            letterSpacing: "-0.01em",
            wordBreak: "break-word",
          }}
        >
          Pets Accessories
        </h1>
        {/* Header and controls */}
        <div className="flex items-center justify-center gap-4 border-b border-gray-200 ">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 w-full sm:w-auto">
            {/* Animal Category filter for mobile */}
            <div className="flex flex-col items-center mt-4 px-4">
              <label className="text-sm font-medium mb-1 w-full">
                Category
              </label>
              <select
                className="border rounded-xl px-2 py-1 w-full "
                value={selectedAnimalCategory}
                onChange={(e) => setSelectedAnimalCategory(e.target.value)}
              >
                {animalCategories.map((animal) => (
                  <option key={animal.value} value={animal.value}>
                    {animal.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col items-center mt-6 px-4">
              <div className=" mb-2 w-full">
                <label className="block text-sm font-medium mb-1">Brand</label>
                <select
                  className="border rounded-xl px-2 py-1 w-full "
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                >
                  <option value="All">All</option>
                  {brands.map((brand) => (
                    <option key={brand.name} value={brand.name}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col items-center mt-4 px-4">
              <label className="block text-sm font-medium mb-1">Age</label>
              <select
                className="border rounded-xl px-2 py-1 w-full "
                value={selectedAnimalCategory}
                onChange={(e) => setSelectedAnimalCategory(e.target.value)}
              >
                {petAges.map((animal, idx) => (
                  <option
                    key={animal.value || idx}
                    value={animal.value || animal.lable}
                  >
                    {animal.lable}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center justify-center mt-4  bg-[#FD890E] rounded">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="flex items-center justify-center p-2 text-gray-400 hover:text-gray-500 transition-colors"
                aria-label="Open filters"
              >
                <HiFilter className="text-white text-2xl" />
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
                      Categories
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
                          onClick={() => handleCategoryClick("All")}
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
                          All
                        </button>
                      </li>
                      {subCategories.map((cat) => (
                        <li key={cat.value}>
                          <button
                            type="button"
                            onClick={() => handleCategoryClick(cat.value)}
                            className={classNames(
                              "text-left w-full px-2 py-2 rounded transition-colors",
                              selectedCategory === cat.name
                                ? "text-[#c9a74d] bg-gray-100 font-semibold"
                                : "text-gray-700 hover:bg-gray-50"
                            )}
                            style={{
                              fontSize: "1rem",
                              letterSpacing: "-0.01em",
                            }}
                          >
                            {cat.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Animal Category filter for mobile */}
                  <div className="mt-4 px-4">
                    <label className="block text-sm font-medium mb-1">
                      Animal Category
                    </label>
                    <select
                      className="border rounded px-2 py-1 w-full"
                      value={selectedAnimalCategory}
                      onChange={(e) =>
                        setSelectedAnimalCategory(e.target.value)
                      }
                    >
                      {animalCategories.map((animal) => (
                        <option key={animal.value} value={animal.value}>
                          {animal.label}
                        </option>
                      ))}
                    </select>
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
                          <option key={brand.name} value={brand.name}>
                            {brand.name}
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
                          onChange={handlePriceSliderChange}
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

        {/* Main content grid */}

        <section>
          <div className="flex flex-col gap-[4vw] items-center justify-center ">
            <div className="flex items-center text-center justify-center"></div>
            <div className="w-full flex items-center justify-center gap-8 py-2">
              <Swiper
                pagination={{ clickable: true }}
                modules={[Pagination]}
                className="w-full"
              >
                <SwiperSlide className="flex flex-col items-center justify-center text-center">
                   <div className="w-full flex items-center justify-center  ">
                            <img
                              className="w-[80%] h-[80%] max-md:w-[90%]  max-md:h-[90%]"
                              src={"/pt11.png"}
                              alt=""
                            />
                          </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </section>
        <section
          aria-labelledby="products-heading"
          className=" b pt-4 md:pt-6 pb-16 md:pb-24 w-full max-w-full"
        >
          <div className="w-full">
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
