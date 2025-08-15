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
import { HiFilter } from "react-icons/hi";
import Loading from "../loading";

// Swiper imports for carousels
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Helper for unique values
const getUnique = (arr, key) => {
  return Array.from(new Set(arr.map((item) => item[key]))).filter(Boolean);
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Filter options
const brands = [
  { name: "Royal Canin", img: "/royal.webp" },
  { name: "Arden Grance", img: "/arden.png" },
  { name: "Sniffy", img: "/sniffy.jpg" },
  { name: "Drools", img: "/drools.png" },
  { name: "Happy Dog", img: "/happy.avif" },
  { name: "MERA", img: "/mera.webp" },
];
const categories = [
  { name: "All", value: "All", label: "All" },
  { name: "Dry Food", value: "dry", label: "Dry Food" },
  { name: "Wet Food", value: "wet", label: "Wet Food" },
  { name: "Treats", value: "treats", label: "Treats" },
  { name: "Other", value: "other", label: "Other" },
];

// Animal category filter options
const animalCategories = [
  { label: "All", value: "All" },
  { label: "Dog", value: "dog" },
  { label: "Cat", value: "cat" },
  { label: "Fish", value: "fish" },
  // Add more as needed
];

const petAges = [
  { lable: "Baby (NB to 1 year)" },
  { lable: "Young (1-3 years)" },
  { lable: "Adult (4-7 years)" },
  { lable: "Senior (8+ years)" },
];

// Sort options
const sortOptions = [
  { name: "Relevance", value: "relevance" },
  { name: "Price: Low to High", value: "priceLow" },
  { name: "Price: High to Low", value: "priceHigh" },
  { name: "Name: A-Z", value: "nameAZ" },
  { name: "Name: Z-A", value: "nameZA" },
];

const FOOD_MIN_PRICE = 0;
const FOOD_MAX_PRICE = 25000;

const AccessoiresProduct = () => {
  const { load, food, imgLink } = useSelector((state) => state.others);
  const dispatch = useDispatch();

  // Set min and max price to 0 and 25000
  const [priceRange, setPriceRange] = useState([
    FOOD_MIN_PRICE,
    FOOD_MAX_PRICE,
  ]);
  const [selectedPrice, setSelectedPrice] = useState(FOOD_MAX_PRICE);
  const [priceRangeInitialized, setPriceRangeInitialized] = useState(false);

  // Filter state
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedAnimalCategory, setSelectedAnimalCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("relevance");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // For category sidebar and mobile
  const subCategories = categories.filter((cat) => cat.value !== "All");

  // Responsive check for Swiper navigation
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Compute min/max price from food data (but always use 0 and 25000)
  useEffect(() => {
    setPriceRange([FOOD_MIN_PRICE, FOOD_MAX_PRICE]);
    if (!priceRangeInitialized) {
      setSelectedPrice(FOOD_MAX_PRICE);
      setPriceRangeInitialized(true);
    }
  }, [food, priceRangeInitialized]);

  useEffect(() => {
    dispatch(getFood());
  }, [dispatch]);

  // Filtering logic
  const filterProducts = (products) => {
    if (!Array.isArray(products)) return [];

    return products.filter((item) => {
      // --- Brand filter ---
      if (selectedBrand !== "All" && item.brand !== selectedBrand) {
        return false;
      }

      // --- Category filter ---
      if (selectedCategory !== "All") {
        const cat = selectedCategory.toLowerCase();
        if (
          !(
            (item.categories && item.categories.toLowerCase().includes(cat)) ||
            (item.animalCategory &&
              item.animalCategory.toLowerCase().includes(cat)) ||
            (item.name && item.name.toLowerCase().includes(cat))
          )
        ) {
          return false;
        }
      }

      // --- Animal Category filter ---
      if (selectedAnimalCategory !== "All") {
        const animalCat = selectedAnimalCategory.toLowerCase();
        if (
          !(
            (item.animalCategory &&
              item.animalCategory.toLowerCase().includes(animalCat)) ||
            (item.categories &&
              item.categories.toLowerCase().includes(animalCat)) ||
            (item.name && item.name.toLowerCase().includes(animalCat))
          )
        ) {
          return false;
        }
      }

      // --- Price filter (slider) ---
      const price = Number(item.discountprice || item.price);
      if (isNaN(price)) return false;
      if (price < priceRange[0] || price > selectedPrice) {
        return false;
      }

      // --- Search filter ---
      if (
        searchTerm &&
        !(
          (item.name &&
            item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.brand &&
            item.brand.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.categories &&
            item.categories.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.animalCategory &&
            item.animalCategory
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))
        )
      ) {
        return false;
      }

      return true;
    });
  };

  // Sorting logic
  const sortProducts = (products) => {
    if (!Array.isArray(products)) return [];
    let sorted = [...products];
    switch (sort) {
      case "priceLow":
        sorted.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "priceHigh":
        sorted.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case "nameAZ":
        sorted.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        break;
      case "nameZA":
        sorted.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
        break;
      default:
        // relevance: do nothing
        break;
    }
    return sorted;
  };

  // Handlers
  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };
  const handleSortChange = (option) => setSort(option.value);

  // Category click for sidebar/mobile
  const handleCategoryClick = (catValue) => {
    setSelectedCategory(
      catValue === "All"
        ? "All"
        : categories.find((c) => c.value === catValue)?.name || "All"
    );
    setMobileFiltersOpen(false);
  };

  // Animal category click for sidebar/mobile
  const handleAnimalCategoryClick = (animalValue) => {
    setSelectedAnimalCategory(
      animalValue === "All"
        ? "All"
        : animalCategories.find((a) => a.value === animalValue)?.label || "All"
    );
    setMobileFiltersOpen(false);
  };

  // Price slider handler (single slider for max price)
  const handlePriceSliderChange = (e) => {
    const value = Number(e.target.value);
    setSelectedPrice(value);
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedBrand("All");
    setSelectedCategory("All");
    setSelectedAnimalCategory("All");
    setSearchTerm("");
    setSelectedPrice(priceRange[1]);
  };

  // Compose filtered and sorted product list
  const filtered = filterProducts(food);
  const sorted = sortProducts(filtered);

  // Product list rendering
  let productList;
  if (load) {
    productList = (
      <div className="flex justify-center items-center min-h-[300px]">
        <Loading />
      </div>
    );
  } else if (!sorted || sorted.length === 0) {
    productList = (
      <div className="text-center text-gray-500 py-12 text-lg">
        No products found.
      </div>
    );
  } else {
    productList = (
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {sorted.map((item, idx) => (
          <ProductCard
            key={item._id || item.id || idx}
            i={item}
            imgLink={imgLink}
          />
        ))}
      </div>
    );
  }

  const [minPrice, maxPrice] = priceRange;

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
        <div className="flex items-center justify-center gap-4 border-b border-gray-200 py-10">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 w-full ">
                      {/* Animal Category filter for mobile */}
                      <div className="flex flex-col items-center mt-4 px-4 md:w-1/3">
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
        
                      <div className="flex flex-col items-center mt-6 px-4 md:w-1/3">
                        <div className=" mb-2 w-full">
                          <label className="block text-sm font-medium mb-1">
                            Brand
                          </label>
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
        
                      <div className="flex flex-col items-start mt-4 px-4 md:w-1/3">
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
                      <div className="flex items-center justify-center mt-4  bg-[#FD890E] rounded max-md:fixed bottom-10 right-5 mr-4">
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
            className="relative z-40"
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
