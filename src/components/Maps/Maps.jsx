// import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
// import Places from "../../Data/Places";
// import HeaderForHome from "../HeaderForHome/HeaderForHome";
// import "./Maps.scss";

// export default function Maps() {
//   return (
//     <div className="map">
//       <HeaderForHome />
//       <APIProvider apiKey={process.env.REACT_APP_API_KEY_GOOGLE_MAP}>
//         <Map
//           zoom={2.5}
//           center={{ lat: 26.3351, lng: 17.2283 }}
//           options={{ streetViewControl: false, mapTypeControl: false }}
//         >
//           {Places.map((point, index) => (
//             <Marker position={point} key={index}></Marker>
//           ))}
//         </Map>
//       </APIProvider>
//     </div>
//   );
// }
