import { createHmac, timingSafeEqual } from 'crypto';

/**
 * HMAC-based request signing for secure service-to-service communication
 */

interface SignedRequest {
    timestamp: number;
    signature: string;
    serviceId: string;
}

interface SignRequestOptions {
    method: string;
    path: string;
    body?: string;
    tenantId: string;
    serviceId: string;
    secret: string;
}

/**
 * Sign a request with HMAC for secure authentication
 */
export function signRequest(options: SignRequestOptions): SignedRequest {
    const { method, path, body, tenantId, serviceId, secret } = options;

    // Create timestamp (valid for 5 minutes)
    const timestamp = Date.now();

    // Create canonical request string
    const canonicalRequest = [
        method.toUpperCase(),
        path,
        tenantId,
        serviceId,
        timestamp.toString(),
        body || ''
    ].join('\n');

    // Create HMAC signature
    const signature = createHmac('sha256', secret)
        .update(canonicalRequest)
        .digest('hex');

    return {
        timestamp,
        signature,
        serviceId
    };
}

/**
 * Verify a signed request
 */
export function verifyRequest(
    method: string,
    path: string,
    body: string | undefined,
    tenantId: string,
    serviceId: string,
    timestamp: number,
    signature: string,
    secret: string
): { valid: boolean; reason?: string } {
    // Check timestamp (5 minute window)
    const now = Date.now();
    const timestampWindow = 5 * 60 * 1000; // 5 minutes

    if (Math.abs(now - timestamp) > timestampWindow) {
        return { valid: false, reason: 'Request timestamp too old' };
    }

    // Create canonical request string
    const canonicalRequest = [
        method.toUpperCase(),
        path,
        tenantId,
        serviceId,
        timestamp.toString(),
        body || ''
    ].join('\n');

    // Create expected signature
    const expectedSignature = createHmac('sha256', secret)
        .update(canonicalRequest)
        .digest('hex');

    // Use timing-safe comparison
    const signatureBuffer = Buffer.from(signature, 'hex');
    const expectedBuffer = Buffer.from(expectedSignature, 'hex');

    if (signatureBuffer.length !== expectedBuffer.length) {
        return { valid: false, reason: 'Invalid signature length' };
    }

    const isValid = timingSafeEqual(signatureBuffer, expectedBuffer);

    return {
        valid: isValid,
        reason: isValid ? undefined : 'Invalid signature'
    };
}

/**
 * Generate a secure service secret (for initial setup)
 */
export function generateServiceSecret(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 64; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
} 