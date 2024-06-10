import React from 'react'
import { Routes ,Route} from 'react-router-dom'
import Navbar from './Navbar'
import { albumsData,songsData } from '../assets/assets'
import AlbumItem from './AlbumItem'
import SongItems from './SongItems'

const DisplayHome = () => {
  return (
    <>
      <Navbar/>
      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Featued Charts</h1>
        <div className='flex overflow-auto'>
        {
            albumsData.map((item,index)=>(
                  <AlbumItem key={index} name={item.name} desc={item.desc}
                  id={item.id} image={item.image}/>
            ))
          }
        </div>
          
      </div>
      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Todays's biggest hits</h1>
        <div className='flex overflow-auto'>
        {
            songsData.map((item,index)=>(
                  <SongItems key={index} name={item.name} desc={item.desc}
                  id={item.id} image={item.image}/>
            ))
          }
        </div>
          
      </div>
    </>
  )
}

export default DisplayHome
