import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create sample users
  const user1 = await prisma.user.upsert({
    where: { email: 'employee@example.com' },
    update: {},
    create: {
      email: 'employee@example.com',
      cognitoSub: '1234567890',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567890',
      role: UserRole.EMPLOYEE as UserRole,
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      cognitoSub: '1234567890',
      firstName: 'Admin',
      lastName: 'User',
      phone: '+1234567890',
      role: UserRole.ADMIN as UserRole,
    },
  });

  console.log('✅ Users created:', { user1, admin });

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
