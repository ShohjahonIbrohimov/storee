import React, { useRef } from "react";
// import ReactDOM from "react-dom";
import {YMaps, Map, Placemark, GeolocationControl, ZoomControl,FullscreenControl} from "react-yandex-maps";
// import {useDispatch, useSelector} from "react-redux";
// import getcoordinates from "../../Redux/Actions/MapCoordinates"
// import {log} from "util";


const Map_Shop = (props) =>  {
    const coordinate = props.coordinate === null ? [41.316441,69.294861] : props.coordinate
    const mapState = { center: coordinate, zoom: 15 };
    // const dispatch = useDispatch()
    // const [ymaps, setYmaps] = useState(null);
    // const [text, setText] = useState(null);
    // const [bounds, setBounds] = useState(null);
    // const routes = useRef();
    const mapRef = useRef(null);
    // const searchRef = useRef(null);
    // const formData = new FormData()
    // useEffect(() => {
    //   if (text && searchRef.current) {
    //     searchRef.current.search(text);
    //   }
    // }, [text]);
    //
    // useEffect(() => {
    //   if (mapRef.current) {
    //     mapRef.current.setBounds(bounds);
    //   }
    // }, [bounds]);

    // const getRoute = (ref) => {
    //   if (ymaps) {
    //     const multiRoute = new ymaps.multiRouter.MultiRoute(
    //       {
    //         // Описание опорных точек мультимаршрута.
    //         referencePoints: [[41.316441,69.294861]],
    //         // Параметры маршрутизации.
    //         params: {
    //           // Ограничение на максимальное количество маршрутов, возвращаемое маршрутизатором.
    //           results: 2
    //         }
    //       },
    //       {
    //         // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
    //         boundsAutoApply: true,
    //         // Внешний вид линии маршрута.
    //         routeActiveStrokeWidth: 6,
    //         routeActiveStrokeColor: "#fa6600"
    //       }
    //     );
    //
    //     routes.current = multiRoute;
    //     ref.geoObjects.add(multiRoute);
    //   }
    // };
    //
    // const getRoutes = () => {
    //   mapRef.current.geoObjects.each((item) => console.log(item,"getRoutes"));
    // };

    return (
        <div className="App">
            <YMaps version="2.1.77"
                   query={{
                       lang:'en_RU',
                       apikey:'7acd9319-78e1-4abe-a6af-d64c62828777',

                   }}>
                <Map
                    width="100%"
                    height={450}
                    modules={[
                        "multiRouter.MultiRoute",
                        "coordSystem.geo",
                        "geocode",
                        "util.bounds"
                    ]}
                    // onLoad={(ymaps) => {
                    //   setYmaps(ymaps);
                    // }}
                    state={mapState}
                    instanceRef={(ref) => {
                        if (ref) {
                            mapRef.current = ref;
                            // ref.setBounds(bounds);
                        }
                    }}
                    // instanceRef={ref => ref && getRoute(ref)}
                >
                    {coordinate !== undefined ? <Placemark geometry={coordinate} /> : ""}
                    {/*<SearchControl*/}
                    {/*    instanceRef={(ref) => {*/}
                    {/*        if (ref) searchRef.current = ref;*/}
                    {/*    }}*/}
                    {/*    options={{*/}
                    {/*        float: "right",*/}
                    {/*        provider: "yandex#search",*/}
                    {/*        size: "large"*/}
                    {/*    }}*/}
                    {/*/>*/}
                    {/*<GeoObject*/}
                    {/*geometry={{*/}
                    {/*    type:"LineString"*/}
                    {/*}}*/}
                    {/*/>*/}

                    <ZoomControl/>
                    <GeolocationControl />
                    <FullscreenControl />
                    {/* <RouteEditor /> */}
                </Map>
            </YMaps>

        </div>
    );
}
export default Map_Shop;