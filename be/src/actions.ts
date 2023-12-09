import { Adspace, Advertiser, Content, Creator, Platform, User } from "./ads";
import * as uuid from "uuid";

let platform = new Platform(
  new Set<User>(),
  new Set<Creator>(),
  new Set<Advertiser>(),
  new Set<Adspace>(),
  new Set<Content>()
);

const createUser = (address: string): User => {
  let _user = new User(
    address,
    new Set<string>(),
    new Set<string>(),
    new Map<string, string>()
  );
  platform.Users.add(_user);
  console.log(JSON.stringify(platform));
  return _user;
};

const createCreator = (address: string): Creator => {
  let _creator = new Creator(address, new Set<string>(), new Set<string>());
  platform.Creators.add(_creator);
  console.log(JSON.stringify(platform));
  return _creator;
};

const createAdvertiser = (address: string): Advertiser => {
  let _advertiser = new Advertiser(address, new Set<string>());
  platform.Advertisers.add(_advertiser);
  console.log(JSON.stringify(platform));
  return _advertiser;
};

const createContent = (
  useradd: string,
  nft_add: string,
  tokenId: number
): Content => {
  let _content = new Content(
    useradd,
    nft_add,
    tokenId,
    new Map<string, string>(),
    0,
    0,
    0
  );
  _content.id = uuid.v4();
  platform.Posts.add(_content);
  console.log(JSON.stringify(platform));
  return _content;
};

const createAdspace = (
  nft_id: string,
  base_price: bigint,
  redirect_link: string,
  content: string
): Adspace => {
  let _adspace = new Adspace(nft_id, content, redirect_link, base_price);
  _adspace.id = uuid.v4();

  platform.Adspaces.add(_adspace);
  console.log(JSON.stringify(platform));
  return _adspace;
};

export {
  createAdspace,
  createUser,
  createContent,
  createAdvertiser,
  createCreator,
};
