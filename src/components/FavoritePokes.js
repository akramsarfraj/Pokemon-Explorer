import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bounce, toast, ToastContainer } from 'react-toastify'

function FavoritePokes() {
  let [pokeData, setPokeData] = useState([])

  useEffect(() => {

    let store = localStorage.getItem("pokeData")
    setPokeData(JSON.parse(store))
  }, [])

  function handleDelete(id) {

    let update = pokeData.filter((e)=>{
       if(e.id !== id){
         return e
       }
    })
    
    toast("Pokemon remove as Favorite")
    localStorage.setItem("pokeData",JSON.stringify(update))
    
    setPokeData(update)
    
  }

  return (

    <div className=' p-2 gap-2 flex-wrap justify-center flex border-[1px]'>
      {
        pokeData === null && <>No Pokemon mark as Favorites</>
      }
      {
        pokeData.length === 0 && <>No Pokemon mark as Favorites</>
      }
      {
        pokeData!==null && pokeData.map((data) => {
          return (
          <div key={data.id} className='p-2 border-[1px] border-gray-500   w-72 h-auto rounded-md'>

            <p className='flex justify-between '><span className='uppercase font-medium'>{data.name}</span> </p>
            <img className='border-[1px] border-yellow-300 rounded-md h-48 mt-2 w-72' src={data.sprites.front_default} alt={data.name} />
            <p>#{data.id}</p>
            <Link to={`/details/${data.id}`}><button className='ml-4 w-60 m-auto rounded-md ring-1 ring-green-300  hover:bg-green-300 box'>More Detail</button></Link>
            <button onClick={() => { handleDelete(data.id) }} className='w-60 m-auto rounded-md mt-1 ml-4 ring-1 ring-yellow-300  hover:bg-yellow-300 box'>Remove Favorite</button>
            <ToastContainer
              position="bottom-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              transition={Bounce}
            />
          </div>
          )
        })
      }
    </div>
  )
}

export default FavoritePokes