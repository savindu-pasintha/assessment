const Cryptr = require('cryptr');
require('dotenv').config()

const cryptro = new Cryptr(process.env.SECRET_KEY);

const sample_error= {
   status : false
}

const sample_success= {
    status : true
}
 
const decrypt = (data) => {
   const decryptedData = cryptro.decrypt(data);
   return decryptedData
 };

module.exports = {sample_error,sample_success,decrypt}