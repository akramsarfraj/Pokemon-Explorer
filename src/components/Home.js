import React, { useEffect, useState } from 'react'
import axios from 'axios';
import PokeCard from './PokeCard';
import CardSkeleton from './CardSkeleton';




function Home() {
  let [perPage, setPerPage] = useState(10)
  let [pokeData, setPokeData] = useState([])
  let [types, setTypes] = useState([])
  let [isLoading, setIsLoading] = useState(true)
  let [search, setSearch] = useState("")
  let [pageNo, setPageNo] = useState(1)


  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/type")
      .then((res) => {
        setTypes(res.data.results)
      })
      .catch((err) => {
        console.log(err);
      })

  }, [types.length ===0])


  useEffect(() => {
    const controller = new AbortController()
    
    const fetchPoke = async () => {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${perPage}&offset=${(pageNo - 1) * perPage}`,{
          signal:controller.signal
        });
        const pokeDetails = await Promise.all(
          res.data.results.map(async (element) => {
            const data = await fetchPokeDetail(element.url);
            return data;
          })
        );
        setPokeData(pokeDetails);
      } catch (err) {

        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPoke();

    return () => {
      controller.abort();
    };

  }, [search.length == 0, pageNo, perPage,types.length===0])







  async function fetchPokeDetail(url) {

    try {
      let response = await axios.get(url);
      return response.data

    } catch (error) {

      console.log(error);

    }

  }

  function handleSearch() {

    let searchData = pokeData.filter((e) => {
      let name = e.name
      if (name.startsWith(search)) {
        return e
      }
    })
    setPokeData(searchData)


  }



  function handleFilter(type) {

    if (type != "") {

      let fil = []

      for (const e of pokeData) {
        let ty = e.types
        for (const el of ty) {
          if (el.type.name === type) {
            fil = [...fil, e]
          }
        }
      }

      setPokeData(fil)
    }




  }

  return (
    <div>
      <div className='flex flex-col gap-1 justify-between p-2 sticky top-[64px] bg-green-500 sm:flex-row '>
        <div className='flex items-center gap-1'>
          <input className='border-[1px] rounded-md h-8 border-indigo-400 w-[350px] placeholder:p-1
           text-gray-800 focus:outline-none pl-1  border-blue-900'

            type='text' placeholder='Search Pokémon'
            value={search}
            onChange={(e) => { setSearch(e.target.value.toLowerCase()) }}
          />
          <button onClick={handleSearch} className='border-[1px] rounded-md bg-blue-400 w-20 h-8 text-white hover:bg-sky-600 active:bg-indigo-700'>Search</button>
        </div>

        <div className='text-white'>
          Filter By Type :
          <select className='capitalize ml-1 h-6 w-[150px] text-black rounded-md border-blue-300  focus:outline-none' onChange={(e) => {
            handleFilter(e.target.value)
          }}>
            <option value="">select type</option>
            {
              types.map((e, i) => {
                return (
                  <option key={i} value={e.name} >
                    {e.name}
                  </option>
                )
              })
            }
          </select>
          <button onClick={()=>{setTypes([])}} className='font-bold  border-none h-8 ml-2 text-[12px] uppercase hover:text-orange-600'>Clear all</button>
        </div>
      </div>



      <div className=' p-2 gap-2 flex-wrap justify-center flex border-[1px]'>
        {
          isLoading === true ? <>{Array(8).fill(0).map((r, i) => { return <CardSkeleton key={i} /> })} </> : <></>
        }

        {
          pokeData.length === 0 && !isLoading && <p>No Pokemon</p>
        }
        {
          pokeData.map((e, i) => {
            return (
              <PokeCard key={e.id} data={e} />
            )
          })
        }

      </div>

      <div className="flex justify-center items-center gap-8 m-3">
        <button disabled={pageNo === 1} onClick={() => { setPageNo(prev => prev - 1) }} className="rounded-md border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
          </svg>
        </button>

        <p className="text-slate-600">
          Page <strong className="text-slate-800">{pageNo}</strong> of&nbsp;<strong className="text-slate-800">{perPage === 10 ? 130 : Math.floor(1302 / perPage)}</strong>
        </p>

        <button disabled={pageNo === Math.floor(1302 / perPage)} onClick={() => { setPageNo(prev => prev + 1) }} className="rounded-md border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </button>

        Per Page:
        <select id="page" onChange={(e) => { setPerPage(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="10" selected>10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  )
}

export default Home