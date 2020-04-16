const method = 'GET';
const base_url = 'https://schoolwebsite.org/campus/oneroster/schoolName/learningdata/v1/schools';
const consumer_key = `e7zjz7ZN2U4ZRhfV3WpwPA`;

const crypto = require('crypto');
const parameters = {
    offset:0,
    limit:100,
    filter:"status='active'",
    oauth_consumer_key:"soni_pandey",
    oauth_signature_method:"HMAC-SHA1",
    oauth_timestamp:"1587025108",
    oauth_nonce:"adf979a5b9e6",
    oauth_version:"1.0"
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

const signing_key = `${consumer_key}&`; //as token is missing in our case.

const oauth_signature = crypto.createHmac("sha1", signing_key).update(signature_base_string).digest().toString('base64');

console.log(oauth_signature);

const encoded_oauth_signature = encodeURIComponent(oauth_signature);

console.log(encoded_oauth_signature);