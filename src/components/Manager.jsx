import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
export default function manager() {
  const ref = useRef();
  const passRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passArray, setPassArray] = useState([]);
  const showPass = () => {
    if (ref.current.src.includes("/icons/eye.png")) {
      ref.current.src = "/icons/eyecross.jpg";
      passRef.current.type = "text";
    } else {
      ref.current.src = "/icons/eye.png";
      passRef.current.type = "password";
    }
  };
  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPassArray(JSON.parse(passwords));
    }
  }, []);
  const savePassword = () => {
    if(form.site.length>3 && form.username.length>3 && form.password.length>3){
    setPassArray([...passArray, {...form,id:uuidv4()}]);
    localStorage.setItem("passwords", JSON.stringify([...passArray, {...form,id:uuidv4()}]));
    setform({site: "", username: "", password: ""})
    toast.success('Password saved!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    console.log([...passArray, form]);
    }
    else{
      toast.error('Error:Password not saved!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
        });
    }
  };
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const copyText = (text) => {
    toast("Copied to the clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };
  const editPassword = (id)=>{
    console.log("editing pass" + id)
    setform(passArray.filter(item=>item.id===id)[0]);
    setPassArray(passArray.filter(item=> item.id !==id));
  }
  const delPassword = (id)=>{
    console.log("deleting pass" + id)
    let c = confirm("Do you really want to delete this password?")
    if(c){
    setPassArray(passArray.filter(item=> item.id !== id));
    localStorage.setItem("passwords", JSON.stringify(passArray.filter(item=> item.id !== id)));
    console.log([...passArray, form]);
    toast.success('Password Deleted!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
      });
    }
  }
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="relative h-full w-full bg-white">
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>
        <div className="p-3 md:mycontainer min-h-[88.2vh] ">
          <h1 className="text-4xl font-bold text-center">
            <span className="text-purple-500"> &lt; Pas</span>
            <span>s Mana</span>
            <span className="text-purple-500">ger /&gt;</span>
          </h1>
          <p className="text-center text-lg text-purple-900 ">
            Manage your own password
          </p>
          <div className="text-white flex flex-col  p-4 text-black gap-8 items-center">
            <input
              value={form.site}
              name="site"
              onChange={handleChange}
              className="text-black rounded-full border border-purple-500 w-full p-4 py-1"
              placeholder="Enter website URL"
              type="text" id="site"
            />
            <div className="flex w-full flex-col md:flex-row gap-8">
              <input
                value={form.username}
                name="username"
                onChange={handleChange}
                className="text-black rounded-full border border-purple-500 w-full p-4 py-1"
                placeholder="Enter Username"
                type="text" id="username"
              />
              <div className="flex relative">
                <input
                  ref={passRef}
                  value={form.password}
                  name="password"
                  onChange={handleChange}
                  className="text-black rounded-full border border-purple-500 w-full p-4 py-1"
                  placeholder="Enter Password"
                  type="password" id="password"
                />
                <span
                  className="absolute right-2 top-3 cursor-pointer"
                  onClick={showPass}
                >
                  <img ref={ref} src="/icons/eye.png" width={25} alt="eye" />
                </span>
              </div>
            </div>
            <button
              onClick={savePassword}
              className="flex justify-center bg-purple-600 hover:bg-purple-500 px-8 py-2 rounded-full w-fit border-2 border-purple-900"
            >
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger="hover"
              ></lord-icon>
              Save password
            </button>
          </div>
          <div className="passwords ">
            <h2 className="text-center text-2xl font-bold py-4">
              Your passwords
            </h2>
            {passArray.length === 0 && <div>No passwords to show</div>}
            {passArray.length != 0 && (
              <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                <thead className="bg-purple-600 ">
                  <tr>
                    <th className="py-2">Site</th>
                    <th className="py-2">Username</th>
                    <th className="py-2">Password</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-purple-200">
                  {passArray.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="py-2 text-center w-32">
                          <div className="flex justify-center items-center">
                            <a href={item.site} target="_blank">
                              {item.site}
                            </a>
                            <div
                              className="cursor-pointer size-7"
                              onClick={() => {
                                copyText(item.site);
                              }}
                            >
                              <img
                                style={{
                                  height: "25px",
                                  width: "25px",
                                  paddingTop: "3px",
                                  paddingLeft: "3px",
                                }}
                                src="/icons/copy.png"
                                alt="copy"
                              />
                            </div>
                          </div>
                        </td>
                        <td className=" py-2 text-center w-32">
                          <div className="flex justify-center items-center">
                            <span>{item.username}</span>
                            <div
                              className="cursor-pointer size-7"
                              onClick={() => {
                                copyText(item.username);
                              }}
                            >
                              <img
                                style={{
                                  height: "25px",
                                  width: "25px",
                                  paddingTop: "3px",
                                  paddingLeft: "3px",
                                }}
                                src="/icons/copy.png"
                                alt="copy"
                              />
                            </div>
                          </div>
                        </td>
                        <td className=" py-2 text-center w-32">
                          <div className="flex justify-center items-center">
                            <span>{item.password}</span>
                            <div
                              className="cursor-pointer size-7"
                              onClick={() => {
                                copyText(item.password);
                              }}
                            >
                              <img
                                style={{
                                  height: "25px",
                                  width: "25px",
                                  paddingTop: "3px",
                                  paddingLeft: "3px",
                                }}
                                src="/icons/copy.png"
                                alt="copy"
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-2 justify-center text-center w-32">
                          <div className="flex justify-center items-center">
                            <span className="cursor-pointer mx-1" onClick={()=>{editPassword(item.id)}}>
                              <img
                                src="/icons/edit.png"
                                alt="edit"
                                style={{ width: "24px", height: "22px" }}
                              />
                            </span>
                            <span className="cursor-pointer mx-1" onClick={()=>{delPassword(item.id)}}>
                              <lord-icon
                                src="https://cdn.lordicon.com/wpyrrmcq.json"
                                trigger="hover"
                                style={{ width: "25px", height: "25px" }}
                              ></lord-icon>
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
    </>
  );
}
