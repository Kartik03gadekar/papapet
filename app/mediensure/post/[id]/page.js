"use client";
import Nav from '@/Components/Nav/Nav';
import { getPost } from '@/store/Action/others';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Page = () => {
  const { id } = useParams();
  const { post, imgLink } = useSelector((state) => state.others);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  // Function to parse and render the content
  const renderContent = (content) => {
    if (!content) return null;

    // Split content by line breaks and handle h1 tags
    return content.split(/(<br\/?>|<h1>.*?<\/h1>)/g).map((part, index) => {
      if (part.startsWith('<h1>') && part.endsWith('</h1>')) {
        return (
          <h1 key={index} className="text-2xl font-bold my-5">
            {part.replace(/<\/?h1>/g, '')}
          </h1>
        );
      } else if (part.match(/<br\/?>/)) {
        return <br key={index} />;
      } else {
        return <span key={index}>{part}</span>;
      }
    });
  };

  return (
    <>
      <Nav />
      <div className="w-full min-h-screen relative translate-y-[10vh] p-10">
        <h1 className="text-4xl text-center font-semibold">{post?.heading}</h1>
        <img
          className="h-[25vw] w-[25vw] object-contain mx-auto mt-5"
          src={`${imgLink}/${post?.filename}/${post?.mimetype}`}
          alt="Post Content"
        />
        <div className="text-lg mt-10">{renderContent(post?.content)}</div>
        <h3 className="text-right mt-10">
          Published at: {post?.date}
        </h3>
      </div>
    </>
  );
};

export default Page;
