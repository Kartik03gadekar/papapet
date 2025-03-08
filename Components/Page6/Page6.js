import React from 'react'

const Page6 = () => {

const blogs = [
    {
      id: 1,
      title: "What is a Pomeranian? How to Identify Pomeranian Dogs",
      description:
        "The Pomeranian, also known as the Pom dog, is always in the top of the cutest pets...",
      image: "/Page6img1.png",
    },
    {
      id: 2,
      title: "Dog Diet You Need To Know",
      description:
        "Dividing a dog’s diet may seem simple at first, but there are some key rules...",
      image: "/Page6img2.png",
    },
    {
      id: 3,
      title: "Why Dogs Bite and Destroy Furniture and How to Prevent It Effectively",
      description:
        "Dog bites are common during development. However, no one wants their furniture...",
      image: "/Page6img3.png",
    },
  ];
  return (
    <section className="px-6 py-12">
    <div className="text-center">
    <div className="flex items-end justify-center gap-5">
      <h2 className="text-3xl font-bold">
        Know Your <span className="text-[#0d9899] max-md:text-orange-400">Buddy</span>
      </h2>
      <img src="/serviceDog.png" className="max-md:h-[15vw] h-16" alt="Service Dog" />
      </div>
      <p className="text-lg max-md:text-base mt-2 max-md:hidden ">
        Read our latest Blogs and Keep your Pets Super Healthy
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {blogs.map((blog) => (
        <div
          key={blog.id}
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
            <span className="max-md:text-[2.5vw] bg-[#0d9899] text-white px-2 py-1 rounded text-lg">
              Pet Knowledge
            </span>
            <h3 className="font-semibold text-lg mt-2">{blog.title}</h3>
            <p className="text-gray-600 text-sm mt-1 max-md:hidden">{blog.description}</p>
          </div>
        </div>
      ))}
    </div>

    
  </section>
  )
}

export default Page6
