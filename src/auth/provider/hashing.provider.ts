import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashingProvider {
  /**
   * Hashes a plain text string (e.g., a password).
   */
  abstract hashPassword(data: string | Buffer): Promise<string>;

  /**
   * Compares a plain text string with an existing hash to see if they match.
   */
  abstract comparePassword(data: string | Buffer, encrypted: string): Promise<boolean>;
}