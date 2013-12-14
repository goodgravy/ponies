App = Ember.Application.create();
App.tags = [];

App.Pony = DS.Model.extend({
  thumbnail: DS.attr('string')
});

App.Router.map(function () {
	this.resource('tags', {path: '/'},
		function () {
			this.resource('tag', {path: '/tag/:tag_name'});
		}
	);
});

App.PoniesView = Ember.View.extend({
  templateName: 'ponies',
  delay: 200,

  willInsertElement: function () {
    Ember.run.later(this, 'rotate', this.get('delay'));
  },

  rotate: function () {
    var imgs = this.$('img');
    imgs.last().after(imgs.get(0));
    Ember.run.later(this, 'rotate', this.get('delay'));
  }
});

App.PoniesRoute = Ember.Route.extend({
	model: function () {
		return this.store.find('pony');
	}
});

App.TagsRoute = Ember.Route.extend({
	model: function () {
		return ["angry", "apple", "apple bloom", "applejack", "blush", "bugged", "che",
			"clap", "cloud", "cry", "facehoof", "facepalm", "fluttershy", "happy", "hug",
			"mad", "moustache", "no", "pinkie pie", "puke", "rage", "rainbow",
			"rainbow dash", "rarity", "sad", "scared", "shy", "silly", "sleep", "spa",
			"spike", "tear", "think", "twilight sparkle", "war", "yay"];
	}
});

App.TagRoute = Ember.Route.extend({
	model: function (params) {
		return $.ajax({
			url: 'http://ponyfac.es/api.jsonp:callback/tag:' + params.tag_name,
			dataType: 'jsonp',
			jsonp: false,
			mimeType: "text/javascript",
			jsonpCallback: "callback"
		}).then(function (data) {
			var result = [];
			while (result.get('length') < 100) {
				result.pushObjects(data.faces);
			}
			return result;
		});
	}
});