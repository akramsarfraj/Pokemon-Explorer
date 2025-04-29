import React, { useEffect, useState } from 'react'

function PokeCard({ data }) {
  let [type, setTypes] = useState([])
  
  useEffect(() => {
    let ty = []


    // retriving the type img
    for (const e of data.types) {
      let url = e.type.url
      let l = url.length
      let substring = url.substring(l - 3, l - 1)
     

      if(substring.includes("/")){
        ty.push("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-vi/omega-ruby-alpha-sapphire/"+substring+".png")
      }else{
        ty.push("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-vi/omega-ruby-alpha-sapphire/"+substring+".png")
      }

    }

    setTypes(ty)
  }, [])

 

  return (
    <div className='p-2 border-[1px] border-gray-500  w-72 h-96 rounded-md'>

      <p className='flex justify-between '><span className='uppercase font-medium'>{data.name}</span> <span>{data.stats[0].base_stat} Hp</span> </p>

      <img className='border-[1px] border-yellow-300 rounded-md h-48 mt-2 w-72' src={data.sprites.other.dream_world.front_default} alt='poke' />

      <div className='flex flex-col gap-3 mt-3'>
        <p className='flex gap-3'>Types
          {
            type.map((e, i) => {
              return (
            
                  <img src={e} key={i} alt='type'/>
                
              )

            })
          }
        </p>
        <p>#{data.id}</p>
      </div>

    </div>
  )
}

export default PokeCard