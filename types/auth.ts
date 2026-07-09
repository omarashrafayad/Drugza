export type AuthType = {
    userId: string;
    token: string;
    refreshToken?: string | undefined
    segPublicKey: string | undefined
    segPrivateKey: string | undefined
    isEmailVerified: boolean
    isPhoneVerified: boolean
    hasDetails: boolean
    role: string
}