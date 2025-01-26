import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import toast from 'react-hot-toast';

const ViewPaste = () => {

  const {id} =useParams();

  const allPastes= useSelector((state)=> state.paste.pastes);
  const paste = allPastes.filter((p)=> p._id===id)[0];
  return (
    <div className="bg-black/95 min-h-screen text-white">
      <div className="flex flex-row gap-1  justify-items-start ml-[300px] pl-5">
        <input
          className=" border w-58 p-1 rounded-xl text-white bg-black/30 placeholder:text-gray-500 mt-5"
          type="text"
          placeholder="Enter title here"
          disabled
          value={paste.title}
          onChange={(e) => setTitle(e.target.value)}
        />
      
      <button onClick={()=> {navigator.clipboard.writeText(paste?.content);toast.success("Copied to Clipboard")
                  } } className="p-2 border border-white rounded-xl bg-black/30 text-white hover:cursor-pointer ml-[250px]  mt-5 ">
                    COPY CONTENT
                  </button></div>
      <div className="mt-5 flex ml-[250px] justify-items-center">
        <textarea
          className="rounded-2xl border-white border bg-black/30 p-3 ml-5 text-white placeholder:text-gray-500 min-w-[700px] "
          value={paste.content}
          disabled
          placeholder="Enter content here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  )
}

export default ViewPaste
