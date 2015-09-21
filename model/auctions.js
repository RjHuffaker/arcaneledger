Auctions = new Mongo.Collection("auctions");

Auctions.allow({
	insert: function (userId, auction) {
    return userId && auction.owner === userId;
  },
  update: function (userId, auction, fields, modifier) {
    return userId && auction.owner === userId;
  },
  remove: function (userId, auction) {
    return userId && auction.owner === userId;
  }
});