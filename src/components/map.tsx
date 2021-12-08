import React, {useEffect, useRef, useState} from "react";
import { motion } from "framer-motion";
import { TrafficControl,YMaps, Map,GeolocationControl,FullscreenControl,RouteButton,ZoomControl,Placemark,SearchControl} from 'react-yandex-maps';

export default function Home() {
  const [ymaps, setYmaps] = useState(null);
    console.log(ymaps)
  const config = {
    type: "spring",
    damping: 20,
    stiffness: 100
  };
      const [bounds, setBounds] = useState(null);
      console.log(bounds)
      const mapRef = useRef(null);
      useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setBounds(bounds);
      // console.log(bounds);
    }
  }, [bounds]);
  return (
      <div>
      <div className="section">
        <motion.h1
          transition={config}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ x: 0, opacity: 0 }}
        >
          <YMaps

              enterprise
              query={{
                lang:'en_RU',
                apikey:'7acd9319-78e1-4abe-a6af-d64c62828777',

              }}

              options={{width:'100%'}}
            >
                  <Map
                      instanceRef={(e) =>
                      setInterval(()=>{
                          console.log(e)
                      },5000)
                      }
                      modules={[
                        "multiRouter.MultiRoute",
                        "coordSystem.geo",
                        "geocode",
                        "util.bounds"
                      ]}
                      onLoad={(ymaps)=>{
                            setYmaps(ymaps)
                            const points = [
                              [55.984758, 39.938521],
                              [55.684758, 37.738521]
                            ];
                            setBounds(ymaps.util.bounds.fromPoints(points));
                      }}
                    width='100%'

                    defaultState={{
                      center: [40.993599, 71.677452],
                      zoom: 9,
                      controls: [],
                    }}>
                        <Placemark modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}    />
                        <GeolocationControl options={{ float: 'left' }}  />
                        <FullscreenControl />
                        <SearchControl />
                        <TrafficControl options={{ float: 'right'}} />
                        <RouteButton options={{float:'left',bottom:'0'}} />
                        <ZoomControl options={{ float: 'right' }} />
                  </Map>
                </YMaps>
        </motion.h1>
      </div>
      <style jsx>{``}</style>
      </div>
  );
}
