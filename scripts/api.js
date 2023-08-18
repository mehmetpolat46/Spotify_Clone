import { renderSongs } from "./ui.js";


// yapılan istekler için kullanılan ayarlar
const url = 'https://shazam.p.rapidapi.com/charts/track?locale=en-US&listId=ip-country-chart-US';

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c5fbafb69emsh904b0562102575bp13afe9jsn59e938df8dcd',
		'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
	}
};

// api isteklerini yönettiğimiz class
export class API{
    constructor(){
        this.songs = [];
    }

        // popular müzikleri alma
    async getPopular(){
      const res = await fetch(url,options);
      const data = await res.json();

      this.songs = data.tracks;
      // ekrana populer müzikleri listeler
      renderSongs(this.songs);
    }

    // arama methodu
    async searchMusic(query){
      const res =  await fetch( `https://shazam.p.rapidapi.com/search?term=${query}&locale=en-US`,
        options);

        const data = await res.json();
        // veriyi istediğimiz hale çevirme
        // song.track yerine song'a erişince
        const newData = data.tracks.hits.map((song)=>({
            ...song.track,
        }));
        this.songs = newData;

        // aratılan şarkıları ekrana basma
        renderSongs(this.songs);
    }
}

