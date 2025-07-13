// =============================================================================
// API CONFIGURATION
// =============================================================================

/**
 * Base API URL from environment variables
 */
export const API_BASE_URL =
  process.env.BACKEND_API_URL || "http://localhost:8000/api/v1";

// =============================================================================
// WORKER ENDPOINTS
// =============================================================================

/**
 * Worker management endpoints
 */
export const WORKER_ENDPOINTS = {
  // Get all workers (Admin)
  GET_ALL: "/workers",

  // Get worker by ID
  GET_BY_ID: (id) => `/workers/${id}`,

  // Worker actions
  CREATE: "/workers",
  UPDATE: (id) => `/workers/${id}`,
  DELETE: (id) => `/workers/${id}`,

  // Worker status and health
  STATUS: (id) => `/workers/${id}/status`,
  HEALTH: (id) => `/workers/${id}/health`,
  METRICS: (id) => `/workers/${id}/metrics`,

  // Worker control actions
  START: (id) => `/workers/${id}/start`,
  STOP: (id) => `/workers/${id}/stop`,
  RESTART: (id) => `/workers/${id}/restart`,

  // Worker logs
  LOGS: (id) => `/workers/${id}/logs`,
  LOGS_STREAM: (id) => `/workers/${id}/logs/stream`,
};

/**
 * Session/Instance management endpoints
 * Note: Backend uses "sessions" but frontend calls them "instances"
 */
export const SESSION_ENDPOINTS = {
  // Get all user sessions (instances)
  GET_ALL: "/sessions",

  // Get session by ID
  GET_BY_ID: (id) => `/sessions/${id}`,

  // Session actions
  CREATE: "/sessions",
  UPDATE: (id) => `/sessions/${id}`,
  DELETE: (id) => `/sessions/${id}`,

  // Session status and control
  STATUS: (id) => `/sessions/${id}/status`,
  START: (id) => `/sessions/${id}/start`,
  STOP: (id) => `/sessions/${id}/stop`,
  RESTART: (id) => `/sessions/${id}/restart`,

  // Session configuration
  CONFIG: (id) => `/sessions/${id}/config`,
  UPDATE_CONFIG: (id) => `/sessions/${id}/config`,

  // WhatsApp specific
  QR_CODE: (id) => `/sessions/${id}/qr`,
  CONNECT: (id) => `/sessions/${id}/connect`,
  DISCONNECT: (id) => `/sessions/${id}/disconnect`,
};

// =============================================================================
// SESSION/INSTANCE STATUS CONSTANTS
// =============================================================================

/**
 * Session/Instance status constants
 */
export const SESSION_STATUS = {
  INIT: "INIT",
  QR_REQUIRED: "QR_REQUIRED",
  CONNECTED: "CONNECTED",
  DISCONNECTED: "DISCONNECTED",
  RECONNECTING: "RECONNECTING",
  ERROR: "ERROR",
};

// =============================================================================
// USER ROLE CONSTANTS
// =============================================================================

/**
 * User role constants
 */
export const USER_ROLE = {
  USER: "USER",
  ADMINISTRATOR: "ADMINISTRATOR",
};

// =============================================================================
// WORKER STATUS CONSTANTS
// =============================================================================

/**
 * Worker status constants
 */
export const WORKER_STATUS = {
  ONLINE: "ONLINE",
  OFFLINE: "OFFLINE",
  MAINTENANCE: "MAINTENANCE",
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Build full API URL
 * @param {string} endpoint - API endpoint
 * @returns {string} Full API URL
 */
export const buildApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

/**
 * Get worker status badge variant
 * @param {string} status - Worker status
 * @returns {string} Badge variant
 */
export const getWorkerStatusVariant = (status) => {
  switch (status) {
    case WORKER_STATUS.ONLINE:
      return "success";
    case WORKER_STATUS.MAINTENANCE:
      return "warning";
    case WORKER_STATUS.OFFLINE:
      return "secondary";
    default:
      return "default";
  }
};

/**
 * Get session/instance status badge variant
 * @param {string} status - Session status
 * @returns {string} Badge variant
 */
export const getSessionStatusVariant = (status) => {
  switch (status) {
    case SESSION_STATUS.CONNECTED:
      return "success";
    case SESSION_STATUS.INIT:
    case SESSION_STATUS.QR_REQUIRED:
    case SESSION_STATUS.RECONNECTING:
      return "warning";
    case SESSION_STATUS.ERROR:
      return "destructive";
    case SESSION_STATUS.DISCONNECTED:
      return "secondary";
    default:
      return "default";
  }
};
