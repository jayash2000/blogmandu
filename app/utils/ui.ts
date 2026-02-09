export const NAVLINKS = [
  { id: "home", label: "Home", link: "/" },
  { id: "recent_posts", label: "Recent Posts", link: "/recent-posts" },
];

export const USER_DROPDOWN_MENU = [
  { id: "my-account", label: "My Account", href: "/profile" },
  { id: "author-console", label: "Author Console", href: "/u/dashboard" },
  { id: "logout", label: "Logout" },
];

export const POSTS_FILTER_MENU = [
  { id: "all", label: "All" },
  { id: "technology", label: "Technology" },
  { id: "lifestyle", label: "Lifestyle" },
  { id: "business", label: "Business" },
  { id: "science", label: "Science" },
  { id: "education", label: "Education" },
  { id: "health", label: "Health" },
];

export const POSTS_SORT_MENU = [
  { id: "newest-first", label: "Newest First" },
  { id: "oldest-first", label: "Oldest First" },
  { id: "a-to-z", label: "A to Z" },
  { id: "z-to-a", label: "Z to A" },
];

export const SIDEBAR_MENU_ITEMS_ADMIN = [
  { id: "overview", title: "Overview" },
  { id: "post_management", title: "Post Management" },
  { id: "user_management", title: "User Management" },
  {
    id: "comment_moderation",
    title: "Comment Moderation",
  },
  { id: "scheduled_posts", title: "Scheduled Posts" },
  { id: "notifications", title: "Notifications" },
];

export const SIDEBAR_MENU_ITEMS_AUTHOR = [
  { id: "dashboard", title: "Dashboard" },
  { id: "posts", title: "Manage Posts" },
  { id: "comments", title: "Manage comments" },
  {
    id: "analytics",
    title: "Post Analytics",
  },
  { id: "edit_profile", title: "Edit Profile" },
  { id: "notifications", title: "Notifications" },
];

export const POST_DETAIL_BUTTONS_ICON = [
  { id: "like", name: "uil:heart" },
  { id: "bookmark", name: "uil:bookmark" },
  { id: "share", name: "uil:share-alt" },
];

export const PROFILE_LINKS = [
  { id: "twitter", name: "uil:twitter", href: "/" },
  { id: "linkedin", name: "uil:linkedin", href: "/" },
  { id: "github", name: "uil:github", href: "/" },
  { id: "website", name: "uil:globe", href: "/" },
];

export const MD_TOOLBAR_BUTTONS = [
  { id: "bold", text: "B" },
  { id: "italic", text: "I" },
  { id: "underline", text: "U" },
  { id: "strike", text: "S" },
  { id: "code", text: "C" },
];

export const AUTHOR_DASHBOARD_RECENT_POSTS = [
  { id: "post_1", title: "Post 1", time: "2 days ago" },
  { id: "post_2", title: "Post 2", time: "1 day ago" },
  { id: "post_3", title: "Post 3", time: "15 hr ago" },
];

export const AUTHOR_DASHBOARD_MANAGE_POSTS = [
  {
    id: "p001",
    title: "Top 10 Hidden Leaf Training Spots",
    status: "published",
    category: "AI",
    dateCreated: "2026-01-15T08:30:00Z",
    likes: 1250,
  },

  {
    id: "p002",
    title: "Sanji’s Secret Seafood Risotto Recipe",
    status: "draft",
    category: "frontend",
    dateCreated: "2026-02-01T14:20:00Z",
    likes: 0,
  },

  {
    id: "p003",
    title: "The Philosophy of Equivalent Exchange",
    status: "published",
    category: "cloud",
    dateCreated: "2025-12-10T11:05:00Z",
    likes: 8400,
  },

  {
    id: "p004",
    title: "Nen Type Personality Quiz",
    status: "published",
    category: "backend",
    dateCreated: "2026-02-05T09:45:00Z",
    likes: 320,
  },

  {
    id: "p005",
    title: "L’s Private Investigation Notes: Case #402",
    status: "draft",
    category: "networking",
    dateCreated: "2026-01-20T23:59:59Z",
    likes: 0,
  },
];
