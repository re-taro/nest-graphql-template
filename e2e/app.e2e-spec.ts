import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { UserCreateInput, UserUpdateInput } from '../src/user/user.input';

describe('e2e', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });
  afterAll(async () => {
    await cleanUser();
    await app.close();
  });

  const findAllUser = async (): Promise<request.Response> => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: 'query {\n  users {\n    id\n    name\n  }\n}'
      });
    return res;
  }

  const createUser = async (data: UserCreateInput): Promise<request.Response> => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation {\n  createUser (\n    data: {\n      id: ${data.id}\n      name: \"${data.name}\"\n    }\n  ) {\n    id\n    name\n  }\n}`
      });
    return res;
  }

  const updateUser = async (data: UserUpdateInput): Promise<request.Response> => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation {\n  updateUser (\n    data:{\n      id: ${data.id}\n      name: \"${data.name}\"\n    }\n  ) {\n    id\n    name\n  }\n}`
      });
    return res;
  }

  const deleteUser = async (id: number): Promise<request.Response> => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation {\n  deleteUser (\n    id: ${id}\n  ) {\n    id\n    name\n  }\n}`
      });
    return res;
  }

  const cleanUser= async (): Promise<request.Response> => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: 'query {\n  cleanUsers {\n    id\n    name\n  }\n}'
      });
    return res;
  }

  it('/graphql findAll', async () => {
    const res = await findAllUser();
    expect(res.status).toBe(200);
    expect(res.body.data.users).toEqual([
      {
        id: '1',
        name: 'Alice',
      },
      {
        id: '2',
        name: 'Bob',
      },
      {
        id: '3',
        name: 'Claire',
      },
    ]);
  });

  it('/graphql createUser', async () => {
    const res = await createUser({ id: 4, name: 'Diana' });
    expect(res.status).toBe(200)
    expect(res.body.data.createUser).toEqual({
      id: '4',
      name: 'Diana',
    });
    const res2 = await findAllUser();
    expect(res2.status).toBe(200);
    expect(res2.body.data.users).toEqual([
      {
        id: '1',
        name: 'Alice',
      },
      {
        id: '2',
        name: 'Bob',
      },
      {
        id: '3',
        name: 'Claire',
      },
      {
        id: '4',
        name: 'Diana',
      },
    ]);
  });

  it('/graphql updateUser', async () => {
    const res = await updateUser({ id: 4, name: 'Eric' });
    expect(res.status).toBe(200)
    expect(res.body.data.updateUser).toEqual({
      id: '4',
      name: 'Eric',
    });
    const res2 = await findAllUser();
    expect(res2.status).toBe(200);
    expect(res2.body.data.users).toEqual([
      {
        id: '1',
        name: 'Alice',
      },
      {
        id: '2',
        name: 'Bob',
      },
      {
        id: '3',
        name: 'Claire',
      },
      {
        id: '4',
        name: 'Eric',
      },
    ]);
  });

  it('/graphql deleteUser', async () => {
    const res = await deleteUser(4);
    expect(res.status).toBe(200)
    expect(res.body.data.deleteUser).toEqual({
      id: '4',
      name: 'Eric',
    });
    const res2 = await findAllUser();
    expect(res2.status).toBe(200);
    expect(res2.body.data.users).toEqual([
      {
        id: '1',
        name: 'Alice',
      },
      {
        id: '2',
        name: 'Bob',
      },
      {
        id: '3',
        name: 'Claire',
      },
    ]);
  });
});
