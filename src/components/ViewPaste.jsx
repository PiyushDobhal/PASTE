import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.filter((p) => p._id === id)[0];

  return (
    <div className="bg-black/95 min-h-screen text-white">
      <div className="flex flex-col sm:flex-row gap-1 justify-center px-4">
        <input
          className="border w-full sm:w-1/2 p-1 rounded-xl text-white bg-black/30 placeholder:text-gray-500 mt-5"
          type="text"
          placeholder="Enter title here"
          disabled
          value={paste.title}
        />

        <button
          onClick={() => {
            navigator.clipboard.writeText(paste?.content);
            toast.success("Copied to Clipboard");
          }}
          className="p-2 border border-white rounded-xl bg-black/30 text-white hover:cursor-pointer mt-5 sm:ml-4"
        >
          COPY
        </button>
      </div>
      <div className="mt-5 flex justify-center  p-3">
        <textarea
          className="rounded-2xl border-white border bg-black/30 p-3 text-white placeholder:text-gray-500 w-[60%]"
          value={paste.content}
          disabled
          placeholder="Enter content here"
          rows={20}
        />
      </div>
    </div>
  );
};

export default ViewPaste;
