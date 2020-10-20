import React, {useEffect, useState} from 'react';
import mapMarkerImg from '../images/map-marker.svg';
import {Link} from 'react-router-dom';
import {FiPlus, FiArrowRight} from 'react-icons/fi'
import "../styles/pages/OrphanagesMap.css";
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';

import mapIcon from '../utils/mapIcon';
import api from '../services/api';

interface Orphanage{
    id: number;
    latitude: number;
    longitude: number;
    name: string
}

function OrphanagesMap(){

    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
            console.log(response.data)
        });
    }, []);

return (

   <div id="page-map">
       <aside>
           <header>
               <img src={mapMarkerImg} alt="Happy"/>
               <h2>Escolha um orfanato no mapa</h2>
               <p>Muitas crianças estão esperando a sua visita :)</p>
           </header>

           <footer>
           <strong>Pindamonhangaba   -   <span>São Paulo</span></strong>
          
           </footer>

       </aside>

        <Map center={[-22.9267769,-45.4523853]} zoom={15} style={{width: '100%', height: '100%' }} className="map-popup">
            <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

            {orphanages.map(orphanage => {
                return(
                    <Marker icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]} key={orphanage.id}>
                    <Popup closeButton={false} minWidth={240} maxWidth={240}>
                        {orphanage.name}
                        <Link to={`/orphanages/${orphanage.id}`}>
                            <FiArrowRight size={20} color="#fff" ></FiArrowRight>
                        </Link>
                    </Popup>
                </Marker>
                )
            })} 

        </Map>

        <Link to="/orphanages/create" className="create-orphanage">
            <FiPlus size={32} color="#FFF"></FiPlus>
        </Link>

   </div>
)

}

export default OrphanagesMap;