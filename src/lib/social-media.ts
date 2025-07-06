/**
 * Social Media Manager for OAuth and posting functionality
 */
class SocialMediaManager {
  /**
   * Generate OAuth URL for a platform
   */
  async generateOAuthUrl(platform: string, redirectUri: string): Promise<string> {
    const state = this.generateState();
    
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return this.generateLinkedInOAuthUrl(redirectUri, state);
      case 'twitter':
      case 'x':
        return this.generateTwitterOAuthUrl(redirectUri, state);
      case 'instagram':
        return this.generateInstagramOAuthUrl(redirectUri, state);
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
  }

  /**
   * Exchange authorization code for access token
   */
  async exchangeCodeForToken(
    platform: string,
    code: string,
    redirectUri: string
  ): Promise<{
    accessToken: string;
    refreshToken?: string;
    expiresAt?: Date;
  }> {
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return this.exchangeLinkedInCode(code, redirectUri);
      case 'twitter':
      case 'x':
        return this.exchangeTwitterCode(code, redirectUri);
      case 'instagram':
        return this.exchangeInstagramCode(code, redirectUri);
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
  }

  /**
   * Generate a random state parameter for OAuth
   */
  private generateState(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  /**
   * Generate LinkedIn OAuth URL
   */
  private generateLinkedInOAuthUrl(redirectUri: string, state: string): string {
    const clientId = process.env.LINKEDIN_CLIENT_ID;
    if (!clientId) {
      throw new Error('LinkedIn client ID not configured');
    }

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      redirect_uri: redirectUri,
      state,
      scope: 'r_liteprofile w_member_social',
    });

    return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
  }

  /**
   * Exchange LinkedIn authorization code for token
   */
  private async exchangeLinkedInCode(
    code: string,
    redirectUri: string
  ): Promise<{ accessToken: string; expiresAt?: Date }> {
    const clientId = process.env.LINKEDIN_CLIENT_ID;
    const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error('LinkedIn credentials not configured');
    }

    const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to exchange LinkedIn code for token');
    }

    const data = await response.json();
    
    return {
      accessToken: data.access_token,
      expiresAt: data.expires_in 
        ? new Date(Date.now() + data.expires_in * 1000)
        : undefined,
    };
  }

  /**
   * Generate Twitter OAuth URL
   */
  private generateTwitterOAuthUrl(redirectUri: string, state: string): string {
    const clientId = process.env.TWITTER_CLIENT_ID;
    if (!clientId) {
      throw new Error('Twitter client ID not configured');
    }

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      redirect_uri: redirectUri,
      state,
      scope: 'tweet.read tweet.write users.read offline.access',
      code_challenge_method: 'S256',
      code_challenge: this.generateCodeChallenge(),
    });

    return `https://twitter.com/i/oauth2/authorize?${params.toString()}`;
  }

  /**
   * Exchange Twitter authorization code for token
   */
  private async exchangeTwitterCode(
    code: string,
    redirectUri: string
  ): Promise<{ accessToken: string; refreshToken?: string; expiresAt?: Date }> {
    const clientId = process.env.TWITTER_CLIENT_ID;
    const clientSecret = process.env.TWITTER_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error('Twitter credentials not configured');
    }

    const response = await fetch('https://api.twitter.com/2/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        code_verifier: this.generateCodeVerifier(),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to exchange Twitter code for token');
    }

    const data = await response.json();
    
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: data.expires_in 
        ? new Date(Date.now() + data.expires_in * 1000)
        : undefined,
    };
  }

  /**
   * Generate Instagram OAuth URL (uses Facebook OAuth)
   */
  private generateInstagramOAuthUrl(redirectUri: string, state: string): string {
    const clientId = process.env.FACEBOOK_CLIENT_ID;
    if (!clientId) {
      throw new Error('Facebook client ID not configured');
    }

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      redirect_uri: redirectUri,
      state,
      scope: 'instagram_basic instagram_content_publish',
    });

    return `https://www.facebook.com/v18.0/dialog/oauth?${params.toString()}`;
  }

  /**
   * Exchange Instagram authorization code for token
   */
  private async exchangeInstagramCode(
    code: string,
    redirectUri: string
  ): Promise<{ accessToken: string; expiresAt?: Date }> {
    const clientId = process.env.FACEBOOK_CLIENT_ID;
    const clientSecret = process.env.FACEBOOK_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error('Facebook credentials not configured');
    }

    const response = await fetch('https://graph.facebook.com/v18.0/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to exchange Instagram code for token');
    }

    const data = await response.json();
    
    return {
      accessToken: data.access_token,
      expiresAt: data.expires_in 
        ? new Date(Date.now() + data.expires_in * 1000)
        : undefined,
    };
  }

  /**
   * Generate PKCE code challenge
   */
  private generateCodeChallenge(): string {
    // Simplified implementation - in production, use proper PKCE
    return Math.random().toString(36).substring(2, 15);
  }

  /**
   * Generate PKCE code verifier
   */
  private generateCodeVerifier(): string {
    // Simplified implementation - in production, use proper PKCE
    return Math.random().toString(36).substring(2, 15);
  }
}

export const socialMediaManager = new SocialMediaManager(); 