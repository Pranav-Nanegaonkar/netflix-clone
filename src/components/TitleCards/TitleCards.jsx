import React, { useEffect, useRef, useState } from 'react'
import "./TiltleCards.css"
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'



const TitleCards = ({ title, category }) => {

  const [apiData, setapiData] = useState([])
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjVlMDA3ZWJkMjc0N2M5YjZmNGQ1ZDRkN2Y4YzViMCIsIm5iZiI6MTc1MjA4MzUxNi43OTUsInN1YiI6IjY4NmVhYzNjODI5YzVlNTliNWU4MDVhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YcOv8Zhd5Ur6yn0zmoYcp9Ezt8dAy-C-Ir_1lImeMnQ'
    }
  };

  const handelWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setapiData(res.results))
      .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel', handelWheel);
  }, [])

  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef} >
        {apiData.map((card, index) => {
          return <Link to={`/player/${card.id}`} className='card' key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards