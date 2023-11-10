"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";


const Form = (): JSX.Element => {
    const router = useRouter();
    const [first, setfirst] = useState("");

    const cambio = (e: React.ChangeEvent<any>) => {
        console.log(e.target.value);
        setfirst(e.target.value);
    }
    
    const ir = (e: React.ChangeEvent<any>) => {
        e.preventDefault();
        console.log(e)
    }
    return (
        
        <form className="container mx-auto">
            <div className="md:container md:mx-auto">
                <label className="block">
                    <span className="block text-sm font-medium text-slate-700">Username</span>
                    <input type="text" onChange={cambio} value={first} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                    "/>
                </label>
                <label className="block">
                    <span className="block text-sm font-medium text-slate-700">Username</span>
                    <input type="checkbox" className="appearance-none checked:bg-blue-500" />
                </label>
                <button onClick={()=>router.push("/about")} className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 rounded-md p-1">
                Save changes
                </button>
            </div>
        </form>
    )
}

export default Form
