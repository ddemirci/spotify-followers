import React, {useState} from "react";
import Playlist from '../components/Playlist';

export default function Playlists() {

    const [playlists, setPlaylists] = useState(true);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [userId, setUserId] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function handleUserIdChange(event){
        setUserId(event.target.value);
    }

    function fetchPlaylists() {
        setIsLoading(true);
        if (!userId) {
            throw new Error('Invalid user id.')
        }
        fetch(`http://localhost:3000/playlist/${userId}`)
            .then(res => {
                if (res.status !== 200) {
                    setIsLoading(false);
                }
                return res.json();
            })
            .then(resData => {
                setPlaylists(resData.playlists);
                setIsLoading(false);
            })
    }

    if (isFirstLoad) {
    return (
        <div>
          <div>
            <input className="spotify-user-id black" id="spotify-user-id" type="text" value={userId} onChange={(e) => { handleUserIdChange(e) }} />
            <button
                onClick={fetchPlaylists}
            >
              Get Playlists
            </button>
          </div>
          <div>
            Hey you ! Please, enter your spotify id above to get your playlists.
          </div>
        </div>
    )
  }
  else if (isLoading) {
    return (
        <div>Loading</div>
    )
  }
  else{

        const playlistComponents = playlists.map((playlist, i) => {
            return <Playlist key={i} playlistItem={playlist} />
        })

        const playlistsInfo = playlistComponents.length > 0 ? <div className="center display-container"> {playlistComponents} </div> : 'You don\'t have any playlist. Volume up!';

        return (
            <div>
                <div>
                    <input className="spotify-user-id" id="spotify-user-id" type="text" value={userId} onChange={(e) => { handleUserIdChange(e) }} />
                    <button className="primary" onClick={fetchPlaylists}> Get Playlists </button>
                </div>
                <div className="center container-header">Playlists ({playlists.length}) </div>
                <div className="playlists-container playlists-container">
                    {playlistsInfo}
                </div>
            </div>
        )
    }
}