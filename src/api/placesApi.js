import axios from "axios";

const fetchPlaces = async (latitude, longitude, q, setPlaces) => {
  const radius = 5000;
  const response = await axios.get(
    `https://discover.search.hereapi.com/v1/discover`,
    {
      params: {
        apiKey: process.env.REACT_APP_HEREMAP_APIKEY,
        at: `${latitude},${longitude}`,
        q: q,
        limit: 50,
        radius: radius,
      },
    }
  );
  const items = response.data.items.map((item) => {
    return {
      title: item.title,
      description: item.address.label,
      avatar: item.icon,
      latitude: item.position.lat,
      longitude: item.position.lng,
      type: item.title,
    };
  });
  setPlaces(items);
};

export default fetchPlaces;
