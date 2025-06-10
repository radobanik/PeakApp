import { Router } from 'express'
import { UserController } from '../../controllers/index'
import checkRoles from '../../middlewares/checkRoles'
import checkAdminOrOwner from '../../middlewares/checkAdminOrOwner'
import passport from 'passport'
import { Role } from '@prisma/client'
import followingController from '../../controllers/follows.controller'

const userRouter = Router()

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get logged-in user
 *     responses:
 *       200:
 *         description: returns the logged-in user
 */
userRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  UserController.getLoggedInUser
)

/**
 * @swagger
 * /user/all:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of users
 */
userRouter.get(
  '/all',
  passport.authenticate('jwt', { session: false }),
  checkRoles([Role.ADMIN]),
  UserController.userList
)

userRouter.get(
  '/role/admin',
  passport.authenticate('jwt', { session: false }),
  UserController.isAdmin
)

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: User found
 */
userRouter.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkAdminOrOwner(),
  UserController.getUserById
)

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     responses:
 *       201:
 *         description: User created
 */
userRouter.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles([Role.ADMIN]),
  UserController.createUser
)

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: User updated
 */
userRouter.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkAdminOrOwner(),
  UserController.updateUser
)

/**
 * @swagger
 * /user
 *   put:
 *     summary: Update a logged-in user
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: User updated
 */
userRouter.put(
  '/',
  passport.authenticate('jwt', { session: false }),
  UserController.updateLoggedInUser
)

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: User deleted
 */
userRouter.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles([Role.ADMIN]),
  UserController.getUserById
)

userRouter.get(
  '/:id/followers',
  passport.authenticate('jwt', { session: false }),
  followingController.listFollowers
)

userRouter.get(
  '/profile-picture',
  passport.authenticate('jwt', { session: false }),
  UserController.getProfilePicture
)

userRouter.get(
  '/:id/following',
  passport.authenticate('jwt', { session: false }),
  followingController.listFollowing
)

userRouter.post(
  '/:id/follow',
  passport.authenticate('jwt', { session: false }),
  followingController.createFollow
)

userRouter.delete(
  '/:id/follow',
  passport.authenticate('jwt', { session: false }),
  followingController.deleteFollow
)

export default userRouter
