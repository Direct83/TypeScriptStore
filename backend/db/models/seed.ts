import faker from 'faker'

import { productModel } from './models.js'
console.log(faker.commerce.productName);
console.log(faker.commerce.price);
console.log(faker.image.fashion);

// export default async function (){
//   for (let i = 0; i < 20; i++) {
//     await productModel.create({
//       name: faker.commerce.productName,
//       price: faker.commerce.price,
//       img: faker.image.fashion,
//     })
//   }
// }

