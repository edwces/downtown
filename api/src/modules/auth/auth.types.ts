interface JWTRegisteredClaims {
  sub: string;
}

interface JWTPublicClaims {
  id: string;
  name: string;
  surname: string;
  email: string;
}

export type JWTAccessPayload = JWTRegisteredClaims & JWTPublicClaims;

export type JWTRefreshPayload = JWTRegisteredClaims &
  Omit<JWTPublicClaims, 'id'>;
