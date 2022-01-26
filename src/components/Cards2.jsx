import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';

const TOTAL_PAGES = 10;

const Item = ({ children, reference }) => {
  return (
    <div ref={reference}>
      {children}
    </div>
  );
};

const Loader = () => {
  return (

    <p>Loading...</p>

  )
}

const Cards = (props) => {

  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [pages, setPages] = useState(1);
  const observer = useRef();

  // const resetState = () => {
  //   setPages(1)
  // }

  useEffect(() => {

    // let reset = `${props.resetState}`

    // if(reset) {
    //   resetState()
    // } else {
    //   setPages((pages) => pages + 1); 
    // }

    getCards()
    setPages((pages) => pages + 1); 
    

  }, [props.showCards, props.resetState])

  const lastItemRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          if (pages < TOTAL_PAGES) {
            getCards(pages);
            setPages((pages) => pages + 1);
          } else {
            setHasMore(false);
          }
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, props.resetState, pages]
  );

  const getCards = async (page) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://api.inaturalist.org/v1/observations?lat=42.081483&lng=-76.168993&radius=5&iconic_taxa=${props.showCards}&taxon_summary&page=${pages}&per_page=5`)
      // setCards(response.data.results)

      // let reset = `${props.resetState}`
      // if (pages > 1 && !reset) {
      //   setCards([...cards, ...response.data.results])
      // } else {
      //   setCards([])
      //   setCards(response.data.results)
      // }
      setCards([...cards, ...response.data.results])
      setIsLoading(false)
      console.log(response.data)
    } catch (err) {
      console.log(err)
    } finally {
      // console.log('loaded');
      document.getElementById('spinner').style.visibility = 'hidden';
      document.getElementById('content').style.visibility = 'visible';
    }

  }

  return (
    <>
      <div className='band'>

        {cards.map((card, index) =>
          index + 1 === cards.length ? (
            <Item reference={lastItemRef} key={index}>
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
            </Item>
          ) : (
            <Item key={index}>
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
            </Item>
          ))}
        {isLoading && <Loader />}
      </div>
    </>
  )
};

export default Cards;