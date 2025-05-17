import { Router } from 'express'
import passport from 'passport'
import { NotificationSettingsController } from '../../controllers'
import checkRoles from '../../middlewares/checkRoles'
import { Role } from '@prisma/client'

const notificationSettingsRouter = Router()

/**
 * @swagger
 * /notification-settings:
 *   get:
 *     summary: Get notification settings for the logged-in user
 *     responses:
 *       200:
 *         description: Notification settings
 */
notificationSettingsRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  NotificationSettingsController.getCurrent
)

/**
 * @swagger
 * /notification-settings:
 *   put:
 *     summary: Update notification settings for the logged-in user
 *     responses:
 *       200:
 *         description: Notification settings updated
 */
notificationSettingsRouter.put(
  '/',
  passport.authenticate('jwt', { session: false }),
  NotificationSettingsController.updateCurrent
)

/**
 * @swagger
 * /notification-settings/{id}:
 *   get:
 *     summary: Get notification settings by user ID (admin only)
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Notification settings found
 */
notificationSettingsRouter.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles([Role.ADMIN]),
  NotificationSettingsController.getByUserId
)

/**
 * @swagger
 * /notification-settings/{id}:
 *   put:
 *     summary: Update notification settings by user ID (admin only)
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Notification settings updated
 */
notificationSettingsRouter.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles([Role.ADMIN]),
  NotificationSettingsController.updateByUserId
)

export default notificationSettingsRouter
