"use client";
import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFood } from "@/store/Action/others";
import ProductCard from "../ProductCard";
import Loading from "../loading";
import { Menu, Transition, Dialog } from "@headlessui/react";
import {
  ChevronDownIcon,
  FunnelIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

// Swiper imports for carousels
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { HiFilter } from "react-icons/hi";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import ComponentLoader from "../loader/ComponentLoader";
import LazyImage from "../LazyImage";

// Dummy data for category carousel
const categoryCarouselData = [
  { name: "Dry Food", img: "dry.png" },
  { name: "Wet Food", img: "wetF.jpg" },
  { name: "Treats", img: "treat.png" },
  { name: "Other", img: "dry.png" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Filter options
const brands = [
  { name: "Royal Canin", img: "/royal.webp" },
  { name: "Drools", img: "/arden.png" },
  { name: "Whiskas", img: "/sniffy.jpg" },
  { name: "Purina", img: "/drools.png" },
  { name: "Sheba", img: "/happy.avif" },
  { name: "Farmina", img: "/mera.webp" },
  { name: "Acana", img: "/pedigree.png" },
  { name: "Smart Heart", img: "/pedigree.png" },
  { name: "Pedigree", img: "/pedigree.png" },
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

const posters = [
  { img: "/posters/food1.png" },
  { img: "/posters/acc1.png" },
  { img: "/6 (1).png" },
];

const FOOD_MIN_PRICE = 0;
const FOOD_MAX_PRICE = 25000;

const FoodContainer = () => {
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
  const [visibleCount, setVisibleCount] = useState(9);

  const searchParams = useSearchParams();
  const initialAnimal = searchParams.get("animal");
  const initialCategory = searchParams.get("category");
  const initialBrand = searchParams.get("brand");
  const router = useRouter();
  const [pendingBrand, setPendingBrand] = useState("All");
  const [pendingCategory, setPendingCategory] = useState("All");
  const [pendingAnimalCategory, setPendingAnimalCategory] = useState("All");
  const [pendingPrice, setPendingPrice] = useState(FOOD_MAX_PRICE);

  const slugify = (str) => str.toLowerCase().replace(/\s+/g, "");

  useEffect(() => {
    if (mobileFiltersOpen) {
      setPendingBrand(selectedBrand);
      setPendingCategory(selectedCategory);
      setPendingAnimalCategory(selectedAnimalCategory);
      setPendingPrice(selectedPrice);
    }
  }, [mobileFiltersOpen]);

  // set filters from URL on mount
  useEffect(() => {
    if (initialAnimal) {
      setSelectedAnimalCategory(
        animalCategories.find(
          (a) => a.value.toLowerCase() === initialAnimal.toLowerCase()
        )?.label || "All"
      );
    }

    if (initialCategory) {
      // first check if it's an animal category
      const animalMatch = animalCategories.find(
        (a) => a.value.toLowerCase() === initialCategory.toLowerCase()
      );

      if (animalMatch) {
        setSelectedAnimalCategory(animalMatch.label);
      } else {
        // otherwise treat it as food category
        setSelectedCategory(
          categories.find(
            (c) => c.value.toLowerCase() === initialCategory.toLowerCase()
          )?.name || "All"
        );
      }
    }

    if (initialBrand) {
      setSelectedBrand(initialBrand);
    }
  }, [initialAnimal, initialCategory, initialBrand]);

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
      if (
        selectedBrand !== "All" &&
        slugify(item.brand) !== slugify(selectedBrand)
      ) {
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
    router.push(`/food?animal=${animalValue.toLowerCase()}`);
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

  const visibleProducts = sorted
    .filter((item) => item.productType === "food")
    .slice(0, visibleCount);

  // Product list rendering
  let productList;
  if (load) {
    productList = (
      <div className="flex justify-center items-center min-h-[300px]">
        <ComponentLoader />
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
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
          {visibleProducts.map((item, idx) => (
            <ProductCard
              key={item._id || item.id || idx}
              i={item}
              imgLink={imgLink}
            />
          ))}
        </div>

        {visibleCount < sorted.length && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setVisibleCount((prev) => prev + 9)}
              className="px-6 py-2 bg-[#FD890E] text-white rounded-lg shadow-md hover:bg-[#e67a0c] transition"
            >
              Show More
            </button>
          </div>
        )}
      </>
    );
  }

  const [minPrice, maxPrice] = priceRange;

  return (
    <>
      {/* Browse By Brands */}
      {/* <div className="flex flex-col gap-[4vw] items-center justify-center mt-2 bg-[#F4EEE1] py-8 ">
        <div className="flex items-center text-center justify-center">
          <h1 className="text-4xl font-semibold relative z-10 text-center max-md:text-3xl max-md:pb-6">
            Browse By Brands
          </h1>
        </div>
        <div className="w-full h-52 max-md:h-40 flex items-center justify-center gap-8 py-2">
          <Swiper
            slidesPerView={3}
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            navigation={isLargeScreen}
            pagination={{ clickable: true }}
            modules={[Pagination, Navigation]}
            className="w-full"
          >
            {brands.map((brand, index) => (
              <SwiperSlide key={index}>
                <div className="w-[20vw] max-md:w-[30vw] flex flex-col items-center justify-center">
                  <div className="h-[20vh] w-[20vh] max-md:h-[10vh] max-md:w-[10vh] rounded-full border-2 overflow-hidden flex flex-col items-center justify-center">
                    <img
                      src={brand.img}
                      className="w-full h-full object-cover"
                      alt={brand.name}
                    />
                  </div>
                  <h1 className="font-semibold max-md:text-sm mt-2">
                    {brand.name}
                  </h1>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div> */}

      {/* Browse By Category */}
      {/* <div className="flex flex-col gap-[4vw] items-center justify-center mt-[10vw] max-md:mt-[14vw]">
        <div className="flex items-center text-center justify-center">
          <h1 className="text-4xl font-semibold relative z-10 bg-white text-center max-md:text-3xl max-md:pb-6">
            Browse By Category
          </h1>
        </div>
        <div className="w-full h-52 max-md:h-40 flex items-center justify-center gap-8 py-2">
          <Swiper
            slidesPerView={3}
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            navigation={isLargeScreen}
            pagination={{ clickable: true }}
            modules={[Pagination, Navigation]}
            className="w-full"
          >
            {categoryCarouselData.map((category, index) => (
              <SwiperSlide
                key={index}
                className="flex flex-col items-center justify-center text-center"
              >
                <div className="w-[20vw] max-md:w-[30vw] flex flex-col items-center justify-center">
                  <div className="h-[20vh] w-[20vh] max-md:h-[10vh] max-md:w-[10vh] rounded border-2 overflow-hidden flex flex-col items-center justify-center">
                    <img
                      src={
                        category.img.startsWith("/")
                          ? category.img
                          : `/${category.img}`
                      }
                      className="h-full w-full object-contain"
                      alt={category.name}
                    />
                  </div>
                  <h1 className="font-semibold max-md:text-sm mt-2">
                    {category.name}
                  </h1>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div> */}

      <div className="w-full min-h-screen">
        <main className="mx-auto px-2 sm:px-4 md:px-6 lg:px-8 pt-10">
          {/* Animal Category */}
          {/* <div className="flex items-center justify-around pt-6 "  >
  <div className="flex flex-col w-full md:w-1/4 "> 

<label className="text-sm font-medium mb-1">Category</label>

 <select className="border rounded-xl px-3 py-2 text-sm w-full" 
 value={selectedAnimalCategory} 
 onChange={(e) => setSelectedAnimalCategory(e.target.value)} > 
 {animalCategories.map((animal) => ( <option key={animal.value}
  value={animal.value}> {animal.label} </option> ))}
   </select> 

  </div> 
  
   <div className="flex flex-col w-full md:w-1/4">
   <label className="text-sm font-medium mb-1">Brand</label> 
   <select className="border rounded-xl px-3 py-2 text-sm w-full"
    value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)} >
       <option value="All">All</option> 
       {brands.map((brand) => ( <option key={brand.name} value={brand.name}>
         {brand.name} </option> ))}
          </select>
          </div>

         
          <div className="flex flex-col w-full md:w-1/4">
           <label className="text-sm font-medium mb-1">Age</label>
            <select className="border rounded-xl px-3 py-2 text-sm w-full"
             value={selectedAnimalCategory} onChange={(e) => setSelectedAnimalCategory(e.target.value)} >
               {petAges.map((animal, idx) => ( <option key={animal.value || idx} value={animal.value || animal.lable} >
                 {animal.lable} </option> ))} 
                 </select> 
                 </div>
</div> */}

          {/* Mobile Filter Button */}

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
                    {/* Header */}
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

                    {/* Categories */}
                    <div className="mt-4 px-4">
                      <h3 className="text-sm font-medium mb-2">Categories</h3>
                      <ul className="space-y-2 text-base font-medium">
                        <li key="all">
                          <button
                            type="button"
                            onClick={() => setPendingCategory("All")}
                            className={classNames(
                              "text-left w-full px-2 py-2 rounded transition-colors",
                              pendingCategory === "All"
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
                              onClick={() => setPendingCategory(cat.name)}
                              className={classNames(
                                "text-left w-full px-2 py-2 rounded transition-colors",
                                pendingCategory === cat.name
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

                    {/* Animal Category */}
                    <div className="mt-4 px-4">
                      <label className="block text-sm font-medium mb-1">
                        Animal Category
                      </label>
                      <select
                        className="border rounded px-2 py-1 w-full"
                        value={pendingAnimalCategory}
                        onChange={(e) =>
                          setPendingAnimalCategory(e.target.value)
                        }
                      >
                        {animalCategories.map((animal) => (
                          <option key={animal.value} value={animal.value}>
                            {animal.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Brand + Price */}
                    <div className="mt-6 px-4">
                      <div className="mb-4">
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

                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                          Max Price (₹{pendingPrice})
                        </label>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">
                            ₹{minPrice}
                          </span>

                          <input
                            type="range"
                            min={minPrice}
                            max={maxPrice}
                            value={pendingPrice}
                            onChange={(e) =>
                              setPendingPrice(Number(e.target.value))
                            }
                            className="flex-1 accent-[#FFAD22] cursor-pointer"
                            step={500} // step of ₹1000
                            list="price-steps"
                          />

                          <span className="text-xs text-gray-500">
                            ₹{maxPrice}
                          </span>
                        </div>

                        {/* Stepper ticks */}
                        <datalist
                          id="price-steps"
                          className="w-full flex justify-between text-xs text-gray-500"
                        >
                          <option value={minPrice} label={`₹${minPrice}`} />
                          <option value={5000} label="₹5k" />
                          <option value={10000} label="₹10k" />
                          <option value={15000} label="₹15k" />
                          <option value={20000} label="₹20k" />
                          <option value={maxPrice} label={`₹${maxPrice}`} />
                        </datalist>
                      </div>

                      {/* Buttons */}
                      {/* Buttons */}
                      <div className="flex gap-2 mt-4">
                        {/* Reset instantly applies */}
                        <button
                          className="w-1/2 px-3 py-2 rounded bg-gray-200 hover:bg-gray-300"
                          onClick={() => {
                            // Reset pending states
                            setPendingBrand("All");
                            setPendingCategory("All");
                            setPendingAnimalCategory("All");
                            setPendingPrice(maxPrice);

                            // Instantly apply to main filters
                            setSelectedBrand("All");
                            setSelectedCategory("All");
                            setSelectedAnimalCategory("All");
                            setSelectedPrice(maxPrice);

                            // Close the modal
                            setMobileFiltersOpen(false);
                          }}
                        >
                          Reset
                        </button>

                        {/* Apply requires confirmation */}
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
                  modules={[Pagination, Autoplay]}
                  autoplay={{
                    delay: 2500, // time between slides (ms)
                    disableOnInteraction: false, // keep autoplay after user swipes
                  }}
                  speed={1000}
                  className="w-full"
                >
                  {posters.map((poster, index) => {
                    return (
                      <SwiperSlide key = {index} className="flex flex-col items-center justify-center text-center">
                        <div className="h-auto max-md:w-screen max-md:flex max-md:items-center max-md:justify-center p-5 mb-5">
                          <LazyImage
                            className="rounded-2xl h-full w-full object-cover"
                            src={poster.img}
                            alt=""
                          />
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          </section>
          <section>
            <div className="flex items-center justify-between mt-10 mb-5 px-5">
              <h1
                className="text-5xl md:text-5xl head font-bold tracking-tight text-gray-900 text-center"
                style={{
                  lineHeight: "1.1",
                  letterSpacing: "-0.01em",
                  wordBreak: "break-word",
                }}
              >
                Food
              </h1>
              <div className="flex  justify-end">
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#FD890E] text-white rounded-lg shadow-md"
                >
                  <HiFilter className="text-lg" /> Filters
                </button>
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
    </>
  );
};

export default FoodContainer;
