import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import PokeCard from './components/PokeCard';
import CardSkeleton from './components/CardSkeleton';


function App() {
  let [pokeData, setPokeData] = useState([])
  let [types, setTypes] = useState([])
  let [isLoading, setIsLoading] = useState(true)
  let [search, setSearch] = useState("")

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/type")
      .then((res) => {
        setTypes(res.data.results)
      })
      .catch((err) => {
        console.log(err);
      })

  },[])


  useEffect(() => {

    fetchPoke()
  }, [search])



  // fetching all pokemon data 
  async function fetchPoke() {

    try {

      let res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=150")
      const poke = [];

      for (const element of res.data.results) {
        const data = await fetchPokeDetail(element.url);
        poke.push(data);
      }

      setPokeData(poke)
      setIsLoading(false)
    } catch (error) {
      console.log(error);
    }

  }



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
    <div className="App">
      <div className='sticky top-0 flex justify-center items-center h-16 bg-[#50d71e] text-white'>
        <h2 className='font-mono uppercase text-[25px]'>Pokemon Cards</h2>
      </div>
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
          <button onClick={fetchPoke} className='font-bold  border-none h-8 ml-2 text-[12px] uppercase hover:text-orange-600'>Clear all</button>
        </div>
      </div>



      <div className=' p-2 gap-2 flex-wrap justify-center flex border-[1px]'>
        {
          isLoading === true ? <>{Array(8).fill(0).map(() => { return <CardSkeleton /> })} </> : <></>
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

    </div>
  );
}

export default App;
