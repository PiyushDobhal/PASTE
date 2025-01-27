import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const Paste = () => {
  const [text, setText] = useState("");
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(text.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div className="bg-black/95 min-h-screen justify-items-center px-4 overflow-y-hidden text-white">
      <input
        className="p-2 rounded-xl m-7 justify-center border"
        type="search"
        placeholder="Search here"
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex flex-col  w-full gap-8 mt-5">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div
                key={paste?._id}
                className="border flex justify-evenly flex-col p-2 w-full sm:w-3/4 mx-auto rounded-xl"
              >
                <div className="text-2xl mx-3 text-amber-400 font-bold">
                  {paste.title}
                </div>
                <div className="text-sm mx-3 text-blue-500 flex gap-4 font-bold">
                  <span className="text-cyan-600 font-semibold">
                    CREATED AT:
                  </span>
                  {paste.createdAt}
                </div>
                <div className="w-full break-words overflow-hidden line-clamp-3 whitespace-pre-wrap m-3">
                  {paste.content}
                </div><hr/>
                <div className="flex gap-2 flex-row overflow-auto place-content-evenly mt-3 mb-2 ">
                  <button className="rounded border p-1 text-blue-400 hover:cursor-pointer">
                    <a href={`/?pasteId=${paste?._id}`}>EDIT</a>
                  </button>
                  <button className="rounded border p-1 text-green-300 hover:cursor-pointer">
                    <a href={`/pastes/${paste?._id}`}>VIEW</a>
                  </button>
                  <button
                    onClick={() => handleDelete(paste?._id)}
                    className="rounded border p-1 text-red-400 hover:cursor-pointer"
                  >
                    DELETE
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied to Clipboard");
                    }}
                    className="rounded border p-1 text-yellow-600 hover:cursor-pointer"
                  >
                    COPY
                  </button>
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator
                          .share({
                            title: paste.title,
                            text: paste.content,
                            url: window.location.href,
                          })
                          .then(() => console.log("Share successful"))
                          .catch((error) =>
                            console.error("Error sharing:", error)
                          );
                      } else {
                        alert("Sharing is not supported in this browser.");
                      }
                    }}
                    className="rounded border p-1 text-emerald-700 hover:cursor-pointer"
                  >
                    SHARE
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
