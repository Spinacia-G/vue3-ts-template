import { Faker, en } from '@faker-js/faker'
import { LoginFormType, UserInfo } from '@/types/auth'

const faker = new Faker({ locale: [en] })

/**
 * 模拟用户账号
 * @returns {LoginFormType}
 */
export const createRandomAccount = (): LoginFormType => {
  return {
    username: faker.internet.displayName(),
    password: faker.string.nanoid(15),
    uuid: faker.string.uuid(),
    code: faker.string.alphanumeric(4)
  }
}

/**
 * 模拟用户信息
 * @returns {UserInfo}
 */
export const createRandomUser = (): UserInfo => {
  return {
    username: faker.internet.displayName(),
    nickname: faker.person.fullName(),
    email: faker.internet.email(),
    job: faker.person.jobTitle()
  }
}

/**
 * 模拟随机token
 * @returns {string}
 */
export const createRandomToken = (): string => {
  return faker.string.uuid()
}

/**
 * 模拟生成大量用户
 * @type {UserInfo[]}
 */
export const USERS: UserInfo[] = faker.helpers.multiple(createRandomUser, {
  count: 5
})
