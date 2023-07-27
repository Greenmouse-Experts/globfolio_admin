import { BaseResult, UserProfile } from ".";

export interface FeedbackItem {
  id: string;
  rating: number;
  subject: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  user: UserProfile;
}
export interface FeedbackResult extends BaseResult {
    feedbacks: FeedbackItem[]
}
