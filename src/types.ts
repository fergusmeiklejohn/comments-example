export type Image = {
  id: string;
  url: string;
  position: [number, number];
};
export type Position = [number, number];
export type CommentMarkerColors = "yellow" | "green" | "red" | "blue" | "black";
export type CommentMarker = {
  id: string;
  imageID: string;
  position: Position;
  color: CommentMarkerColors;
};

export type CommentMoodReaction =
  | "excited"
  | "love"
  | "happy"
  | "sad"
  | "thumbsup";

export type CommentType = {
  id: string;
  text: string;
  commentMarkerID: string;
  imageID: string;
  userID: string;
  userName: string;
  userAvatar: string;
  createdAt: Date;
  mood: CommentMoodReaction;
};

export type AuthUser = {
  id: string;
  name: string;
  avatar: string;
};
