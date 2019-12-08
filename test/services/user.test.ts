import { UserService } from '../../src/services/User';
import { User } from '../../src/entity/User';
const sampleData = {
  id: 1,
  firstName: 'Timber Updated',
  lastName: 'Saw Updated',
  age: 19,
};

describe('Get user detail', () => {
  it('with user id', async () => {
    const user: User = await UserService.getUser(1);
    expect(user).toEqual(sampleData);
  });
});
