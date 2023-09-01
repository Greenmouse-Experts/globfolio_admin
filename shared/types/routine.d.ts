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
  feedbacks: FeedbackItem[];
}

export interface NotifyResult extends BaseResult {
  data: NotifyItem[];
}

export interface NotifyItem {
  id: string;
  userId: string;
  type: number;
  isRead: boolean;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ChatData {
  chatroom?: {
    access: string;
    createdAt: string;
    deletedAt: string | null;
    description: string | null;
    id: string;
    isDeleted: string | null;
    title: string;
    updatedAt: string;
    userId: string;
  };
  chatroomid?: string;
  createdAt: string;
  deletedAt?: string | null;
  id: string;
  message: string;
  sender: string;
  updatedAt?: string;
  owner?: string
  afrom?: string
  files?: string
}
