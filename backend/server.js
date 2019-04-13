////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////


/// This file and the source code provided can be used only for   
/// the projects and assignments of this course

/// Last Edit by Dr. Atef Bader: 1/27/2019


////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
//////////////////////              SETUP NEEDED                ////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

//  Install Nodejs (the bundle includes the npm) from the following website:
//      https://nodejs.org/en/download/


//  Before you start nodejs make sure you install from the  
//  command line window/terminal the following packages:
//      1. npm install express
//      2. npm install pg
//      3. npm install pg-format
//      4. npm install moment --save
//      5. npm install elasticsearch


//  Read the docs for the following packages:
//      1. https://node-postgres.com/
//      2.  result API: 
//              https://node-postgres.com/api/result
//      3. Nearest Neighbor Search
//              https://postgis.net/workshops/postgis-intro/knn.html    
//      4. https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/quick-start.html
//      5. https://momentjs.com/
//      6. http://momentjs.com/docs/#/displaying/format/


////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////


const express = require('express');

var pg = require('pg');

var bodyParser = require('body-parser');

const moment = require('moment');


// Connect to elasticsearch Server

const elasticsearch = require('elasticsearch');
const esClient = new elasticsearch.Client({
  host: '127.0.0.1:9200',
  log: 'error'
});


// Connect to PostgreSQL server

var conString = "pg://postgres:root@127.0.0.1:5432/chicago_divvy_stations";
var pgClient = new pg.Client(conString);
pgClient.connect();

var conString = "pg://postgres:root@127.0.0.1:5432/chicago_divvy_stations_logs";
var pgClient1 = new pg.Client(conString);
pgClient1.connect();




var find_places_task_completed = false;             


const app = express();
const router = express.Router();


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

router.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});



var places_found = [];
var stations_found = [];
var stations_found1 = [];
var stations_found2 =[];
var stations_found3 =[];
var stations_found4 =[];
var place_selected;



/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

//////   The following are the routes received from NG/Browser client        ////////

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////



router.route('/places').get((req, res) => {

    res.json(places_found)
    
});



router.route('/place_selected').get((req, res) => {

    res.json(place_selected)
   
});



router.route('/allPlaces').get((req, res) => {

    res.json(places_found)
   
});




router.route('/stations').get((req, res) => {
   
    res.json(stations_found)
           
});

router.route('/stationshourly').get((req, res) => {
   
    res.json(stations_found1)
        // console.log(stations_found1)  
});

router.route('/stationsday').get((req, res) => {
   
    res.json(stations_found2)
   // console.log(stations_found2)  
           
});

router.route('/stationssevendays').get((req, res) => {
   
    res.json(stations_found3)
    //console.log(stations_found3)  
           
});
router.route('/stationshourlysma').get((req, res) => {
   
    res.json(stations_found4)
        // console.log(stations_found4)  
});




router.route('/places/find').post((req, res) => {

    var str = JSON.stringify(req.body, null, 4);

    find_places_task_completed = false;             

    find_places_from_yelp(req.body.find, req.body.where).then(function (response) {
        var hits = response;
        res.json(places_found);
    });

});





router.route('/stations/find').post((req, res) => {

    var str = JSON.stringify(req.body, null, 4);

    for (var i = 0,len = places_found.length; i < len; i++) {

        if ( places_found[i].name === req.body.placeName ) { // strict equality test

            place_selected = places_found[i];

            break;
        }
    }
 
    const query = {
        // give the query a unique name
        name: 'fetch-divvy',
        text: ' SELECT * FROM divvy_stations_status ORDER BY (divvy_stations_status.where_is <-> ST_POINT($1,$2)) LIMIT 3',
        values: [place_selected.latitude, place_selected.longitude]
    }

    find_stations_from_divvy(query).then(function (response) {
        var hits = response;
        res.json({'stations_found': 'Added successfully'});
    });
 

});



router.route('/stations/linechart').post((req, res) => {

    var str = JSON.stringify(req.body, null, 4);
    //console.log(req.body.placeName)
    for (var i = 0,len = stations_found.length; i < len; i++) {

        if ( stations_found[i].id === req.body.placeName ) { // strict equality test

            place_selected =  stations_found[i];
           // console.log(place_selected )
            break;
        }
    }
 
    const query1 = {
        // give the query a unique name
        name: 'fetch-divvy-ggffg',
        text: ' SELECT * FROM divvy_stations_logs where  divvy_stations_logs.lastCommunicationTime >current_date -interval \'1 hour\' and divvy_stations_logs.latitude= $1 and divvy_stations_logs.longitude= $2 ',
        values: [place_selected.latitude, place_selected.longitude]
    }

    find_stations_from_divvy_logs_a(query1).then(function (response) {
        var hits = response;
        res.json({'stations_found1': 'Added successfully'});
    });
 

});


router.route('/stations/linechart1').post((req, res) => {

    var str = JSON.stringify(req.body, null, 4);
   // console.log(req.body.placeName)
    for (var i = 0,len = stations_found.length; i < len; i++) {

        if ( stations_found[i].id === req.body.placeName ) { // strict equality test

            place_selected =  stations_found[i];
            //console.log(place_selected )
            break;
        }
    }
 
    const query2 = {
        // give the query a unique name
        name: 'fetch-divvy-2',
        text: ' SELECT * FROM divvy_stations_logs where  divvy_stations_logs.lastCommunicationTime >current_date -interval \'24 hour\' and divvy_stations_logs.latitude= $1 and divvy_stations_logs.longitude= $2 ',
        values: [place_selected.latitude, place_selected.longitude]
    }

    find_stations_from_divvy_logs_b(query2).then(function (response) {
        var hits = response;
        res.json({'stations_found2': 'Added successfully'});
    });
 

});


router.route('/stations/linechart2').post((req, res) => {

    var str = JSON.stringify(req.body, null, 4);
    //console.log(req.body.placeName)
    for (var i = 0,len = stations_found.length; i < len; i++) {

        if ( stations_found[i].id === req.body.placeName ) { // strict equality test

            place_selected =  stations_found[i];
            //console.log(place_selected )
            break;
        }
    }
 
    const query3 = {
        // give the query a unique name
        name: 'fetch-divvy-3',
        text: ' SELECT * FROM divvy_stations_logs where  divvy_stations_logs.lastCommunicationTime >current_date -interval \'7 days\' and divvy_stations_logs.latitude= $1 and divvy_stations_logs.longitude= $2 ',
        values: [place_selected.latitude, place_selected.longitude]
    }

    find_stations_from_divvy_logs_c(query3).then(function (response) {
        var hits = response;
        res.json({'stations_found3': 'Added successfully'});
    });
});

    
router.route('/stations/linechartsma').post((req, res) => {

    var str = JSON.stringify(req.body, null, 4);
    //console.log(req.body.placeName)
    for (var i = 0,len = stations_found.length; i < len; i++) {

        if ( stations_found[i].id === req.body.placeName ) { // strict equality test

            place_selected =  stations_found[i];
            //console.log(place_selected )
            break;
        }
    }
 
    const query4= {
        // give the query a unique name
        name: 'fetch-divvy-4',
        text: ' SELECT * FROM divvy_stations_logs where  divvy_stations_logs.lastCommunicationTime >current_date -interval \'24 hour\' and divvy_stations_logs.latitude= $1 and divvy_stations_logs.longitude= $2 LIMIT 720 ',
        values: [place_selected.latitude, place_selected.longitude]
    }

    find_stations_from_divvy_logs_d(query4).then(function (response) {
        var hits = response;
        res.json({'stations_found4': 'Added successfully'});
    });
 

});





/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

////////////////////    Divvy - PostgreSQL - Client API            /////////////////

////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////


async function find_stations_from_divvy(query) {

    const response = await pgClient.query(query);

    stations_found = [];

    for (i = 0; i < 3; i++) {
                
         plainTextDateTime =  moment(response.rows[i].lastcommunicationtime).format('YYYY-MM-DD, h:mm:ss a');
    

        var station = {
                    "id": response.rows[i].id,
                    "stationName": response.rows[i].stationname,
                    "availableBikes": response.rows[i].availablebikes,
                    "availableDocks": response.rows[i].availabledocks,
                    "is_renting": response.rows[i].is_renting,
                    "lastCommunicationTime": plainTextDateTime,
                    "latitude": response.rows[i].latitude,    
                    "longitude": response.rows[i].longitude,
                    "status": response.rows[i].status,
                    "totalDocks": response.rows[i].totaldocks
        };

        stations_found.push(station);

    }


}

async function find_stations_from_divvy_logs_a(query1) {

    const response = await pgClient1.query(query1);

    stations_found1 = [];

    for (i = 0; i < 10; i++) {
                
         plainTextDateTime =  moment(response.rows[i].lastcommunicationtime).format('YYYY-MM-DD, h:mm:ss a');
    

        var station = {
                    "id": response.rows[i].id,
                    "stationName": response.rows[i].stationname,
                    "availableBikes": response.rows[i].availablebikes,
                    "availableDocks": response.rows[i].availabledocks,
                    "is_renting": response.rows[i].is_renting,
                    "lastCommunicationTime": plainTextDateTime,
                    "latitude": response.rows[i].latitude,    
                    "longitude": response.rows[i].longitude,
                    "status": response.rows[i].status,
                    "totalDocks": response.rows[i].totaldocks
        };

        stations_found1.push(station);

    }

    console.log( stations_found1)
}


async function find_stations_from_divvy_logs_b(query2) {

    const response = await pgClient1.query(query2);

    stations_found2 = [];

    for (i = 0; i < 10; i++) {
                
         plainTextDateTime =  moment(response.rows[i].lastcommunicationtime).format('YYYY-MM-DD, h:mm:ss a');
    

        var station = {
                    "id": response.rows[i].id,
                    "stationName": response.rows[i].stationname,
                    "availableBikes": response.rows[i].availablebikes,
                    "availableDocks": response.rows[i].availabledocks,
                    "is_renting": response.rows[i].is_renting,
                    "lastCommunicationTime": plainTextDateTime,
                    "latitude": response.rows[i].latitude,    
                    "longitude": response.rows[i].longitude,
                    "status": response.rows[i].status,
                    "totalDocks": response.rows[i].totaldocks
        };

        stations_found2.push(station);

    }


}

async function find_stations_from_divvy_logs_c(query3) {

    const response = await pgClient1.query(query3);

    stations_found3 = [];

    for (i = 0; i < 10; i++) {
                
         plainTextDateTime =  moment(response.rows[i].lastcommunicationtime).format('YYYY-MM-DD, h:mm:ss a');
    

        var station = {
                    "id": response.rows[i].id,
                    "stationName": response.rows[i].stationname,
                    "availableBikes": response.rows[i].availablebikes,
                    "availableDocks": response.rows[i].availabledocks,
                    "is_renting": response.rows[i].is_renting,
                    "lastCommunicationTime": plainTextDateTime,
                    "latitude": response.rows[i].latitude,    
                    "longitude": response.rows[i].longitude,
                    "status": response.rows[i].status,
                    "totalDocks": response.rows[i].totaldocks
        };

        stations_found3.push(station);

    }


}


async function find_stations_from_divvy_logs_d(query4) {

    const response = await pgClient1.query(query4);

    stations_found4 = [];

    for (i = 0; i < 720; i++) {
                
         plainTextDateTime =  moment(response.rows[i].lastcommunicationtime).format('YYYY-MM-DD, h:mm:ss a');
    

        var station = {
            "id": response.rows[i].id,
            "stationName": response.rows[i].stationname,
            "availableBikes": response.rows[i].availablebikes,
            "availableDocks": response.rows[i].availabledocks,
            "is_renting": response.rows[i].is_renting,
            "lastCommunicationTime": plainTextDateTime,
            "latitude": response.rows[i].latitude,    
            "longitude": response.rows[i].longitude,
            "status": response.rows[i].status,
            "totalDocks": response.rows[i].totaldocks
        };

        stations_found4.push(station);

    }
   // console.log(abc)
    console.log(stations_found4)

}






/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

////////////////////    Yelp - ElasticSerch - Client API            /////////////////

////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////



async function find_places_from_yelp(place, where) {

    places_found = [];

//////////////////////////////////////////////////////////////////////////////////////
// Using the business name to search for businesses will leead to incomplete results
// better to search using categorisa/alias and title associated with the business name
// For example one of the famous places in chicago for HotDogs is Portillos
// However, it also offers Salad and burgers
// Here is an example of a busness review from Yelp for Pertilos
//               alias': 'portillos-hot-dogs-chicago-4',
//              'categories': [{'alias': 'hotdog', 'title': 'Hot Dogs'},
//                             {'alias': 'salad', 'title': 'Salad'},
//                             {'alias': 'burgers', 'title': 'Burgers'}],
//              'name': "Portillo's Hot Dogs",
//////////////////////////////////////////////////////////////////////////////////////


    let body = {
        size: 1000,
        from: 0,
        "query": {
          "bool" : {
            "must" : {
               "term" : { "categories.alias" : place } 
            },


            "filter": {
                "term" : { "location.address1" : where  }
            },


            "must_not" : {
              "range" : {
                "rating" : { "lte" : 3 }
              }
            },

            "must_not" : {
              "range" : {
                "review_count" : { "lte" : 500 }
              }
            },

            "should" : [
              { "term" : { "is_closed" : "false" } }
            ],
          }
        }
    }


    results = await esClient.search({index: 'chicago_yelp_reviews', body: body});

    results.hits.hits.forEach((hit, index) => {
        

        var place = {
                "name": hit._source.name,
                "display_phone": hit._source.display_phone,
                "address1": hit._source.location.address1,
                "is_closed": hit._source.is_closed,
                "rating": hit._source.rating,
                "review_count": hit._source.review_count,
                "latitude": hit._source.coordinates.latitude,    
                "longitude": hit._source.coordinates.longitude
        };

        places_found.push(place);

    });

    find_places_task_completed = true;             
      
}



app.use('/', router);

app.listen(4000, () => console.log('Express server running on port 4000'));

