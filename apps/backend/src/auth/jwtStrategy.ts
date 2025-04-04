import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt'
import { PassportStatic } from 'passport'
import userRepository from '../repositories/user.repository'

const opts: StrategyOptions = {
  jwtFromRequest: (req) => {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req)
    return token
  },
  secretOrKey: process.env.JWT_SECRET || 'defaultsecret',
}

interface JwtPayload {
  id: string
}

export default (passport: PassportStatic) => {
  passport.use(
    new JwtStrategy(opts, async (jwtPayload, done) => {
      try {
        const user = await userRepository.getUserById(jwtPayload.id)
        if (user) return done(null, user)
        else return done(null, false)
      } catch (err) {
        return done(err, false)
      }
    })
  )
}
