import React from 'react';

const Cards = (props) => {

  return (

    <div className='band'>
    {
     props.cards.map((card) => (
    <div key={card.id}>
		<a  href="https://www.inaturalist.org" className="card">
           <div  className="thumb" style={{ backgroundImage: `url(${card.taxon.default_photo.url})` }}></div>           
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