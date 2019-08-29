/*
 * All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
 *
 * Please see LICENSE.txt for details.
 */
(function () {
  'use strict';
  app
      .service('paxDetailService', function ($http, $q, Upload) {
         function getPaxCaseHistory(paxId) {
               var dfd = $q.defer();
               dfd.resolve($http.get("/gtas/passenger/caseHistory/" + paxId));
               return dfd.promise;
           }
        
          function getPaxDetail(paxId, flightId) {
              var dfd = $q.defer();
              dfd.resolve($http.get("/gtas/passengers/passenger/" + paxId + "/details?flightId=" + flightId));
              return dfd.promise;
          }

          function getPaxWatchlistLink(paxId){
              var dfd = $q.defer();
              dfd.resolve($http.get("/gtas/passengers/passenger/getwatchlistlink?paxId=" + paxId));
              return dfd.promise;
          }
          function savePaxWatchlistLink(paxId){
              var dfd = $q.defer();
              dfd.resolve($http.get("/gtas/passengers/passenger/savewatchlistlink?paxId=" + paxId));
              return dfd.promise;
          }

          function getPaxFlightHistory(paxId, flightId){
              var dfd = $q.defer();
              dfd.resolve($http.get("/gtas/passengers/passenger/flighthistory?paxId=" + paxId + "&flightId="+ flightId));
              return dfd.promise;
          }

          function getPaxFullTravelHistory(paxId, flightId){
            var dfd = $q.defer();
            dfd.resolve($http.get("/gtas/passengers/passenger/travelhistory?paxId=" + paxId + "&flightId=" + flightId));
            return dfd.promise;
          }

          function getPaxBookingDetailHistory(paxId, flightId){
              var dfd = $q.defer();
              dfd.resolve($http.get("/gtas/passengers/passenger/bookingdetailhistory?paxId=" + paxId + "&flightId=" + flightId));
              return dfd.promise;
          }

          function getPaxAttachments(paxId){
            var dfd = $q.defer();
            dfd.resolve($http.get('/gtas/getattachments?paxId='+ paxId));
            return dfd.promise;
          }

          function savePaxAttachments(username, password, description, paxId, file){
            if (!file.$error) {
                  Upload.upload({
                      url: '/gtas/uploadattachments',
                      data: {
                        username: username,
                        password: password,
                        desc: description,
                        paxId: paxId,
                        file: file
                      }
                  }).progress(function (evt) {
                    //progress tracker potentially
                  }).success(function (data, status, headers, config) {
                      return "success";
                  });
            }
          };

          function getAddressPath() {
            return "m249.023476,157.071489l-156.524599,145.070219l0,156.572659a13.58352,15.285634 0 0 0 13.58352,15.285634l95.135578,-0.277052a13.58352,15.285634 0 0 0 13.515602,-15.285634l0,-91.436751a13.58352,15.285634 0 0 1 13.58352,-15.285634l54.33408,0a13.58352,15.285634 0 0 1 13.58352,15.285634l0,91.369877a13.58352,15.285634 0 0 0 13.58352,15.333402l95.101619,0.296159a13.58352,15.285634 0 0 0 13.58352,-15.285634l0,-156.677747l-156.49064,-144.96513a10.348944,11.645742 0 0 0 -12.989241,0zm247.245533,98.601892l-70.973892,-65.833314l0,-132.325822a10.18764,11.464225 0 0 0 -10.18764,-11.464225l-47.54232,0a10.18764,11.464225 0 0 0 -10.18764,11.464225l0,69.368117l-76.008284,-70.371237a40.75056,45.856902 0 0 0 -51.78717,0l-214.899776,199.162256a10.18764,11.464225 0 0 0 -1.358352,16.145451l21.648735,29.615916a10.18764,11.464225 0 0 0 14.356083,1.557224l199.694723,-185.089919a10.348944,11.645742 0 0 1 12.989241,0l199.703213,185.089919a10.18764,11.464225 0 0 0 14.347593,-1.528563l21.648735,-29.615916a10.18764,11.464225 0 0 0 -1.443249,-16.174111z";
          }
          function getAirportPath() {
            return "M520.522,186.686c-2.63-3.087-6.482-4.868-10.541-4.868h-88.029l20.363-97.538c0.853-4.081-0.18-8.326-2.81-11.56 c-2.628-3.237-6.576-5.114-10.743-5.114H319.85V27.689h24.458c7.645,0,13.845-6.197,13.845-13.845S351.953,0,344.308,0H267.7 c-7.645,0-13.845,6.197-13.845,13.845s6.2,13.845,13.845,13.845h24.458v39.919h-108.91c-4.167,0-8.116,1.877-10.743,5.114 c-2.63,3.234-3.661,7.479-2.81,11.56l20.363,97.538h-88.029c-4.056,0-7.908,1.78-10.541,4.868 c-2.63,3.087-3.774,7.177-3.126,11.181l12.837,79.651c0.003,0.014,0.003,0.025,0.003,0.039l14.847,92.111 c0.676,4.192,3.193,7.692,6.643,9.727c2.071,1.221,4.477,1.913,7.025,1.913h85.374v216.851c0,7.648,6.2,13.845,13.845,13.845 H383.07c7.645,0,13.845-6.197,13.845-13.845V381.31h85.374c2.547,0,4.956-0.692,7.025-1.913c3.45-2.035,5.967-5.532,6.643-9.727 l14.847-92.111c0.003-0.014,0.003-0.025,0.003-0.039l12.837-79.651C524.296,193.863,523.152,189.773,520.522,186.686z M405.008,127.478h-26.642v-32.18h33.36L405.008,127.478z M350.679,95.298v32.18H319.85v-32.18H350.679z M292.161,127.478h-30.832 v-32.18h30.829v32.18H292.161z M233.64,95.298v32.18h-26.643l-6.717-32.18H233.64z M187.864,261.505h-61.201l-8.382-51.997h69.58 v51.997H187.864z M292.161,261.505h-76.608v-51.997h76.608V261.505z M396.455,261.505h-76.608v-51.997h76.608V261.505z M485.346,261.505h-61.201v-51.997h69.58L485.346,261.505z";
          }
          function getPassengerPath() {
            return "M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z";
          }
          function getPhonePath() {
            return "M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z";
          }
          function getCreditCardPath() {
            return "M0 432c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V256H0v176zm192-68c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H204c-6.6 0-12-5.4-12-12v-40zm-128 0c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM576 80v48H0V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48z";
          }
          function getDocumentPath() {
            return "M129.62 176h39.09c1.49-27.03 6.54-51.35 14.21-70.41-27.71 13.24-48.02 39.19-53.3 70.41zm0 32c5.29 31.22 25.59 57.17 53.3 70.41-7.68-19.06-12.72-43.38-14.21-70.41h-39.09zM224 286.69c7.69-7.45 20.77-34.42 23.43-78.69h-46.87c2.67 44.26 15.75 71.24 23.44 78.69zM200.57 176h46.87c-2.66-44.26-15.74-71.24-23.43-78.69-7.7 7.45-20.78 34.43-23.44 78.69zm64.51 102.41c27.71-13.24 48.02-39.19 53.3-70.41h-39.09c-1.49 27.03-6.53 51.35-14.21 70.41zM416 0H64C28.65 0 0 28.65 0 64v384c0 35.35 28.65 64 64 64h352c17.67 0 32-14.33 32-32V32c0-17.67-14.33-32-32-32zm-80 416H112c-8.8 0-16-7.2-16-16s7.2-16 16-16h224c8.8 0 16 7.2 16 16s-7.2 16-16 16zm-112-96c-70.69 0-128-57.31-128-128S153.31 64 224 64s128 57.31 128 128-57.31 128-128 128zm41.08-214.41c7.68 19.06 12.72 43.38 14.21 70.41h39.09c-5.28-31.22-25.59-57.17-53.3-70.41z";
          }
          function getEmailPath() {
            return "M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z";
          }
          function getFlightPath() {
            return "M 480 192 H 365.71 L 260.61 8.06 A 16.014 16.014 0 0 0 246.71 0 h -65.5 c -10.63 0 -18.3 10.17 -15.38 20.39 L 214.86 192 H 112 l -43.2 -57.6 c -3.02 -4.03 -7.77 -6.4 -12.8 -6.4 H 16.01 C 5.6 128 -2.04 137.78 0.49 147.88 L 32 256 L 0.49 364.12 C -2.04 374.22 5.6 384 16.01 384 H 56 c 5.04 0 9.78 -2.37 12.8 -6.4 L 112 320 h 102.86 l -49.03 171.6 c -2.92 10.22 4.75 20.4 15.38 20.4 h 65.5 c 5.74 0 11.04 -3.08 13.89 -8.06 L 365.71 320 H 480 c 35.35 0 96 -28.65 96 -64 s -60.65 -64 -96 -64 Z";
          }
          function getHitPath() {
            return "M176 432c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80zM25.26 25.199l13.6 272C39.499 309.972 50.041 320 62.83 320h66.34c12.789 0 23.331-10.028 23.97-22.801l13.6-272C167.425 11.49 156.496 0 142.77 0H49.23C35.504 0 24.575 11.49 25.26 25.199z";
          }

          function deleteAttachment(attId){
             var dfd = $q.defer();
               dfd.resolve($http.post("/gtas/deleteattachment", attId));
               return dfd.promise;
          }

          return ({getPaxCaseHistory: getPaxCaseHistory,
              getPaxDetail: getPaxDetail,
                  getPaxFlightHistory: getPaxFlightHistory,
                  getPaxFullTravelHistory: getPaxFullTravelHistory,
                  getPaxBookingDetailHistory: getPaxBookingDetailHistory,
                  getPaxAttachments: getPaxAttachments,
                  savePaxAttachments: savePaxAttachments,
                  deleteAttachment: deleteAttachment,
                  getPaxWatchlistLink: getPaxWatchlistLink,
                  savePaxWatchlistLink: savePaxWatchlistLink,
                  getAddressPath: getAddressPath,
                  getAirportPath: getAirportPath,
                  getCreditCardPath: getCreditCardPath,
                  getDocumentPath: getDocumentPath,
                  getEmailPath: getEmailPath,
                  getFlightPath: getFlightPath,
                  getHitPath: getHitPath,
                  getPassengerPath: getPassengerPath,
                  getPhonePath: getPhonePath
                  });
      })
      .service('caseService', function ($http, $q) {
          function createDisposition(disposition) {
              var dfd = $q.defer();
              dfd.resolve($http.post("/gtas/disposition", disposition));
              return dfd.promise;
          }

          function getDispositionStatuses() {
              var dfd = $q.defer();
              dfd.resolve($http.get("/gtas/dispositionstatuses"));
              return dfd.promise;
          }

          function getAllCases(){
            var dfd = $q.defer();
            dfd.resolve($http.get("/gtas/allcases"));
            return dfd.promise;
          }

          function createOrEditDispositionStatus(dispStatusObj){
            var dfd = $q.defer();
            dfd.resolve($http.post("/gtas/createoreditdispstatus",dispStatusObj));
            return dfd.promise;
          }

          function deleteDispositionStatus(dispStatusObj){
            var dfd = $q.defer();
            dfd.resolve($http.post("/gtas/deletedispstatus", dispStatusObj));
            return dfd.promise;
          }

          return ({
              getDispositionStatuses: getDispositionStatuses,
              createDisposition: createDisposition,
              getAllCases:getAllCases,
              createOrEditDispositionStatus:createOrEditDispositionStatus,
              deleteDispositionStatus:deleteDispositionStatus
          });
      })
      .service("paxService", function (userService, $rootScope, $http, $q) {

          function getPassengersBasedOnUser(paxModel){
              var today = new Date();
              //first request
               return userService.getUserData().then( function( user ) {
                  if(user.data.filter!=null) {
                      if (user.data.filter.flightDirection)
                          paxModel.model.direction = user.data.filter.flightDirection;
                      if (typeof user.data.filter.etaStart  != undefined && user.data.filter.etaStart != null) {
                          paxModel.model.starteeDate = new Date();
                          paxModel.model.etaStart.setDate(today.getDate() + user.data.filter.etaStart);
                      }
                      if (typeof user.data.filter.etaEnd  != undefined && user.data.filter.etaEnd != null) {
                          paxModel.model.endDate = new Date();
                          paxModel.model.etaEnd.setDate(today.getDate() + user.data.filter.etaEnd);
                      }
                      if (user.data.filter.originAirports != null)
                          paxModel.model.origin = paxModel.model.origins = user.data.filter.originAirports;
                      if (user.data.filter.destinationAirports != null)
                          paxModel.model.dest = paxModel.model.destinations = user.data.filter.destinationAirports;
                  }
                  //second request
                  return getAllPax(paxModel.model);
              });
          }

          function getPax(flightId, pageRequest) {
            //This converts the date to the appropriate time, i.e. 00:00:00 on the start, and 23:59:59 on the end without impacting the front end visuals
            var tmp = jQuery.extend({},pageRequest);

            tmp.etaStart = new Date(Date.UTC(tmp.etaStart.getUTCFullYear(), tmp.etaStart.getMonth(), tmp.etaStart.getDate(),0,0,0));
            tmp.etaEnd = new Date(Date.UTC(tmp.etaEnd.getUTCFullYear(), tmp.etaEnd.getMonth(), tmp.etaEnd.getDate(),23,59,59));
              var dfd = $q.defer();
              dfd.resolve($http({
                  method: 'post',
                  url: '/gtas/flights/flight/' + flightId + '/passengers',
                  data: tmp
              }));
              return dfd.promise;
          }

          function getAllPax(pageRequest) {
            //This converts the date to the appropriate time, i.e. 00:00:00 on the start, and 23:59:59 on the end without impacting the front end visuals
            var tmp = jQuery.extend({},pageRequest);
            tmp.etaStart = new Date(Date.UTC(tmp.etaStart.getUTCFullYear(), tmp.etaStart.getMonth(), tmp.etaStart.getDate(),0,0,0));
            tmp.etaEnd = new Date(Date.UTC(tmp.etaEnd.getUTCFullYear(), tmp.etaEnd.getMonth(), tmp.etaEnd.getDate(),23,59,59));
              var dfd = $q.defer();
              dfd.resolve($http({
                  method: 'post',
                  url: '/gtas/passengers/',
                  data: tmp
              }));
              return dfd.promise;
          }

          function getPaxDetail(passengerId, flightId) {
              var url = "/gtas/passengers/passenger/" + passengerId + "/details?flightId=" + flightId;
              return $http.get(url).then(function (res) {
                  return res.data;
              });
          }

          function handleSuccess(response) {
              return (response.data);
          }

          function handleError(response) {
              if (!angular.isObject(response.data) || !response.data.message) {
                  return ($q.reject("An unknown error occurred."));
              }
              return ($q.reject(response.data.message));
          }

          function broadcast(flightId) {
              $rootScope.$broadcast('handleBroadcast', flightId);
          }

          function getRuleHits(passengerId) {
              var request = $http({
                  method: "get",
                  url: "/gtas/hit/passenger" + (passengerId ? "?passengerId=" + passengerId : ""),
                  params: {
                      action: "get"
                  }
              });
              return (request.then(handleSuccess, handleError));
          }

          function getRuleHitsByFlightAndPax(passengerId, flightId) {
              var request = $http({
                  method: "get",
                  url: "/gtas/hit/flightpassenger" + (passengerId ? "?passengerId=" + passengerId : "") + (flightId ? "&flightId=" + flightId : ""),
                  params: {
                      action: "get"
                  }
              });

              return (request.then(function(res){
                return formatHitDetails(res);
              }));
          }

          function broadcastRuleID(ruleID) {
              $rootScope.$broadcast('ruleIDBroadcast', ruleID);
          }

          //Open up rule hits summaries to break apart details for display.
          function formatHitDetails(ruleSummaryHits){
            var ruleHitsList = [];
            if(angular.isDefined(ruleSummaryHits) && ruleSummaryHits.data.length > 0){
              $.each(ruleSummaryHits.data, function(index,value){
                var hitDetail = value.hitsDetailsList[0]; //First object in this 'array' contains the values needed for the front-end display
                hitDetail.category = value.category;
                ruleHitsList.push(hitDetail); 
              });
              }
            return ruleHitsList;
            };

          // Return public API.
          return ({
              getPax: getPax,
              getAllPax: getAllPax,
              broadcast: broadcast,
              getRuleHits: getRuleHits,
              getRuleHitsByFlightAndPax: getRuleHitsByFlightAndPax,
              getPaxDetail: getPaxDetail,
              broadcastRuleID: broadcastRuleID,
              getPassengersBasedOnUser: getPassengersBasedOnUser
          });
      });
}());
