import React, { useRef } from "react";
// import ReactDOM from "react-dom";
import {YMaps, Map, SearchControl, Placemark, GeolocationControl, ZoomControl} from "react-yandex-maps";

const Map3 = (props) =>  {
  let coordinate = props.coordinate === null && !props?.coordinate ? [41.316441,69.294861] : props.coordinate
  const mapState = { center: coordinate, zoom: 12 };
  const mapRef = useRef(null);
  const searchRef = useRef(null);
  const handleplacemark= ()=>{
      if(props.coordinate !==null){
          return <Placemark onDrag={(e)=>props.set(e._sourceEvent.originalEvent.coords)}   options={{draggable: true}}   geometry={coordinate} />
      }
  }

  return (
    <div className="App">
      <YMaps version="2.1.77"
       options={{width:'100%'}}
       query={{
                lang:'en_RU',
                apikey:'7acd9319-78e1-4abe-a6af-d64c62828777',

              }}
      >
        <Map
            onClick={(e)=>{
                props.set(e._sourceEvent.originalEvent.coords)
            }
            }
            width="100%"
            height="400px"
          modules={[
                    "multiRouter.MultiRoute",
            "coordSystem.geo",
            "geocode",
            "util.bounds"
          ]}
          state={mapState}
          instanceRef={(ref) => {
            if (ref) {
              mapRef.current = ref;
            }
          }}
        >
            {handleplacemark()}
          <SearchControl
            instanceRef={(ref) => {
              if (ref) searchRef.current = ref;
            }}
            options={{
              float: "right",
              provider: "yandex#search",
              size: "large"
            }}
          />
            {/*<GeoObject*/}
            {/*geometry={{*/}
            {/*    type:"LineString"*/}
            {/*}}*/}
            {/*/>*/}

            <ZoomControl/>
            <GeolocationControl />
          {/* <RouteEditor /> */}
        </Map>
      </YMaps>

    </div>
  );
}
export default Map3;