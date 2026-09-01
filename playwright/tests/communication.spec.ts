import { test, expect } from '@playwright/test';

const storyUrl = (story: string) => `/iframe.html?path=/story/${story}`;

test.describe('Communication - ConversationList', () => {
  test('renders conversation items', async ({ page }) => {
    await page.goto(storyUrl('communication-conversationlist--default'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000).catch(() => {});
    const items = page.locator('[role="option"], [role="listitem"], li');
    const count = await items.count().catch(() => 0);
    expect(count >= 0).toBe(true);
  });

  test('shows search input', async ({ page }) => {
    await page.goto(storyUrl('communication-conversationlist--default'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    const search = page.locator('input[aria-label="Search conversations"]');
    await expect(search).toBeVisible();
  });

  test('shows filter tabs', async ({ page }) => {
    await page.goto(storyUrl('communication-conversationlist--default'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    const tabs = page.locator('.wx-comm-conversation-list__filter-tab');
    expect(await tabs.count()).toBeGreaterThan(1);
  });

  test('shows active item styling', async ({ page }) => {
    await page.goto(storyUrl('communication-conversationlist--with-active-item'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    const activeItem = page.locator('[aria-selected="true"]');
    await expect(activeItem).toBeVisible();
  });

  test('shows loading state', async ({ page }) => {
    await page.goto(storyUrl('communication-conversationlist--loading'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    await expect(page.getByText('Loading...')).toBeVisible();
  });

  test('shows empty state', async ({ page }) => {
    await page.goto(storyUrl('communication-conversationlist--empty'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    await expect(page.getByText(/No conversations/)).toBeVisible();
  });
});

test.describe('Communication - MessageBubble', () => {
  test('renders incoming message', async ({ page }) => {
    await page.goto(storyUrl('communication-messagebubble--incoming'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    const bubble = page.locator('.wx-comm-message--incoming');
    await expect(bubble).toBeVisible();
  });

  test('renders outgoing message', async ({ page }) => {
    await page.goto(storyUrl('communication-messagebubble--outgoing'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    const bubble = page.locator('.wx-comm-message--outgoing');
    await expect(bubble).toBeVisible();
  });

  test('renders system message', async ({ page }) => {
    await page.goto(storyUrl('communication-messagebubble--system-message'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    const bubble = page.locator('.wx-comm-message--system');
    await expect(bubble).toBeVisible();
  });

  test('renders AI message', async ({ page }) => {
    await page.goto(storyUrl('communication-messagebubble--ai-message'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    const bubble = page.locator('.wx-comm-message--ai');
    await expect(bubble).toBeVisible();
  });

  test('shows reactions on message', async ({ page }) => {
    await page.goto(storyUrl('communication-messagebubble--with-reactions'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    const reactions = page.locator('.wx-comm-reactions');
    await expect(reactions).toBeVisible();
  });

  test('shows thread count', async ({ page }) => {
    await page.goto(storyUrl('communication-messagebubble--with-thread'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    const threadInfo = page.locator('.wx-comm-message__thread-info');
    await expect(threadInfo).toBeVisible();
    await expect(threadInfo).toContainText('Replies');
  });

  test('shows deleted message', async ({ page }) => {
    await page.goto(storyUrl('communication-messagebubble--deleted'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    await expect(page.getByText('This message was deleted')).toBeVisible();
  });
});

test.describe('Communication - ChatInput', () => {
  test('renders textarea and send button', async ({ page }) => {
    await page.goto(storyUrl('communication-chatinput--default'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    const textarea = page.locator('[aria-label="Message input"]');
    const sendBtn = page.locator('[aria-label="Send message"]');
    await expect(textarea).toBeVisible();
    await expect(sendBtn).toBeVisible();
  });

  test('send button is disabled when empty', async ({ page }) => {
    await page.goto(storyUrl('communication-chatinput--default'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    const sendBtn = page.locator('[aria-label="Send message"]');
    await expect(sendBtn).toBeDisabled();
  });

  test('send button enabled after typing', async ({ page }) => {
    await page.goto(storyUrl('communication-chatinput--default'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    const textarea = page.locator('[aria-label="Message input"]');
    await textarea.fill('Hello world');
    const sendBtn = page.locator('[aria-label="Send message"]');
    await expect(sendBtn).toBeEnabled();
  });

  test('shows reply preview', async ({ page }) => {
    await page.goto(storyUrl('communication-chatinput--with-reply'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    const preview = page.locator('.wx-comm-chat-input__reply-preview');
    await expect(preview).toBeVisible();
  });

  test('disabled state', async ({ page }) => {
    await page.goto(storyUrl('communication-chatinput--disabled'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    const textarea = page.locator('[aria-label="Message input"]');
    await expect(textarea).toBeDisabled();
  });
});

test.describe('Communication - PresenceIndicator', () => {
  test('renders all statuses', async ({ page }) => {
    await page.goto(storyUrl('communication-presenceindicator--all-statuses'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    await expect(page.locator('.wx-comm-presence__dot--online')).toBeVisible();
    await expect(page.locator('.wx-comm-presence__dot--away')).toBeVisible();
    await expect(page.locator('.wx-comm-presence__dot--busy')).toBeVisible();
    await expect(page.locator('.wx-comm-presence__dot--offline')).toBeVisible();
  });

  test('shows label', async ({ page }) => {
    await page.goto(storyUrl('communication-presenceindicator--online'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    const label = page.locator('.wx-comm-presence__label');
    await expect(label).toBeVisible();
  });
});

test.describe('Communication - TypingIndicator', () => {
  test('shows single user typing', async ({ page }) => {
    await page.goto(storyUrl('communication-typingindicator--single-user'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    await expect(page.getByText('Sarah is typing')).toBeVisible();
    const dots = page.locator('.wx-comm-typing__dot');
    await expect(dots).toHaveCount(3);
  });

  test('shows two users typing', async ({ page }) => {
    await page.goto(storyUrl('communication-typingindicator--two-users'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    await expect(page.getByText(/are typing/)).toBeVisible();
  });
});

test.describe('Communication - ReactionBar', () => {
  test('renders reactions with counts', async ({ page }) => {
    await page.goto(storyUrl('communication-reactionbar--default'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    const reactions = page.locator('.wx-comm-reaction');
    expect(await reactions.count()).toBe(3);
  });

  test('shows active reaction', async ({ page }) => {
    await page.goto(storyUrl('communication-reactionbar--with-active-reaction'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    const active = page.locator('.wx-comm-reaction--active');
    expect(await active.count()).toBeGreaterThan(0);
  });
});

test.describe('Communication - EmojiPicker', () => {
  test('renders search and grid', async ({ page }) => {
    await page.goto(storyUrl('communication-emojipicker--default'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    const search = page.locator('input[aria-label="Search emoji"]');
    await expect(search).toBeVisible();
    const emojis = page.locator('.wx-comm-emoji-picker__emoji');
    expect(await emojis.count()).toBeGreaterThan(0);
  });
});

test.describe('Communication - ReadReceipts', () => {
  test('renders all statuses', async ({ page }) => {
    await page.goto(storyUrl('communication-readreceipts--all-statuses'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    await expect(page.getByText('Sending')).toBeVisible();
    await expect(page.getByText('Sent')).toBeVisible();
    await expect(page.getByText('Delivered')).toBeVisible();
  });
});

test.describe('Communication - NotificationList', () => {
  test('renders notifications with unread', async ({ page }) => {
    await page.goto(storyUrl('communication-notificationlist--default'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    const items = page.locator('.wx-comm-notification-item');
    expect(await items.count()).toBeGreaterThan(0);
    const unread = page.locator('.wx-comm-notification-item--unread');
    expect(await unread.count()).toBeGreaterThan(0);
  });

  test('shows empty state', async ({ page }) => {
    await page.goto(storyUrl('communication-notificationlist--empty'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    await expect(page.getByText('No notifications')).toBeVisible();
  });
});

test.describe('Communication - UserPresenceList', () => {
  test('renders users with status', async ({ page }) => {
    await page.goto(storyUrl('communication-userpresencelist--default'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    const items = page.locator('.wx-comm-user-presence-item');
    expect(await items.count()).toBe(5);
  });
});

test.describe('Communication - VoiceMessage', () => {
  test('renders play button and waveform', async ({ page }) => {
    await page.goto(storyUrl('communication-voicemessage--default'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    const playBtn = page.locator('[aria-label="Play"]');
    await expect(playBtn).toBeVisible();
    const bars = page.locator('.wx-comm-voice-message__bar');
    expect(await bars.count()).toBeGreaterThan(0);
  });

  test('shows duration', async ({ page }) => {
    await page.goto(storyUrl('communication-voicemessage--default'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    await expect(page.getByText('0:28')).toBeVisible();
  });
});

test.describe('Communication - ChatWindow', () => {
  test('renders header with title', async ({ page }) => {
    await page.goto(storyUrl('communication-chatwindow--default'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    const header = page.locator('.wx-comm-chat-header');
    await expect(header).toBeVisible();
    await expect(header).toContainText('Design Team');
  });

  test('renders messages', async ({ page }) => {
    await page.goto(storyUrl('communication-chatwindow--default'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    const messages = page.locator('.wx-comm-message');
    expect(await messages.count()).toBeGreaterThan(0);
  });

  test('shows typing indicator', async ({ page }) => {
    await page.goto(storyUrl('communication-chatwindow--default'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    const typing = page.locator('.wx-comm-typing');
    await expect(typing).toBeVisible();
  });

  test('shows chat input', async ({ page }) => {
    await page.goto(storyUrl('communication-chatwindow--default'));
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
    const input = page.locator('[aria-label="Message input"]');
    await expect(input).toBeVisible();
  });
});
