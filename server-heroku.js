// server// server.js
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
const requestify = require('requestify');
const geoDBAPI = "https://jeweled-grateful-driver.glitch.me"; // , https://mc-checkouts-geo-server-2.herokuapp.com, https://funny-nine-toy.glitch.me


//stores.json operations
const jsonfile = require('jsonfile')

const countryCurrencies = {AF:"AFN",AX:"EUR",AL:"ALL",DZ:"DZD",AS:"USD",AD:"EUR",AO:"AOA",AI:"XCD",AQ:"",AG:"XCD",AR:"ARS",AM:"AMD",AW:"AWG",AU:"AUD",AT:"EUR",AZ:"AZN",BS:"BSD",BH:"BHD",BD:"BDT",BB:"BBD",BY:"BYN",BE:"EUR",BZ:"BZD",BJ:"XOF",BM:"BMD",BT:"BTN",BO:"BOB",BA:"BAM",BW:"BWP",BV:"NOK",BR:"BRL",IO:"USD",BN:"BND",BG:"BGN",BF:"XOF",BI:"BIF",KH:"KHR",CM:"XAF",CA:"CAD",CV:"CVE",KY:"KYD",CF:"XAF",TD:"XAF",CL:"CLP",CN:"CNY",CX:"AUD",CC:"AUD",CO:"COP",KM:"KMF",CG:"XAF",CD:"CDF",CK:"NZD",CR:"CRC",CI:"XOF",HR:"HRK",CU:"CUP",CY:"EUR",CZ:"CZK",DK:"DKK",DJ:"DJF",DM:"XCD",DO:"DOP",EC:"USD",EG:"EGP",SV:"USD",GQ:"XAF",ER:"ERN",EE:"EUR",ET:"ETB",FK:"FKP",FO:"DKK",FJ:"FJD",FI:"EUR",FR:"EUR",GF:"EUR",PF:"XPF",TF:"EUR",GA:"XAF",GM:"GMD",GE:"GEL",DE:"EUR",GH:"GHS",GI:"GIP",GR:"EUR",GL:"DKK",GD:"XCD",GP:"EUR",GU:"USD",GT:"GTQ",GG:"GBP",GN:"GNF",GW:"XOF",GY:"GYD",HT:"HTG",HM:"AUD",VA:"EUR",HN:"HNL",HK:"HKD",HU:"HUF",IS:"ISK",IN:"INR",ID:"IDR",IR:"IRR",IQ:"IQD",IE:"EUR",IM:"GBP",IL:"ILS",IT:"EUR",JM:"JMD",JP:"JPY",JE:"GBP",JO:"JOD",KZ:"KZT",KE:"KES",KI:"AUD",KR:"KRW",KW:"KWD",KG:"KGS",LA:"LAK",LV:"EUR",LB:"LBP",LS:"LSL",LR:"LRD",LY:"LYD",LI:"CHF",LT:"EUR",LU:"EUR",MO:"MOP",MK:"MKD",MG:"MGA",MW:"MWK",MY:"MYR",MV:"MVR",ML:"XOF",MT:"EUR",MH:"USD",MQ:"EUR",MR:"MRU",MU:"MUR",YT:"EUR",MX:"MXN",FM:"USD",MD:"MDL",MC:"EUR",MN:"MNT",ME:"EUR",MS:"XCD",MA:"MAD",MZ:"MZN",MM:"MMK",NA:"NAD",NR:"AUD",NP:"NPR",NL:"EUR",AN:"",NC:"XPF",NZ:"NZD",NI:"NIO",NE:"XOF",NG:"NGN",NU:"NZD",NF:"AUD",MP:"USD",NO:"NOK",OM:"OMR",PK:"PKR",PW:"USD",PS:"ILS",PA:"PAB",PG:"PGK",PY:"PYG",PE:"PEN",PH:"PHP",PN:"NZD",PL:"PLN",PT:"EUR",PR:"USD",QA:"QAR",RE:"EUR",RO:"RON",RU:"RUB",RW:"RWF",BL:"EUR",SH:"SHP",KN:"XCD",LC:"XCD",MF:"EUR",PM:"EUR",VC:"XCD",WS:"WST",SM:"EUR",ST:"STN",SA:"SAR",SN:"XOF",RS:"RSD",SC:"SCR",SL:"SLL",SG:"SGD",SK:"EUR",SI:"EUR",SB:"SBD",SO:"SOS",ZA:"ZAR",GS:"GBP",ES:"EUR",LK:"LKR",SD:"SDG",SR:"SRD",SJ:"NOK",SZ:"SZL",SE:"SEK",CH:"CHF",SY:"SYP",TW:"TWD",TJ:"TJS",TZ:"TZS",TH:"THB",TL:"USD",TG:"XOF",TK:"NZD",TO:"TOP",TT:"TTD",TN:"TND",TR:"TRY",TM:"TMT",TC:"USD",TV:"AUD",UG:"UGX",UA:"UAH",AE:"AED",GB:"GBP",US:"USD",UM:"USD",UY:"UYU",UZ:"UZS",VU:"VUV",VE:"VEF",VN:"VND",VG:"USD",VI:"USD",WF:"XPF",EH:"MAD",YE:"YER",ZM:"ZMW",ZW:"ZWD"};
const countryCodes = {"BD": "Bangladesh", "BE": "Belgium", "BF": "Burkina Faso", "BG": "Bulgaria", "BA": "Bosnia and Herzegovina", "BB": "Barbados", "WF": "Wallis and Futuna", "BL": "Saint Barthelemy", "BM": "Bermuda", "BN": "Brunei", "BO": "Bolivia", "BH": "Bahrain", "BI": "Burundi", "BJ": "Benin", "BT": "Bhutan", "JM": "Jamaica", "BV": "Bouvet Island", "BW": "Botswana", "WS": "Samoa", "BQ": "Bonaire, Saint Eustatius and Saba ", "BR": "Brazil", "BS": "Bahamas", "JE": "Jersey", "BY": "Belarus", "BZ": "Belize", "RU": "Russia", "RW": "Rwanda", "RS": "Serbia", "TL": "East Timor", "RE": "Reunion", "TM": "Turkmenistan", "TJ": "Tajikistan", "RO": "Romania", "TK": "Tokelau", "GW": "Guinea-Bissau", "GU": "Guam", "GT": "Guatemala", "GS": "South Georgia and the South Sandwich Islands", "GR": "Greece", "GQ": "Equatorial Guinea", "GP": "Guadeloupe", "JP": "Japan", "GY": "Guyana", "GG": "Guernsey", "GF": "French Guiana", "GE": "Georgia", "GD": "Grenada", "GB": "United Kingdom", "GA": "Gabon", "SV": "El Salvador", "GN": "Guinea", "GM": "Gambia", "GL": "Greenland", "GI": "Gibraltar", "GH": "Ghana", "OM": "Oman", "TN": "Tunisia", "JO": "Jordan", "HR": "Croatia", "HT": "Haiti", "HU": "Hungary", "HK": "Hong Kong", "HN": "Honduras", "HM": "Heard Island and McDonald Islands", "VE": "Venezuela", "PR": "Puerto Rico", "PS": "Palestinian Territory", "PW": "Palau", "PT": "Portugal", "SJ": "Svalbard and Jan Mayen", "PY": "Paraguay", "IQ": "Iraq", "PA": "Panama", "PF": "French Polynesia", "PG": "Papua New Guinea", "PE": "Peru", "PK": "Pakistan", "PH": "Philippines", "PN": "Pitcairn", "PL": "Poland", "PM": "Saint Pierre and Miquelon", "ZM": "Zambia", "EH": "Western Sahara", "EE": "Estonia", "EG": "Egypt", "ZA": "South Africa", "EC": "Ecuador", "IT": "Italy", "VN": "Vietnam", "SB": "Solomon Islands", "ET": "Ethiopia", "SO": "Somalia", "ZW": "Zimbabwe", "SA": "Saudi Arabia", "ES": "Spain", "ER": "Eritrea", "ME": "Montenegro", "MD": "Moldova", "MG": "Madagascar", "MF": "Saint Martin", "MA": "Morocco", "MC": "Monaco", "UZ": "Uzbekistan", "MM": "Myanmar", "ML": "Mali", "MO": "Macao", "MN": "Mongolia", "MH": "Marshall Islands", "MK": "Macedonia", "MU": "Mauritius", "MT": "Malta", "MW": "Malawi", "MV": "Maldives", "MQ": "Martinique", "MP": "Northern Mariana Islands", "MS": "Montserrat", "MR": "Mauritania", "IM": "Isle of Man", "UG": "Uganda", "TZ": "Tanzania", "MY": "Malaysia", "MX": "Mexico", "IL": "Israel", "FR": "France", "IO": "British Indian Ocean Territory", "SH": "Saint Helena", "FI": "Finland", "FJ": "Fiji", "FK": "Falkland Islands", "FM": "Micronesia", "FO": "Faroe Islands", "NI": "Nicaragua", "NL": "Netherlands", "NO": "Norway", "NA": "Namibia", "VU": "Vanuatu", "NC": "New Caledonia", "NE": "Niger", "NF": "Norfolk Island", "NG": "Nigeria", "NZ": "New Zealand", "NP": "Nepal", "NR": "Nauru", "NU": "Niue", "CK": "Cook Islands", "XK": "Kosovo", "CI": "Ivory Coast", "CH": "Switzerland", "CO": "Colombia", "CN": "China", "CM": "Cameroon", "CL": "Chile", "CC": "Cocos Islands", "CA": "Canada", "CG": "Republic of the Congo", "CF": "Central African Republic", "CD": "Democratic Republic of the Congo", "CZ": "Czech Republic", "CY": "Cyprus", "CX": "Christmas Island", "CR": "Costa Rica", "CW": "Curacao", "CV": "Cape Verde", "CU": "Cuba", "SZ": "Swaziland", "SY": "Syria", "SX": "Sint Maarten", "KG": "Kyrgyzstan", "KE": "Kenya", "SS": "South Sudan", "SR": "Suriname", "KI": "Kiribati", "KH": "Cambodia", "KN": "Saint Kitts and Nevis", "KM": "Comoros", "ST": "Sao Tome and Principe", "SK": "Slovakia", "KR": "South Korea", "SI": "Slovenia", "KP": "North Korea", "KW": "Kuwait", "SN": "Senegal", "SM": "San Marino", "SL": "Sierra Leone", "SC": "Seychelles", "KZ": "Kazakhstan", "KY": "Cayman Islands", "SG": "Singapore", "SE": "Sweden", "SD": "Sudan", "DO": "Dominican Republic", "DM": "Dominica", "DJ": "Djibouti", "DK": "Denmark", "VG": "British Virgin Islands", "DE": "Germany", "YE": "Yemen", "DZ": "Algeria", "US": "United States", "UY": "Uruguay", "YT": "Mayotte", "UM": "United States Minor Outlying Islands", "LB": "Lebanon", "LC": "Saint Lucia", "LA": "Laos", "TV": "Tuvalu", "TW": "Taiwan", "TT": "Trinidad and Tobago", "TR": "Turkey", "LK": "Sri Lanka", "LI": "Liechtenstein", "LV": "Latvia", "TO": "Tonga", "LT": "Lithuania", "LU": "Luxembourg", "LR": "Liberia", "LS": "Lesotho", "TH": "Thailand", "TF": "French Southern Territories", "TG": "Togo", "TD": "Chad", "TC": "Turks and Caicos Islands", "LY": "Libya", "VA": "Vatican", "VC": "Saint Vincent and the Grenadines", "AE": "United Arab Emirates", "AD": "Andorra", "AG": "Antigua and Barbuda", "AF": "Afghanistan", "AI": "Anguilla", "VI": "U.S. Virgin Islands", "IS": "Iceland", "IR": "Iran", "AM": "Armenia", "AL": "Albania", "AO": "Angola", "AQ": "Antarctica", "AS": "American Samoa", "AR": "Argentina", "AU": "Australia", "AT": "Austria", "AW": "Aruba", "IN": "India", "AX": "Aland Islands", "AZ": "Azerbaijan", "IE": "Ireland", "ID": "Indonesia", "UA": "Ukraine", "QA": "Qatar", "MZ": "Mozambique"}

var db  = {"lornesstore.myshopify.com":true,"kaela-kay-ca.myshopify.com":true,"mr-teddy-rose.myshopify.com":true,"oh-my-jewelry.myshopify.com":true,"bcalm-pet.myshopify.com":true,"7g-jewellery-store.myshopify.com":true,"jc2000.myshopify.com":true,"leo-gabor-vintage-clothing.myshopify.com":true,"firefly-kids-lighting-us.myshopify.com":true,"umodejewelrycom.myshopify.com":true,"vulpexaccessories.myshopify.com":true,"smarthouseelectronics.myshopify.com":true,"beaverro.myshopify.com":true,"system-akvile.myshopify.com":true,"apps-labz.myshopify.com":true,"enrgze-co.myshopify.com":true,"erabella-hair-extensions.myshopify.com":true,"makbox-store.myshopify.com":true,"fancylads.myshopify.com":true,"super-battery.myshopify.com":true,"haubu.myshopify.com":true,"one-product-google-ads-store.myshopify.com":true,"j-h-zane.myshopify.com":true,"jeenoelectronics.myshopify.com":true,"modjuicer.myshopify.com":true,"illumiglow.myshopify.com":true,"beaverro-store.myshopify.com":true,"braveposture.myshopify.com":true,"mayfairpharmacy.myshopify.com":true,"stockhype.myshopify.com":true,"malek-labs.myshopify.com":true,"can-a-girl-catch-a-break.myshopify.com":true,"mrs-minc.myshopify.com":true,"rap.com":true,"showernstyle.myshopify.com":true,"augds01.myshopify.com":true,"outertrendsonline.myshopify.com":true,"snugzy.myshopify.com":true,"bottlehot-com.myshopify.com":true,"gigi-active-luxe.myshopify.com":true,"vertical-cool.myshopify.com":true,"ampleabode.myshopify.com":true,"naturicauk.myshopify.com":true,"phoop.myshopify.com":true,"loveteq.myshopify.com":true,"cherrys-imported.myshopify.com":true,"1077-tabontech-turnkey-curveshaper.myshopify.com":true,"mpndesigns.myshopify.com":true,"hadyatrends.myshopify.com":true,"thelovely-shop.myshopify.com":true,"soulcode-life.myshopify.com":true,"findstealscom.myshopify.com":true,"oaxis.myshopify.com":true,"myposhbabystore.myshopify.com":true,"weareboxstrong.myshopify.com":true,"teluhs.myshopify.com":true,"metapora.myshopify.com":true,"the-lord-of-the-magic.myshopify.com":true,"forapparel.myshopify.com":true,"cuvr.myshopify.com":true,"dealboutiq.myshopify.com":true,"smartivate.myshopify.com":true,"sphinx-co-gem.myshopify.com":true,"galaxy-lamps-co.myshopify.com":true,"happytails-petshop.myshopify.com":true,"ryan-london.myshopify.com":true,"aftercovidsignage.myshopify.com":true,"beaute-premuim.myshopify.com":true,"evasfashion4.myshopify.com":true,"my-minty-fresh.myshopify.com":true,"puri-collection-sujan-pulami.myshopify.com":true,"buy-tech4lifeenterprises-com.myshopify.com":true,"engagefightwear.myshopify.com":true,"grylls-camping.myshopify.com":true,"captains-gallery.myshopify.com":true,"coronatoolkit.myshopify.com":true,"myvit-knife-sharpener.myshopify.com":true,"musicstore4you.myshopify.com":true,"mashop-official.myshopify.com":true,"lowkey-community.myshopify.com":true,"only-depot.myshopify.com":true,"bunsplint.myshopify.com":true,"i-just-want-leggings.myshopify.com":true,"sekonioriginal.myshopify.com":true,"stone-heal.myshopify.com":true,"nicolas-di-zazzo.myshopify.com":true,"roboticky.myshopify.com":true,"kitty-cat-wonders.myshopify.com":true,"tali-store-uk.myshopify.com":true,"sneakersocksstore.myshopify.com":true,"manifest-motivation.myshopify.com":true,"k9-apparel-pro.myshopify.com":true,"zuperteddy.myshopify.com":true,"forge-foster.myshopify.com":true,"storeglisten.myshopify.com":true,"phytotest.myshopify.com":true,"xn-ymcbab7b4a6a8heb0a.myshopify.com":true,"money-trust-forex-signals.myshopify.com":true,"fitnessstore33.myshopify.com":true,"the-garage-knockers.myshopify.com":true,"the-earphone-case-co.myshopify.com":true,"wheel-and-deal-inc.myshopify.com":true,"mahnii.myshopify.com":true,"thesaunabelt.myshopify.com":true,"winkformula.myshopify.com":true,"baby-n-joy-shop.myshopify.com":true,"aidtechs.myshopify.com":true,"quantsto.myshopify.com":true,"recyclingcpc.myshopify.com":true,"0-studio.myshopify.com":true,"boxere-2.myshopify.com":true,"us-thenorthamericanguitar.myshopify.com":true,"brockar.myshopify.com":true,"cool-hair-tool.myshopify.com":true,"doraco-enterprise.myshopify.com":true,"malinishopit.myshopify.com":true,"cortenplus1.myshopify.com":true,"kayyoss.myshopify.com":true,"the-romance-queen.myshopify.com":true,"drafttournament.myshopify.com":true,"project-mix.myshopify.com":true,"disneymombags.myshopify.com":true,"touch-guard-sanitizers.myshopify.com":true,"the-it-gal-secret-store.myshopify.com":true,"nakajima-jones.myshopify.com":true,"foybottles.myshopify.com":true,"salty-sadie.myshopify.com":true,"its-just-beauty.myshopify.com":true,"studio-minc.myshopify.com":true,"apollonsoundz.myshopify.com":true,"canvas-queens.myshopify.com":true,"kittenswimwear.myshopify.com":true,"the-kiss-co.myshopify.com":true,"trendeinblick.myshopify.com":true,"power-flexing.myshopify.com":true,"bottleswipe.myshopify.com":true,"commonbluejay.myshopify.com":true,"soft-skin-silk.myshopify.com":true,"toffeln-shop.myshopify.com":true,"orgonicart.myshopify.com":true,"une-vie-exceptionnelle.myshopify.com":true,"t-m-care.myshopify.com":true,"elijah-techs.myshopify.com":true,"s-sproductss.myshopify.com":true,"trinity-bags.myshopify.com":true,"lazypurrs.myshopify.com":true,"booty-bandzz.myshopify.com":true,"thepalmband.myshopify.com":true,"absolut-pet-shop.myshopify.com":true,"bioroyale.myshopify.com":true,"lopadoco.myshopify.com":true,"theunderargument-fr.myshopify.com":true,"nove-watch.myshopify.com":true,"covid19ware-com.myshopify.com":true,"dog-calming-bed.myshopify.com":true,"theblushlabel.myshopify.com":true,"www-ss-avs-com.myshopify.com":true,"vaultmask.myshopify.com":true,"smartkeyhub.myshopify.com":true,"aavalabs.myshopify.com":true,"smarts-pack.myshopify.com":true,"los-tres-amigos-discounts.myshopify.com":true,"viraltechmasks.myshopify.com":true,"investorhomeoffice-2.myshopify.com":true,"cervicalcloud.myshopify.com":true,"mystcare.myshopify.com":true,"birdlife.myshopify.com":true,"peektrend.myshopify.com":true,"wamfac.myshopify.com":true,"aurezzi-store.myshopify.com":true,"lilbiach.myshopify.com":true,"catena-co.myshopify.com":true,"erba-verda.myshopify.com":true,"ssstraw.myshopify.com":true,"beluxi-store.myshopify.com":true,"natur-aux-pattes.myshopify.com":true,"kopara2trade.myshopify.com":true,"beautypensystem.myshopify.com":true,"happymaternity.myshopify.com":true,"ropamujerusa.myshopify.com":true,"redlovebears.myshopify.com":true,"products-network.myshopify.com":true,"macleods-scottish-shop.myshopify.com":true,"one-square-bear.myshopify.com":true,"flexibracket.myshopify.com":true,"vorano.myshopify.com":true,"xn-qmcbp2c4a8gbi.myshopify.com":true,"terapump-canada.myshopify.com":true,"millionaire-gentleman.myshopify.com":true,"woofwash.myshopify.com":true,"straperly.myshopify.com":true,"self-same.myshopify.com":true,"chantelle-vance.myshopify.com":true,"ifindfitness.myshopify.com":true,"essence-luxe-couture.myshopify.com":true,"hojicha-co.myshopify.com":true,"le-visage-parfait.myshopify.com":true,"ottoman-jewels.myshopify.com":true,"toy-battery.myshopify.com":true,"gro-company.myshopify.com":true,"flex-bands-official.myshopify.com":true,"personal-beauty-cosmetics.myshopify.com":true,"evryday-discount.myshopify.com":true,"womanlix.myshopify.com":true,"agentspecial.myshopify.com":true,"mychefknife.myshopify.com":true,"capulet-boutique.myshopify.com":true,"activitness-store.myshopify.com":true,"mishkah-online-store.myshopify.com":true,"k9-sport-apparel.myshopify.com":true,"pearly-smilez.myshopify.com":true,"apptestlab.myshopify.com":true,"alteregofitness-com.myshopify.com":true,"peachlifter.myshopify.com":true,"foothero-de.myshopify.com":true,"bondi-tattoo-care.myshopify.com":true,"bracesy.myshopify.com":true,"limebite.myshopify.com":true,"modeershop.myshopify.com":true,"evomy.myshopify.com":true,"libertysplays.myshopify.com":true,"couteux-hair.myshopify.com":true,"baby-care-dept.myshopify.com":true,"driallstore.myshopify.com":true,"whirlwindshaker.myshopify.com":true,"culture-p.myshopify.com":true,"aaina-co.myshopify.com":true,"pinenuts.myshopify.com":true,"addjusta.myshopify.com":true,"tu-amour-jewellers.myshopify.com":true,"ibby-uno.myshopify.com":true,"kameelababy.myshopify.com":true,"cloud-necks.myshopify.com":true,"getcozyplus.myshopify.com":true,"the-spiritual-emporium.myshopify.com":true,"aceclothing-co.myshopify.com":true,"joes-pet-supplies.myshopify.com":true,"our-earth-project.myshopify.com":true,"enjoymentz-com.myshopify.com":true,"mynewposturestore.myshopify.com":true,"steve-fishman.myshopify.com":true,"naked-dresses.myshopify.com":true,"essential-ink.myshopify.com":true,"elephant-living.myshopify.com":true,"gesundenagel.myshopify.com":true,"the-perfect-tees-online.myshopify.com":true,"idontcarelah.myshopify.com":true,"2190-premium-pleasure.myshopify.com":true,"coopercricket1.myshopify.com":true,"verrific.myshopify.com":true,"luxlashesshop.myshopify.com":true,"cssm-groupus.myshopify.com":true,"bondi-babe.myshopify.com":true,"equiccessories-com.myshopify.com":true,"varese-sarabande-uk.myshopify.com":true,"resistancebandworkout.myshopify.com":true,"devacrafts.myshopify.com":true,"4204lyf.myshopify.com":true,"game-slime.myshopify.com":true,"the-bluetooth-headband.myshopify.com":true,"antimosquitowatch.myshopify.com":true,"ultrasonic-hair.myshopify.com":true,"roguenation.myshopify.com":true,"one-timeoffers.myshopify.com":true,"visual-culture-store.myshopify.com":true,"hang-massive.myshopify.com":true,"saber-zone.myshopify.com":true,"nomad-eyewear-v2.myshopify.com":true,"number of stores":268}

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

function pingLoadDB(){
        requestify.request(geoDBAPI + '/api/ping-load-db', {
                  method: 'GET',
                  headers: {
                      'x-forwarded-by': 'mcapp-geoserver-glitch'
                  },
                  dataType: 'json'
        })
       .then(function(response) {
            //console.log(response);
            db = response
            return
        })
       .catch((err) => {console.error(err); return false});
}


pingLoadDB();

app.get("/", (req, res) => {
res.status(200).send("App is good!");
});

app.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /");
});


// V2.0 users
app.post("/api/country", function(req, res) {
  // timeout after 3secs
  res.setTimeout(3000, function(){
        console.log('Request has timed out.');
  });
  var source = req.body.shop
    console.log("source: " + source)

  requestify.request(geoDBAPI + '/api/load-db-file', {
            method: 'GET',
            headers: {
                'x-forwarded-by': 'mcapp-ui'
            },
            dataType: 'json'
  })
 .then(function(response) {
       var storesJson = JSON.parse(response.body)
       // console.log(typeof storesJson)
       // console.log(storesJson[source])
        if(storesJson[source]){
          //found
            console.log("Store found")
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

        }else{
          console.log("Store not found")
          res.status(200).json({ country: "ERR", currency: "404" });
        }
    })
    .catch((err) => {
        // console.error(err);
        // res.status(404).send("Could not load DB");
        var storesJson = db;
        // console.log(typeof storesJson)
        // console.log(storesJson[source])
         if(storesJson[source]){
           //found
             console.log("Store found")
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

         }else{
           console.log("Store not found")
           res.status(200).json({ country: "ERR", currency: "404" });
         }
    });

});

//
app.post("/pingpath", function(req, res) {
  if(req.headers['x-forwarded-by'] === 'mcapp-db'){
    var source = req.body.db
      // console.log(source)
    db = source
    console.log('Reloaded db')
    res.status(200).json({msg: 'Reloaded db'})
  }else{
    res.status(400).json({err: 'Unauthorized request from unknown source'})
  }
});


// listen for requests :)
app.listen(app.get('port'), function() {
  console.log("Node app is running at port: " + app.get('port'));
});
