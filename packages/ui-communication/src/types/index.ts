/**
 * @file types/index.ts
 * Core type definitions for @waysnx/ui-communication
 */

// ─── Enums & Literals ────────────────────────────────────────────────────────

export type ConversationType =
  | 'direct'
  | 'group'
  | 'channel'
  | 'thread'
  | 'comment'
  | 'approval'
  | 'ai';

export type MessageStatus =
  | 'sending'
  | 'sent'
  | 'delivered'
  | 'read'
  | 'failed';

export type MessageType =
  | 'text'
  | 'system'
  | 'ai'
  | 'attachment'
  | 'voice'
  | 'reaction'
  | 'approval';

export type PresenceStatus = 'online' | 'away' | 'busy' | 'offline';

export type TypingState = 'idle' | 'typing' | 'recording';

export type AttachmentType = 'image' | 'file' | 'video' | 'audio' | 'link';

export type ReactionType = string; // emoji character or shortcode

// ─── User / Participant ──────────────────────────────────────────────────────

export interface CommunicationUser {
  id: string;
  name: string;
  avatar?: string;
  status?: PresenceStatus;
  lastSeen?: Date | string;
  role?: string;
}

export interface Participant extends CommunicationUser {
  joinedAt?: Date | string;
  permissions?: string[];
}

// ─── Conversation ────────────────────────────────────────────────────────────

export interface Conversation {
  id: string;
  type: ConversationType;
  title?: string;
  avatar?: string;
  participants: Participant[];
  lastMessage?: Message;
  unreadCount?: number;
  pinned?: boolean;
  muted?: boolean;
  archived?: boolean;
  createdAt: Date | string;
  updatedAt?: Date | string;
  metadata?: Record<string, unknown>;
}

// ─── Message ─────────────────────────────────────────────────────────────────

export interface Message {
  id: string;
  conversationId: string;
  type: MessageType;
  author: CommunicationUser;
  content: string;
  html?: string;
  attachments?: Attachment[];
  reactions?: Reaction[];
  mentions?: Mention[];
  replyTo?: string; // parent message id
  threadId?: string;
  threadCount?: number;
  status: MessageStatus;
  edited?: boolean;
  editedAt?: Date | string;
  deletedAt?: Date | string;
  createdAt: Date | string;
  metadata?: Record<string, unknown>;
}

// ─── Thread ──────────────────────────────────────────────────────────────────

export interface Thread {
  id: string;
  parentMessage: Message;
  replies: Message[];
  participants: CommunicationUser[];
  lastReplyAt?: Date | string;
  replyCount: number;
}

// ─── Attachment ──────────────────────────────────────────────────────────────

export interface Attachment {
  id: string;
  type: AttachmentType;
  name: string;
  url: string;
  thumbnailUrl?: string;
  size?: number; // bytes
  mimeType?: string;
  duration?: number; // seconds for audio/video
  width?: number;
  height?: number;
  metadata?: Record<string, unknown>;
}

// ─── Reaction ────────────────────────────────────────────────────────────────

export interface Reaction {
  emoji: ReactionType;
  users: CommunicationUser[];
  count: number;
}

// ─── Mention ─────────────────────────────────────────────────────────────────

export interface Mention {
  id: string;
  name: string;
  type: 'user' | 'channel' | 'everyone';
  offset: number;
  length: number;
}

// ─── Typing ──────────────────────────────────────────────────────────────────

export interface TypingIndicatorData {
  user: CommunicationUser;
  conversationId: string;
  state: TypingState;
  startedAt: Date | string;
}

// ─── Notification ────────────────────────────────────────────────────────────

export interface CommunicationNotification {
  id: string;
  type: 'message' | 'mention' | 'reaction' | 'thread_reply' | 'invitation';
  title: string;
  body: string;
  conversationId?: string;
  messageId?: string;
  sender?: CommunicationUser;
  read: boolean;
  createdAt: Date | string;
}

// ─── Presence ────────────────────────────────────────────────────────────────

export interface PresenceInfo {
  userId: string;
  status: PresenceStatus;
  lastSeen?: Date | string;
  customStatus?: string;
  device?: string;
}

// ─── Event Model ─────────────────────────────────────────────────────────────

export type CommunicationEventType =
  | 'message.sent'
  | 'message.received'
  | 'message.updated'
  | 'message.deleted'
  | 'message.reacted'
  | 'message.read'
  | 'conversation.created'
  | 'conversation.updated'
  | 'conversation.deleted'
  | 'typing.started'
  | 'typing.stopped'
  | 'presence.changed'
  | 'attachment.uploaded'
  | 'attachment.deleted'
  | 'notification.created'
  | 'thread.created'
  | 'thread.reply';

export interface CommunicationEvent<T = unknown> {
  type: CommunicationEventType;
  payload: T;
  timestamp: Date | string;
  userId?: string;
  conversationId?: string;
}

// ─── Adapter Interface ───────────────────────────────────────────────────────

export interface RealtimeAdapter {
  connect(config: RealtimeConfig): Promise<void>;
  disconnect(): Promise<void>;
  subscribe(channel: string, callback: (event: CommunicationEvent) => void): () => void;
  publish(channel: string, event: CommunicationEvent): Promise<void>;
  isConnected(): boolean;
  onConnectionChange?(callback: (connected: boolean) => void): () => void;
}

export interface RealtimeConfig {
  url?: string;
  token?: string;
  userId?: string;
  options?: Record<string, unknown>;
}

// ─── Provider Config ─────────────────────────────────────────────────────────

export interface CommunicationConfig {
  currentUser: CommunicationUser;
  adapter?: RealtimeAdapter;
  adapterConfig?: RealtimeConfig;
  enableTypingIndicators?: boolean;
  enableReadReceipts?: boolean;
  enablePresence?: boolean;
  enableReactions?: boolean;
  enableThreads?: boolean;
  enableAttachments?: boolean;
  enableMentions?: boolean;
  enableVoiceMessages?: boolean;
  maxAttachmentSize?: number; // MB
  allowedAttachmentTypes?: string[];
  typingTimeout?: number; // ms
  messagePageSize?: number;
  onEvent?: (event: CommunicationEvent) => void;
}

// ─── Component Props (shared) ────────────────────────────────────────────────

export interface ConversationListProps {
  conversations: Conversation[];
  activeId?: string;
  onSelect?: (conversation: Conversation) => void;
  onPin?: (conversation: Conversation) => void;
  onMute?: (conversation: Conversation) => void;
  onArchive?: (conversation: Conversation) => void;
  onDelete?: (conversation: Conversation) => void;
  showSearch?: boolean;
  showFilters?: boolean;
  filterTabs?: string[];
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

export interface ChatWindowProps {
  conversation: Conversation;
  messages: Message[];
  currentUser: CommunicationUser;
  onSendMessage?: (content: string, attachments?: Attachment[]) => void;
  onReaction?: (messageId: string, emoji: string) => void;
  onReply?: (message: Message) => void;
  onEdit?: (message: Message, newContent: string) => void;
  onDelete?: (message: Message) => void;
  onLoadMore?: () => void;
  typingUsers?: CommunicationUser[];
  showHeader?: boolean;
  showInput?: boolean;
  loading?: boolean;
  hasMore?: boolean;
  className?: string;
}

export interface MessageBubbleProps {
  message: Message;
  currentUser: CommunicationUser;
  onReaction?: (emoji: string) => void;
  onReply?: () => void;
  onEdit?: (newContent: string) => void;
  onDelete?: () => void;
  onThreadOpen?: () => void;
  showAvatar?: boolean;
  showTimestamp?: boolean;
  showStatus?: boolean;
  showReactions?: boolean;
  showThreadInfo?: boolean;
  grouped?: boolean;
  className?: string;
}

export interface ChatInputProps {
  onSend?: (content: string, attachments?: Attachment[]) => void;
  onTyping?: (isTyping: boolean) => void;
  onAttach?: (files: File[]) => void;
  placeholder?: string;
  disabled?: boolean;
  showEmoji?: boolean;
  showAttachment?: boolean;
  showMention?: boolean;
  showVoice?: boolean;
  maxLength?: number;
  replyTo?: Message;
  onCancelReply?: () => void;
  mentionSuggestions?: CommunicationUser[];
  onMentionSearch?: (query: string) => void;
  className?: string;
}

export interface ThreadPanelProps {
  thread: Thread;
  currentUser: CommunicationUser;
  onSendReply?: (content: string) => void;
  onClose?: () => void;
  onReaction?: (messageId: string, emoji: string) => void;
  loading?: boolean;
  className?: string;
}

export interface PresenceIndicatorProps {
  status: PresenceStatus;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export interface TypingIndicatorProps {
  users: CommunicationUser[];
  maxDisplay?: number;
  className?: string;
}

export interface ReactionBarProps {
  reactions: Reaction[];
  currentUserId: string;
  onReact?: (emoji: string) => void;
  onRemoveReaction?: (emoji: string) => void;
  className?: string;
}

export interface EmojiPickerProps {
  onSelect?: (emoji: string) => void;
  onClose?: () => void;
  recentEmojis?: string[];
  className?: string;
}

export interface MentionInputProps {
  value: string;
  onChange?: (value: string) => void;
  suggestions: CommunicationUser[];
  onSearch?: (query: string) => void;
  onSelect?: (user: CommunicationUser) => void;
  placeholder?: string;
  className?: string;
}

export interface FileUploaderProps {
  onUpload?: (files: File[]) => void;
  onRemove?: (fileId: string) => void;
  files?: UploadingFile[];
  accept?: string;
  maxSize?: number; // MB
  maxFiles?: number;
  className?: string;
}

export interface UploadingFile {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'complete' | 'error';
  url?: string;
  error?: string;
}

export interface MessageSearchProps {
  onSearch?: (query: string, filters?: SearchFilters) => void;
  results?: SearchResult[];
  loading?: boolean;
  onResultClick?: (result: SearchResult) => void;
  className?: string;
}

export interface SearchFilters {
  from?: string;
  type?: MessageType | 'all';
  dateFrom?: Date | string;
  dateTo?: Date | string;
  conversationId?: string;
}

export interface SearchResult {
  message: Message;
  conversationTitle?: string;
  highlight?: string;
}

export interface ReadReceiptsProps {
  status: MessageStatus;
  readBy?: CommunicationUser[];
  deliveredAt?: Date | string;
  readAt?: Date | string;
  className?: string;
}

export interface VoiceMessageProps {
  src: string;
  duration: number;
  sender?: CommunicationUser;
  timestamp?: Date | string;
  onPlay?: () => void;
  onPause?: () => void;
  className?: string;
}

export interface UserPresenceListProps {
  users: (CommunicationUser & { status: PresenceStatus })[];
  onUserClick?: (user: CommunicationUser) => void;
  showSearch?: boolean;
  className?: string;
}

export interface NotificationBadgeProps {
  count: number;
  maxCount?: number;
  className?: string;
}

export interface NotificationListProps {
  notifications: CommunicationNotification[];
  onRead?: (id: string) => void;
  onReadAll?: () => void;
  onClick?: (notification: CommunicationNotification) => void;
  className?: string;
}
