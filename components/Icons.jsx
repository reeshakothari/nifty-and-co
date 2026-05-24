const Icon = ({ children, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

export const IconEquity = ({ size }) => (
  <Icon size={size}>
    <path d="M3 17 L8 12 L12 14 L17 8 L21 11" />
    <path d="M17 8 L21 8 L21 12" />
    <circle cx="3" cy="17" r="1" fill="currentColor" />
  </Icon>
);

export const IconSIP = ({ size }) => (
  <Icon size={size}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7 V12 L15 14" />
    <path d="M8 17 L10 15 L12 17 L14 15 L16 17" strokeOpacity="0.5" />
  </Icon>
);

export const IconMutual = ({ size }) => (
  <Icon size={size}>
    <rect x="3" y="10" width="4" height="11" rx="0.5" />
    <rect x="10" y="6" width="4" height="15" rx="0.5" />
    <rect x="17" y="3" width="4" height="18" rx="0.5" />
  </Icon>
);

export const IconPortfolio = ({ size }) => (
  <Icon size={size}>
    <rect x="3" y="6" width="18" height="14" rx="2" />
    <path d="M3 10 H21" />
    <path d="M8 6 V4 H16 V6" />
    <circle cx="12" cy="15" r="2" />
  </Icon>
);

export const IconRetirement = ({ size }) => (
  <Icon size={size}>
    <path d="M4 20 V14 A8 8 0 0 1 20 14 V20" />
    <path d="M4 20 H20" />
    <circle cx="12" cy="9" r="1" fill="currentColor" />
    <path d="M12 5 V3" />
  </Icon>
);

export const IconAdvisory = ({ size }) => (
  <Icon size={size}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3 20 V18 A4 4 0 0 1 7 14 H11 A4 4 0 0 1 15 18 V20" />
    <path d="M17 4 L17 12" />
    <path d="M14 7 L20 7" />
  </Icon>
);

export const IconCheck = ({ size = 14 }) => (
  <Icon size={size}><path d="M4 12 L9 17 L20 6" /></Icon>
);

export const IconCross = ({ size = 14 }) => (
  <Icon size={size}>
    <path d="M6 6 L18 18" />
    <path d="M18 6 L6 18" />
  </Icon>
);

export const IconArrow = ({ size = 16 }) => (
  <Icon size={size}>
    <path d="M5 12 H19" />
    <path d="M13 6 L19 12 L13 18" />
  </Icon>
);

export const IconShield = ({ size }) => (
  <Icon size={size}>
    <path d="M12 3 L4 6 V12 C4 17 7.5 20 12 21 C16.5 20 20 17 20 12 V6 Z" />
    <path d="M9 12 L11 14 L15 10" />
  </Icon>
);

export const IconUser = ({ size }) => (
  <Icon size={size}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21 V19 A5 5 0 0 1 9 14 H15 A5 5 0 0 1 20 19 V21" />
  </Icon>
);

export const IconSparkle = ({ size }) => (
  <Icon size={size}>
    <path d="M12 3 L13.5 9 L19 10.5 L13.5 12 L12 18 L10.5 12 L5 10.5 L10.5 9 Z" fill="currentColor" fillOpacity="0.2" />
  </Icon>
);

export const IconBalance = ({ size }) => (
  <Icon size={size}>
    <path d="M12 3 V21" />
    <path d="M5 8 H19" />
    <path d="M5 8 L3 14 A2 2 0 0 0 7 14 Z" />
    <path d="M19 8 L17 14 A2 2 0 0 0 21 14 Z" />
  </Icon>
);

export const IconPhone = ({ size = 16 }) => (
  <Icon size={size}>
    <path d="M5 4 H9 L10 9 L8 10 A8 8 0 0 0 14 16 L15 14 L20 15 V19 A2 2 0 0 1 18 21 C10 21 3 14 3 6 A2 2 0 0 1 5 4 Z" />
  </Icon>
);

export const IconMail = ({ size = 16 }) => (
  <Icon size={size}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7 L12 13 L21 7" />
  </Icon>
);

export const IconPin = ({ size = 16 }) => (
  <Icon size={size}>
    <path d="M12 21 C12 21 5 14 5 9 A7 7 0 0 1 19 9 C19 14 12 21 12 21 Z" />
    <circle cx="12" cy="9" r="2.5" />
  </Icon>
);

export const IconWhatsapp = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.6-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.2 3.3 5.2 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 4.9L2 22l5.2-1.3c1.4.7 3 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z"/>
  </svg>
);

export const IconLinkedin = ({ size = 16 }) => (
  <Icon size={size}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M7 10 V17" />
    <circle cx="7" cy="7" r="0.5" fill="currentColor" />
    <path d="M11 17 V10 M11 13 A2 2 0 0 1 15 13 V17 M15 13 A2 2 0 0 1 19 13 V17" />
  </Icon>
);

export const IconTwitter = ({ size = 16 }) => (
  <Icon size={size}>
    <path d="M4 4 L11 13 L4 20 M11 13 L20 4 M11 13 L20 20 L13 11" />
  </Icon>
);

export const IconInsta = ({ size = 16 }) => (
  <Icon size={size}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </Icon>
);

export const IconYoutube = ({ size = 16 }) => (
  <Icon size={size}>
    <rect x="2" y="6" width="20" height="12" rx="3" />
    <path d="M10 9 L15 12 L10 15 Z" fill="currentColor" />
  </Icon>
);

export const IconCalendar = ({ size }) => (
  <Icon size={size}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10 H21" />
    <path d="M8 3 V7 M16 3 V7" />
  </Icon>
);

export const IconClock = ({ size = 14 }) => (
  <Icon size={size}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7 V12 L16 14" />
  </Icon>
);
