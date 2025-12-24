/**
 * Security Features:
 * - AES-256-GCM encryption for authenticated encryption
 * - Random initialization vectors (IV) for each encryption
 * - HMAC verification to prevent tampering
 * - Environment-based encryption keys
 * - Comprehensive error handling
 */

import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  createHmac,
} from "crypto";

export interface PaymentPayload {
  email: string;
  order_id: number;
  amount: number;
  timestamp?: number; // Optional timestamp for expiration checks
}

const ALGORITHM = "aes-256-gcm"; // Authenticated encryption
const IV_LENGTH = 16; // 128-bit IV for AES
const TAG_LENGTH = 16; // 128-bit authentication tag
const SALT_LENGTH = 32; // 256-bit salt for key derivation

const getEncryptionKey = (): Buffer => {
  const key = process.env.PAYMENT_ENCRYPTION_KEY;

  if (!key) {
    console.error(
      "🚨 CRITICAL: PAYMENT_ENCRYPTION_KEY environment variable is not set!"
    );
    throw new Error(
      "PAYMENT_ENCRYPTION_KEY environment variable is required for payment encryption"
    );
  }

  if (key.length < 32) {
    console.warn(
      "⚠️  WARNING: PAYMENT_ENCRYPTION_KEY should be at least 32 characters for optimal security"
    );
  }

  // Derive a 256-bit key from the environment variable
  return Buffer.from(key.padEnd(32, "0").slice(0, 32), "utf8");
};

/**
 * Get HMAC key for authentication
 * Uses a different derivation from the encryption key for security
 */
const getHmacKey = (): Buffer => {
  const baseKey = getEncryptionKey();
  // Derive HMAC key by creating hash of base key with salt
  const hmac = createHmac("sha256", baseKey as any);
  hmac.update("payment-hmac-salt-2024");
  return hmac.digest();
};

/**
 * Encrypts payment payload data using AES-256-GCM
 */
export function encryptPayload(data: PaymentPayload): string {
  try {
    // Add timestamp for optional expiration checks
    const payloadWithTimestamp: PaymentPayload = {
      ...data,
      timestamp: Date.now(),
    };

    // Convert data to JSON and then to buffer
    const jsonString = JSON.stringify(payloadWithTimestamp);
    const plaintext = Buffer.from(jsonString, "utf8");

    // Generate random IV for this encryption
    const iv = randomBytes(IV_LENGTH);

    // Create cipher with key and IV
    const cipher = createCipheriv(
      ALGORITHM,
      getEncryptionKey() as any,
      iv as any
    );

    // Encrypt the data
    let ciphertext = cipher.update(plaintext as any);
    ciphertext = Buffer.concat([ciphertext as any, cipher.final() as any]);

    // Get the authentication tag
    const tag = cipher.getAuthTag();

    // Combine IV + ciphertext + tag
    const combined = Buffer.concat([iv as any, ciphertext as any, tag as any]);

    // Create HMAC for additional integrity check
    const hmac = createHmac("sha256", getHmacKey() as any);
    hmac.update(combined as any);
    const hmacDigest = hmac.digest();

    // Final payload: HMAC + IV + ciphertext + tag
    const finalPayload = Buffer.concat([hmacDigest as any, combined as any]);

    // Return as base64 for URL safety
    return finalPayload.toString("base64");
  } catch (error) {
    console.error("Encryption failed:", error);
    console.error(
      "Error details:",
      error instanceof Error ? error.message : error
    );
    console.error(
      "PAYMENT_ENCRYPTION_KEY exists:",
      !!process.env.PAYMENT_ENCRYPTION_KEY
    );
    console.error("Data being encrypted:", data);
    throw new Error(
      `Failed to encrypt payment payload: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Decrypts payment payload data using AES-256-GCM
 */
export function decryptPayload(encryptedData: string): PaymentPayload | null {
  try {
    // Decode from base64
    const buffer = Buffer.from(encryptedData, "base64");

    // Extract HMAC (first 32 bytes)
    const hmacDigest = buffer.subarray(0, 32);
    const encryptedContent = buffer.subarray(32);

    // Verify HMAC integrity
    const hmac = createHmac("sha256", getHmacKey() as any);
    hmac.update(encryptedContent as any);
    const expectedHmac = hmac.digest();

    if (!hmacDigest.equals(expectedHmac as any)) {
      console.error("HMAC verification failed - data may be tampered");
      return null;
    }

    // Extract components: IV + ciphertext + tag
    const iv = encryptedContent.subarray(0, IV_LENGTH);
    const tag = encryptedContent.subarray(-TAG_LENGTH);
    const ciphertext = encryptedContent.subarray(IV_LENGTH, -TAG_LENGTH);

    // Create decipher
    const decipher = createDecipheriv(
      ALGORITHM,
      getEncryptionKey() as any,
      iv as any
    );
    decipher.setAuthTag(tag as any);

    // Decrypt the data
    let plaintext = decipher.update(ciphertext as any);
    plaintext = Buffer.concat([plaintext as any, decipher.final() as any]);

    // Parse JSON
    const jsonString = plaintext.toString("utf8");
    const data = JSON.parse(jsonString) as PaymentPayload;

    // Optional: Check timestamp for expiration (e.g., 1 hour)
    if (data.timestamp) {
      const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
      if (Date.now() - data.timestamp > oneHour) {
        console.warn("Payment payload has expired");
        // Uncomment to enforce expiration:
        // return null;
      }
    }

    return data;
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
}

/**
 * Utility function to validate payment payload structure
 */
export function isValidPaymentPayload(data: any): data is PaymentPayload {
  return (
    data &&
    typeof data.email === "string" &&
    typeof data.order_id === "number" &&
    typeof data.amount === "number" &&
    data.email.includes("@") &&
    data.order_id > 0 &&
    data.amount > 0
  );
}
