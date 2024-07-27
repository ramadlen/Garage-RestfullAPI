import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { TestService } from './test.service';
import { TestModule } from './test.module';

describe('UserController', () => {
  let app: INestApplication;
  let logger: Logger;
  let testService: TestService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    logger = app.get(WINSTON_MODULE_PROVIDER);
    testService = app.get(TestService);
  });

  describe('POST /api/customers', () => {
    beforeEach(async () => {
      await testService.deleteAll();

      await testService.createUser();
    });

    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/customers')
        .set('Authorization', 'test')
        .send({
          first_name: '',
          last_name: '',
          email: 'salah',
          phone: '',
          panggilan: '',
          tanggallahir: '',
          alamat: '',
          kota: '',
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to create customer', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/customers')
        .set('Authorization', 'test')
        .send({
          first_name: 'test',
          last_name: 'test',
          email: 'test@example.com',
          phone: '9999',
          panggilan: 'test',
          tanggallahir: 'test',
          alamat: 'test',
          kota: 'test',
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.first_name).toBe('test');
      expect(response.body.data.last_name).toBe('test');
      expect(response.body.data.email).toBe('test@example.com');
      expect(response.body.data.phone).toBe('test');
      expect(response.body.data.panggilan).toBe('test');
      expect(response.body.data.tanggallahir).toBe('test');
      expect(response.body.data.alamat).toBe('test');
      expect(response.body.data.kota).toBe('test');
    });
  });

  describe('GET /api/customers/:customerId', () => {
    beforeEach(async () => {
      await testService.deleteAll();

      await testService.createUser();
      await testService.createCustomer();
    });

    it('should be rejected if customer is not found', async () => {
      const customer = await testService.getCustomer();
      const response = await request(app.getHttpServer())
        .get(`/api/customers/${customer.id + 1}`)
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to get customer', async () => {
      const contact = await testService.getCustomer();
      const response = await request(app.getHttpServer())
        .get(`/api/contacts/${contact.id}`)
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.first_name).toBe('test');
      expect(response.body.data.last_name).toBe('test');
      expect(response.body.data.email).toBe('test@example.com');
      expect(response.body.data.phone).toBe('9999');
      expect(response.body.data.panggilan).toBe('test');
      expect(response.body.data.tanggallahir).toBe('test');
      expect(response.body.data.alamat).toBe('test');
      expect(response.body.data.kota).toBe('test');
    });
  });

  describe('PUT /api/customers/:customerId', () => {
    beforeEach(async () => {
      await testService.deleteAll();

      await testService.createUser();
      await testService.createCustomer();
    });

    it('should be rejected if request is invalid', async () => {
      const contact = await testService.getCustomer();
      const response = await request(app.getHttpServer())
        .put(`/api/contacts/${contact.id}`)
        .set('Authorization', 'test')
        .send({
          first_name: '',
          last_name: '',
          email: 'salah',
          phone: '',
          panggilan: '',
          tanggallahir: '',
          alamat: '',
          kota: '',
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be rejected if customer is not found', async () => {
      const customer = await testService.getCustomer();
      const response = await request(app.getHttpServer())
        .put(`/api/customers/${customer.id + 1}`)
        .set('Authorization', 'test')
        .send({
          first_name: 'test',
          last_name: 'test',
          email: 'test@example.com',
          phone: '9999',
          panggilan: 'test',
          tanggallahir: 'test',
          alamat: 'test',
          kota: 'test',
        });

      logger.info(response.body);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to update customer', async () => {
      const customer = await testService.getCustomer();
      const response = await request(app.getHttpServer())
        .put(`/api/customers/${customer.id}`)
        .set('Authorization', 'test')
        .send({
          first_name: 'test updated',
          last_name: 'test updated',
          email: 'testupdated@example.com',
          phone: '8888',
          panggilan: 'test be ok',
          tanggallahir: 'test be ok',
          alamat: 'test be ok',
          kota: 'test be ok',
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.first_name).toBe('test updated');
      expect(response.body.data.last_name).toBe('test updated');
      expect(response.body.data.email).toBe('testupdated@example.com');
      expect(response.body.data.phone).toBe('8888');
      expect(response.body.data.panggilan).toBe('test be ok');
      expect(response.body.data.tanggallahir).toBe('test be ok');
      expect(response.body.data.alamat).toBe('test be ok');
      expect(response.body.data.kota).toBe('test be ok');
    });
  });

  describe('DELETE /api/customers/:customerId', () => {
    beforeEach(async () => {
      await testService.deleteAll();

      await testService.createUser();
      await testService.createCustomer();
    });

    it('should be rejected if customer is not found', async () => {
      const customer = await testService.getCustomer();
      const response = await request(app.getHttpServer())
        .delete(`/api/customers/${customer.id + 1}`)
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to remove customers', async () => {
      const contact = await testService.getCustomer();
      const response = await request(app.getHttpServer())
        .delete(`/api/customers/${contact.id}`)
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data).toBe(true);
    });
  });

  describe('GET /api/customers', () => {
    beforeEach(async () => {
      await testService.deleteAll();

      await testService.createUser();
      await testService.createCustomer();
    });

    it('should be able to search customers', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/customers`)
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(1);
    });

    it('should be able to search customers by name', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/customers`)
        .query({
          name: 'es',
        })
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(1);
    });

    it('should be able to search customers by name not found', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/customers`)
        .query({
          name: 'wrong',
        })
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(0);
    });

    it('should be able to search customers by email', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/customers`)
        .query({
          email: 'es',
        })
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(1);
    });

    it('should be able to search customer by email not found', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/customers`)
        .query({
          email: 'wrong',
        })
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(0);
    });

    it('should be able to search customer by phone', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/customers`)
        .query({
          phone: '99',
        })
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(1);
    });

    it('should be able to search customer by phone not found', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/customers`)
        .query({
          phone: '88',
        })
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(0);
    });

    it('should be able to search customers with page', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/customers`)
        .query({
          size: 1,
          page: 2,
        })
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(0);
      expect(response.body.paging.current_page).toBe(2);
      expect(response.body.paging.total_page).toBe(1);
      expect(response.body.paging.size).toBe(1);
    });
  });
});
