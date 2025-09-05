import { Link } from "lucide-react";
import React from "react";

const Page6 = () => {
  // Desktop blogs (as before)
  const blogs = [
    {
      id: 1,
      title: "What is a Pomeranian? How to Identify Pomeranian Dogs",
      description:
        "The Pomeranian, also known as the Pom dog, is always in the top of the cutest pets...",
      image: "/Page6img1.png",
      link: "https://papapet03.blogspot.com/2025/08/why-do-cats-sleep-so-much-exploring.html"
    },
    {
      id: 2,
      title: "Dog Diet You Need To Know",
      description:
        "Dividing a dog’s diet may seem simple at first, but there are some key rules...",
      image: "/Page6img2.png",
      link: "https://papapet03.blogspot.com/2025/08/unlock-secrets-to-happy-cat.html"
    },
    {
      id: 3,
      title:
        "Why Dogs Bite and Destroy Furniture and How to Prevent It Effectively",
      description:
        "Dog bites are common during development. However, no one wants their furniture...",
      image: "/Page6img3.png",
      link:  ""
    },
  ];

  // Mobile blogs (from the image)
  const mobileBlogs = [
    {
      id: 1,
      title: "Unlock Secrets to a Happy Cat",
      image: "/kyb_mobile/1.png",
      link: "https://papapet03.blogspot.com/2025/08/unlock-secrets-to-happy-cat.html",
    },
    {
      id: 2,
      title: "Why do cats sleep so much? Exploring feline behavior",
      image: "/kyb_mobile/2.png",
      link: "https://papapet03.blogspot.com/2025/08/why-do-cats-sleep-so-much-exploring.html",
    },
    {
      id: 3,
      title: "Best pet subscription boxes",
      image: "/kyb_mobile/3.png",
      link: ""
    },
    {
      id: 4,
      title: "How to take care of your pet",
      image: "/kyb_mobile/4.png",
      link: ""
    },
  ];

  return (
    <section id="blogs" className="px-6 py-12 max-md:bg-[#F4EEE1] max-md:py-14">
      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="text-center">
          <div className="flex items-end justify-center gap-5">
            <h2 className="text-3xl font-bold">
              Know Your <span className="text-[#0d9899]">Buddy</span>
            </h2>
            <img src="/serviceDog.png" className="h-16" alt="Service Dog" />
          </div>
          <p className="text-lg mt-2">
            Read our latest Blogs and Keep your Pets Super Healthy
          </p>
        </div>
        <h3 className="text-end cursor-pointer text-[#0d9899] font-medium mt-4 mb-2">
          View all
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {blogs.map((blog) => (
            <a href={blog.link} target="_blank" key={blog.id}>
              <div
                
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  width={400}
                  height={250}
                  className="w-full h-42 object-contain"
                />
                <div className="p-4">
                  <span className="bg-[#0d9899] text-white px-2 py-1 rounded text-sm">
                    Pet Knowledge
                  </span>
                  <h3 className="font-semibold text-xl mt-2">{blog.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {blog.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden w-full mx-auto">
        <div className="flex flex-col items-center w-full">
          <div className="flex items-center justify-center gap-2 mt-2 mb-4">
            <h2 className="text-[7vw] font-bold text-center leading-tight">
              Know Your <span className="text-orange-400">Buddy</span>
              <img
                src="/serviceDog.png"
                alt="Service Dog"
                className="inline-block align-middle h-[7vw] w-auto ml-1"
                style={{ display: "inline", verticalAlign: "middle" }}
              />
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full pt-5">
          {mobileBlogs.map((blog) => (
            <a href={blog.link} target="_blank"  key={blog.id}>
              <div
               
                className="bg-[#F4EEE1] rounded-xl flex flex-col items-center p-2"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-[45vw] object-cover mb-2 rounded-3xl"
                />
                <h3 className="font-semibold text-sm sm:text-lg text-left">
                  {blog.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Page6;
