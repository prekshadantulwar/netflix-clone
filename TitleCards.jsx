import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';



const TitleCards = ({title, category}) => {

const [apiData, setApiData]=useState([]);
const cardsRef=useRef();
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNzhmNDZkNjM3YjliZTIxOWI4YmI3YzE4ZTg0N2JlOSIsIm5iZiI6MTcyODg3OTEzNS41MTA4ODMsInN1YiI6IjY3MGM5OGY1MWNhNGMzOWZkZWViNzBhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pi1UuehHpvs2fVNxt4T15DklOSE9-WVE1zvNhcwDy1g'
  }
};



const handlewheel=(event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaY;
}
useEffect(()=>{

  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(response => response.json())
  .then(response => setApiData(response.results))
  .catch(err => console.error(err));
  cardsRef.current.addEventListener('wheel',handlewheel)
},[])
  return (
    <div className='titlecards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <Link className="card-list" ref={cardsRef}>
        {apiData.map((card,index)=>{
          return <Link to ={`/player/${card.id}`}className="card" key={index}><img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
          <p>{card.original_title}</p></Link>
        })}
      </Link>
    </div>
  )
}

export default TitleCards
