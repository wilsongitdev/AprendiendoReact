"use client"

import { useRouter } from "next/router";



const page = ({params} : {params: string}): JSX.Element => {
  const router = useRouter();
    return (
    <div>
      <h1>Nombre: {router.query.name}</h1>
    </div>
  )
}

export default page