const crypto = require('crypto');
const uuid = require('uuid');
const Config = require('./config');

const method = Config.method;
const base_url = Config.base_url;
const secret_key = Config.secret_key;

const oauth_timestamp = Math.floor(Date.now() / 1000);
const oauth_nonce = uuid.v1();

const parameters = {
    ...Config.queryParameters,
    oauth_consumer_key: Config.consumer_key,
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: oauth_timestamp,
    oauth_nonce: oauth_nonce,
    oauth_version: '1.0'
}
let ordered = {};
Object.keys(parameters).sort().forEach(function(key) {
  ordered[key] = parameters[key];
});
let encodedParameters = '';
for (k in ordered) {
    let encodedValue = escape(ordered[k]);
    let encodedKey = encodeURIComponent(k);
    if(encodedParameters === ''){
        encodedParameters += `${encodedKey}=${encodedValue}`;
    }
    else{
        encodedParameters += `&${encodedKey}=${encodedValue}`;
    } 
}
console.log(encodedParameters);

const encodedUrl = encodeURIComponent(base_url);
encodedParameters = encodeURIComponent(encodedParameters);

const signature_base_string = `${method}&${encodedUrl}&${encodedParameters}`

console.log(signature_base_string);

const signing_key = `${secret_key}&`; //as token is missing in our case.

const oauth_signature = crypto.createHmac('sha1', signing_key).update(signature_base_string).digest().toString('base64');

console.log(oauth_signature);

const encoded_oauth_signature = encodeURIComponent(oauth_signature);

console.log(encoded_oauth_signature);

const authorization_header = `OAuth oauth_consumer_key="${Config.consumer_key}",oauth_signature_method="HMAC-SHA1",oauth_timestamp="${oauth_timestamp}",oauth_nonce="${oauth_nonce}",oauth_version="1.0",oauth_signature="${encoded_oauth_signature}"`

console.log(authorization_header);