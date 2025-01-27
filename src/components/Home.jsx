import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      } else {
        alert("Paste not found!");
        setTitle("");
        setValue("");
      }
    }
  }, [pasteId, allPastes]);

  function handleClick() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };

    if (title.trim() === "" && value.trim() === "") {
      alert("Title and content cannot be empty!");
      return;
    }
    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div className="bg-black/95 min-h-screen">
      <div className="flex flex-col sm:flex-row gap-1 justify-center px-4">
        <input
          className="border w-full sm:w-1/2 p-1 rounded-xl text-white bg-black/30 placeholder:text-gray-500 mt-5"
          type="text"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          className="p-2 border border-white rounded-xl bg-black/30 text-white hover:cursor-pointer mt-5 sm:ml-4"
          onClick={handleClick}
        >
          {pasteId ? "Update" : "Create"}
        </button>
      </div>
      <div className="mt-5 flex justify-center  p-3">
        <textarea
          className="rounded-2xl border-white border bg-black/30 p-3 text-white placeholder:text-gray-500 w-[60%]"
          value={value}
          placeholder="Enter content here"
          onChange={(e) => setValue(e.target.value)}
          rows={17}
        />
      </div>
    </div>
  );
};

export default Home;
