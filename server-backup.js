// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
var bodyParser = require("body-parser");
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const geoip = require('geoip-lite');
// const cron = require('node-cron');
const write = require('write');

// Type 3: Persistent datastore with automatic loading
var Datastore = require('nedb')
var db = new Datastore({
  filename: 'stores.db',
  autoload: true ,
  onload: err => {
    if(err){
      console.error('Error while loading DB', err)
    }
  }

});



var allShops= [{"shop":"wheel-and-deal-inc.myshopify.com"},{"shop":"zuperteddy.myshopify.com"},{"shop":"outertrendsonline.myshopify.com"},{"shop":"life-flasks.myshopify.com"},{"shop":"salty-sadie.myshopify.com"},{"shop":"straperly.myshopify.com"},{"shop":"beaverro-store.myshopify.com"},{"shop":"the-renatural.myshopify.com"},{"shop":"nicolas-di-zazzo.myshopify.com"},{"shop":"modjuicer.myshopify.com"},{"shop":"trinity-bags.myshopify.com"},{"shop":"sulfora.myshopify.com"},{"shop":"kitty-cat-wonders.myshopify.com"},{"shop":"8th-line-creations.myshopify.com"},{"shop":"malinishopit.myshopify.com"},{"shop":"winkformula.myshopify.com"},{"shop":"sphinx-co-gem.myshopify.com"},{"shop":"the-garage-knockers.myshopify.com"},{"shop":"recyclingcpc.myshopify.com"},{"shop":"bcalm-pet.myshopify.com"},{"shop":"j-h-zane.myshopify.com"},{"shop":"teluhs.myshopify.com"},{"shop":"happymaternity.myshopify.com"},{"shop":"dog-calming-bed.myshopify.com"},{"shop":"disneymombags.myshopify.com"},{"shop":"zouqs.myshopify.com"},{"shop":"beaverro.myshopify.com"},{"shop":"theunderargument-fr.myshopify.com"},{"shop":"the-earphone-case-co.myshopify.com"},{"shop":"mamba-official.myshopify.com"},{"shop":"cervicalcloud.myshopify.com"},{"shop":"beaute-premuim.myshopify.com"},{"shop":"0-studio.myshopify.com"},{"shop":"apollo-mvmt.myshopify.com"},{"shop":"sekonioriginal.myshopify.com"},{"shop":"bioroyale.myshopify.com"},{"shop":"loveteq.myshopify.com"},{"shop":"investorhomeoffice-2.myshopify.com"},{"shop":"showernstyle.myshopify.com"},{"shop":"secretworldoflanguages.myshopify.com"},{"shop":"brockar.myshopify.com"},{"shop":"tali-store-uk.myshopify.com"},{"shop":"toffeln-shop.myshopify.com"},{"shop":"puri-collection-sujan-pulami.myshopify.com"},{"shop":"stockhype.myshopify.com"},{"shop":"malek-labs.myshopify.com"},{"shop":"mashop-official.myshopify.com"},{"shop":"lushskinclub.myshopify.com"},{"shop":"makbox-store.myshopify.com"},{"shop":"boxere-2.myshopify.com"},{"shop":"can-a-girl-catch-a-break.myshopify.com"},{"shop":"hojicha-co.myshopify.com"},{"shop":"soulcode-life.myshopify.com"},{"shop":"nakajima-jones.myshopify.com"},{"shop":"umodejewelrycom.myshopify.com"},{"shop":"lazypurrs.myshopify.com"},{"shop":"captains-gallery.myshopify.com"},{"shop":"lopadoco.myshopify.com"},{"shop":"drafttournament.myshopify.com"},{"shop":"s-sproductss.myshopify.com"},{"shop":"macleods-scottish-shop.myshopify.com"},{"shop":"beautypensystem.myshopify.com"},{"shop":"bottleswipe.myshopify.com"},{"shop":"jc2000.myshopify.com"},{"shop":"personal-beauty-cosmetics.myshopify.com"},{"shop":"essence-luxe-couture.myshopify.com"},{"shop":"viraltechmasks.myshopify.com"},{"shop":"verrific.myshopify.com"},{"shop":"vulpexaccessories.myshopify.com"},{"shop":"braveposture.myshopify.com"},{"shop":"rap.com"},{"shop":"grylls-camping.myshopify.com"},{"shop":"mpndesigns.myshopify.com"},{"shop":"commonbluejay.myshopify.com"},{"shop":"phoop.myshopify.com"},{"shop":"apps-labz.myshopify.com"},{"shop":"one-product-google-ads-store.myshopify.com"},{"shop":"system-akvile.myshopify.com"},{"shop":"7g-jewellery-store.myshopify.com"},{"shop":"bunsplint.myshopify.com"},{"shop":"peektrend.myshopify.com"},{"shop":"ottoman-jewels.myshopify.com"},{"shop":"irresistible-bands.myshopify.com"},{"shop":"vertical-cool.myshopify.com"},{"shop":"apptestlab.myshopify.com"},{"shop":"cuvr.myshopify.com"},{"shop":"beluxi-store.myshopify.com"},{"shop":"mr-teddy-rose.myshopify.com"},{"shop":"cool-hair-tool.myshopify.com"},{"shop":"wamfac.myshopify.com"},{"shop":"thepalmband.myshopify.com"},{"shop":"catena-co.myshopify.com"},{"shop":"ssstraw.myshopify.com"},{"shop":"evasfashion4.myshopify.com"},{"shop":"oh-my-jewelry.myshopify.com"},{"shop":"one-square-bear.myshopify.com"},{"shop":"the-romance-queen.myshopify.com"},{"shop":"fancylads.myshopify.com"},{"shop":"ifindfitness.myshopify.com"},{"shop":"terapump-canada.myshopify.com"},{"shop":"lilbiach.myshopify.com"},{"shop":"weareboxstrong.myshopify.com"},{"shop":"foybottles.myshopify.com"},{"shop":"bottlehot-com.myshopify.com"},{"shop":"saber-zone.myshopify.com"},{"shop":"slangen-worldwide.myshopify.com"},{"shop":"naturicauk.myshopify.com"},{"shop":"jeenoelectronics.myshopify.com"},{"shop":"eumask.myshopify.com"},{"shop":"redlovebears.myshopify.com"},{"shop":"theblushlabel.myshopify.com"},{"shop":"musicstore4you.myshopify.com"},{"shop":"sneakersocksstore.myshopify.com"},{"shop":"mystcare.myshopify.com"},{"shop":"une-vie-exceptionnelle.myshopify.com"},{"shop":"mahnii.myshopify.com"},{"shop":"womanlix.myshopify.com"},{"shop":"baby-n-joy-shop.myshopify.com"},{"shop":"chantelle-vance.myshopify.com"},{"shop":"absolut-pet-shop.myshopify.com"},{"shop":"myvit-knife-sharpener.myshopify.com"},{"shop":"webshop004.myshopify.com"},{"shop":"illumiglow.myshopify.com"},{"shop":"lowkey-community.myshopify.com"},{"shop":"engagefightwear.myshopify.com"},{"shop":"sportelastic-com.myshopify.com"},{"shop":"millionaire-gentleman.myshopify.com"},{"shop":"elephantbox.myshopify.com"},{"shop":"oaxis.myshopify.com"},{"shop":"cherrys-imported.myshopify.com"},{"shop":"quantsto.myshopify.com"},{"shop":"lornesstore.myshopify.com"},{"shop":"manifest-motivation.myshopify.com"},{"shop":"apollonsoundz.myshopify.com"},{"shop":"evryday-discount.myshopify.com"}]

function manualSave(data){
  db.insert(data, function (err, newDocs) {
       if(err){console.log(err)}
       console.log(JSON.stringify(newDocs));
  });
}

// manualSave(allShops)


const countryCurrencies = {AF:"AFN",AX:"EUR",AL:"ALL",DZ:"DZD",AS:"USD",AD:"EUR",AO:"AOA",AI:"XCD",AQ:"",AG:"XCD",AR:"ARS",AM:"AMD",AW:"AWG",AU:"AUD",AT:"EUR",AZ:"AZN",BS:"BSD",BH:"BHD",BD:"BDT",BB:"BBD",BY:"BYN",BE:"EUR",BZ:"BZD",BJ:"XOF",BM:"BMD",BT:"BTN",BO:"BOB",BA:"BAM",BW:"BWP",BV:"NOK",BR:"BRL",IO:"USD",BN:"BND",BG:"BGN",BF:"XOF",BI:"BIF",KH:"KHR",CM:"XAF",CA:"CAD",CV:"CVE",KY:"KYD",CF:"XAF",TD:"XAF",CL:"CLP",CN:"CNY",CX:"AUD",CC:"AUD",CO:"COP",KM:"KMF",CG:"XAF",CD:"CDF",CK:"NZD",CR:"CRC",CI:"XOF",HR:"HRK",CU:"CUP",CY:"EUR",CZ:"CZK",DK:"DKK",DJ:"DJF",DM:"XCD",DO:"DOP",EC:"USD",EG:"EGP",SV:"USD",GQ:"XAF",ER:"ERN",EE:"EUR",ET:"ETB",FK:"FKP",FO:"DKK",FJ:"FJD",FI:"EUR",FR:"EUR",GF:"EUR",PF:"XPF",TF:"EUR",GA:"XAF",GM:"GMD",GE:"GEL",DE:"EUR",GH:"GHS",GI:"GIP",GR:"EUR",GL:"DKK",GD:"XCD",GP:"EUR",GU:"USD",GT:"GTQ",GG:"GBP",GN:"GNF",GW:"XOF",GY:"GYD",HT:"HTG",HM:"AUD",VA:"EUR",HN:"HNL",HK:"HKD",HU:"HUF",IS:"ISK",IN:"INR",ID:"IDR",IR:"IRR",IQ:"IQD",IE:"EUR",IM:"GBP",IL:"ILS",IT:"EUR",JM:"JMD",JP:"JPY",JE:"GBP",JO:"JOD",KZ:"KZT",KE:"KES",KI:"AUD",KR:"KRW",KW:"KWD",KG:"KGS",LA:"LAK",LV:"EUR",LB:"LBP",LS:"LSL",LR:"LRD",LY:"LYD",LI:"CHF",LT:"EUR",LU:"EUR",MO:"MOP",MK:"MKD",MG:"MGA",MW:"MWK",MY:"MYR",MV:"MVR",ML:"XOF",MT:"EUR",MH:"USD",MQ:"EUR",MR:"MRU",MU:"MUR",YT:"EUR",MX:"MXN",FM:"USD",MD:"MDL",MC:"EUR",MN:"MNT",ME:"EUR",MS:"XCD",MA:"MAD",MZ:"MZN",MM:"MMK",NA:"NAD",NR:"AUD",NP:"NPR",NL:"EUR",AN:"",NC:"XPF",NZ:"NZD",NI:"NIO",NE:"XOF",NG:"NGN",NU:"NZD",NF:"AUD",MP:"USD",NO:"NOK",OM:"OMR",PK:"PKR",PW:"USD",PS:"ILS",PA:"PAB",PG:"PGK",PY:"PYG",PE:"PEN",PH:"PHP",PN:"NZD",PL:"PLN",PT:"EUR",PR:"USD",QA:"QAR",RE:"EUR",RO:"RON",RU:"RUB",RW:"RWF",BL:"EUR",SH:"SHP",KN:"XCD",LC:"XCD",MF:"EUR",PM:"EUR",VC:"XCD",WS:"WST",SM:"EUR",ST:"STN",SA:"SAR",SN:"XOF",RS:"RSD",SC:"SCR",SL:"SLL",SG:"SGD",SK:"EUR",SI:"EUR",SB:"SBD",SO:"SOS",ZA:"ZAR",GS:"GBP",ES:"EUR",LK:"LKR",SD:"SDG",SR:"SRD",SJ:"NOK",SZ:"SZL",SE:"SEK",CH:"CHF",SY:"SYP",TW:"TWD",TJ:"TJS",TZ:"TZS",TH:"THB",TL:"USD",TG:"XOF",TK:"NZD",TO:"TOP",TT:"TTD",TN:"TND",TR:"TRY",TM:"TMT",TC:"USD",TV:"AUD",UG:"UGX",UA:"UAH",AE:"AED",GB:"GBP",US:"USD",UM:"USD",UY:"UYU",UZ:"UZS",VU:"VUV",VE:"VEF",VN:"VND",VG:"USD",VI:"USD",WF:"XPF",EH:"MAD",YE:"YER",ZM:"ZMW",ZW:"ZWD"};
const countryCodes = {"BD": "Bangladesh", "BE": "Belgium", "BF": "Burkina Faso", "BG": "Bulgaria", "BA": "Bosnia and Herzegovina", "BB": "Barbados", "WF": "Wallis and Futuna", "BL": "Saint Barthelemy", "BM": "Bermuda", "BN": "Brunei", "BO": "Bolivia", "BH": "Bahrain", "BI": "Burundi", "BJ": "Benin", "BT": "Bhutan", "JM": "Jamaica", "BV": "Bouvet Island", "BW": "Botswana", "WS": "Samoa", "BQ": "Bonaire, Saint Eustatius and Saba ", "BR": "Brazil", "BS": "Bahamas", "JE": "Jersey", "BY": "Belarus", "BZ": "Belize", "RU": "Russia", "RW": "Rwanda", "RS": "Serbia", "TL": "East Timor", "RE": "Reunion", "TM": "Turkmenistan", "TJ": "Tajikistan", "RO": "Romania", "TK": "Tokelau", "GW": "Guinea-Bissau", "GU": "Guam", "GT": "Guatemala", "GS": "South Georgia and the South Sandwich Islands", "GR": "Greece", "GQ": "Equatorial Guinea", "GP": "Guadeloupe", "JP": "Japan", "GY": "Guyana", "GG": "Guernsey", "GF": "French Guiana", "GE": "Georgia", "GD": "Grenada", "GB": "United Kingdom", "GA": "Gabon", "SV": "El Salvador", "GN": "Guinea", "GM": "Gambia", "GL": "Greenland", "GI": "Gibraltar", "GH": "Ghana", "OM": "Oman", "TN": "Tunisia", "JO": "Jordan", "HR": "Croatia", "HT": "Haiti", "HU": "Hungary", "HK": "Hong Kong", "HN": "Honduras", "HM": "Heard Island and McDonald Islands", "VE": "Venezuela", "PR": "Puerto Rico", "PS": "Palestinian Territory", "PW": "Palau", "PT": "Portugal", "SJ": "Svalbard and Jan Mayen", "PY": "Paraguay", "IQ": "Iraq", "PA": "Panama", "PF": "French Polynesia", "PG": "Papua New Guinea", "PE": "Peru", "PK": "Pakistan", "PH": "Philippines", "PN": "Pitcairn", "PL": "Poland", "PM": "Saint Pierre and Miquelon", "ZM": "Zambia", "EH": "Western Sahara", "EE": "Estonia", "EG": "Egypt", "ZA": "South Africa", "EC": "Ecuador", "IT": "Italy", "VN": "Vietnam", "SB": "Solomon Islands", "ET": "Ethiopia", "SO": "Somalia", "ZW": "Zimbabwe", "SA": "Saudi Arabia", "ES": "Spain", "ER": "Eritrea", "ME": "Montenegro", "MD": "Moldova", "MG": "Madagascar", "MF": "Saint Martin", "MA": "Morocco", "MC": "Monaco", "UZ": "Uzbekistan", "MM": "Myanmar", "ML": "Mali", "MO": "Macao", "MN": "Mongolia", "MH": "Marshall Islands", "MK": "Macedonia", "MU": "Mauritius", "MT": "Malta", "MW": "Malawi", "MV": "Maldives", "MQ": "Martinique", "MP": "Northern Mariana Islands", "MS": "Montserrat", "MR": "Mauritania", "IM": "Isle of Man", "UG": "Uganda", "TZ": "Tanzania", "MY": "Malaysia", "MX": "Mexico", "IL": "Israel", "FR": "France", "IO": "British Indian Ocean Territory", "SH": "Saint Helena", "FI": "Finland", "FJ": "Fiji", "FK": "Falkland Islands", "FM": "Micronesia", "FO": "Faroe Islands", "NI": "Nicaragua", "NL": "Netherlands", "NO": "Norway", "NA": "Namibia", "VU": "Vanuatu", "NC": "New Caledonia", "NE": "Niger", "NF": "Norfolk Island", "NG": "Nigeria", "NZ": "New Zealand", "NP": "Nepal", "NR": "Nauru", "NU": "Niue", "CK": "Cook Islands", "XK": "Kosovo", "CI": "Ivory Coast", "CH": "Switzerland", "CO": "Colombia", "CN": "China", "CM": "Cameroon", "CL": "Chile", "CC": "Cocos Islands", "CA": "Canada", "CG": "Republic of the Congo", "CF": "Central African Republic", "CD": "Democratic Republic of the Congo", "CZ": "Czech Republic", "CY": "Cyprus", "CX": "Christmas Island", "CR": "Costa Rica", "CW": "Curacao", "CV": "Cape Verde", "CU": "Cuba", "SZ": "Swaziland", "SY": "Syria", "SX": "Sint Maarten", "KG": "Kyrgyzstan", "KE": "Kenya", "SS": "South Sudan", "SR": "Suriname", "KI": "Kiribati", "KH": "Cambodia", "KN": "Saint Kitts and Nevis", "KM": "Comoros", "ST": "Sao Tome and Principe", "SK": "Slovakia", "KR": "South Korea", "SI": "Slovenia", "KP": "North Korea", "KW": "Kuwait", "SN": "Senegal", "SM": "San Marino", "SL": "Sierra Leone", "SC": "Seychelles", "KZ": "Kazakhstan", "KY": "Cayman Islands", "SG": "Singapore", "SE": "Sweden", "SD": "Sudan", "DO": "Dominican Republic", "DM": "Dominica", "DJ": "Djibouti", "DK": "Denmark", "VG": "British Virgin Islands", "DE": "Germany", "YE": "Yemen", "DZ": "Algeria", "US": "United States", "UY": "Uruguay", "YT": "Mayotte", "UM": "United States Minor Outlying Islands", "LB": "Lebanon", "LC": "Saint Lucia", "LA": "Laos", "TV": "Tuvalu", "TW": "Taiwan", "TT": "Trinidad and Tobago", "TR": "Turkey", "LK": "Sri Lanka", "LI": "Liechtenstein", "LV": "Latvia", "TO": "Tonga", "LT": "Lithuania", "LU": "Luxembourg", "LR": "Liberia", "LS": "Lesotho", "TH": "Thailand", "TF": "French Southern Territories", "TG": "Togo", "TD": "Chad", "TC": "Turks and Caicos Islands", "LY": "Libya", "VA": "Vatican", "VC": "Saint Vincent and the Grenadines", "AE": "United Arab Emirates", "AD": "Andorra", "AG": "Antigua and Barbuda", "AF": "Afghanistan", "AI": "Anguilla", "VI": "U.S. Virgin Islands", "IS": "Iceland", "IR": "Iran", "AM": "Armenia", "AL": "Albania", "AO": "Angola", "AQ": "Antarctica", "AS": "American Samoa", "AR": "Argentina", "AU": "Australia", "AT": "Austria", "AW": "Aruba", "IN": "India", "AX": "Aland Islands", "AZ": "Azerbaijan", "IE": "Ireland", "ID": "Indonesia", "UA": "Ukraine", "QA": "Qatar", "MZ": "Mozambique"}

app.set('port', (process.env.PORT || 5000));
app.use(cors())
app.use(bodyParser.json({
    verify: function(req, res, buf, encoding) {

        // get rawBody
        req.rawBody = buf.toString();
        //console.log("rawBody: " + req.rawBody);

    }
}));
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", (req, res) => {
res.status(200).send("App is good!");
});

app.get("/serve-db-file", (req, res) => {
  try {
      const data = fs.readFileSync('stores.db', 'utf8')
      // console.log(data)
      res.status(200).send('<ol>' + data.replace(/\{/g,"<li>{").replace(/\}/g,"}</li>") + '</li></ol>');
    } catch (err) {
      console.error(err)
      res.status(500).send("Could not serve file");
    }

});



// V2.0 users
app.post("/api/country", function(req, res) {
  // var origin = req.get("origin");
  // origin = origin.replace("https://", "");
  // console.log(origin);
  // console.log(typeof req.body);
  // 3secs
  res.setTimeout(3000, function(){
        console.log('Request has timed out.');
            res.status(500).send("Reqest taking too long");
        });
    db.find(req.body, function (err, docs) {
      if(err){
        console.log(err)
        res.status(500).send("Server error");
      }

        if(docs.length === 0){
          console.log(req.body)
          console.log("Shop not found")
          res.status(200);
        }else{
          //found
          console.log(docs)
            let ip = req.headers["x-forwarded-for"].split(",")[0];
            console.log(ip);
            var geo = geoip.lookup(ip);
            if(geo){
              let isoCode = geo.country;
              let currency = countryCurrencies[isoCode];
              let geoData = { country: isoCode, currency: currency };
              console.log(geoData);
              res.status(200).json(geoData);
            }else{
              res.status(200);
            }

        }
     });
});


app.post("/api/save-store", function(req, res) {
  if(req.headers['x-forwarded-by'] === 'mcapp-ui'){
    console.log("confirmed source: " + req.headers['x-forwarded-by']);
    //from UI app. Save shop
    let data = req.body
    console.log(data);

    db.find(data, function (err, docs) {
      if(err){
        console.log(err)
      }

    if(docs.length === 0){
      console.log("Shop not found. Insert it!")
      db.insert(data, function (err, newDoc) {
          if(err){console.log(err)}
          console.log(newDoc)
      });
    }else{
      //found
      console.log("found shop in db wont add again!")
    }
  });
    res.status(200).send("Shop saved!");
  }else{
    res.status(500).send("COULD NOT SAVE STORE!");
  }

});

app.post("/api/delete-store", function(req, res) {
  if(req.headers['x-forwarded-by'] === 'mcapp-ui'){
    console.log("Confirmed source: " + req.headers['x-forwarded-by']);
    //from UI app. Save shop
    let data = req.body
    console.log(data);
     db.remove(data, { multi: true }, function (err, numRemoved) {
              if(err){
               console.log("there is an error" + err)
              }else{
                   console.log("Number of removed: " + numRemoved);
              }

    });


    res.status(200).send("Store deleted!");
   }else{
    res.status(500).send("Could NOT delete store from DB!");
  }

});


app.post("/api/get-all-stores", function(req, res) {
 if(req.headers['x-forwarded-by'] === 'mcapp-ui'){
    console.log("confirmed source: " + req.headers['x-forwarded-by']);
    //from UI app. Save shop
    let data = req.body
    console.log(data);

    db.find(data, function (err, docs) {
      if(err){
        console.log(err)
      }

     if(docs.length === 0){
      console.log("Shop not found. Insert it!")

    }else{
      //found
      console.log(JSON.stringify(docs))
      console.log("Number of records: " + docs.length)
    }
  });
    res.status(200).send("Shops found!");
  }else{
    res.status(500).send("Could not get stores from DB!");
  }

});

app.post("/api/update-db-file", function(req, res) {
 if(req.headers['x-forwarded-by'] === 'mcapp-ui'){
    console.log("confirmed source: " + req.headers['x-forwarded-by']);
    //from UI app. Save shop
    let data = req.body
    //console.log(data);

    db.find(data, function (err, docs) {
      if(err){
        console.log(err)
      }

     if(docs.length > 0){
      //found
      let dbRecords = JSON.stringify(docs)
      //console.log(dbRecords)
      dbRecords = dbRecords.replace(/(\[|\])/g,"").replace(/,{/g,"\n{");
       //console.log(dbRecords)
      console.log("Number of records: " + docs.length)
      //write
        write('stores.db', dbRecords)
       .then(() =>{
          
          db.loadDatabase();
        })
        .catch((err) => {console.error(err); return false});
      res.status(200).send("Manual DB update complete!");
    }
  });

  }else{
    res.status(500).send("Could not complete manual DB update!");
  }

});

// listen for requests :)
app.listen(app.get('port'), function() {
  console.log("Node app is running at port: " + app.get('port'));
});
