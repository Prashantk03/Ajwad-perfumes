// prisma/seed.js
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        id: "11111111-1111-1111-1111-111111111111",
        title: "Sandalwood Attar - 10ml",
        slug: "sandalwood-attar-10ml",
        description:
          "Pure sandalwood attar with warm base notes and long-lasting sillage.",
        brand: "Ajwad",
        fragranceFamily: "Woody",
        concentration: "Attar",
        images: ["https://images.unsplash.com/photo-1546435770-a3e426bf472b"],
      },
      {
        id: "22222222-2222-2222-2222-222222222222",
        title: "Rose EDP - 50ml",
        slug: "rose-edp-50ml",
        description:
          "Rich damask rose with fruity top notes and powdery drydown.",
        brand: "Ajwad",
        fragranceFamily: "Floral",
        concentration: "EDP",
        images: [
          "https://images.unsplash.com/photo-1526045612212-70caf35c14df",
        ],
      },
    ],
  });

  // create a sample variant for each product
  await prisma.productVariant.createMany({
    data: [
      {
        id: "v-1",
        productId: "11111111-1111-1111-1111-111111111111",
        sku: "AJW-ATT-10",
        price: 399.0,
        mrp: 499.0, 
        sizeMl: 10,
        stock: 50,
      },
      {
        id: 'v-2',
        productId: '22222222-2222-2222-2222-222222222222',
        sku: 'AJW-ROSE-50',
        price: 1199.0,
        mrp: 1499.0,
        sizeMl: 50,
        stock: 30
      }
    ],
  });
  console.log('Seeded')
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
