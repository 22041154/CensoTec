import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usuariosService: UsuariosService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'CLAVE_SECRETA_PARA_FIRMAR_TOKENS',
    });
  }

  async validate(payload: any) {
    const user = await this.usuariosService.findOneById(payload.sub);
    if (!user) return { userId: payload.sub, username: payload.username };
    const { contrasena, ...rest } = user as any;
    return { userId: rest.id, username: rest.usuario, role: rest.role };
  }
}