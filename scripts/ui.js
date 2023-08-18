
// HTML'den gelenler
export const elements = {
   list: document.querySelector(".list"),
   audio: document.querySelector("audio"),
   audioSource: document.querySelector("audio source"),
   playingInfo: document.querySelector(".playing .info"),
   form: document.querySelector("form"),
   title: document.querySelector(".songs h2"),
   
};

// her bir müzik için ekrana bir kart basma
export const renderSongs =(songs) =>{
    // aratılınca eskiden eklenen şarkıları temizleme
    elements.list.innerHTML= "";

    songs.forEach((song)=>{

        // div oluşturma
       const div = document.createElement("div");

       // class verme
       div.className = "card";

       // kart elemanına bazı verileri ekleme
        div.dataset.url = song.hub?.actions?.pop()?.uri;
        div.dataset.title = song.title;
        div.dataset.img = song.images.coverart;

       // içeriğini belirleme
       div.innerHTML = `
       <figure>
          <img src="${song.images.coverart}">
            <div class="play">
            <i id="play-btn" class="bi bi-play-circle-fill"></i>
             </div>
          </figure>
            <h4>${song.subtitle}</h4>
            <p>${song.title}</p>
       `;
       // HTML'e gönderme
       elements.list.appendChild(div);
    });
};

// oynatılan şarkının bilgilerini ekrana basma metodu
export const renderPlayingInfo = (song) =>{
    elements.playingInfo.innerHTML = `
         <img id="info-img" src="${song.img}"
         />
            <div>
                <p>Playing Now...</p>
                <h3>${song.title}</h3>
            </div>
    `;
};


// başlık metnini güncelleme
export const updateTitle = (message) => {
    elements.title.innerHTML = message;
};