angular.module('app', ['ui.router',
			'app.controllers.admin',
			'app.controllers.admin.guest',
			'app.controllers.admin.family',
			'app.controllers.admin.gift',
			'app.controllers.gift',
			'app.controllers.rsvp'
		])

.config(['$stateProvider','$locationProvider','$urlRouterProvider', function($stateProvider, $locationProvider,$urlRouterProvider){

	$stateProvider
	.state('home', {
		url: "/",
		templateUrl: 'views/home.html',
		controller : 'AppController'
	})
	.state('story', {
		url: "/story",
		templateUrl: 'views/story.html',
		// controller : 'AppController'
	})
	.state('article', {
		url: "/article",
		templateUrl: 'views/article.html',
		// controller : 'AppController'
	})
	.state('info', {
		url: "/info",
		templateUrl: 'views/info.html',
		controller : function($scope){
			$scope.infos = [
				{
					date: '29 Juin 2019',
					hours: '14h15',
					title: 'La Cérémonie Civile',
					place: 'Mairie de Gamaches, Place du Maréchal Leclercq.',
					mapsLink: 'https://www.google.fr/maps/place/Salle+de+permanence+de+la+mairie/@49.9856914,1.5598221,18.99z/data=!4m13!1m7!3m6!1s0x47e7563ccbb081db:0x40af13e81620bc0!2s80220+Gamaches!3b1!8m2!3d49.985833!4d1.559647!3m4!1s0x47e7566b1c010a41:0x3b917a7843935342!8m2!3d49.9857549!4d1.5598038?hl=fr',
					description: 'La cérémonie civile se déroulera dans la ville où a grandi Elodie. Un grand parking se situe juste devant, alors pas de tracas pour se garer.'
				},
				{
					date: '29 Juin 2019',
					hours: '15h00',
					title: 'La Cérémonie Religieuse',
					place: 'Eglise de Gamaches, rue de Normandie',
					mapsLink: 'https://www.google.fr/maps/place/Eglise+de+GAMACHES/@49.986051,1.55554,18.99z/data=!4m13!1m7!3m6!1s0x47e7563ccbb081db:0x40af13e81620bc0!2s80220+Gamaches!3b1!8m2!3d49.985833!4d1.559647!3m4!1s0x47e7566b1af8257f:0x762ce1bbfb397435!8m2!3d49.9860658!4d1.5554935?hl=fr',
					description: 'C\'est naturellement dans l\'église de Gamaches qui nous voulons ...'
				},
				{
					date: '29 Juin 2019',
					hours: '18h00',
					title: 'Le Vin d\'Honneur',
					place: 'Lieu secret pour le moment',
					mapsLink: 'https://www.google.fr/maps/place/Somme/@49.9676227,1.7309381,9z/data=!3m1!4b1!4m5!3m4!1s0x47e7873951d7aa9f:0x30af13e81612a80!8m2!3d49.914518!4d2.2707095',
					description: 'Dès que nous avons découvert ce lieu, nous avons eu un déclique, c\'est ici que nous avons décidé de partager ce moment avec vous. Ce lieu vous sera dévoilé prochainement ...'
				},
				{
					date: '29 Juin 2019',
					hours: '20h00',
					title: 'Le Diner',
					place: 'Lieu secret pour le moment',
					mapsLink: 'https://www.google.fr/maps/place/Somme/@49.9676227,1.7309381,9z/data=!3m1!4b1!4m5!3m4!1s0x47e7873951d7aa9f:0x30af13e81612a80!8m2!3d49.914518!4d2.2707095',
					description: ''
				}
			];
		}
	})
	.state('lodging', {
		url: "/lodging",
		templateUrl: 'views/lodging.html',
		// controller : 'AppController'
	})
	.state('invite', {
		url: "/invite",
		templateUrl: 'views/guest.html',
		// controller : 'AppController'
	})
	.state('contact', {
		url: "/contact",
		templateUrl: 'views/contact.html',
		// controller : 'AppController'
	})
	.state('giftList', {
		url: '/giftList',
		templateUrl: 'components/giftList/giftList.html',
		controller: 'GiftController'
	})
	.state('rsvp', {
		url: '/rsvp',
		templateUrl: 'components/rsvp/rsvp.html',
		 controller: 'RSVPController'
	})
	.state('admin', {
		url: '/admin',
		templateUrl: 'views/admin.html',
		controller: 'AdminController'
		/* OnEnter : function()
			authent
		*/
	})
	.state('admin.guest', {
		url: '/admin/guest',
		templateUrl: 'views/admin/guest.admin.html',
		controller: 'AdminGuestController'
	})
	.state('admin.family', {
		url: '/admin/family',
		templateUrl: 'views/admin/family.admin.html',
		controller: 'AdminFamilyController'
	})
	.state('admin.gift', {
		url: '/admin/gift',
		templateUrl: 'views/admin/gift.admin.html',
		controller: 'AdminGiftController'
	})


	$urlRouterProvider.otherwise('/');
	$locationProvider.html5Mode(true);
}])

.controller('AppController', function($scope, $http){

})

.controller('MainController', function($scope, CONSTANTS, $http, $interval, $location){
	$scope.weddingDate = new Date(2019,5,29); //Date.parse(CONSTANTS.weddingDate, 'MM-dd-yyyy');
	$scope.version = "0.0.1-SNAPSHOT";
	$http.get('rest/server/version').then(
		function(response){
			$scope.version = response.data;
		}, function(err){
			console.log("version : ",  err);
		});
	$scope.state = '';
	
	var initMenuItem = function(){
		if($location.url() === '/'){
			$scope.state = 'home';
		}
		else if($location.url() === '/info'){
			$scope.state = 'info';
		}
		else if($location.url() === '/lodging'){
			$scope.state = 'lodging';
		}
		else if($location.url() === '/giftList'){
			$scope.state = 'giftList';
		}
		else if($location.url() === '/rsvp'){
			$scope.state = 'rsvp';
		}
	};
	initMenuItem();
	$scope.clickMenu = function(item){
		if(item){
			$scope.state = item;
		}
	};
})
.filter('html',function($sce){
    return function(input){
        return $sce.trustAsHtml(input);
    }
});
