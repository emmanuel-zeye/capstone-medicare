package net.staphy.capstone.backend.utils;

import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import net.staphy.capstone.backend.entities.User;

import java.nio.charset.StandardCharsets;
import java.util.Date;

@Slf4j
public class JwtUtils {

    private static String privateKey = "u4rkAqM_JcXp2cpVJ7GeG^VuV!7#N?9E@QyFz4X?&59ZE8Fz-WNu!=Ffg5wp|%-?Ub%yJm$h&AVQmMAFh%^H&i9c?op&5A%Sd^wLr3y7VtwN52!7A0vSp6!^$NN9w68MmDhbp6&o?%n=dnim=RII?DG2F604N4L&=Mm3RfqK-4u@F3#7$BXcNDh@UP_zghgxsP0HaH0o06vpass%GaJ2z4r&Qi|w+UZ6bHtaj^QGmOPQsROsF5cj|MdyMWq%oL6lfUi^Qt9Vff3$rrc2fB5it1OEa14Ccy_kx%yNor^ffIuqlZycnMVcw$dGtp!aDIFoyU6HaB4P3ObgKOx@W9cny9Lu5zZvxt-PPw-&^|NJ*q8KOh?x0=x_!xVPccuSJkvGmu814k&lsrHA9Ycb?eUzz|I7twEc$dk|YT|Y^O!-s7g8J9-^*#h*QeI0E0dWXGqAQ^@k9|_#9-otCp^wW#U0jQ#mPewgiSJS0|4XERP46Xc-c2U=stdK&oFNR7-b34?kUYg#N+yBJkFQ-CeQlZucms_?$Cp&@Xx7c8-EMV^ER$Jlh8Qh_3G#ZCmcyj=6Swi5IqhT%F1ZCAhbssrWX-2wrKa$MBCQfpU#1fig$vUR-L-Y6OlgYfNnXYpl*@|7CqMdt3y9GBQXXl?xgOFMtdo!$!yWwM^UU&JB4w3Ej4gzQG_kbPd#mP95KCNLUHcW?65Qz7HhxH%V8!UspScoZ*87C%r%twoN%5&TP$AfE+*B#8RlJ*BHtUYzY|iURGceIhA!n0h17m-aKmPIUkWf11mKjspo?515c^+OCtp1INC?!DF0hjgKU%U_UOb8?+0x!Q6@V-*EV^*AN7KPjLj@6hSR4LDHXC@G??#?dCFcijizlW#PLQ@5&#X|2qlgXnViY^cybsjKhf!h@2?G2MaGE^fGdGHKuJUf7o1n=OIv&ZuU2hWo=+ra^gWVki9UWmBT4#8bz#ENi3WxXy14TKV_sE85oMqmrk_Vd7dH6NRhLnfs8yeYmq$SMcXrhYHHixHqD-85";
    private static long refreshTokenValidityMillis = 2419200000L;
    private static long validityMillis = 2419200000L;
    public static String createToken(User user, boolean isRefreshToken) {
        long now = (new Date()).getTime();
        Date validity = new Date(now + (isRefreshToken ? refreshTokenValidityMillis : validityMillis) * 1000);

        JwtBuilder jwt = Jwts.builder()
                .setSubject(user.getUsername())
                .setIssuer("Capstone")
                .setAudience("Capstone")
                .setIssuedAt(new Date())
                .claim( "user", user)
                .claim("function", isRefreshToken ? "refreshToken" : "token");

        return jwt.signWith(SignatureAlgorithm.HS256, privateKey.getBytes(StandardCharsets.UTF_8))
                .setExpiration(validity)
                .compact();
    }

    public static Claims validateToken(String authToken) {
        try {
            return Jwts.parser()
                    .setSigningKey(privateKey.getBytes(StandardCharsets.UTF_8))
                    .parseClaimsJws(authToken)
                    .getBody();
        } catch (JwtException | IllegalArgumentException e) {
            log.error("Invalid JWT token. {}", e.getLocalizedMessage());
        }
        return null;
    }

}
