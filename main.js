import { API } from "./scripts/api.js";
import { elements, renderPlayingInfo, updateTitle } from "./scripts/ui.js";


// api class'ının bir örneğini oluşturma
const api = new API();


// sayfa yüklendiği anda api'a istek atıp
// populer müzikleri listeler
document.addEventListener("DOMContentLoaded", async () =>
await api.getPopular()
 );

 // parametre olarak aldığı müziği çalar
 const playMusic = (url) => {
    // oynatılacak müziğin url'ini HTML'e aktarma
    elements.audioSource.src = url;

    // audio elementinin müziği yüklemesini sağlar
    elements.audio.load();
    // müziği oynatma metodu
    elements.audio.play ();
 }

// listede tıklamalarda çaşılır
const handleClick = (e) => {

    if(e.target.id === "play-btn"){
        // kapsayıcı kart elemanına erişme
        const parent = e.target.closest(".card");

        // oynatılacak müziğin bilgilerini ekrana basma
        renderPlayingInfo(parent.dataset);
        
        // müziği oynatma
        playMusic(parent.dataset.url);
    }
}

 // liste alanındaki tıklamaları izleme
 document.addEventListener("click", handleClick);

 // fotoğrafı döndürme
 const animatePhoto = (e) => {
    const img = document.querySelector(".info img");
    img.className = "animate";
 }

 const stopAnimation = (e) => {
    const img = document.querySelector(".info img");
    img.classList.remove("animate");
 }

 // müziğin oynatma olayını izleme
 elements.audio.addEventListener("play", animatePhoto);
 elements.audio.addEventListener("pause", stopAnimation);

 // form olaylarını izleme
 elements.form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const query = e.target[0].value;
    if(!query) return;

    // başlığı güncelleme
    updateTitle(`${query} Results`);

    // aratılan kelimeyle eşleşen müzikleri çeker
    api.searchMusic(query);
 })