
import { Restaurant } from './types';

export const SAMPLE_RESTAURANTS: Restaurant[] = [
  {
    id: 'res-1',
    name: 'SUSHI',
    category: 'Japanese Fusion',
    location: 'Sectors 7G',
    distance: '0.4km',
    menu: [
      { id: 'm1', name: 'Electric Dragon Roll', cuisine: 'Japanese', price: 'Ξ 0.045', description: 'Tempura shrimp with spicy tuna, topped with avocado and neon-blue wasabi mayo.', rating: 4.9, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop', tags: ['Signature', 'Spicy'], itemCategory: 'MAIN' },
      { id: 'm1-2', name: 'Cyber Sashimi', cuisine: 'Japanese', price: 'Ξ 0.038', description: 'Ultra-thin slices of synth-tuna with a liquid nitrogen soy drizzle.', rating: 4.7, image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=800&auto=format&fit=crop', tags: ['Raw', 'Chilled'], itemCategory: 'MAIN' },
      { id: 'd1', name: 'Sapporo Ultra Blue', cuisine: 'Japanese', price: 'Ξ 0.012', description: 'Crisp lager infused with bioluminescent electrolytes.', rating: 4.5, image: 'https://images.unsplash.com/photo-1610630782547-7a8f045d6d3d?q=80&w=800&auto=format&fit=crop', tags: ['Cold', 'Beverage'], itemCategory: 'DRINK' },
      { id: 's1', name: 'Glow-Edamame', cuisine: 'Japanese', price: 'Ξ 0.008', description: 'Salt-crusted beans with a shimmering citrus glaze.', rating: 4.2, image: 'https://images.unsplash.com/photo-1542345812-d98b5cd6cf48?q=80&w=800&auto=format&fit=crop', tags: ['Light', 'Appetizer'], itemCategory: 'SIDES' },
      { id: 'sw1', name: 'Matcha Data-Mochi', cuisine: 'Japanese', price: 'Ξ 0.015', description: 'Soft rice cake filled with high-density green tea cream.', rating: 4.8, image: 'https://images.unsplash.com/photo-1582231375454-81d7770a1301?q=80&w=800&auto=format&fit=crop', tags: ['Sweet', 'Classic'], itemCategory: 'SWEET' }
    ]
  },
  {
    id: 'res-2',
    name: 'GRILL',
    category: 'Steakhouse',
    location: 'Lower District',
    distance: '1.2km',
    menu: [
      { id: 'm2', name: 'Plasma-Seared Ribeye', cuisine: 'Steakhouse', price: 'Ξ 0.089', description: 'Dry-aged beef seared with high-intensity plasma for a perfect crust.', rating: 4.7, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop', tags: ['Meat', 'High Protein'], itemCategory: 'MAIN' },
      { id: 'm2-2', name: 'Vector Burger', cuisine: 'Steakhouse', price: 'Ξ 0.052', description: 'A perfectly geometric stack of Wagyu and synth-cheese.', rating: 4.9, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop', tags: ['Heavy', 'Popular'], itemCategory: 'MAIN' },
      { id: 'd2', name: 'Oil-Spill Old Fashioned', cuisine: 'Steakhouse', price: 'Ξ 0.022', description: 'Smoky bourbon with activated charcoal and a laser-cut orange peel.', rating: 4.9, image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=800&auto=format&fit=crop', tags: ['Strong', 'Classic'], itemCategory: 'DRINK' },
      { id: 's2', name: 'Vector Fries', cuisine: 'Steakhouse', price: 'Ξ 0.012', description: 'Triple-cooked potatoes cut into perfect geometric prisms.', rating: 4.6, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=800&auto=format&fit=crop', tags: ['Side', 'Crispy'], itemCategory: 'SIDES' },
      { id: 'sw2', name: 'Carbon-Fiber Cake', cuisine: 'Steakhouse', price: 'Ξ 0.025', description: 'Multi-layered chocolate cake with a crystalline sugar lattice.', rating: 5.0, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop', tags: ['Rich', 'Dessert'], itemCategory: 'SWEET' }
    ]
  },
  {
    id: 'res-3',
    name: 'PAN-ASIAN',
    category: 'Noodles & More',
    location: 'Gravity Well',
    distance: '0.8km',
    menu: [
      { id: 'm3', name: 'Zero-G Ramen', cuisine: 'Asian', price: 'Ξ 0.041', description: 'Tension-bound broth that defies gravity until it hits your palate.', rating: 4.9, image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=800&auto=format&fit=crop', tags: ['Hot', 'Umami'], itemCategory: 'MAIN' },
      { id: 'd3', name: 'Nebula Nectar', cuisine: 'Asian', price: 'Ξ 0.018', description: 'Swirling purple tea with popping boba galaxies.', rating: 4.7, image: 'https://images.unsplash.com/photo-1544145945-f904253d0c7b?q=80&w=800&auto=format&fit=crop', tags: ['Refreshing', 'Sweet'], itemCategory: 'DRINK' },
      { id: 's3', name: 'Cyber Gyoza', cuisine: 'Asian', price: 'Ξ 0.014', description: 'Pan-fried dumplings with a web of crispy starch.', rating: 4.4, image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=800&auto=format&fit=crop', tags: ['Appetizer', 'Savory'], itemCategory: 'SIDES' },
      { id: 'sw3', name: 'Mango Matrix', cuisine: 'Asian', price: 'Ξ 0.020', description: 'Deconstructed sticky rice with mango spheres.', rating: 4.6, image: 'https://images.unsplash.com/photo-1546069901-eacef0df6022?q=80&w=800&auto=format&fit=crop', tags: ['Fruit', 'Modern'], itemCategory: 'SWEET' }
    ]
  },
  {
    id: 'res-4',
    name: 'DRINKS',
    category: 'Hydro-Bar',
    location: 'Upper Highrise',
    distance: '0.1km',
    menu: [
      { id: 'd4-1', name: 'Cryo-Cold Brew', cuisine: 'Tech-Cafe', price: 'Ξ 0.015', description: 'Coffee chilled to near absolute zero using liquid nitrogen.', rating: 4.8, image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800&auto=format&fit=crop', tags: ['Caffeine', 'Icy'], itemCategory: 'DRINK' },
      { id: 'd4-2', name: 'Biolume Tonic', cuisine: 'Mixology', price: 'Ξ 0.025', description: 'A glowing cocktail that changes color based on your heart rate.', rating: 4.9, image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop', tags: ['Alcoholic', 'Glow'], itemCategory: 'DRINK' },
      { id: 'd4-3', name: 'Static Lemonade', cuisine: 'Mixology', price: 'Ξ 0.010', description: 'Sparkling citrus with a mild electric shock upon first sip.', rating: 4.5, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop', tags: ['Non-Alcoholic', 'Zesty'], itemCategory: 'DRINK' }
    ]
  },
  {
    id: 'res-5',
    name: 'SALADS',
    category: 'Bio-Gardens',
    location: 'Eco-Dome 4',
    distance: '2.5km',
    menu: [
      { id: 'sal-1', name: 'Kaleidoscopic Kale', cuisine: 'Bio-Organic', price: 'Ξ 0.028', description: 'Genetically enhanced colorful kale with nutrient-dense microchips.', rating: 4.7, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop', tags: ['Vegan', 'Healthy'], itemCategory: 'SALAD' },
      { id: 'sal-2', name: 'Neural Nut Salad', cuisine: 'Bio-Organic', price: 'Ξ 0.032', description: 'A mix of brain-boosting seeds and hyper-hydrated greens.', rating: 4.8, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop', tags: ['Brain-Food', 'Crispy'], itemCategory: 'SALAD' }
    ]
  },
  {
    id: 'res-6',
    name: 'MERCHANDISE',
    category: 'Hardware & Gear',
    location: 'The Forge',
    distance: '0.0km',
    menu: [
      { id: 'merch-1', name: 'HUD Lens Goggles', cuisine: 'Hardware', price: 'Ξ 0.550', description: 'Military grade ocular implants for high-resolution menu browsing.', rating: 5.0, image: 'https://images.unsplash.com/photo-1478479405421-ce83c92fb3ba?q=80&w=800&auto=format&fit=crop', tags: ['Wearable', 'Top Rated'], itemCategory: 'MERCH' },
      { id: 'merch-2', name: 'Synth-Leather Jacket', cuisine: 'Apparel', price: 'Ξ 0.220', description: 'Self-repairing nanomaterial jacket with built-in thermal regulation.', rating: 4.9, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop', tags: ['Fashion', 'Smart'], itemCategory: 'MERCH' },
      { id: 'merch-3', name: 'Data Crystal Core', cuisine: 'Storage', price: 'Ξ 0.120', description: '100PB storage device forged in the heart of a dying star.', rating: 4.6, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop', tags: ['Tool', 'Memory'], itemCategory: 'MERCH' }
    ]
  }
];
