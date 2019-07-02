const prod = { 
  API_ROOT: 'https://friendlyneighbourserver.herokuapp.com',
  API_WS_ROOT: 'wss://friendlyneighbourserver.herokuapp.com/cable'
};

const dev = {
  API_ROOT: 'http://localhost:3001',	 
  API_WS_ROOT: 'ws://localhost:3001/cable' 
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;