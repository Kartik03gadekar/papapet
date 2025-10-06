"use client";
import React, { useEffect, useState, Fragment, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFood } from "@/store/Action/others";
import ProductCard from "../ProductCard";
import ComponentLoader from "../loader/ComponentLoader";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { HiFilter } from "react-icons/hi";
import { useSearchParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const FOOD_MAX_PRICE = 25000;
const PRODUCTS_PER_PAGE = 9;

const brands = [
  { name: "Royal Canin" },
  { name: "Drools" },
  { name: "Whiskas" },
  { name: "Purina" },
  { name: "Sheba" },
  { name: "Farmina" },
  { name: "Acana" },
  { name: "Smart Heart" },
  { name: "Pedigree" },
];

const categories = [
  { name: "All", value: "All" },
  { name: "Dry Food", value: "dry" },
  { name: "Wet Food", value: "wet" },
  { name: "Treats", value: "treats" },
  { name: "Accessories", value: "other" },
];

const animalCategories = [
  { label: "All", value: "All" },
  { label: "Dog", value: "dog" },
  { label: "Cat", value: "cat" },
  { label: "Fish", value: "fish" },
];

const posters = [
  { img: "/posters/food1.png" },
  { img: "/posters/acc1.png" },
  { img: "/6 (1).png" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const FoodContainer = () => {
  const { load, food, imgLink } = useSelector((state) => state.others);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  // --- States ---
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedAnimalCategory, setSelectedAnimalCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("relevance");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [pendingBrand, setPendingBrand] = useState("All");
  const [pendingCategory, setPendingCategory] = useState("All");
  const [pendingAnimalCategory, setPendingAnimalCategory] = useState("All");
  const [pendingPrice, setPendingPrice] = useState(FOOD_MAX_PRICE);
  const [selectedPrice, setSelectedPrice] = useState(FOOD_MAX_PRICE);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const initialAnimal = searchParams.get("animal");
    const initialCategory = searchParams.get("category");
    const initialBrand = searchParams.get("brand");

    if (initialAnimal) {
      const match = animalCategories.find(
        (a) => a.value.toLowerCase() === initialAnimal.toLowerCase()
      );
      if (match) setSelectedAnimalCategory(match.label);
    }

    if (initialCategory) {
      const categoryMatch = categories.find(
        (c) => c.value.toLowerCase() === initialCategory.toLowerCase()
      );
      if (categoryMatch) {
        setSelectedCategory(categoryMatch.name);
      } else {
        const animalMatch = animalCategories.find(
          (a) => a.value.toLowerCase() === initialCategory.toLowerCase()
        );

        if (animalMatch && !initialAnimal) {
          setSelectedAnimalCategory(animalMatch.label);
        }
      }
    }

    if (initialBrand) {
      const match = brands.find(
        (b) => slugify(b.name) === slugify(initialBrand)
      );
      if (match) {
        setSelectedBrand(match.name);
        setPendingBrand(match.name);
      }
    }
  }, [searchParams]);

  // --- Fetch food data ---
  useEffect(() => {
    dispatch(getFood());
  }, [dispatch]);

  const slugify = (str) => str.toLowerCase().replace(/\s+/g, "");

  const filterProducts = (products) => {
    return products.filter((item) => {
      const brand = item.brand || "";
      const categoriesStr = item.categories || "";
      const animalCategory = item.animalCategory || "";
      const name = item.name || "";
      const price = Number(item.discountprice || item.price);

      if (selectedBrand !== "All" && slugify(brand) !== slugify(selectedBrand))
        return false;
      if (selectedCategory !== "All") {
        const cat = selectedCategory.toLowerCase();
        if (
          !(
            categoriesStr.toLowerCase().includes(cat) ||
            animalCategory.toLowerCase().includes(cat) ||
            name.toLowerCase().includes(cat)
          )
        )
          return false;
      }
      if (selectedAnimalCategory !== "All") {
        const animalCat = selectedAnimalCategory.toLowerCase();
        if (animalCategory.toLowerCase() !== animalCat) {
          return false;
        }
      }
      if (price < 0 || price > selectedPrice) return false;
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        if (
          !(
            name.toLowerCase().includes(term) ||
            brand.toLowerCase().includes(term) ||
            categoriesStr.toLowerCase().includes(term) ||
            animalCategory.toLowerCase().includes(term)
          )
        )
          return false;
      }
      return true;
    });
  };

  const sortProducts = (products) => {
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
        sorted.sort(() => 0.5 - Math.random());
    }
    return sorted;
  };

  const filtered = filterProducts(food || []);
  const sorted = sortProducts(filtered);

  const totalPages = Math.ceil(sorted.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = sorted.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  // --- Pagination click ---
  const handlePageClick = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={classNames(
              "px-3 py-1 rounded-md mx-1",
              currentPage === i
                ? "bg-[#FD890E] text-white"
                : "bg-gray-200 hover:bg-gray-300"
            )}
          >
            {i}
          </button>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push(<span key={`dots-${i}`}>...</span>);
      }
    }
    return <div className="flex justify-center mt-6">{pages}</div>;
  };

  return (
    <div className="w-full min-h-screen">
      <main className="mx-auto px-4 pt-10">
        <Suspense fallback={<ComponentLoader />}>
          <section className="w-full flex items-center justify-center gap-8 py-2">
            <Swiper
              pagination={{ clickable: true }}
              modules={[Pagination, Autoplay]}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              speed={1000}
              className="w-full h-[40vh]"
            >
              {posters.map((poster, index) => (
                <SwiperSlide key={index}>
                  <img
                    className="rounded-2xl h-full w-full object-cover"
                    src={poster.img}
                    alt=""
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        </Suspense>

        <section className="flex flex-col md:flex-row justify-between items-center mt-10 mb-5 px-5 gap-4">
          <h1 className="text-5xl font-bold text-gray-900 max-md:text-center">
            Food and Accessories
          </h1>
          <div className="flex items-center gap-4">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm"
            >
              <option value="relevance">Relevance</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="nameAZ">Name: A-Z</option>
              <option value="nameZA">Name: Z-A</option>
            </select>
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#FD890E] text-white rounded-lg"
            >
              <HiFilter className="text-lg" /> Filters
            </button>
          </div>
        </section>

        <section className="w-full max-w-full">
          {load ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <ComponentLoader />
            </div>
          ) : paginatedProducts.length === 0 ? (
            <div className="text-center text-gray-500 py-12 text-lg">
              No products found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {paginatedProducts.map((item, idx) => (
                <ProductCard
                  key={item._id || item.id || idx}
                  i={item}
                  imgLink={imgLink}
                />
              ))}
            </div>
          )}
          {renderPagination()}
        </section>

        {/* Mobile Filters Drawer */}
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
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Categories */}
                  <div className="mt-4 px-4">
                    <h3 className="text-sm font-medium mb-2">Categories</h3>
                    <ul className="space-y-2 text-base font-medium">
                      {categories.map((cat) => (
                        <li key={cat.value}>
                          <button
                            type="button"
                            onClick={() => setPendingCategory(cat.name)}
                            className={classNames(
                              "text-left w-full px-2 py-2 rounded transition-colors",
                              pendingCategory === cat.name
                                ? "text-[#c9a74d] bg-gray-100 font-semibold"
                                : "text-gray-700 hover:bg-gray-50"
                            )}
                          >
                            {cat.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Animal Category */}
                  <div className="mt-4 px-4">
                    <label className="block text-sm font-medium mb-1">
                      Animal Category
                    </label>
                    <select
                      className="border rounded px-2 py-1 w-full"
                      value={pendingAnimalCategory}
                      onChange={(e) => setPendingAnimalCategory(e.target.value)}
                    >
                      {animalCategories.map((animal) => (
                        <option key={animal.value} value={animal.value}>
                          {animal.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Brand */}
                  <div className="mt-6 px-4">
                    <label className="block text-sm font-medium mb-1">
                      Brand
                    </label>
                    <select
                      className="border rounded px-2 py-1 w-full"
                      value={pendingBrand}
                      onChange={(e) => setPendingBrand(e.target.value)}
                    >
                      <option value="All">All</option>
                      {brands.map((brand) => (
                        <option key={brand.name} value={brand.name}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Price */}
                  <div className="mt-4 px-4">
                    <label className="block text-sm font-medium mb-1">
                      Max Price (₹{pendingPrice})
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={FOOD_MAX_PRICE}
                      step={500}
                      value={pendingPrice}
                      onChange={(e) => setPendingPrice(Number(e.target.value))}
                      className="w-full accent-[#FFAD22]"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4 px-4">
                    <button
                      className="w-1/2 px-3 py-2 rounded bg-gray-200 hover:bg-gray-300"
                      onClick={() => {
                        setPendingBrand("All");
                        setPendingCategory("All");
                        setPendingAnimalCategory("All");
                        setPendingPrice(FOOD_MAX_PRICE);
                        setSelectedBrand("All");
                        setSelectedCategory("All");
                        setSelectedAnimalCategory("All");
                        setSelectedPrice(FOOD_MAX_PRICE);
                        setMobileFiltersOpen(false);
                      }}
                    >
                      Reset
                    </button>
                    <button
                      className="w-1/2 px-3 py-2 rounded bg-[#FD890E] text-white hover:bg-[#e67a0c]"
                      onClick={() => {
                        setSelectedBrand(pendingBrand);
                        setSelectedCategory(pendingCategory);
                        setSelectedAnimalCategory(pendingAnimalCategory);
                        setSelectedPrice(pendingPrice);
                        setMobileFiltersOpen(false);
                      }}
                    >
                      Apply
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </main>
    </div>
  );
};

export default FoodContainer;
