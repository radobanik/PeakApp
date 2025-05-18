import { Router } from 'express'
import passport from 'passport'
import { NotificationController } from '../../controllers'
import checkRoles from '../../middlewares/checkRoles'
import checkAdminOrOwner from '../../middlewares/checkAdminOrOwner'
import { Role } from '@prisma/client'

const notificationRouter = Router()

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Get filtered notifications for logged-in user
 *     responses:
 *       200:
 *         description: List of notifications
 */
notificationRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  NotificationController.listByLoggedInUser
)

/**
 * @swagger
 * /notifications/read:
 *   get:
 *     summary: Get all filtered notifications for logged-in user and mark them as read
 *     responses:
 *       200:
 *         description: List of notifications (now marked as read)
 */
notificationRouter.get(
  '/read',
  passport.authenticate('jwt', { session: false }),
  NotificationController.listAndMarkAllAsRead
)

/**
 * @swagger
 * /notifications/{id}:
 *   get:
 *     summary: Get notification by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Notification found
 */
notificationRouter.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkAdminOrOwner(),
  NotificationController.getById
)

/**
 * @swagger
 * /notifications:
 *   post:
 *     summary: Create a notification
 *     responses:
 *       201:
 *         description: Notification created
 */
notificationRouter.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles([Role.ADMIN]),
  NotificationController.create
)

/**
 * @swagger
 * /notifications/{id}:
 *   put:
 *     summary: Update a notification
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Notification updated
 */
notificationRouter.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles([Role.ADMIN]),
  NotificationController.update
)

/**
 * @swagger
 * /notifications/{id}/read:
 *   patch:
 *     summary: Mark notification as read
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Notification marked as read
 */
notificationRouter.patch(
  '/:id/read',
  passport.authenticate('jwt', { session: false }),
  NotificationController.markAsRead
)

/**
 * @swagger
 * /notifications/{id}:
 *   delete:
 *     summary: Delete a notification
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Notification deleted
 */
notificationRouter.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles([Role.ADMIN]),
  NotificationController.deleteById
)

/**
 * @swagger
 * /notifications/unread/count:
 *   get:
 *     summary: Get count of unread filtered notifications for logged-in user
 *     responses:
 *       200:
 *         description: Number of unread notifications
 */
notificationRouter.get(
  '/unread/count',
  passport.authenticate('jwt', { session: false }),
  NotificationController.countUnread
)

export default notificationRouter
