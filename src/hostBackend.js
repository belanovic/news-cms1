let link;

if(process.env.REACT_APP_COPY == '0') link = `https://linux-news-backend.onrender.com`;
if(process.env.REACT_APP_COPY == '1') link = `https://news-backend1-jazp.onrender.com`;

const HOST_BACKEND = process.env.NODE_ENV == 'production'? link : 'http://localhost:4000'

export default HOST_BACKEND;