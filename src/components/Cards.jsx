import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cards = (props) => {

  const [cards, setCards] = useState([])

  useEffect(() => {
    async function getCards() {
      const response = await axios.get(`https://api.inaturalist.org/v1/observations?lat=42.081483&lng=-76.168993&radius=5&iconic_taxa=${props.showCards}&taxon_summary`)
      setCards(response.data.results)
      // console.log(response.data.results[0].default_photo.medium_url)
      //console.log(response.data.results)

    }
    getCards()

  }, [props.showCards])

  return (

    <div className='band'>
      {
        cards.map((card) => (
          <div key={card.id}>
            <a href="https://www.inaturalist.org" className="card">
              <div className="thumb" style={{ backgroundImage: `url(${card.taxon.default_photo.url})` }}></div>
              <article>
                <h1>{card.taxon.preferred_common_name}</h1>
                <span>iNaturalist.org</span>
              </article>
            </a>
          </div>
        ))
      }
    </div>
  )
};

export default Cards;