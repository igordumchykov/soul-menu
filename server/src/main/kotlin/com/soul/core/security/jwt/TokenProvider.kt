package com.soul.core.security.jwt

import com.soul.core.config.ApplicationProperties
import io.jsonwebtoken.JwtException
import io.jsonwebtoken.JwtParser
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.io.Decoders
import io.jsonwebtoken.security.Keys
import org.slf4j.LoggerFactory
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.User
import org.springframework.stereotype.Component
import java.security.Key
import java.util.*

private const val AUTHORITIES_KEY = "auth"

@Component
class TokenProvider(
    private val properties: ApplicationProperties
) {

    private val log = LoggerFactory.getLogger(javaClass)

    private var key: Key? = null

    private var jwtParser: JwtParser? = null

    private var tokenValidityInMilliseconds: Long = 0

    private var tokenValidityInMillisecondsForRememberMe: Long = 0

    init {
        val keyBytes: ByteArray
        val secret = properties.security.authentication.secret
        keyBytes = Decoders.BASE64.decode(secret)
        this.key = Keys.hmacShaKeyFor(keyBytes)
        this.jwtParser = Jwts.parserBuilder().setSigningKey(key).build()
        this.tokenValidityInMilliseconds = 1000 * properties.security.authentication.validitySec
        this.tokenValidityInMillisecondsForRememberMe = 1000 * properties.security.authentication.validityRememberMeSec
    }

    fun createToken(authentication: Authentication, rememberMe: Boolean): String {
        val authorities = authentication.authorities.asSequence()
            .map { it.authority }
            .joinToString(separator = ",")

        val now = Date().time
        val validity = if (rememberMe) {
            Date(now + this.tokenValidityInMillisecondsForRememberMe)
        } else {
            Date(now + this.tokenValidityInMilliseconds)
        }

        return Jwts.builder()
            .setSubject(authentication.name)
            .claim(AUTHORITIES_KEY, authorities)
            .signWith(key, SignatureAlgorithm.HS512)
            .setExpiration(validity)
            .compact()
    }

    fun getAuthentication(token: String): Authentication {
        val claims = jwtParser?.parseClaimsJws(token)?.body

        val authorities = claims?.get(AUTHORITIES_KEY)?.toString()?.splitToSequence(",")
            ?.filter { it.trim().isNotEmpty() }?.mapTo(mutableListOf()) { SimpleGrantedAuthority(it) }

        val principal = User(claims?.subject, "", authorities)

        return UsernamePasswordAuthenticationToken(principal, token, authorities)
    }

    fun validateToken(authToken: String): Boolean {
        try {
            jwtParser?.parseClaimsJws(authToken)
            return true
        } catch (e: JwtException) {
            log.info("Invalid JWT token.")
            log.trace("Invalid JWT token trace. $e")
        } catch (e: IllegalArgumentException) {
            log.info("Invalid JWT token.")
            log.trace("Invalid JWT token trace. $e")
        }
        return false
    }
}