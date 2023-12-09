
var Platform = /** @class */ (function () {
    function Platform(users, creators, advertisers, adspaces, posts) {
        this.Creators = creators;
        this.Users = users;
        this.Advertisers = advertisers;
        this.Adspaces = adspaces;
        this.Posts = posts;
    }
    Platform.prototype.calculate_Adprice = function (likes, dislikes, reviews, views) {
        return BigInt(0);
    };
    return Platform;
}());
//exports.Platform = Platform;
var User = /** @class */ (function () {
    function User(address, likes, dislikes, reviews) {
        this.address = address;
        this.likes = likes;
        this.dislikes = dislikes;
        this.reviews = reviews;
    }
    return User;
}());
//exports.User = User;
var Content = /** @class */ (function () {
    function Content(user_add, nft_add, token_id, reviews, likes, dislikes, views) {
        this.user_add = user_add;
        this.reviews = reviews;
        this.likes = likes;
        this.dislikes = dislikes;
        this.views = views;
        this.nft_add = nft_add;
        this.token_id = token_id;
    }
    return Content;
}());
//exports.Content = Content;
var Adspace = /** @class */ (function () {
    function Adspace(nft_id, content, redirect_link, price) {
        this.nft_id = nft_id;
        this.content = content;
        this.redirect_link = redirect_link;
        this.base_price = price;
    }
    return Adspace;
}());
//exports.Adspace = Adspace;
var Creator = /** @class */ (function () {
    function Creator(address, content, adspace) {
        this.address = address;
        this.content = content;
        this.adspace = adspace;
    }
    return Creator;
}());
//exports.Creator = Creator;
var Advertiser = /** @class */ (function () {
    function Advertiser(address, adspaces) {
        this.address = address;
        this.adspaces = adspaces;
    }
    return Advertiser;
}());
//exports.Advertiser = Advertiser;
export {User,Advertiser,Creator,Adspace,Content,Platform}