class Platform {
  public Creators: Set<Creator>;
  public Users: Set<User>;
  public Advertisers: Set<Advertiser>;
  public Adspaces: Set<Adspace>;
  public Posts: Set<Content>;
  constructor(
    users: Set<User>,
    creators: Set<Creator>,
    advertisers: Set<Advertiser>,
    adspaces: Set<Adspace>,
    posts: Set<Content>
  ) {
    this.Creators = creators;
    this.Users = users;
    this.Advertisers = advertisers;
    this.Adspaces = adspaces;
    this.Posts = posts;
  }
  public calculate_Adprice(
    likes: number,
    dislikes: number,
    reviews: number,
    views: number
  ): bigint {
    return BigInt(0);
  }
}

class User {
  public address: string;
  private likes: Set<string>;
  private dislikes: Set<string>;
  public reviews: Map<string, string>;
  constructor(
    address: string,
    likes: Set<string>,
    dislikes: Set<string>,
    reviews: Map<string, string>
  ) {
    this.address = address;
    this.likes = likes;
    this.dislikes = dislikes;
    this.reviews = reviews;
  }
}

class Content {
  id: string;
  public nft_add: string;
  token_id: number;
  user_add: string;
  public reviews: Map<string, string>;
  public likes: number;
  public dislikes: number;
  public views: number;
  constructor(
    user_add: string,
    nft_add: string,
    token_id: number,
    reviews: Map<string, string>,
    likes: number,
    dislikes: number,
    views: number
  ) {
    this.user_add = user_add;
    this.reviews = reviews;
    this.likes = likes;
    this.dislikes = dislikes;
    this.views = views;
    this.nft_add = nft_add;
    this.token_id = token_id;
  }
}

class Adspace {
  id: string;
  public nft_id: string;
  public base_price: bigint;
  public redirect_link: string;
  public content: string;
  constructor(
    nft_id: string,
    content: string,
    redirect_link: string,
    price: bigint
  ) {
    this.nft_id = nft_id;
    this.content = content;
    this.redirect_link = redirect_link;
    this.base_price = price;
  }
}

class Creator {
  public address: string;
  public content: Set<string>;
  public adspace: Set<string>;
  constructor(address: string, content: Set<string>, adspace: Set<string>) {
    this.address = address;
    this.content = content;
    this.adspace = adspace;
  }
}

class Advertiser {
  public address: string;
  private adspaces: Set<string>;
  constructor(address: string, adspaces: Set<string>) {
    this.address = address;
    this.adspaces = adspaces;
  }
}

export { User, Creator, Advertiser, Platform, Adspace, Content };
