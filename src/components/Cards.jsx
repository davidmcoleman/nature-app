import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cards = (props) => {

  const [cards, setCards] = useState([])

  useEffect(() => {

    const getCards = async () => {
      try {
        const response = await axios.get(`https://api.inaturalist.org/v1/observations?lat=42.081483&lng=-76.168993&radius=5&iconic_taxa=${props.showCards}&taxon_summary`)
        setCards(response.data.results)
        // console.log(response.data.results[0].default_photo.medium_url)
        //console.log(response.data.results)
      } catch (err) {
        console.log(err)
      } finally {
        console.log('loaded');
        document.getElementById('spinner').style.visibility = 'hidden';
        document.getElementById('content').style.display = 'block';
      }

    }
    getCards()

  }, [props.showCards])

  return (

    <div className='band'>
      {
        cards.map((card) => (
          <div key={card.id}>

            <a href="https://www.inaturalist.org" className="card">
              <div className="thumb" style={{ backgroundImage: `url(${card.taxon.default_photo.url})` }}>

                <div className="row">
                  {/* <img className="profile_img" src={card.user.icon} alt="Profile" /> */}
                  {card.user.icon ? <img className="profile_img" src={card.user.icon} alt="Profile" /> : <img className="profile_img" src="/missing-profile.png" alt="Profile" />}

                  <div className="text">
                    {/* <h2>{card.user.first} {props.last} </h2>
                    <p>Observed on: {card.observed_on}</p>
                    <p>Location: {card.place_guess}</p> */}
                  </div>
                </div>
              </div>
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