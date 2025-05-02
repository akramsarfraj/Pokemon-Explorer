import React, { memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bounce, toast, ToastContainer } from 'react-toastify'

function PokeCard({ data }) {
  let [type, setTypes] = useState([])



  useEffect(() => {
    let ty = []


    // retriving the type img
    for (const e of data.types) {
      let url = e.type.url
      let l = url.length
      let substring = url.substring(l - 3, l - 1)


      if (substring.includes("/")) {
        ty.push("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-vi/omega-ruby-alpha-sapphire/" + substring + ".png")
      } else {
        ty.push("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-vi/omega-ruby-alpha-sapphire/" + substring + ".png")
      }

    }

    setTypes(ty)
  }, [])


  function handleSubmit() {
    let store = localStorage.getItem("pokeData")

    if (store === null) {
      let cache = [data]
      localStorage.setItem("pokeData", JSON.stringify(cache))
      
      toast("Pokemon mark as Favorite")
    } else {

      let cache = JSON.parse(store)
  
      let exist = cache.some(poke => poke.id === data.id)
      if (!exist) {
        cache = [...cache, data]
        localStorage.setItem("pokeData", JSON.stringify(cache))
        toast("Pokemon mark as Favorite")
      }else{
        toast("Pokemon already mark as Favorite",{
          theme:'light'
        })
      }

      
    }

   
  }


  return (
    <div className='p-2 border-[1px] border-gray-500  w-72 h-auto rounded-md'>

      <p className='flex justify-between '><span className='uppercase font-medium'>{data.name}</span> <span>{data.stats[0].base_stat} Hp</span> </p>

      <img className='border-[1px] border-yellow-300 rounded-md h-48 mt-2 w-72' src={data.sprites.front_default} alt='poke' />

      <div className='flex flex-col gap-2 mt-3'>
        <p className='flex gap-3'>Types
          {
            type.map((e, i) => {
              return (

                <img src={e} key={i} alt='type' />

              )

            })
          }
        </p>
        <p>#{data.id}</p>
        <Link to={`/details/${data.id}`}><button className='ml-4 w-60 m-auto rounded-md ring-1 ring-green-300  hover:bg-green-300 box'>More Detail</button></Link>
        <button onClick={handleSubmit} className='w-60 m-auto rounded-md ring-1 ring-yellow-300  hover:bg-yellow-300 box'>Favorite</button>
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

    </div>
  )
}

export default memo(PokeCard)