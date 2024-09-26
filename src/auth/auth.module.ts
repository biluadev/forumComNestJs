import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { Env } from "@/env.js";
import { JwtStrategy } from "./jwt.strategy.js";

@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            global: true,
            useFactory(config: ConfigService<Env, true>) {
                const privatekey = config.get('JWT_PRIVATE_KEY', { infer: true })
                const publickey = config.get('JWT_PUBLIC_KEY', { infer: true })

                return {
                    signOptions: { algorithm: 'RS256' },
                    privateKey: Buffer.from(privatekey, 'base64'),
                    publicKey: Buffer.from(publickey, 'base64')
                }
            },
        }),
    ],

    providers: [JwtStrategy]
})

export class AuthModule {}