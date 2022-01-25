import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cards = (props) => {

  const [cards, setCards] = useState([])

  useEffect(() => {

    //api call
    const getCards = async () => {
      setCards([])
      try {
        const response = await axios.get(`https://api.inaturalist.org/v1/observations?lat=42.081483&lng=-76.168993&radius=5&iconic_taxa=${props.showCards}&taxon_summary`)
        setCards(response.data.results)
        //console.log(response.data)
      } catch (err) {
        console.log(err)
      } finally {
        // console.log('loaded');
      }

    }
    getCards()

  }, [props.showCards])



  return (

    <>
      {
        cards.length > 0 ?

          <div className='band'>
            {
              cards.map((card) => (
                <div key={card.id}>

                  <a href="https://www.inaturalist.org" className="card">
                    <div className="thumb" style={{ backgroundImage: `url(${card.taxon.default_photo.url})` }}>

                      <div className="row">
                        {card.user.icon ? <img className="profile_img" src={card.user.icon} alt="Profile" /> : <img className="profile_img" src="/missing-profile.png" alt="Profile" />}
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

          :

          <div className='loading'>
            Loading ...
          </div>
      }
    </>
  )
};

export default Cards;