export interface ProfileItem {
  account: string;
  profile_name: string;
  profile_image_link: string;
  biography: string;
  id: string;
  business_email?: any;
  external_url: string;
  following: number;
  likes: number;
  media_type: string;
  posts_count: number;
  followers: number;
  is_verified: boolean;
  datetime: number;
  image_url: string;
  url: string;
  comments: number;
  thumbnail_src: string;
  thumbnails: Thumbnail[];
}

export interface Thumbnail {
  src: string;
  config_width: number;
  config_height: number;
}

export interface ProfilePending {
  status: string;
  message: string;
}

