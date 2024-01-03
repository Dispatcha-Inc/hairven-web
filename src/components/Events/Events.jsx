import React from 'react'
import { useSelector } from 'react-redux';
import styles from '../../styles/styles'
import ProductCard from '../Route/ProductCard/ProductCard';

const Events = () => {
  const {allEvents,isLoading} = useSelector((state) => state.events); 
   
  return (
    <div>
     {
      !isLoading && (
        <div className={`${styles.section} container mx-auto`}>

      <div className="flex flex-col bg-gradient-to-b from-[#F875AA] to-[#FFDFDF] border-0 pt-6 px-6">
        <div className={`${styles.heading} flex justify-between text-white`}>
          <h1 className="text-start text-[26px] cursor-pointer">Popular Events</h1>
          <h6 className="text-end text-[22px] cursor-pointer">See more</h6>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[25px]">
          {
          allEvents.length !== 0 && (
            // <EventCard data={allEvents && allEvents[0]} />
            <>
               {allEvents && allEvents.slice(0, 5).map((i, index) => <ProductCard data={i} key={index} source="events"/>)}
              </>
          )
         }
         <h4>{
           allEvents?.length === 0 && (
            'No Events have!'
           )
          }

         </h4>
        </div>
         
      </div>
     
    </div>
      )
     }
  </div>
  )
}

export default Events