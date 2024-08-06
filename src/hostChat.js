let link;

if(process.env.REACT_APP_COPY == '0') link = `https://linux-news-chat.onrender.com`;
if(process.env.REACT_APP_COPY == '1') link = `https://news-chat1.onrender.com`;

const HOST_CHAT = process.env.NODE_ENV == 'production'? link : 'http://localhost:4000'

export default HOST_CHAT;