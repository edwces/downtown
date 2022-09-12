interface JWTPublicClaims {
  id: string;
  name: string;
  email: string;
}

export type JWTAccessPayload = JWTPublicClaims;

export type JWTRefreshPayload = Omit<JWTPublicClaims, 'name' | 'email'>;

export type JWTUser = Pick<JWTPublicClaims, 'email' | 'id'>;
