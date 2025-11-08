import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create sample users
  const user1 = await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      email: 'customer@example.com',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567890',
      password: '$2b$10$SampleHashedPasswordHere', // Hash this in production
      role: 'CUSTOMER',
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      firstName: 'Admin',
      lastName: 'User',
      password: '$2b$10$SampleHashedPasswordHere', // Hash this in production
      role: 'ADMIN',
    },
  });

  console.log('✅ Users created:', { user1, admin });

  // Create sample products
  const product1 = await prisma.product.create({
    data: {
      name: 'Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation',
      price: 199.99,
      sku: 'WH-001',
      stock: 50,
      category: 'Electronics',
      imageUrl: 'https://example.com/images/headphones.jpg',
      isActive: true,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Smart Watch',
      description: 'Fitness tracker and smart watch with heart rate monitor',
      price: 299.99,
      sku: 'SW-001',
      stock: 30,
      category: 'Electronics',
      imageUrl: 'https://example.com/images/smartwatch.jpg',
      isActive: true,
    },
  });

  console.log('✅ Products created:', { product1, product2 });

  // Create sample address
  const address = await prisma.address.create({
    data: {
      userId: user1.id,
      fullName: 'John Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'USA',
      phone: '+1234567890',
      isDefault: true,
    },
  });

  console.log('✅ Address created:', address);

  // Create sample cart
  const cart = await prisma.cart.create({
    data: {
      userId: user1.id,
      cartItems: {
        create: [
          {
            productId: product1.id,
            quantity: 2,
          },
        ],
      },
    },
  });

  console.log('✅ Cart created:', cart);

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
