import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


function DetailView() {
  let [data, setData] = useState({})
 

  let { id } = useParams()
 

  useEffect(() => {


    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => {
        setData(res.data)
      })
      .catch(err => {
        console.log(err);
      })



  }, [])



  return (
    <div className='flex flex-col gap-5 p-20  items-center h-[90vh] sm:flex-row '>

      {
        Object.keys(data).length === 0 ? <>Loading.........</> :
          <>
            <div >
              <img className='border-[1px] border-yellow-300 rounded-md h-72 mt-2 w-72' src={Object.keys(data).length !== 0 && data.sprites.front_default} />
              <p>Type :{
                data.types.map((e, i) => {
                  return (

                    <span className='ml-2 capitalize'>{e.type.name}</span>

                  )

                })
              }</p>
            </div>
            <div  className='font-semibold sm:ml-40 '>
              <p className='capitalize'>Id : {data.id}</p>
              <p className='capitalize'>Name: {data.name}</p>
              <p className='capitalize'>base experience: {data.base_experience}</p>
              <p className='capitalize'>Abilities :
                <ul className='list-disc pl-10 h-20 overflow-y-auto'>
                  {
                    data.abilities.map((e) => {
                      return (
                        <li>{e.ability.name}</li>
                      )
                    })
                  }
                </ul>

              </p>
              <p className='capitalize ' >Moves :
                <ul className='list-disc pl-10 h-20 overflow-y-auto'>
                  {
                    data.moves.map((e) => {
                      return (
                        <li>{e.move.name}</li>
                      )
                    })
                  }
                </ul> 
              </p>
              
              <p className='capitalize ' >stats :
                <ul className='list-disc pl-10 h-20 overflow-y-auto'>
                  {
                    data.stats.map((e) => {
                      return (
                        <li>{e.stat.name} {e.base_stat}</li>
                      )
                    })
                  }
                </ul> 
              </p> 

              <p className='capitalize'>weight : {data.weight}</p>
            </div>

          </>

      }


    </div>


  )
}

export default DetailView