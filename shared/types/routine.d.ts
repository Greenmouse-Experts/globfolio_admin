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

export interface NotifyResult extends BaseResult {
  data: NotifyItem[]
}

export interface NotifyItem {
  id: string
  userId: string
  type: number;
  isRead: boolean;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
