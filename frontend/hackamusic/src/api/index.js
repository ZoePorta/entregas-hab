//IMPORTADNDO LA API KEY
import config from "./config.js";
const { apiKey } = config;

//IMPORTANDO AXIOS
const axios = require("axios").default;

//RUTA A LA API
let search = "TopTracks";
const BASE_URL = "https://ws.audioscrobbler.com/";
let URL_METHOD = "2.0/?method=chart.gettoptags";
const URL_GEO = `&country=spain&api_key=${apiKey}&format=json`;

//FUNCION PARA COGER LOS TOP TAGS
async function getTopTags() {
  try {
    URL_METHOD = "2.0/?method=chart.gettoptags";
    const response = await axios.get(`${BASE_URL}${URL_METHOD}${URL_GEO}`);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

//FUNCION PARA COGER LOS TOP ARTISTS
async function getTopArtists() {
  try {
    URL_METHOD = "2.0/?method=geo.gettopartists";
    const response = await axios.get(`${BASE_URL}${URL_METHOD}${URL_GEO}`);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

//FUNCION PARA COGER LOS TOP TRACKS
async function getTopTracks() {
  try {
    URL_METHOD = "2.0/?method=geo.gettoptracks";

    const response = await axios.get(`${BASE_URL}${URL_METHOD}${URL_GEO}`);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

//FUNCION PARA BUSCAR POR NOMBRE DE ARTISTA
async function getArtistsByName(name) {
  try {
    URL_METHOD = `2.0/?method=artist.search&artist=${name}`;
    const response = await axios.get(`${BASE_URL}${URL_METHOD}${URL_GEO}`);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

//FUNCION PARA BUSCAR POR NOMBRE DE TEMA
async function getTracksByName(name) {
  try {
    URL_METHOD = `2.0/?method=track.search&track=${name}`;
    const response = await axios.get(`${BASE_URL}${URL_METHOD}${URL_GEO}`);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

//FUNCION PARA OBTENER MÁS INFORMACIÓN DEL ARTISTA
async function getArtistInfo(mbid) {
  try {
    URL_METHOD = `2.0/?method=artist.getinfo&mbid=${mbid}&lang=es`;
    const response = await axios.get(`${BASE_URL}${URL_METHOD}${URL_GEO}`);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

//FUNCION PARA OBTENER MÁS INFORMACIÓN DEL TEMA
async function getTrackInfo(mbid) {
  try {
    URL_METHOD = `2.0/?method=track.getinfo&mbid=${mbid}&lang=es`;
    const response = await axios.get(`${BASE_URL}${URL_METHOD}${URL_GEO}`);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

//FUNCION PARA OBTENER MÁS INFORMACIÓN DEL TAG
async function getTagInfo(name) {
  try {
    URL_METHOD = `2.0/?method=tag.getinfo&tag=${name}&lang=es`;
    const response = await axios.get(`${BASE_URL}${URL_METHOD}${URL_GEO}`);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export default {
  getTopTags,
  getTopArtists,
  getTopTracks,
  getArtistsByName,
  getArtistInfo,
  getTrackInfo,
  getTagInfo,
  getTracksByName,
};
