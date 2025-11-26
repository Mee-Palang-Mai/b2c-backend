import { CreateOvertimeRequestDto, UpdateOvertimeStatusDto } from './dto';

describe('Dto', () => {
  it('should be defined', () => {
    expect(new CreateOvertimeRequestDto()).toBeDefined();
    expect(new UpdateOvertimeStatusDto()).toBeDefined();
  });
});
