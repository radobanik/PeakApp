// s3.service.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mockClient } from 'aws-sdk-client-mock'
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { Readable } from 'stream'
import { s3BucketService } from '../services'
import { randomUUID } from 'crypto'

vi.mock('@aws-sdk/s3-request-presigner')
vi.mock('crypto')

const s3Mock = mockClient(S3Client)

describe('S3 Service', () => {
  beforeEach(() => {
    s3Mock.reset()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  // ----------------------------------------------------------------
  // Test for uploadFile
  // ----------------------------------------------------------------
  describe('uploadFile', () => {
    it('should upload a file to S3 and return a unique ID', async () => {
      // Arrange
      const buffer = Buffer.from('test file content')
      const mockFile: Express.Multer.File = {
        fieldname: 'test',
        originalname: 'test.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        size: buffer.length,
        buffer: buffer,
        stream: Readable.from(buffer),
        destination: '',
        filename: '',
        path: '',
      }

      const mockedUuid = 'a1b2c3d4-e5f6-7890-1234-567890abcdef'
      vi.mocked(randomUUID).mockReturnValue(mockedUuid)

      s3Mock.on(PutObjectCommand).resolves({})

      // Act
      const result = await s3BucketService.uploadFile(mockFile)

      // Assert
      expect(result).toBe(mockedUuid)
      expect(s3Mock.calls()).toHaveLength(1)
      expect(s3Mock.call(0).args[0].input).toEqual({
        Bucket: expect.any(String),
        Body: mockFile.buffer,
        Key: mockedUuid,
        ContentType: mockFile.mimetype,
      })
    })
  })

  // ----------------------------------------------------------------
  // Test for getSignedS3Url
  // ----------------------------------------------------------------
  describe('getSignedS3Url', () => {
    it('should return a signed URL for a given UUID', async () => {
      // Arrange
      const uuid = 'test-uuid-for-url'
      const expectedSignedUrl = 'https://s3.mock.url/signed-url'

      const mockedGetSignedUrl = vi.mocked(getSignedUrl)
      mockedGetSignedUrl.mockResolvedValue(expectedSignedUrl)

      // Act
      const result = await s3BucketService.getSignedS3Url(uuid)

      // Assert
      expect(result).toBe(expectedSignedUrl)
      expect(mockedGetSignedUrl).toHaveBeenCalledOnce()

      const call = mockedGetSignedUrl.mock.calls[0]
      const getCommand = call[1] as GetObjectCommand

      expect(getCommand.input.Key).toBe(uuid)
      expect(getCommand.input.Bucket).toBeDefined()
    })
  })

  // ----------------------------------------------------------------
  // Test for deleteFile
  // ----------------------------------------------------------------
  describe('deleteFile', () => {
    it('should send a delete command to S3 for a given UUID', async () => {
      // Arrange
      const uuid = 'uuid-to-be-deleted'
      s3Mock.on(DeleteObjectCommand).resolves({})

      // Act
      await s3BucketService.deleteFile(uuid)

      // Assert
      expect(s3Mock.calls()).toHaveLength(1)
      expect(s3Mock.call(0).args[0].input).toEqual({
        Bucket: expect.any(String),
        Key: uuid,
      })
    })
  })
})
