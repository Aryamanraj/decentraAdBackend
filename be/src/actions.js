/*"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCreator = exports.createAdvertiser = exports.createContent = exports.createUser = exports.createAdspace = void 0;
var ads_1 = require("./ads");
var uuid = require("uuid");*/
import * as uuid from 'uuid';
import {User,Advertiser,Creator,Adspace,Content,Platform} from './ads.js';
var platform = new Platform(new Set(), new Set(), new Set(), new Set(), new Set());
var createUser = function (address) {
    var _user = new User(address, new Set(), new Set(), new Map());
    platform.Users.add(_user);
    console.log(JSON.stringify(platform));
    return _user;
};
//exports.createUser = createUser;
var createCreator = function (address) {
    var _creator = new Creator(address, new Set(), new Set());
    platform.Creators.add(_creator);
    console.log(JSON.stringify(platform));
    return _creator;
};
//exports.createCreator = createCreator;
var createAdvertiser = function (address) {
    var _advertiser = new Advertiser(address, new Set());
    platform.Advertisers.add(_advertiser);
    console.log(JSON.stringify(platform));
    return _advertiser;
};
//exports.createAdvertiser = createAdvertiser;
var createContent = function (useradd, nft_add, tokenId) {
    var _content = new Content(useradd, nft_add, tokenId, new Map(), 0, 0, 0);
    _content.id = uuid.v4();
    platform.Posts.add(_content);
    console.log(JSON.stringify(platform));
    return _content;
};
//exports.createContent = createContent;
var createAdspace = function (nft_id, base_price, redirect_link, content) {
    var _adspace = new Adspace(nft_id, content, redirect_link, base_price);
    _adspace.id = uuid.v4();
    platform.Adspaces.add(_adspace);
    console.log(JSON.stringify(platform));
    return _adspace;
};
//exports.createAdspace = createAdspace;
export {createUser,createContent,createAdvertiser,createCreator,createAdspace};