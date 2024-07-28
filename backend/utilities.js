const Cryptr = require('cryptr');
require('dotenv').config()

const cryptro = new Cryptr(process.env.SECRET_KEY);

const sample_error = (data) => ({
   status : false,
   error: true,
   data: data,
})

const sample_success = (data)=> ({
   status : true,
   error: false,
   data: data,
})
 
const decrypt = (data) => {
   const decryptedData = cryptro.decrypt(data);
   return decryptedData
 };

const timestamp = new Date().toISOString();

module.exports = {sample_error,sample_success,decrypt,timestamp}